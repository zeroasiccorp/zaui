// app components
import Nav from './components/Nav.svelte';
import Splash from './components/Splash.svelte';
import Prose from './components/Prose.svelte';
import Footer from './components/Footer.svelte';
import Hero from './components/Hero.svelte';
import Features from './components/Features.svelte';

// layout components
import Contact from './components/Contact.svelte';
import Debug from './components/Debug.svelte';
import Default from './components/Default.svelte';
import FeatureLinks from './components/FeatureLinks.svelte';
import Icons from './components/Icons.svelte';
import LandingPage from './components/LandingPage.svelte';
import Newsletter from './components/Newsletter.svelte';
import PageList from './components/PageList.svelte';
import Post from './components/Post.svelte';
import Posts from './components/Posts.svelte';

// icons
import AlertCircle from './components/icons/Info.svelte';
import AlertOctagon from './components/icons/AlertOctagon.svelte';
import AlertTriangle from './components/icons/AlertTriangle.svelte';
import ArrowLeft from './components/icons/ArrowLeft.svelte';
import GitHub from './components/icons/GitHub.svelte';
import Home from './components/icons/Home.svelte';
import Info from './components/icons/Info.svelte';
import Lightbulb from './components/icons/Lightbulb.svelte';
import LinkedIn from './components/icons/LinkedIn.svelte';
import Menu from './components/icons/Menu.svelte';
import MessageSquareWarning from './components/icons/MessageSquareWarning.svelte';
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
  Contact,
  Debug,
  Default,
  FeatureLinks,
  Icons,
  LandingPage,
  Newsletter,
  PageList,
  Post,
  Posts,
  ...userLayoutComponents,
};

// Keys in this map can be navlinks icon values in root frontmatter config
export let icons: App.ComponentMap = {
  AlertCircle,
  AlertOctagon,
  AlertTriangle,
  ArrowLeft,
  GitHub,
  Home,
  Info,
  Lightbulb,
  LinkedIn,
  Menu,
  MessageSquareWarning,
  User,
  UserCheck,
  Users,
  X,
  ...userIconComponents
};

export let markdownComponents: App.ComponentMap = {
  ...userMarkdownComponents
};

