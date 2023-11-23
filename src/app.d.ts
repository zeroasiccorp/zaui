// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface Platform {}
    type ComponentMap = { [key: string]: SvelteComponent };

    interface AppConfig {
      layoutComponents?: ComponentMap;
      iconComponents?: ComponentMap;
      auth?: {
        // only LinkedIn supported for now
        // see LoginDialog.svelte
        clientID: string;
        endpoint: string;
      };
    }

    // Clickable entries in the user menu
    type Action = {
      text: string;
      action: () => void;
      disabled: boolean
    };

    type AppContext = {
      menuActions?: Action[];
      log?: (msg: string) => void;
      error?: (msg: string) => void;
      login?: () => void;
      loginWithLinkedIn?: () => void;
      logout?: () => void;
    };
  }
}

export type ComponentMap = App.ComponentMap;
export interface AppConfig extends App.AppConfig {}
export interface AppContext extends App.AppContext {}