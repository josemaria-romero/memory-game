import { rollupPluginHTML } from '@web/rollup-plugin-html';

/**
 * Serve app strategies:
 *
 * 1. Buildless: For local development you can avoid build.
 *   1. serve the app using @web/dev-server with node-resolve flag
 *
 * 2. Build bundle: Build the app as a single bundle.
 *   1. import nodeResolve plugin
 *   2. use nodeResolve plugin
 *
 * 3. ES modules: Build the app as a set of modules loading from CDN.
 *  1. run `jspm link` to create importmaps
 *  2. define external dependencies to avoid warnings
 */

// 2.1 Bundle: import nodeResolve plugin
// import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: 'src/index.html',
	output: { dir: 'dist/rollup' },

	// 3.2 ES module: define external dependencies to avoid warnings
	external: ['lit', '@lit/context', '@lit-labs/router'],
	plugins: [
		// 2.2 Bundle: use nodeResolve plugin.
		// nodeResolve(),
		rollupPluginHTML(),
	],
};
