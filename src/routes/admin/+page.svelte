<script>
  import { user } from "$lib/stores/user.js";

  let email = "";
  let password = "";
</script>

<svelte:head>
  <title>Admin</title>
</svelte:head>

<div class="container text-center rounded-3" style="background-color: #272736;">
  <p class="h3 p-2" style="background-color: #bd4882;">Admin Panel</p>

  <form on:submit|preventDefault={() => {}}>
    <div class="mb-1 mt-3">
      <label for="email" class="form-label">Email:</label>
      <input
        type="email"
        class="form-control"
        placeholder="Enter email"
        id="email"
        name="email"
        bind:value={email}
      />
    </div>
    <div class="mb-3">
      <label for="pswd" class="form-label">Password:</label>
      <input
        type="password"
        class="form-control"
        placeholder="Enter password"
        id="pswd"
        name="pswd"
        bind:value={password}
      />
    </div>
    <div class="mb-2">
      <button
        type="button"
        class="btn btn-primary"
        on:click={() => user.login(email, password)}>Login</button
      >
    </div>
  </form>
</div>

<style>
  p {
    color: #ffffeb;
    font-family: Verdana, sans-serif;
  }
</style>
