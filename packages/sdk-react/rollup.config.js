import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import path from 'node:path';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import json from '@rollup/plugin-json';


const packageJson = require('./package.json');

/**
 * @type {import('rollup').RollupOptions}
 */
const config =
  [
    {
      input: 'src/index.ts',
      output: [
        {
          file: packageJson.module,
          format: 'esm',
          sourcemap: true,
        },
      ],
      plugins: [
        external(),
        resolve({
          browser: true,
          rootDir: path.join(process.cwd(), '../..'),
        }),
        commonjs(),
        typescript({ tsconfig: './tsconfig.json' }),
        postcss({
          config: {
            path: './postcss.config.js',
          },
          extensions: ['.css'],
          minimize: true,
          inject: {
            insertAt: 'top',
          },
        }),
        json(),
        terser(),
      ],
    },
  ];

export default config;
