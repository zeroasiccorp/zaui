  // leading edge debounce, runs and then blocks for ms
  // reruns after timeout if called during block to avoid lost transitions
  // effect feels instant, but may flicker if final state looks like start state
  export function debounceL(fn: Function, ms = 100) {
    let block = false;
    let blocked = false

    return function (...args: any[]) {
      if (block) return (blocked = true);
      fn(...args);
      block = true;
      setTimeout(() => {
        block = false;
        if (blocked) {
          blocked = false;
          fn(...args);
        }
      }, ms);
    };
  }

  // traiing edge debounce, runs after ms of no calls
  // makes effect feel a bit sluggish, but avoids flicker
  export function debounceT(fn: Function, ms = 100) {
    let timeout: ReturnType<typeof setTimeout>;

    return function (...args: any[]) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        fn(...args);
      }, ms);
    };
  }
