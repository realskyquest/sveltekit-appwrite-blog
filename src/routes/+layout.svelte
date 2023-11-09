<script>
  import { user } from "$lib/stores/user.js";
  import { posts } from "$lib/stores/posts.js";
  import { onMount } from "svelte";

  onMount(async () => {
    user.init();
    posts.init();
  });
</script>

<header class="p-4 text-white text-center" style="background-color: #e36956;">
  <h1>SVELTEKIT-APPWRITE-BLOG</h1>
</header>

<nav class="navbar navbar-expand-sm bg-light justify-content-center">
  <ul class="navbar-nav">
    {#if $user}
      <li>
        <span>Welcome blogger</span>
        <button class="btn btn-danger" type="button" on:click={user.logout}
          >Logout</button
        >
      </li>
    {/if}
  </ul>
</nav>

<main>
  <slot />
</main>

<footer class="p-5 text-white text-center" style="background-color: #272736;">
  <p class="h6">By realskyquest</p>
</footer>

<style>
  h1 {
    font-family: Arial, sans-serif;
  }
  p {
    color: #ffffeb;
    font-family: Verdana, sans-serif;
  }
</style>
