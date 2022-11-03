import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import replace from 'rollup-plugin-replace';
import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve';
import filesize from 'rollup-plugin-filesize';

import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';

const NODE_ENV = process.env.NODE_ENV
const isProd = NODE_ENV === 'production'

let envPlugins = []
if (isProd) {
  envPlugins = [
    terser(),
    filesize(),
  ]
} else {
  envPlugins = [
    livereload(),
    serve({
      open: true,
      openPage: '/public/index.html',
      port: 3001,
      contentBase: './'
    }),
  ]
}


export default {
  input: './src/index.ts',
  output: [
    {
      file: './dist/CWrite.js',
      format: 'umd',
      name: 'CWrite',
    },
    {
      file: './dist/CWrite.esm.js',
      format: 'es',
      name: 'CWrite'
    },
    {
      file: './dist/CWrite.umd.js',
      format: 'cjs',
      name: 'CWrite'
    }
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }), 
    resolve(),
    typescript(),
    commonjs(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
    }),
    ...envPlugins,
    
  ],
}