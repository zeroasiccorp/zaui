export const prerender = 'auto';
import { building } from '$app/environment';
import { get } from 'svelte/store';
import type { LoadEvent } from '@sveltejs/kit';
import { loader } from '$lib/loader';
import { model, compareMDFDates, type MarkdownFiles, type MarkdownFile } from '$lib/stores/model';
import { formatDate } from '$lib/formatDate';
import { layoutComponents } from '$lib/componentMaps';
import { PUBLIC_PRODUCTION } from '$env/static/public';

import plimit from 'p-limit';
const limit = plimit(10);

import pkg from '@markdoc/markdoc';
const { parse } = pkg;

import yaml from 'js-yaml';
import appConfig from '$appconfig/app.config';

export async function load(evt: LoadEvent) {
  let data: MarkdownFiles = get(model);

  // naive data loader - fetches markdown files and re-renders on first load
  // TODO: properly pre-render pages and lazy-load larger sites.
  if (!data) {
    data = {
      files: [],
      config: {},
      fileMap: {},
      dirMap: {},
      submenuMap: {},
      sidebarMap: {},
      status: '',
      appConfig,
    };
    model.set(data);
    let tstart = Date.now();

    type Files = {
      files?: Array<string>;
      error?: string;
    };

    let files: Files = await loader('/api/mdfiles.json', 'files', evt);
    if (files.error) {
      data.status = files.error;
    }
    data.files = files.files || [];

    if (files.files?.length) {
      // fetch markdown files
      let loadlist = files.files.map((file) => limit(() => getMarkdown(file, evt)));
      let mdData = await Promise.all(loadlist);

      // populate fileMap and dirMap
      let fileMap: { [key: string]: MarkdownFile } = {};
      let dirMap: { [key: string]: MarkdownFile[] } = {};
      mdData.forEach((file) => {
        fileMap[file.filepath] = file;
        let names = file.filepath.split('/');
        if (names.length > 1) {
          dirMap['/' + names[0]] = []; // e.g. dirMap['/blog'] = []
        }
      });
      // console.log('fileMap', Object.keys(fileMap));

      // populate dirMap with sorted list of files, and next/prev links
      Object.keys(dirMap).forEach((dir) => {
        dirMap[dir] = mdData
          .filter(
            (f) => f.filepath.startsWith(dir.slice(1) + '/') && !f.filepath.endsWith('/index.md')
          )
          .sort(compareMDFDates);
        let len = dirMap[dir].length;
        for (let i = 0; i < len; i++) {
          dirMap[dir][i].next = dirMap[dir][i + 1] || dirMap[dir][0];
          dirMap[dir][i].prev = dirMap[dir][i - 1] || dirMap[dir][len - 1];
        }
      });

      // extract config from index.md
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

      data.config.navlinks?.forEach((navlink) => {
        if (navlink.submenu) {
          navlink.submenu.text ??= navlink.text;
          navlink.submenu.href ??= navlink.href;
          data.submenuMap[navlink.submenu.href] = navlink.submenu;
          for (let i = 0; i < navlink.submenu.links?.length ?? 0; i++) {
            let file = fileMap[(navlink.submenu.links[i].href?.slice(1) ?? '') + '.md'];
            if (file) {
              let nextlink = navlink.submenu.links[i + 1] || navlink.submenu.links[0];
              let nextfile = fileMap[(nextlink?.href?.slice(1) ?? '') + '.md'];
              if (nextfile) {
                file.next = nextfile;
                nextfile.prev = file;
              }
            }
          }
        }
      });

      // populate sidebarMap with next/prev links
      data.config.sidebars?.forEach((sidebar) => {
        data.sidebarMap[sidebar.href] = sidebar;
        for (let i = 0; i < sidebar.sections?.length ?? 0; i++) {
          for (let j = 0; j < sidebar.sections[i].links?.length ?? 0; j++) {
            let file = fileMap[(sidebar.sections[i].links[j].href?.slice(1) ?? '') + '.md'];
            if (file) {
              let nextlink =
                sidebar.sections[i].links[j + 1] ||
                sidebar.sections[i + 1]?.links?.[0] ||
                sidebar.sections[0]?.links?.[0];
              let nextfile = fileMap[(nextlink?.href?.slice(1) ?? '') + '.md'];
              if (nextfile) {
                file.next = nextfile;
                nextfile.prev = file;
              }
            }
          }
        }
      });

      data.config.usermenu ??= false;
      data.config.mobilemenu ??= true;
      data.config.shownext ??= true;

      data.fileMap = fileMap;
      data.dirMap = dirMap;
      data.status = `${new Date().toISOString()} loaded ${loadlist.length} files (${
        Date.now() - tstart
      } ms)`;
    }
  }
  // default navlinks
  if (!data.config.navlinks?.length) {
    data.config.navlinks = [
      {
        href: '/docs',
        text: 'Docs',
      },
    ];
  }

  let path = evt.params.path || '';
  let pathprefix = '/' + path.split('/')[0];

  let content = data.fileMap[path + '.md'] || data.fileMap[path ? path + '/index.md' : 'index.md'];
  let sidebar = data.sidebarMap[pathprefix];
  let dir = data.dirMap[pathprefix];

  let frontmatter = content?.frontmatter || {};

  let layout =
    layoutComponents[frontmatter.layout] ||
    (!path && layoutComponents['LandingPage']) ||
    (path === 'blog' && layoutComponents['Posts']) ||
    (Object.keys(data.dirMap).includes('/' + path) && layoutComponents['PageList']) ||
    ((dir || sidebar) && layoutComponents['Post']) ||
    (path === '_debug' && layoutComponents['Debug']) ||
    (path === '_icons' && layoutComponents['Icons']) ||
    layoutComponents['Default'];

  // content may be undefined if there is no md file - see [...path]/page.ts
  return { content, frontmatter, layout, sidebar, dir, config: data.config };
}

async function getMarkdown(filepath: string, evt: LoadEvent, prefix = '/files/') {
  let md = await loader(`${prefix}${filepath}`, 'markdown', evt, false);
  let data: MarkdownFile = { filepath, ...md };
  if (!data.error) {
    data.ast = parse(data.markdown);
    if (data.ast?.attributes?.frontmatter) {
      try {
        data.frontmatter = yaml.load(data.ast.attributes.frontmatter);
      } catch (err) {
        data.yamlError = '' + err;
        if (building) throw err;
      }
    } else {
      data.frontmatter = {};
    }

    data.byline = [data.frontmatter?.author ?? '', formatDate(data.frontmatter?.date)]
      .filter(Boolean)
      .join(' - ');
  }
  return data;
}
