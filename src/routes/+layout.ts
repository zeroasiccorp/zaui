export const prerender = 'auto';
import { building } from '$app/environment';
import { get } from 'svelte/store';
import type { LoadEvent } from '@sveltejs/kit';
import { loader, server } from '$lib/loader';
import { model, type MarkdownFiles, type MarkdownFile } from '$lib/stores/model';
import { formatDate } from '$lib/formatDate';
import { layoutComponents, pathLayout } from '$lib/components';
import { PUBLIC_PRODUCTION } from '$env/static/public';

import plimit from 'p-limit';
const limit = plimit(10);

import pkg from '@markdoc/markdoc';
const { parse } = pkg;

import yaml from 'js-yaml';

export async function load(evt: LoadEvent) {
  let data: MarkdownFiles = get(model);
  // data is undefined on first get()
  // TODO: self-initialize model store
  if (!data) {
    data = { files: [], config: {}, fileMap: {}, status: '' };
    model.set(data);
    let tstart = Date.now();

    type Files = {
      files?: Array<string>;
      error?: string;
    };

    let files: Files = await loader(server('/api/mdfiles.json'), 'files', evt);
    if (files.error) {
      data.status = files.error;
    }
    data.files = files.files || [];

    if (files.files?.length) {
      let loadlist = files.files.map((file) => limit(() => getMarkdown(file, evt)));
      let mdData = await Promise.all(loadlist);
      let fileMap: { [key: string]: MarkdownFile } = {};
      mdData.forEach((file) => {
        fileMap[file.filepath] = file;
      });
      data.config = fileMap['index.md']?.frontmatter || {};

      // Preview mode is default, but can be overridden by setting PUBLIC_PRODUCTION
      // For non-preview builds, remove previewOnly files from files and fileMap
      data.config.preview = !PUBLIC_PRODUCTION;
      if (!data.config.preview) {
        data.files = data.files.filter((file) => {
          if (fileMap[file].frontmatter?.previewOnly) {
            delete fileMap[file];
            return false;
          }
          return true;
        });
      }
      data.fileMap = fileMap;
      data.status = `${new Date().toISOString()} loaded ${loadlist.length} files (${
        Date.now() - tstart
      } ms)`;
    }
  }
  // default navlinks
  if (!data.config.navlinks?.length) {
    data.config.navlinks = [
      {
        href: '/emulation',
        text: 'Chipmaker'
      },
      {
        href: '/docs',
        text: 'Chiplets'
      },
    ];
  }

  let path = evt.params.path || '';

  let content = data.fileMap[path + '.md'] || data.fileMap[path ? path + '/index.md' : 'index.md'];

  let frontmatter = content?.frontmatter || {};
  let layout = layoutComponents[frontmatter.layout] || pathLayout(path);

  // content may be undefined if there is no md file - see [...path]/page.ts
  return { content, frontmatter, layout, config: data.config };
}

async function getMarkdown(filepath: string, evt: LoadEvent, prefix = '/files/') {
  let md = await loader(server(`${prefix}${filepath}`), 'markdown', evt, false);
  let data: MarkdownFile = { filepath, ...md };
  if (!data.error) {
    data.ast = parse(data.markdown);
    try {
      data.frontmatter = yaml.load(data.ast.attributes.frontmatter);
    }
    catch (err) {
      data.yamlError = ''+err;
      if (building) throw err;
    }
    data.byline = [(data.frontmatter?.author ?? ''), formatDate(data.frontmatter?.date)].filter(Boolean).join(' - ');
  }
  return data;
}
