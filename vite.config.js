import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'

export default defineConfig({
  plugins: [uni()],
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