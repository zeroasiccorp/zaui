<script>
  const NOTIME = '--:--:--';
  let time = NOTIME;
  let error = '';

  async function callApi() {
    try {
      let res = await fetch('http://localhost:7777/api/time');
      time = await res.json();
      error = '';
    } catch (e) {
      time = NOTIME;
      error += e;
    }
  }
</script>

<button
  on:click={callApi}
  class="rounded-md bg-green-700 hover:bg-green-600 px-3 py-2 font-semibold text-white"
  >Call /api/time</button
>
<div class="text-4xl text-center font-mono">{time}</div>
<div class="bg-red-100">{error}<slot /></div>
