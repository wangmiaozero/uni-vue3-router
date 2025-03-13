import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import pkg from './package.json';

// 共享的插件配置
const commonPlugins = [
  resolve({
    extensions: ['.js', '.ts']
  }),
  commonjs(),
  typescript({ 
    tsconfig: './tsconfig.json',
    sourceMap: true,
    declaration: true,
    declarationDir: './dist',
    include: ['src/**/*.ts', 'src/**/*.js'],
    exclude: ['node_modules', 'dist']
  }),
  babel({
    babelHelpers: 'bundled',
    presets: [['@babel/preset-env', { targets: '> 1%, not dead' }]],
    extensions: ['.js', '.ts'],
    exclude: 'node_modules/**'
  })
];

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
      },
      sourcemap: true
    },
    external: ['vue'],
    plugins: [
      ...commonPlugins,
      terser()
    ]
  },
  // ESM build (for bundlers)
  {
    input: 'src/index.js',
    output: {
      file: pkg.module,
      format: 'es',
      exports: 'named',
      sourcemap: true
    },
    external: ['vue'],
    plugins: [
      ...commonPlugins
    ]
  },
  // TypeScript declaration files
  {
    input: 'src/index.js',
    output: {
      file: pkg.types,
      format: 'es'
    },
    plugins: [
      dts({
        compilerOptions: {
          allowJs: true,
          declaration: true,
          emitDeclarationOnly: true
        }
      })
    ]
  }
]; 