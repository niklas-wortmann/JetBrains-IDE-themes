// @ts-check
import { defineConfig } from 'rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import dts from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';
import json from '@rollup/plugin-json';

const entries = ['src/index.ts'];

const external = ['@shikijs/core'];

const plugins = [
    esbuild(),
    nodeResolve(),
    commonjs(),
    json({
        namedExports: false,
        preferConst: true,
        compact: true,
    }),
];

export default defineConfig([
    {
        input: entries,
        output: {
            dir: 'dist',
            format: 'esm',
            entryFileNames: '[name].mjs',
            chunkFileNames: 'chunks/[name].mjs',
        },
        plugins: [...plugins],
        external,
    },
    {
        input: entries,
        output: {
            dir: 'dist',
            format: 'esm',
            chunkFileNames: 'types/[name].d.mts',
            entryFileNames: (f) => `${f.name.replace(/src[\\\/]/, '')}.d.mts`,
        },
        plugins: [
            dts({
                respectExternal: true,
            }),
        ],
        external,
        onwarn: (warning, warn) => {
            if (!/Circular|an empty chunk/.test(warning.message)) warn(warning);
        },
    },
]);
