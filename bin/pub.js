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

const viteFile = path.resolve(__dirname, '..', 'node_modules', '.bin', 'vite');
const viteCommand = process.argv[2];
const packageDir = path.resolve(__dirname, '..');
const pkg = JSON.parse(fs.readFileSync(path.join(packageDir, 'package.json'), 'utf8'));

// https://vitepress.dev/guide/routing#project-root
// defaults to cwd
// override with cli arg or PUB_PROJECT_DIR
const projectDir = path.resolve('.', process.argv[3] ?? process.env.PUB_PROJECT_DIR ?? '');

// https://kit.svelte.dev/docs/configuration#outdir
// defaults to .svelte-kit under node_modules/packageDir
// override with PUB_OUT_DIR, resolved relative to projectDir
const outDir = path.resolve(
  packageDir,
  '.svelte-kit',
  process.env.PUB_OUT_DIR ? path.resolve(projectDir, process.env.PUB_OUT_DIR) : ''
);

// https://vitepress.dev/guide/routing#source-directory
// defaults to projectDir
// override with PUB_SOURCE_DIR, resolved relative to projectDir
const sourceDir = path.resolve(projectDir, process.env.PUB_SOURCE_DIR ?? '');

// https://kit.svelte.dev/docs/adapter-static#options-pages
// defaults to projectDir/build
// override with PUB_BUILD_DIR, resolved relative to projectDir
const buildDir = path.resolve(
  projectDir,
  'build',
  process.env.PUB_BUILD_DIR ? path.resolve(projectDir, process.env.PUB_BUILD_DIR) : ''
);

// https://kit.svelte.dev/docs/adapter-static#options-pages
// defaults to projectDir/build
// override with PUB_ASSET_DIR, resolved relative to projectDir
const assetDir = path.resolve(
  buildDir,
  process.env.PUB_ASSET_DIR ? path.resolve(projectDir, process.env.PUB_ASSET_DIR) : ''
  );

// Similar to project-root/.vitepress directory but only for optional override files.
// defaults to .pub under projectDir
// override with PUB_CONFIG_DIR, resolved relative to projectDir
// The following override files are supported:
// - svelte.config.js
// - tailwind.config.js
// - vite.config.ts
const configDir = path.resolve(projectDir, process.env.PUB_CONFIG_DIR ?? '.pub');

function configExists(foo) {
  const configPath = path.join(configDir, foo);
  return fs.existsSync(configPath) ? configPath : undefined;
}

// All directory paths should be fully resolved
// Paths to optional config files should either be fully resolved or undefined
const env = {
  PUB_PROJECT_DIR: projectDir,
  PUB_OUT_DIR: outDir,
  PUB_SOURCE_DIR: sourceDir,
  PUB_BUILD_DIR: buildDir,
  PUB_ASSET_DIR: assetDir,
  PUB_SVELTE_CONFIG: configExists('svelte.config.js'),
  PUB_TAILWIND_CONFIG: configExists('tailwind.config.js'),
  PUB_VITE_CONFIG: configExists('vite.config.ts'),
};

console.log(pkg.name, pkg.version, {
  vitePath: viteFile,
  args,
  packageDir,
  env,
});

child_process.execFileSync(viteFile, [viteCommand], {
  cwd: packageDir,
  stdio: 'inherit',
  env: {
    ...process.env,
    ...env,
  },
});
