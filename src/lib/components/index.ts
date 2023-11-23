
import Blog from '$lib/components/Blog.svelte';
import BlogPost from '$lib/components/BlogPost.svelte';
import Careers from '$lib/components/Careers.svelte';
import Job from '$lib/components/Job.svelte';
import Docs from '$lib/components/Docs.svelte';
import Doc from '$lib/components/Doc.svelte';
import Default from '$lib/components/Default.svelte';
import Debug from '$lib/components/Debug.svelte';

import appConfig from '$src/pub.config';
let userLayoutComponents = appConfig?.layoutComponents || {};

export let layoutComponents: App.ComponentMap = {
  Debug,
  Default,
  Blog,
  BlogPost,
  Careers,
  Job,
  Docs,
  Doc,
  ...userLayoutComponents,
};

// default page layout component when frontmatter.layout is not set
export function pathLayout(path: string) {
  if (path === 'blog') return Blog;
  if (path === 'careers') return Careers;
  if (path === 'docs') return Docs;
  if (path === 'debug') return Debug;

  if (path.startsWith('blog/')) return BlogPost;
  if (path.startsWith('careers/')) return Job;
  if (path.startsWith('docs/')) return Doc;

  return Default;
}
