export async function load() {

  let YoModule1 = (await import('./Yo.svelte')).default;

  // @ts-ignore
  let userLayoutComponents = (await import('$src/pub.config'))?.layoutComponents ?? {};

  let layoutComponents = {
    ...userLayoutComponents,
    YoModule1
  };

  return {
		layoutComponents
	};

}