<script lang="ts">
  import { fixlink } from '$lib/fixlink';
  import type { MarkdownFile } from '$lib/stores/model';

  type Team = {
    name: string;
    url: string;
    image: string;
  }[];

  export let content: MarkdownFile;
  let team: Team = content?.frontmatter?.team || [];
</script>

<h1 class="text-center py-6">The Team</h1>
<div class="flex flex-wrap gap-28 justify-center text-center">
  {#each team as p}
    <a href={p.url} class="text-xl">
      <img
        src={fixlink(`images/team/${p.image}`)}
        alt={p.name}
        class="w-[200px] h-[200px] m-0 object-cover rounded-full"
        width="200"
        height="200"
      />
      {p.name}
    </a>
  {/each}
</div>
