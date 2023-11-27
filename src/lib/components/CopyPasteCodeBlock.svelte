<script lang="ts">
  export let language = '';

  let content: HTMLElement;
  let copyText = '(copy)';
  function copy() {
    navigator.clipboard.writeText(content?.textContent ?? '').then(() => {
      copyText = 'copied';
      setTimeout(() => {copyText = '(copy)'}, 500);
    });
  }
</script>

<div class="hidden" bind:this={content}><slot /></div>

<pre><code class="pre language-{language}">$ <slot /></code><button on:click={copy} class="float-right">{copyText}</button></pre>
