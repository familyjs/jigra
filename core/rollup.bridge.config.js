import replace from '@rollup/plugin-replace';

const banner = `
/*! Jigra: https://jigrajs.web.app/ - MIT License */
/* Generated File. Do not edit. */
`;

export default {
  input: 'build/native-bridge.js',
  output: [
    {
      file: '../android/jigra/src/main/assets/native-bridge.js',
      format: 'iife',
      name: 'nativeBridge',
      preferConst: true,
      banner,
      sourcemap: false,
    },
    {
      file: '../ios/Jigra/Jigra/assets/native-bridge.js',
      format: 'iife',
      name: 'nativeBridge',
      preferConst: true,
      banner,
      sourcemap: false,
    },
  ],
  // Remove any references to module.exports or exports.__esModule by replacing them with unused variables
  plugins: [
    replace({
      'module.exports': 'dummy',
      'exports.__esModule': 'dummy',
      'exports.initBridge': 'dummy',
      'preventAssignment': false,
    }),
  ],
};
