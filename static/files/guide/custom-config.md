# Custom configuration

The 'src' directory holds custom configuration and components as well as [static files](static-files).

`src/app.config.ts` (or .js) exports a config object with references to custom svelte components.

Here is an example from [jldec.me](https://github.com/jldec/jldec.me/blob/main/src/app.config.ts).

```ts
import Footer from './components/Footer.svelte';
import Neat from './components/Neat.svelte';
import Mono from './components/Mono.svelte';
import Twitter from './components/Twitter.svelte';

const config: App.AppConfig = {
  appComponents: {
    Footer
  },
  layoutComponents: {
    Neat,
    Mono
  },
  markdownComponents: {
  },
  iconComponents: {
    Twitter
  },
};

export default config;
```

_more details coming soon..._

