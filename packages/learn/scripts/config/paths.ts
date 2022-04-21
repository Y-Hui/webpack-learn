import { realpathSync } from 'fs'
import { resolve } from 'path'

const appRoot = realpathSync(process.cwd())
/** 从项目根目录拼接路径 */
const resolveApp = (...pathList: string[]) => resolve(appRoot, ...pathList)

const moduleFileExtensions = [
  'web.mjs',
  'mjs',
  'web.js',
  'js',
  'web.ts',
  'ts',
  'web.tsx',
  'tsx',
  'json',
  'web.jsx',
  'jsx',
]

export default {
  appRoot: resolveApp('.'),
  appHtml: resolveApp('index.html'),
  appIndexFile: resolveApp('src/index'),
  appSrc: resolveApp('src'),
  distDir: resolveApp('dist'),
  moduleFileExtensions,
}
