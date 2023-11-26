// Map layout component names to Svelte components
import Blog from './Blog.svelte';
import BlogPost from './BlogPost.svelte';
import Careers from './Careers.svelte';
import Contact from './Contact.svelte';
import Debug from './Debug.svelte';
import Default from './Default.svelte';
import Doc from './Doc.svelte';
import Docs from './Docs.svelte';
import Job from './Job.svelte';
import Newsletter from './Newsletter.svelte';

// Map icon names to Svelte components
import ArrowLeft from './icons/ArrowLeft.svelte';
import BookCopy from './icons/BookCopy.svelte';
import BrainCircuit from './icons/BrainCircuit.svelte';
import CircuitBoard from './icons/CircuitBoard.svelte';
import CloudCog from './icons/CloudCog.svelte';
import Cpu from './icons/Cpu.svelte';
import Factory from './icons/Factory.svelte';
import FileBox from './icons/FileBox.svelte';
import Files from './icons/Files.svelte';
import Folder from './icons/Folder.svelte';
import GitHub from './icons/GitHub.svelte';
import Grid from './icons/Grid.svelte';
import Home from './icons/Home.svelte';
import Inspect from './icons/Inspect.svelte';
import LayoutGrid from './icons/LayoutGrid.svelte';
import LinkedIn from './icons/LinkedIn.svelte';
import Menu from './icons/Menu.svelte';
import MonitorSmartphone from './icons/MonitorSmartphone.svelte';
import SendToBack from './icons/SendToBack.svelte';
import Sliders from './icons/Sliders.svelte';
import User from './icons/User.svelte';
import UserCheck from './icons/UserCheck.svelte';
import Users from './icons/Users.svelte';
import Workflow from './icons/Workflow.svelte';
import X from './icons/X.svelte';
import Zero from './icons/Zero.svelte';

import appConfig from '$appconfig/app.config';
let userLayoutComponents = appConfig.layoutComponents || {};
let userIconComponents = appConfig.iconComponents || {};

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
