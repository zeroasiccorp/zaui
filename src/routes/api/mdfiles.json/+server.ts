// Returns a map of md files at /api/mdfiles.json
// The static adapter will prerender (this with some complaining)
// This allows static builds to be hosted without a zaui server
export const prerender = true;
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import fg from 'fast-glob';

import path from 'node:path';
import fs from 'node:fs';

let cwd = process.cwd();

export const GET: RequestHandler = async ({ fetch }) => {
  // TODO - If there is a local content server, fetch from that
  // let res = await fetch('http://127.0.0.1:7777/api/mdfiles.json');
  // return json(await res.json());

  let files: string[] = [];
  let prefix = process.env.ZAUI_CONTENT_DIR ?? path.join(cwd, 'static/files');
  if (!fs.existsSync(prefix)) {
    console.log(`Content directory: '${prefix}' does not exist.`);
  } else {
    // https://github.com/mrmlnc/fast-glob#readme
    let globPath = path.join(prefix, '/**/*.md');
    files = (await fg.glob(globPath)).map((file) => file.slice(prefix.length + 1));
    // console.log('api/mdfiles.json globPath', globPath);
    // console.log('markdown files', files);
  }
  return json(files);
};
