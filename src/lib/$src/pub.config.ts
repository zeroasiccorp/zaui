// Fallback config for when user project does not have a srcDir/pub.config.{js,ts}
// See svelte.config.js

import { PUBLIC_LINKEDIN_CLIENT_ID } from '$env/static/public';
import { PUBLIC_AUTH_SERVER } from '$env/static/public';

let appConfig: App.AppConfig = {
  layoutComponents: {},
  iconComponents: {},
};

if (PUBLIC_LINKEDIN_CLIENT_ID) {
  appConfig.auth = {
    clientID: PUBLIC_LINKEDIN_CLIENT_ID,
    endpoint: PUBLIC_AUTH_SERVER || 'http://localhost:8787',
  };
}

export default appConfig;
