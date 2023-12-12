# Custom configuration

The `src` directory holds custom configuration and components as well as [static files](static-files).

See [jldec.me](https://github.com/jldec/jldec.me/blob/main/src) for an example of a site with a custom components.

## Custom Svelte Components
Custom components can replace any of the following component types.

1. **appComponents**  
  Built-in app components are sections, common to all pages, or used in the landing page.
  - `Splash`
  - `Prose`
  - `Footer`
  - `Hero`
  - `Features`

2. **layoutComponents**  
  Layout components are referenced by name using the `layout` property in a markdown page. You can replace the following existing layouts, or add your own:
  - `LandingPage`
  - `Blog`
  - `BlogPost`
  - `Job`
  - `Jobs`
  - `Contact`
  - `Newsletter`
  - `Team`

3. **markdownComponents**  
  Markdown components can be used from within markdown content. Detais coming soon.

4. **iconComponents**  
  Icon components are Svelte components which render svg. You can extend or replace these.
  - `ArrowLeft`
  - `GitHub`
  - `Home`
  - `LinkedIn`
  - `Menu`
  - `User`
  - `UserCheck`
  - `Users`
  - `X`  


## app.config

To register your custom components with zaui, create `src/app.config.ts` (or .js) which imports your custom components, and exports them in an `AppConfig`.

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
