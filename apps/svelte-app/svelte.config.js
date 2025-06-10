import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import preprocessReact from "svelte-preprocess-react/preprocessReact";

export default {
  // Consult https://svelte.dev/docs#compile-time-svelte-preprocess
  // for more information about preprocessors
  preprocess: [vitePreprocess(), preprocessReact()],
};
