// Returns a map of md files at /api/mdfiles.json
// The static adapter will prerender (this with some complaining)
// This allows static builds to be hosted without a zaui server
export const prerender = true;
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import fg from 'fast-glob';

export const GET: RequestHandler = async ({fetch}) => {
  // TODO - If there is a local content server, fetch from that
  // let res = await fetch('http://127.0.0.1:7777/api/mdfiles.json');
  // return json(await res.json());

  let prefix = process.env.PUB_CONTENT_DIR ?? './static/files';
  let globPath = prefix + '/**/*.md';
  // https://github.com/mrmlnc/fast-glob#readme
  let files = (await fg.glob(globPath)).map((file) => file.slice(prefix.length+1))
  // console.log('+server.ts /api/mdfiles.json', globPath);
  // console.log('markdown files', files);
  return json(files);
}