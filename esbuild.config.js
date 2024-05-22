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
    // using banner as instructed by this:
    // - https://github.com/evanw/esbuild/issues/1944#issuecomment-1936954345
    banner: {
        js: `\
import { fileURLToPath } from 'node:url';
import { dirname as topLevelDirname } from 'node:path';
import { createRequire as topLevelCreateRequire } from 'node:module';

const require = topLevelCreateRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = topLevelDirname(__filename);`,
    },
})
