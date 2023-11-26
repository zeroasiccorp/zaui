#!/usr/bin/env node

// CLI for zaui
// Sets environment variables and launches vite dev/build/preview.
// It would be nicer to invoke vite directly and pass config in memory.
// TODO: add support for other npm scripts (e.g. check, test...)

import child_process from 'node:child_process';

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';
import url from 'node:url';

let __dirname = path.dirname(url.fileURLToPath(import.meta.url));

let binDir = path.resolve(__dirname, '..', 'node_modules', '.bin');
let viteFile = path.resolve(binDir, 'vite');

if (!fs.existsSync(viteFile)) {
  // Try npm 7+ layout
  let binDir2 = path.resolve(__dirname, '..', '..', '.bin');
  viteFile = path.resolve(binDir2, 'vite');
  if (!fs.existsSync(viteFile)) {
    console.error(`Could not find vite executable in ${binDir} or ${binDir2}`);
    process.exit(1);
  } else {
    binDir = binDir2;
  }
}

let viteCommand = process.argv[2] || 'dev';
let packageDir = path.resolve(__dirname, '..');
let pkg = JSON.parse(fs.readFileSync(path.join(packageDir, 'package.json'), 'utf8'));

// https://vitepress.dev/guide/routing#project-root
// defaults to cwd
// override with cli arg or ZAUI_PROJECT_DIR
let projectDir = path.resolve('.', process.argv[3] ?? process.env.ZAUI_PROJECT_DIR ?? '');

// Similar to project-root/.vitepress directory
// defaults to projectDir/src
// override with ZAUI_SRC_DIR, resolved relative to projectDir
// Optional:
// - use app.config.js or app.config.ts for custom components
// - use tailwind.config.js (note: cjs - not esm) for tailwind config
// - restart dev server after creating directory or renaming config file.
let srcDir = path.resolve(projectDir, process.env.ZAUI_SRC_DIR ?? 'src');
if (!fs.existsSync(srcDir)) {
  srcDir = undefined;
}

let configDir = srcDir;
if (
  !srcDir ||
  (!fs.existsSync(path.join(srcDir, 'app.config.js')) &&
    !fs.existsSync(path.join(srcDir, 'app.config.ts')))
) {
  configDir = undefined;
}

// https://vitepress.dev/guide/routing#source-directory
// defaults to projectDir/content
// override with ZAUI_CONTENT_DIR, resolved relative to projectDir
let contentDir = path.resolve(projectDir, process.env.ZAUI_CONTENT_DIR ?? 'content');
if (!fs.existsSync(contentDir)) {
  console.log(`No content directory found at ${contentDir} - using static files from package.`);
  contentDir = path.join(packageDir, 'static', 'files');
}

// Create staticDir in temp directory
let staticDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zaui-'));
// symlink content -> contentDir
fs.symlinkSync(contentDir, path.join(staticDir, 'files'));
// overlay symlinks -> srcDir/static/*
if (srcDir) {
  let srcStaticDir = path.join(srcDir, 'static');
  if (fs.existsSync(srcStaticDir)) {
    overlayStaticDir(srcStaticDir);
  }
}
// overlay symlinks -> packageDir/static/*
overlayStaticDir(path.join(packageDir, 'static'));

// helper function to symlink files in targetDir into staticDir
function overlayStaticDir(targetDir) {
  if (fs.existsSync(targetDir)) {
    fs.readdirSync(targetDir).forEach((file) => {
      try {
        // don't overwrite existing files
        fs.symlinkSync(path.join(targetDir, file), path.join(staticDir, file));
      } catch (e) {
        if (e.code !== 'EEXIST') {
          throw e;
        }
      }
    });
  }
}

// https://kit.svelte.dev/docs/adapter-static#options-pages
// defaults to projectDir/build
// override with ZAUI_BUILD_DIR, resolved relative to projectDir
let buildDir = path.resolve(projectDir, process.env.ZAUI_BUILD_DIR ?? 'build');

// All directory paths should be fully resolved
let env = {
  ZAUI_PROJECT_DIR: projectDir,
  ZAUI_CONTENT_DIR: contentDir,
  ZAUI_BUILD_DIR: buildDir,
  ZAUI_SRC_DIR: srcDir,
  ZAUI_APPCONFIG_DIR: configDir,
  ZAUI_STATIC_DIR: staticDir,
  ZAUI_PACKAGE_DIR: packageDir,
};

// Pass PUBLIC_* env vars for access via import from '$env/static/public'
let userEnvFile = path.join(srcDir, '.env');
if (fs.existsSync(userEnvFile)) {
  fs.readFileSync(userEnvFile, { encoding: 'utf8' })
    .split('\n')
    .forEach((line) => {
      let m = line.match(/^(PUBLIC_\w+)=(.*)$/);
      if (m) {
        env[m[1]] = process.env[m[1]] || m[2];
      }
    });
}

console.log(pkg.name, pkg.version, env);

child_process.execFileSync(viteFile, [viteCommand], {
  cwd: packageDir,
  stdio: 'inherit',
  env: {
    ...process.env,
    ...env,
  },
});
