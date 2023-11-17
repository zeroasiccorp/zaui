// Returns a map of md files at /api/mdfiles.json
// The static adapter will prerender (this with some complaining)
// This allows static builds to be hosted without a zaui server
export const prerender = true;
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({fetch}) => {
  let res = await fetch('http://127.0.0.1:7777/api/mdfiles.json');
  return json(await res.json());
}