// fallback app.config for when user project does not have a srcDir/app.config.{js,ts}
// See type definition in app.d.ts and alias logic in svelte.config.js

import { PUBLIC_LINKEDIN_CLIENT_ID } from '$env/static/public';
import { PUBLIC_AUTH_SERVER } from '$env/static/public';

let appConfig: App.AppConfig = {};

if (PUBLIC_LINKEDIN_CLIENT_ID) {
  appConfig.auth = {
    linkedIn: {
      clientID: PUBLIC_LINKEDIN_CLIENT_ID,
    }
  };
  appConfig.endpoints = {
    auth: PUBLIC_AUTH_SERVER || 'http://localhost:8787',
  };
}

export default appConfig;
