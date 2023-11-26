<script lang="ts">
  import type { MarkdownFile } from '$lib/stores/model';
  import Markdoc from '$lib/components/Markdoc.svelte';
  import { session } from '$lib/stores/session';

  import appConfig from '$appconfig/app.config';
  const authEndpoint = appConfig.endpoints?.auth ?? '';

  export let content: MarkdownFile;
  const formData = {
    name: '',
    company: '',
    email: '',
    notes: '',
  };
  let formResponse = '';

  async function contactSubmit() {
    let jwt = $session?.jwt;
    if (!jwt) {
      formResponse = 'Error, not connected.';
      return;
    }
    formResponse = '';
    try {
      let resp = await fetch(authEndpoint + '/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-za-session': jwt,
          'x-za-page': '/contact',
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

<form class="" action="" on:submit|preventDefault={contactSubmit}>
  <div
    class="max-w-3xl mx-auto flex flex-col rounded-2xl p-4 sm:p-8 shadow-md bg-slate-100 dark:bg-slate-700 dark:border-slate-500"
  >
    <Markdoc {content} />
    <label for="contact_name" class="mb-1">Name</label>
    <input
      id="contact_name"
      bind:value={formData.name}
      name="name"
      maxlength="100"
      class="p-2 rounded border border-slate-300 dark:text-slate-800"
    />

    <label for="contact_company" class="mt-4 mb-1">Company</label>
    <input
      id="contact_company"
      bind:value={formData.company}
      name="company"
      maxlength="100"
      class="p-2 rounded border border-slate-300 dark:text-slate-800"
    />

    <label for="contact_email" class="mt-4 mb-1">Email</label>
    <input
      id="contact_email"
      bind:value={formData.email}
      name="email"
      type="email"
      class="p-2 rounded border border-slate-300 dark:text-slate-800"
    />

    <label for="contact_notes" class="mt-4 mb-1">Notes</label>
    <textarea
      id="contact_notes"
      bind:value={formData.notes}
      name="notes"
      maxlength="1000"
      class="h-32 rounded border border-slate-300 py-2 px-3 dark:text-slate-800"
      placeholder="Please enter additional comments here."
    />

    <input
      class="max-w-fit py-2 px-8 mt-4 bg-sky-600 hover:bg-sky-500 shadow-md text-white font-semibold rounded"
      type="submit"
      name="submit"
      value="Submit"
    />
    <div class="mt-2">
      {formResponse}<br />
      <a href="/">Back</a>
    </div>
  </div>
</form>
