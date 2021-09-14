/** @type {import("snowpack").SnowpackUserConfig } */
import rollupPluginNodePolyfills from 'rollup-plugin-node-polyfills';

export default {
  mount: {
    public: { url: '/', static: true },
    src: { url: '/dist' },
  },
  alias: {

  },
  plugins: [
    '@snowpack/plugin-react-refresh',
    '@snowpack/plugin-dotenv',
    [
      '@snowpack/plugin-typescript',
      {
        /* Yarn PnP workaround: see https://www.npmjs.com/package/@snowpack/plugin-typescript */
        ...(process.versions.pnp ? { tsc: 'yarn pnpify tsc' } : {}),
      },
    ],
    "snowpack-plugin-relative-css-urls",
    [
      '@snowpack/plugin-sass',
      {
        loadPath: ['/src/styles/']
      },
    ],
  ],
  routes: [
    /* Enable an SPA Fallback in development: */
    {"match": "routes", "src": ".*", "dest": "/index.html"},
  ],
  optimize: {
    /* Example: Bundle your final build: */
    // "bundle": true,
  },
  packageOptions: {
    polyfillNode: false,
    rollup: {
      plugins: [rollupPluginNodePolyfills({crypto: true})],
    },
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    /* ... */
  },
};
