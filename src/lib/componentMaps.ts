// Map layout component names to Svelte components
import Blog from './components/Blog.svelte';
import BlogPost from './components/BlogPost.svelte';
import Careers from './components/Careers.svelte';
import Contact from './components/Contact.svelte';
import Debug from './components/Debug.svelte';
import Default from './components/Default.svelte';
import Doc from './components/Doc.svelte';
import Docs from './components/Docs.svelte';
import Job from './components/Job.svelte';
import Newsletter from './components/Newsletter.svelte';

// Map icon names to Svelte components
import ArrowLeft from './components/icons/ArrowLeft.svelte';
import BookCopy from './components/icons/BookCopy.svelte';
import BrainCircuit from './components/icons/BrainCircuit.svelte';
import CircuitBoard from './components/icons/CircuitBoard.svelte';
import CloudCog from './components/icons/CloudCog.svelte';
import Cpu from './components/icons/Cpu.svelte';
import Factory from './components/icons/Factory.svelte';
import FileBox from './components/icons/FileBox.svelte';
import Files from './components/icons/Files.svelte';
import Folder from './components/icons/Folder.svelte';
import GitHub from './components/icons/GitHub.svelte';
import Grid from './components/icons/Grid.svelte';
import Home from './components/icons/Home.svelte';
import Inspect from './components/icons/Inspect.svelte';
import LayoutGrid from './components/icons/LayoutGrid.svelte';
import LinkedIn from './components/icons/LinkedIn.svelte';
import Menu from './components/icons/Menu.svelte';
import MonitorSmartphone from './components/icons/MonitorSmartphone.svelte';
import SendToBack from './components/icons/SendToBack.svelte';
import Sliders from './components/icons/Sliders.svelte';
import User from './components/icons/User.svelte';
import UserCheck from './components/icons/UserCheck.svelte';
import Users from './components/icons/Users.svelte';
import Workflow from './components/icons/Workflow.svelte';
import X from './components/icons/X.svelte';
import Zero from './components/icons/Zero.svelte';

import appConfig from '$appconfig/app.config';
let userLayoutComponents = appConfig.layoutComponents || {};
let userIconComponents = appConfig.iconComponents || {};
let userMarkdownComponents = appConfig.markdownComponents || {};

export let layoutComponents: App.ComponentMap = {
  Blog,
  BlogPost,
  Careers,
  Contact,
  Debug,
  Default,
  Doc,
  Docs,
  Job,
  Newsletter,
  ...userLayoutComponents,
};

// Keys in this map can be navlinks icon values in root frontmatter config
export let icons: App.ComponentMap = {
  ArrowLeft,
  BookCopy,
  BrainCircuit,
  CircuitBoard,
  CloudCog,
  Cpu,
  Factory,
  FileBox,
  Files,
  Folder,
  GitHub,
  Grid,
  Home,
  Inspect,
  LayoutGrid,
  LinkedIn,
  Menu,
  MonitorSmartphone,
  SendToBack,
  Sliders,
  User,
  UserCheck,
  Users,
  Workflow,
  X,
  Zero,
  ...userIconComponents
};

export let markdownComponents: App.ComponentMap = {
  ...userMarkdownComponents
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
