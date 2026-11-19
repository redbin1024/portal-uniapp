import { createSSRApp } from 'vue'
import App from './App.vue'
import { installAuthGuard } from '@/utils/authGuard.js'

export function createApp() {
  installAuthGuard()
  const app = createSSRApp(App)
  return {
    app
  }
}