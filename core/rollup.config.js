import nodeResolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

const banner = '/*! Jigra: https://jigrajs.web.app/ - MIT License */';

export default {
  input: 'build/index.js',
  output: [
    {
      file: 'dist/jigra.js',
      format: 'iife',
      name: 'jigraExports',
      preferConst: true,
      banner,
      sourcemap: true,
      plugins: [terser()],
    },
    {
      file: 'dist/index.js',
      format: 'esm',
      preferConst: true,
      banner,
      sourcemap: true,
    },
    {
      file: 'dist/index.cjs.js',
      format: 'cjs',
      banner,
      sourcemap: true,
      inlineDynamicImports: true,
    },
  ],
  plugins: [nodeResolve()],
};
