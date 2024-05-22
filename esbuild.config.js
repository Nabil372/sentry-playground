import * as esbuild from 'esbuild';
import { sentryEsbuildPlugin } from "@sentry/esbuild-plugin";

await esbuild.build({
    plugins: [
        sentryEsbuildPlugin({
            authToken: process.env.SENTRY_AUTH_TOKEN,
            org: process.env.SENTRY_ORG_NAME,
            project: process.env.SENTRY_PROJ_NAME,
        }),
    ],
    entryPoints: ['src/index.ts'],
    bundle: true,
    minify: true,
    treeShaking: true,
    sourcemap: true,
    platform: "node",
    target: "es2022",
    format: "esm",
    outExtension: {
        ".js": ".mjs",
    },
    outfile: "dist/index.mjs",
    loader: {
        // this options bundles .node binaries with the rest of the code
        ".node": "file",
    },
    // unfortunately, using the banner hack to get around:
    // https://github.com/evanw/esbuild/issues/1944#issuecomment-1936954345
    // "Error: Dynamic require of * is not supported"
    // doesn't seem to work well with sentry. see:
    // https://github.com/getsentry/sentry-javascript/issues/12056#issuecomment-2125090679.
    // So have just resorted to using externals
    external: ["express", "@sentry/node"],
})
