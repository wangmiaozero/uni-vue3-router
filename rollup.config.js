import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import pkg from './package.json';

export default [
  // UMD build (for browsers)
  {
    input: 'src/index.js',
    output: {
      name: 'UniVue3Router',
      file: pkg.main,
      format: 'umd',
      exports: 'named',
      globals: {
        vue: 'Vue'
      }
    },
    external: ['vue'],
    plugins: [
      resolve(),
      commonjs(),
      babel({
        babelHelpers: 'bundled',
        presets: [['@babel/preset-env', { targets: '> 1%, not dead' }]],
        exclude: 'node_modules/**'
      }),
      terser()
    ]
  },
  // ESM build (for bundlers)
  {
    input: 'src/index.js',
    output: {
      file: pkg.module,
      format: 'es',
      exports: 'named'
    },
    external: ['vue'],
    plugins: [
      resolve(),
      commonjs(),
      babel({
        babelHelpers: 'bundled',
        presets: [['@babel/preset-env', { targets: '> 1%, not dead' }]],
        exclude: 'node_modules/**'
      })
    ]
  }
]; 