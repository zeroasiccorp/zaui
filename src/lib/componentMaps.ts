// app components
import Nav from './components/Nav.svelte';
import Splash from './components/Splash.svelte';
import Prose from './components/Prose.svelte';
import Footer from './components/Footer.svelte';
import Hero from './components/Hero.svelte';
import Features from './components/Features.svelte';

// layout components
import Blog from './components/Blog.svelte';
import BlogPost from './components/BlogPost.svelte';
import Contact from './components/Contact.svelte';
import Debug from './components/Debug.svelte';
import Default from './components/Default.svelte';
import FeatureLinks from './components/FeatureLinks.svelte';
import Icons from './components/Icons.svelte';
import Job from './components/Job.svelte';
import Jobs from './components/Jobs.svelte';
import LandingPage from './components/LandingPage.svelte';
import Newsletter from './components/Newsletter.svelte';

// icons
import ArrowLeft from './components/icons/ArrowLeft.svelte';
import GitHub from './components/icons/GitHub.svelte';
import Home from './components/icons/Home.svelte';
import LinkedIn from './components/icons/LinkedIn.svelte';
import Menu from './components/icons/Menu.svelte';
import User from './components/icons/User.svelte';
import UserCheck from './components/icons/UserCheck.svelte';
import Users from './components/icons/Users.svelte';
import X from './components/icons/X.svelte';

import appConfig from '$appconfig/app.config';
let userAppComponents = appConfig.appComponents || {};
let userLayoutComponents = appConfig.layoutComponents || {};
let userIconComponents = appConfig.iconComponents || {};
let userMarkdownComponents = appConfig.markdownComponents || {};

export var appComponents: App.ComponentMap = {
  Nav,
  Splash,
  Prose,
  Footer,
  Hero,
  Features,
  ...userAppComponents,
};

export let layoutComponents: App.ComponentMap = {
  Blog,
  BlogPost,
  Contact,
  Debug,
  Default,
  FeatureLinks,
  Icons,
  Job,
  Jobs,
  LandingPage,
  Newsletter,
  ...userLayoutComponents,
};

// Keys in this map can be navlinks icon values in root frontmatter config
export let icons: App.ComponentMap = {
  ArrowLeft,
  GitHub,
  Home,
  LinkedIn,
  Menu,
  User,
  UserCheck,
  Users,
  X,
  ...userIconComponents
};

export let markdownComponents: App.ComponentMap = {
  ...userMarkdownComponents
};

// default page layout component when frontmatter.layout is not set
export function pathLayout(path: string) {
  if (!path) return LandingPage;
  if (path === 'blog') return Blog;
  if (path === 'jobs') return Jobs;
  if (path === '_debug') return Debug;
  if (path === '_icons') return Icons;

  if (path.startsWith('blog/')) return BlogPost;
  if (path.startsWith('jobs/')) return Job;

  return Default;
}
