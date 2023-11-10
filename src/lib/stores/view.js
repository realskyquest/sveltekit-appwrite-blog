import { writable } from "svelte/store";

const store = writable([]);

async function init() {
  if (localStorage.getItem("sveltekit-appwrite-blog-post")) {
    store.set(JSON.parse(localStorage.getItem("sveltekit-appwrite-blog-post")));
  }
}

async function set(post) {
  store.set(post);
}

export const view = {
  subscribe: store.subscribe, // Expose the store's value with $post
  init,
  set,
};
