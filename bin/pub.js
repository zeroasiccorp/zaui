#!/usr/bin/env node

// CLI for sveltekit-template
// Sets environment variables and launches vite dev/build/preview.
// TODO: It would be nicer to invoke vite directly and pass config in memory.

import child_process from 'node:child_process';

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import url from 'node:url';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

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

const viteCommand = process.argv[2];
const packageDir = path.resolve(__dirname, '..');
const pkg = JSON.parse(fs.readFileSync(path.join(packageDir, 'package.json'), 'utf8'));

// https://vitepress.dev/guide/routing#project-root
// defaults to cwd
// override with cli arg or PUB_PROJECT_DIR
const projectDir = path.resolve('.', process.argv[3] ?? process.env.PUB_PROJECT_DIR ?? '');

// https://vitepress.dev/guide/routing#source-directory
// defaults to projectDir
// override with PUB_CONTENT_DIR, resolved relative to projectDir
const contentDir = path.resolve(projectDir, process.env.PUB_CONTENT_DIR ?? '');

// https://kit.svelte.dev/docs/adapter-static#options-pages
// defaults to projectDir/build
// override with PUB_BUILD_DIR, resolved relative to projectDir
const buildDir = path.resolve(
  projectDir,
  'build',
  process.env.PUB_BUILD_DIR ? path.resolve(projectDir, process.env.PUB_BUILD_DIR) : ''
);

// Similar to project-root/.vitepress directory
// Used for optional tailwind.config.js and SvelteKit component src tree.
// defaults to projectDir/src
// override with PUB_SRC_DIR, resolved relative to projectDir
// NOTE: tailwind.config.js must be cjs (not esm) for non-async merge.
const srcDir = path.resolve(projectDir, process.env.PUB_SRC_DIR ?? 'src');

// All directory paths should be fully resolved
const env = {
  PUB_PROJECT_DIR: projectDir,
  PUB_CONTENT_DIR: contentDir,
  PUB_BUILD_DIR: buildDir,
  PUB_SRC_DIR: srcDir,
};

console.log(pkg.name, pkg.version
// {
//  viteFile,
//  viteCommand,
//  packageDir,
//  env,
// }
);

child_process.execFileSync(viteFile, [viteCommand], {
  cwd: packageDir,
  stdio: 'inherit',
  env: {
    ...process.env,
    ...env,
  },
});
