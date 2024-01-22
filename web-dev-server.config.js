import { fromRollup } from "@web/dev-server-rollup";
import rollupBabel from "@rollup/plugin-babel";
import { nodeResolve } from '@rollup/plugin-node-resolve';

const babel = fromRollup(rollupBabel);
const rollupNodeResolve = fromRollup(nodeResolve);
/** Use Hot Module replacement by adding --hmr to the start command */
const hmr = process.argv.includes('--hmr');

export default /** @type {import('@web/dev-server').DevServerConfig} */ ({
  open: '/',
  babel: true,
  nodeResolve: true,
  watch: !hmr,
  /** Resolve bare module imports */
  nodeResolve: {
    exportConditions: ['browser', 'development'],
  },
  
  /** Compile JS for older browsers. Requires @web/dev-server-esbuild plugin */
  // esbuildTarget: 'auto'

  /** Set appIndex to enable SPA routing */
  appIndex: './index.html',

  plugins: [

    rollupNodeResolve({
      exportConditions: ["development"],
    }),
  ],

  // See documentation for all available options
});