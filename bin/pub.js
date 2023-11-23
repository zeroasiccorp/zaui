#!/usr/bin/env node

// CLI for sveltekit-template
// Sets environment variables and launches vite dev/build/preview.
// TODO: It would be nicer to invoke vite directly and pass config in memory.

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
// override with cli arg or PUB_PROJECT_DIR
let projectDir = path.resolve('.', process.argv[3] ?? process.env.PUB_PROJECT_DIR ?? '');

// Similar to project-root/.vitepress directory
// defaults to projectDir/src
// override with PUB_SRC_DIR, resolved relative to projectDir
// Optional:
// - use pub.config.js or pub.config.ts for custom components
// - use tailwind.config.js (note: cjs - not esm) for tailwind config
// - restart dev server after creating directory or renaming config file.
let srcDir = path.resolve(projectDir, process.env.PUB_SRC_DIR ?? 'src');
if (!fs.existsSync(srcDir)) {
  srcDir = undefined;
}

// https://vitepress.dev/guide/routing#source-directory
// defaults to projectDir/content
// override with PUB_CONTENT_DIR, resolved relative to projectDir
let contentDir = path.resolve(projectDir, process.env.PUB_CONTENT_DIR ?? 'content');
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
// override with PUB_BUILD_DIR, resolved relative to projectDir
let buildDir = path.resolve(projectDir, process.env.PUB_BUILD_DIR ?? 'build');

// All directory paths should be fully resolved
let env = {
  PUB_PROJECT_DIR: projectDir,
  PUB_CONTENT_DIR: contentDir,
  PUB_BUILD_DIR: buildDir,
  PUB_SRC_DIR: srcDir,
  PUB_STATIC_DIR: staticDir,
  PUB_PACKAGE_DIR: packageDir,
};

console.log(pkg.name, pkg.version, env);

child_process.execFileSync(viteFile, [viteCommand], {
  cwd: packageDir,
  stdio: 'inherit',
  env: {
    ...process.env,
    ...env,
  },
});
