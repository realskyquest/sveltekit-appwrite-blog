import { base } from "$app/paths";
import { browser } from "$app/environment";
import { goto } from "$app/navigation";
import { writable } from "svelte/store";
import { account } from "$lib/appwrite.js";

const store = writable(null);

// Init function, loads all
async function init() {
  try {
    store.set(await account.get());
  } catch (e) {
    store.set(null);
  }
}

// Login function, allows admin to login
async function login(email, password) {
  await account.createEmailSession(email, password);
  await init();
  if (browser) {
    goto(`${base}/`);
  }
}

// Logout function, allows admin to logout
async function logout() {
  await account.deleteSession("current");
  store.set(null);
}

// Expose the store's value with $user
export const user = {
  subscribe: store.subscribe,
  login,
  logout,
  init,
};
