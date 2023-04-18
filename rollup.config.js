import typescript from '@rollup/plugin-typescript'
import terser from '@rollup/plugin-terser'
export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'lib/index.js',
      format: 'es'
    }
    // {
    //   file: 'lib/index.global.js',
    //   format: 'iife',
    //   name: 'ImgToTiny'
    // }
  ],
  plugins: [typescript(), terser()]
}
