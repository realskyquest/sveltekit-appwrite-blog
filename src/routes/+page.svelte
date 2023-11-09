<script>
  import { user } from "$lib/stores/user.js";
  import { posts } from "$lib/stores/posts.js";

  let title = "";
  let content = "";

  function convertToIdFormat(str) {
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
        <label for="title" class="form-label">Title:</label>
        <input
          type="text"
          class="form-control"
          placeholder="Enter title"
          id="title"
          name="title"
          bind:value={title}
        />
      </div>
      <div>
        <label for="description">Description:</label>
        <textarea
          class="form-control"
          rows="2"
          id="description"
          name="description"
          bind:value={content}
        />
      </div>
      <div class="mb-2">
        <button
          class="btn btn-primary mt-2 mb-2"
          type="button"
          on:click={async () => {
            if (title.length > 0 && content.length > 0) {
              posts.add(title, content);
              title = "";
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
            data-bs-toggle="collapse"
            data-bs-target="#{convertToIdFormat(post.title)}"
            >{post.title}</button
          >
          {#if $user}
            <button
              class="btn btn-danger"
              type="button"
              on:click={() => posts.remove(post.$id)}>Remove</button
            >
          {/if}
          <div id={convertToIdFormat(post.title)} class="collapse">
            <p class="text-secondary">{post.content}</p>
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
</style>
