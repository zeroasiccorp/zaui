import * as env from '$app/environment';

const API_SERVER = env.dev ? `http://127.0.0.1:7777` : '';

export function fileServer(path: string = '') {
  return apiServer('/files' + path);
}

export function apiServer(path: string = '') {
  return API_SERVER + path;
}
