export async function load() {

  let YoModule1 = (await import('./Yo.svelte')).default;
  let YoModule2 = (await import('/Users/jldec/zeroasic/cst-file/src/Yo.svelte')).default;

  let layoutComponents = {
    'YoModule1': YoModule1,
    'YoModule2': YoModule2,
  };

  return {
		layoutComponents
	};

}