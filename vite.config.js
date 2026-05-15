import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'

const fixMpHtmlWxss = () => ({
  name: 'fix-mp-html-wxss',
  enforce: 'pre',
  transform(code, id) {
    if (!id.includes('uni-app-mp-html/components/mp-html/node/node.vue')) return

    return code
      .replace(/div\.\/deep\/\s+\.hl-code-toolbar/g, '/deep/ .hl-code-toolbar')
      .replace(/margin-block-start\s*:\s*1em;?/g, 'margin-top:1em;')
      .replace(/margin-block-end\s*:\s*1em;?/g, 'margin-bottom:1em;')
      .replace(/color-adjust\s*:\s*exact;?/g, 'print-color-adjust:exact;')
  }
})

export default defineConfig({
  plugins: [uni(), fixMpHtmlWxss()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    target: 'es6',
    cssCodeSplit: false
  },
  define: {
    // 定义全局常量，替换代码中的 process.env
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    'process.env.ENV_TYPE': JSON.stringify(process.env.ENV_TYPE || 'dev'),
    // 为了兼容性，也定义整个 process.env 对象
    'process.env': JSON.stringify({
      NODE_ENV: process.env.NODE_ENV || 'development',
      ENV_TYPE: process.env.ENV_TYPE || 'dev'
    })
  }
})