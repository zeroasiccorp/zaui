<script lang="ts">
  import type { MarkdownFile } from '$lib/stores/model';
  import Markdoc from '$lib/components/Markdoc.svelte';
  import { session } from '$lib/stores/session';

  import appConfig from '$appconfig/app.config';
  const authEndpoint = appConfig.endpoints?.auth ?? '';

  export let content: MarkdownFile;
  const formData = {
    email: '',
  };
  let formResponse = '';

  async function newsletterSubmit() {
    let jwt = $session?.jwt;
    if (!jwt) {
      formResponse = 'Error, not connected.';
      return;
    }
    formResponse = '';
    try {
      let resp = await fetch(authEndpoint + '/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-za-session': jwt,
          'x-za-page': '/newsletter',
        },
        body: JSON.stringify(formData),
      });
      if (!resp.ok) {
        throw new Error(`${resp.status}`);
      }
    } catch (e) {
      formResponse = '' + e;
      return;
    }
    formResponse = 'Thank you for your interest. We will be in touch soon.';
  }
</script>

<form class="" action="" on:submit|preventDefault={newsletterSubmit}>
  <div
    class="max-w-3xl mx-auto flex flex-col rounded-2xl p-4 sm:p-8 shadow-md bg-slate-100 dark:bg-slate-700 dark:border-slate-500"
  >
    <Markdoc {content} />

    <label for="newsletter_email" class="mb-1">Email</label>
    <input
      id="newsletter_email"
      name="email"
      type="email"
      bind:value={formData.email}
      required
      class="p-2 rounded border border-slate-300 dark:text-slate-800"
    />

    <input
      class="max-w-fit py-2 px-8 mt-4 bg-sky-600 hover:bg-sky-500 shadow-md text-white font-semibold rounded"
      type="submit"
      name="submit"
      value="Subscribe"
    />
    <div class="mt-2">
      {formResponse}<br />
      <a href="/">Back</a>
    </div>
  </div>
</form>
