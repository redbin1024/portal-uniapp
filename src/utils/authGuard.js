import { ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { LOGIN_PAGE } from '@/config/auth.js'
import { isLoggedIn } from '@/utils/token.js'
import { getPath, normalizeUrl, isTabPage, goToLogin } from '@/utils/route.js'

let installed = false
let prompting = false
let bypassUrl = ''
let pendingNavigation = null
let gateSuppressedAt = 0

function shouldGate(url) {
  const path = getPath(url)
  if (!path) return false
  if (path === LOGIN_PAGE) return false
  if (isTabPage(path)) return false
  return !isLoggedIn()
}

function showLoginPrompt({ onConfirm, onCancel } = {}) {
  if (prompting) return false
  prompting = true

  uni.showModal({
    title: '登录提示',
    content: '手机号授权登录后即可继续操作，是否前往登录？',
    confirmText: '去登录',
    cancelText: '暂不',
    confirmColor: '#2C80FF',
    cancelColor: '#999999',
    success: (res) => {
      if (res.confirm) {
        onConfirm && onConfirm()
      } else {
        onCancel && onCancel()
      }
    },
    complete: () => {
      prompting = false
    }
  })

  return true
}

function resumePendingNavigation() {
  const item = pendingNavigation
  pendingNavigation = null
  if (!item || !item.url) return false

  bypassUrl = normalizeUrl(item.url)
  try {
    uni.navigateTo({ url: item.url })
  } finally {
    setTimeout(() => {
      bypassUrl = ''
    }, 0)
  }
  gateSuppressedAt = Date.now()
  return true
}

function handleNavigation(options) {
  if (!options || !options.url) return options

  // 放行时重新发起的同一次跳转，避免二次弹窗
  if (bypassUrl && normalizeUrl(options.url) === bypassUrl) {
    bypassUrl = ''
    return options
  }

  if (!shouldGate(options.url)) return options
  if (prompting) {
    if (typeof options.complete === 'function') {
      options.complete({ errMsg: 'navigateTo:fail cancel' })
    }
    return false
  }

  pendingNavigation = { url: options.url }
  gateSuppressedAt = Date.now()

  showLoginPrompt({
    onConfirm: () => {
      const target = pendingNavigation && pendingNavigation.url
      pendingNavigation = null
      goToLogin({ redirect: target, from: 'guard' })
    },
    onCancel: () => {
      resumePendingNavigation()
    }
  })

  // invoke 返回 false 后 uni 不再回调 success/fail/complete，
  // 这里手动释放依赖 complete 的页面锁（如 system/index.vue 的 isNavigatingVideo）
  if (typeof options.complete === 'function') {
    options.complete({ errMsg: 'navigateTo:fail cancel' })
  }

  return false
}

export function installAuthGuard() {
  // #ifdef MP-WEIXIN
  if (installed) return
  if (typeof uni === 'undefined' || typeof uni.addInterceptor !== 'function') return
  installed = true
  uni.addInterceptor('navigateTo', { invoke: handleNavigation })
  // #endif
}

function isDirectEntry(route) {
  let pages = []
  try {
    pages = getCurrentPages()
  } catch (error) {
    pages = []
  }
  if (!pages || pages.length !== 1) return false

  const top = pages[0]
  if (route && (!top || top.route !== route)) return false
  return true
}

// 分享卡片/扫码直接打开二级页面时的兜底提示
export function maybePromptForDirectEntry(route = '') {
  // #ifdef MP-WEIXIN
  if (isLoggedIn() || prompting) return false
  if (Date.now() - gateSuppressedAt < 3000) return false
  if (!isDirectEntry(route)) return false

  return showLoginPrompt({
    onConfirm: () => {
      goToLogin({ from: 'gate' })
    }
  })
  // #endif

  // #ifndef MP-WEIXIN
  return false
  // #endif
}

// 页面内一次性提示，同一页面实例只弹一次
export function useSecondaryPageGate(route = '') {
  const checked = ref(false)

  onShow(() => {
    if (checked.value) return
    checked.value = true
    setTimeout(() => {
      maybePromptForDirectEntry(route)
    }, 300)
  })
}

export { resumePendingNavigation }
