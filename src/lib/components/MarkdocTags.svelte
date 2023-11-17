<script lang="ts">
  // Recursive svelte component renderer in lieu of markdoc.renderer
  // This allows mixing custom/svelte components with html elements.
  // https://github.com/markdoc/markdoc/blob/main/src/renderers/html.ts
  // https://svelte.dev/repl/39fdc4d5e7af4c9ea0712aef6204ebba
  // https://github.com/movingbrands/svelte-portable-text

  import type { RenderableTreeNode } from '@markdoc/markdoc';

  import pkg from '@markdoc/markdoc';
  const { Tag } = pkg;

  export let tags: RenderableTreeNode | RenderableTreeNode[];

  type ComponentMap = { [key: string]: ConstructorOfATypedSvelteComponent };
  export let components: ComponentMap;

  // https://html.spec.whatwg.org/#void-elements
  // prettier-ignore
  const voidElements = [
  'area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr'
  ]
</script>

{#if Array.isArray(tags)}
  {#each tags as tag}
    <svelte:self tags={tag} {components} />
  {/each}
{:else if typeof tags === 'string' || typeof tags === 'number' || typeof tags === 'boolean'}
  {tags}
{:else if Tag.isTag(tags)}
  {#if tags.name in components}
    {#if tags.children.length}
      <svelte:component this={components[tags.name]} {...tags.attributes}>
        <svelte:self tags={tags.children} {components} />
      </svelte:component>
    {:else}
      <svelte:component this={components[tags.name]} {...tags.attributes} />
    {/if}
  {:else if tags.children.length && !voidElements.includes(tags.name)}
    <svelte:element this={tags.name} {...tags.attributes}>
      <svelte:self tags={tags.children} {components} />
    </svelte:element>
  {:else}
    <svelte:element this={tags.name} {...tags.attributes} />
  {/if}
{/if}
