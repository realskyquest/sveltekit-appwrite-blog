<script>
  import { base } from "$app/paths";
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";
  import { view } from "$lib/stores/view.js";
  import { onMount, afterUpdate } from "svelte";

  onMount(async () => {
    view.init();
  });

  afterUpdate(() => {
    if ($view.title == undefined) {
      if (browser) {
        goto(`${base}/`);
      }
    } else {
      localStorage.setItem(
        "sveltekit-appwrite-blog-post",
        JSON.stringify($view)
      );
    }
  });

  function convertToIdFormat(str) {
    if (str === undefined) {
      console.log("Input is undefined");
      return;
    }
    return str.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  }

  function convertDateFormat(dateString) {
    let date = new Date(dateString);
    let day = date.getUTCDate();
    let month = date.getUTCMonth() + 1;
    let year = date.getUTCFullYear();

    day = day < 10 ? "0" + day : day;
    month = month < 10 ? "0" + month : month;

    return `${day}/${month}/${year}`;
  }
</script>

<svelte:head>
  <title>{$view.title}</title>
</svelte:head>

<div class="container text-center rounded-3" style="background-color: #272736;">
  <div class="mt-5 text-secondary" style="background-color: #fffffb;">
    <p
      id={convertToIdFormat($view.title)}
      class="h3 p-2 text-white"
      style="background-color: #bd4882;"
    >
      {$view.title}
    </p>
    <p class="text-dark">
      {convertDateFormat($view.createdAt)}
    </p>
    <p>
      {$view.content}
    </p>
  </div>
  <hr />
</div>

<div class="mb-3 text-center">
  <button
    class="btn btn-lg btn-primary"
    on:click={() => {
      localStorage.removeItem("sveltekit-appwrite-blog-post");
      if (browser) {
        goto(`${base}/`);
      }
    }}
  >
    Return
  </button>
</div>

<style>
  p {
    font-family: Verdana, sans-serif;
  }
</style>
