import { writable } from "svelte/store";
import { ID, Query } from "appwrite";
import { databases } from "$lib/appwrite.js";

export const DATABASE_ID = "654ca6551a7fb6e9bead";
export const COLLECTION_ID = "654ca66a4b6322672b80";

const store = writable([]);

async function init() {
  const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
    Query.orderDesc("$createdAt"),
  ]);
  store.set(response.documents);
}

async function add(title, description, content) {
  const response = await databases.createDocument(
    DATABASE_ID,
    COLLECTION_ID,
    ID.unique(),
    {
      title,
      description,
      content,
      createdAt: new Date().toISOString(),
    }
  );
  store.update((posts) => [response, ...posts]);
}

async function remove(id) {
  await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
  store.update((posts) => posts.filter((post) => post.$id !== id));
}

export const posts = {
  subscribe: store.subscribe, // Expose the store's value with $notes
  init,
  add,
  remove,
};
