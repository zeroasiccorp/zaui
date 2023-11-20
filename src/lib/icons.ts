// Map of icon names to Svelte components

import ArrowLeft from '$lib/components/icons/ArrowLeft.svelte';
import BookCopy from '$lib/components/icons/BookCopy.svelte';
import BrainCircuit from '$lib/components/icons/BrainCircuit.svelte';
import CircuitBoard from '$lib/components/icons/CircuitBoard.svelte';
import CloudCog from '$lib/components/icons/CloudCog.svelte';
import Cpu from '$lib/components/icons/Cpu.svelte';
import Factory from '$lib/components/icons/Factory.svelte';
import FileBox from '$lib/components/icons/FileBox.svelte';
import Files from '$lib/components/icons/Files.svelte';
import Folder from '$lib/components/icons/Folder.svelte';
import GitHub from '$lib/components/icons/GitHub.svelte';
import Grid from '$lib/components/icons/Grid.svelte';
import Home from '$lib/components/icons/Home.svelte';
import Inspect from '$lib/components/icons/Inspect.svelte';
import LayoutGrid from '$lib/components/icons/LayoutGrid.svelte';
import LinkedIn from '$lib/components/icons/LinkedIn.svelte';
import Menu from '$lib/components/icons/Menu.svelte';
import MonitorSmartphone from '$lib/components/icons/MonitorSmartphone.svelte';
import SendToBack from '$lib/components/icons/SendToBack.svelte';
import Sliders from '$lib/components/icons/Sliders.svelte';
import User from '$lib/components/icons/User.svelte';
import UserCheck from '$lib/components/icons/UserCheck.svelte';
import Users from '$lib/components/icons/Users.svelte';
import Workflow from '$lib/components/icons/Workflow.svelte';
import X from '$lib/components/icons/X.svelte';
import Zero from '$lib/components/icons/Zero.svelte';

import config from '$src/pub.config';
let userIconComponents = config?.iconComponents || {};

// Keys in this map can be navlinks icon values in root frontmatter config
export const icons: App.ComponentMap = {
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
