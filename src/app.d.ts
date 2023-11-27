// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { ComponentType, SvelteComponent } from "svelte";

declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface Platform {}

    type ComponentMap = { [key: string]: ComponentType<SvelteComponent> };

    interface AppConfig {
      appComponents?: ComponentMap;
      iconComponents?: ComponentMap;
      layoutComponents?: ComponentMap;
      markdownComponents?: ComponentMap;
      endpoints?: {
        auth?: string;
      };
      auth?: {
        // only LinkedIn supported for now
        // see LoginDialog.svelte
        linkedIn?: {
          clientID: string;
        };
      };
    }

    // Clickable entries in the user menu
    interface MenuAction {
      text: string;
      action: () => void;
      disabled: boolean;
    }

    interface AppContext {
      menuActions?: MenuAction[];
      log?: (msg: string) => void;
      error?: (msg: string) => void;
      login?: () => void;
      loginWithLinkedIn?: () => void;
      logout?: () => void;
    }
  }
}

// https://www.typescriptlang.org/docs/handbook/declaration-files/templates/global-modifying-module-d-ts.html
export {};