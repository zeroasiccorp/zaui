import { writable } from 'svelte/store';
import type { LoadData } from '$lib/loader';
import type { Node } from '@markdoc/markdoc';

export interface MarkdownFile extends LoadData {
  filepath: string;
  frontmatter?: any;
  yamlError?: string;
  ast?: Node;
  byline?: string;
}

export interface Navlink {
  href: string;
  text: string;
  icon?: string;
  image?: string;
  markdown?: string;
  previewOnly?: boolean;
  darkShip?: boolean;
  submenu?: Submenu;
}

// 2nd row under main menu, no sections
// top-level href used for URL path prefix matching to show/hide submenu
export interface Submenu extends Navlink {
  links: Array<Navlink>;
}

export interface SidebarSection {
  text: string;
  links: Array<Navlink>;
  collapsed?: boolean;
}

// vertical sidebar with sections
// top-level href used for URL path prefix matching to show/hide sidebar
export interface Sidebar extends Navlink {
  sections: Array<SidebarSection>;
}

export interface Config {
  appurl?: string;
  theme?: string;
  preview?: boolean;
  navlinks?: Array<Navlink>; // main menu
  docslinks?: Array<Navlink>; // /docs sidebar
  actionlinks?: Array<Navlink>; // contact sales, etc.
  sidebars?: Array<Sidebar>;
  features?: Array<Navlink>;
  usermenu?: boolean;
  layout?: string;
  title?: string;
  sidebar?: boolean;
  splash?: {
    image: string;
    title?: string;
    subtitle?: string;
  };
  icon?: {
    image?: string;
    imageclass?: string;
    text: string;
    imageonly?: boolean;
  };
  footer?: {
    text: string;
  };
  login?: {
    intro: string;
    terms: string;
  }
}

export type MarkdownFiles = {
  config: Config;
  files: Array<string>;
  fileMap: { [key: string]: MarkdownFile };
  submenuMap: { [key: string]: Submenu };
  sidebarMap: { [key: string]: Sidebar };
  status: string;
  appConfig: App.AppConfig;
};

export const model = writable<MarkdownFiles>();

// return very large date value for non-dates for sorting
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
function dateNum(date: any) {
  return (date ?? {}) instanceof Date ? date.valueOf() : 8e15;
}

// intended for MarkdownFile[].sort(compareMDFDates)
export function compareMDFDates(a: MarkdownFile, b: MarkdownFile) {
  return dateNum(b.frontmatter?.date) - dateNum(a.frontmatter?.date);
}
