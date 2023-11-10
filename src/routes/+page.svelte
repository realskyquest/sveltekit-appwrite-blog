<script>
  import { base } from "$app/paths";
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";
  import { user } from "$lib/stores/user.js";
  import { view } from "$lib/stores/view.js";
  import { posts } from "$lib/stores/posts.js";
  import { onMount } from "svelte";

  let title = "";
  let description = "";
  let content = "";

  onMount(async () => {
    posts.init();
  });

  function convertDateFormat(dateString) {
    let date = new Date(dateString);
    let day = date.getUTCDate();
    let month = date.getUTCMonth() + 1;
    let year = date.getUTCFullYear();

    day = day < 10 ? "0" + day : day;
    month = month < 10 ? "0" + month : month;

    return `${day}/${month}/${year}`;
  }

  function convertToIdFormat(str) {
    if (str === undefined) {
      console.log("Input is undefined");
      return;
    }
    return str.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  }
</script>

<svelte:head>
  <title>Blog</title>
</svelte:head>

{#if $user}
  <div
    class="container text-center rounded-3"
    style="background-color: #272736;"
  >
    <p class="h3 p-2 text-white" style="background-color: #bd4882;">New post</p>

    <form on:submit|preventDefault={() => {}}>
      <div>
        <label for="title" class="form-label">Title</label>
        <input
          type="text"
          class="form-control"
          placeholder="Enter title, size limit = 500"
          id="title"
          name="title"
          bind:value={title}
        />
      </div>
      <div>
        <label for="description">Description</label>
        <textarea
          class="form-control"
          placeholder="Enter description, size limit = 1000"
          rows="2"
          id="description"
          name="description"
          bind:value={description}
        />
      </div>
      <div>
        <label for="content">Content</label>
        <textarea
          class="form-control"
          placeholder="Enter content, size limit = 10,000"
          rows="4"
          id="content"
          name="content"
          bind:value={content}
        />
      </div>
      <div class="mb-2">
        <button
          class="btn btn-primary mt-2 mb-2"
          type="button"
          on:click={async () => {
            if (
              title.length > 0 &&
              description.length > 0 &&
              content.length > 0
            ) {
              posts.add(title, description, content);
              title = "";
              description = "";
              content = "";
            }
          }}>Submit</button
        >
      </div>
    </form>
  </div>
{/if}

<div class="container text-center rounded-3" style="background-color: #272736;">
  <div
    class="container text-center rounded-3"
    style="background-color: #272736;"
  >
    <p class="h3 p-2 text-white" style="background-color: #bd4882;">
      Latest Posts
    </p>
    <ul>
      {#each $posts as post}
        <li class="mt-1 mb-1" style="background-color: #ffffeb;">
          <button
            class="btn btn-primary"
            on:click={() => {
              view.set(post);
              if (browser) {
                goto(`${base}/post/#${convertToIdFormat(post.title)}`);
              }
            }}
          >
            {post.title}
          </button>
          {#if $user}
            <button
              class="btn btn-danger"
              type="button"
              on:click={() => posts.remove(post.$id)}
            >
              Remove
            </button>
          {/if}
          <div>
            <p class="text-dark">{convertDateFormat(post.createdAt)}</p>
            <p class="text-secondary">{post.description}</p>
          </div>
        </li>
      {/each}
    </ul>
    <hr />
  </div>
</div>

<style>
  p,
  button {
    font-family: Verdana, sans-serif;
  }
  label {
    color: #ffffeb;
    font-family: Verdana, sans-serif;
  }
</style>
