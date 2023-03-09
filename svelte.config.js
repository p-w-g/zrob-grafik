import adapter from '@sveltejs/adapter-netlify';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			// unless at some point i want to have netlify edge functions.
			// until then, its off.
			edge: false,
			// not sure, but i gess i dont want to split my app into functions
			split: false
		}
		)
	}
};

export default config;
