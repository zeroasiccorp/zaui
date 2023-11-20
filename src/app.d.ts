// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
		type ComponentMap = { [key: string]: SvelteComponent };
		interface Config {
			layoutComponents?: ComponentMap;
			iconComponents?: ComponentMap;
		}
	}
}

export type ComponentMap = App.ComponentMap;
export interface Config extends App.Config {};