import { LOGIN_PAGE, HOME_PAGE, TAB_PAGES } from '@/config/auth.js'

const AUTH_REDIRECT_KEY = 'authRedirect'

// 提取路径部分，统一带前导 /
export function getPath(url = '') {
  const value = String(url || '').trim().split('#')[0]
  if (!value) return ''
  const path = value.split('?')[0]
  return path.startsWith('/') ? path : `/${path}`
}

// 路径 + 查询参数
export function normalizeUrl(url = '') {
  const value = String(url || '').trim().split('#')[0]
  if (!value) return ''
  const queryIndex = value.indexOf('?')
  const path = getPath(value)
  return queryIndex === -1 ? path : `${path}${value.slice(queryIndex)}`
}

// 只允许小程序内部页面，避免开放重定向
export function isInternalPath(path) {
  const clean = getPath(path)
  if (!clean || clean === LOGIN_PAGE) return false
  if (!clean.startsWith('/pages/')) return false
  if (clean.includes('/../') || clean.endsWith('/..')) return false
  return true
}

export function isTabPage(url) {
  return TAB_PAGES.has(getPath(url))
}

export function getCurrentPage() {
  try {
    const pages = getCurrentPages()
    return pages && pages.length ? pages[pages.length - 1] : null
  } catch (error) {
    return null
  }
}

export function getCurrentPageUrl() {
  const page = getCurrentPage()
  if (!page) return ''
  const route = page.route || (page.$page && page.$page.route) || ''
  if (!route) return ''
  const options = page.options || (page.$page && page.$page.options) || {}
  const query = Object.keys(options)
    .filter(key => options[key] !== undefined && options[key] !== null)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(options[key])}`)
    .join('&')
  return `/${route}${query ? `?${query}` : ''}`
}

export function normalizeRedirectParam(value) {
  let target = String(value || '').trim()
  if (!target) return ''
  if (/^%2f/i.test(target)) {
    try {
      target = decodeURIComponent(target)
    } catch (error) {
      return ''
    }
  }
  return isInternalPath(target) ? normalizeUrl(target) : ''
}

// 登录前暂存目标页，避免长 URL（视频地址）塞进登录页 query 导致超长
export function setPendingRedirect(url) {
  const target = normalizeRedirectParam(url)
  if (target) {
    uni.setStorageSync(AUTH_REDIRECT_KEY, target)
  } else {
    uni.removeStorageSync(AUTH_REDIRECT_KEY)
  }
  return target
}

export function getPendingRedirect() {
  try {
    return normalizeRedirectParam(uni.getStorageSync(AUTH_REDIRECT_KEY)) || ''
  } catch (error) {
    return ''
  }
}

export function clearPendingRedirect() {
  try {
    uni.removeStorageSync(AUTH_REDIRECT_KEY)
  } catch (error) {
    // ignore
  }
}

export function buildLoginUrl({ redirect = '', from = '' } = {}) {
  const query = []
  if (isInternalPath(redirect)) {
    query.push(`redirect=${encodeURIComponent(normalizeUrl(redirect))}`)
  }
  if (from) {
    query.push(`from=${encodeURIComponent(from)}`)
  }
  return query.length ? `${LOGIN_PAGE}?${query.join('&')}` : LOGIN_PAGE
}

export function goToLogin({ redirect = '', from = 'guard' } = {}) {
  const page = getCurrentPage()
  if (page && page.route && getPath(`/${page.route}`) === LOGIN_PAGE) return false
  setPendingRedirect(redirect)
  uni.navigateTo({ url: buildLoginUrl({ from }) })
  return true
}

function openTarget(target, stackDepth) {
  if (isTabPage(target)) {
    return uni.switchTab({ url: getPath(target) })
  }
  if (stackDepth <= 1) {
    return uni.reLaunch({ url: target })
  }
  return uni.redirectTo({ url: target })
}

/**
 * 登录页结束后归位
 * - from=guard 且 cancelled：仍然打开原目标（提示后放行）
 * - 有 redirect：栈深 > 1 用 redirectTo 替换登录页，栈深 = 1 用 reLaunch
 * - 无 redirect：能返回就返回，否则回首页
 */
export function completeLoginNavigation({ redirect = '', from = '', cancelled = false } = {}) {
  let depth = 1
  try {
    depth = getCurrentPages().length
  } catch (error) {
    depth = 1
  }
  const target = normalizeRedirectParam(redirect) || getPendingRedirect()
  clearPendingRedirect()

  if (cancelled) {
    if (from === 'guard' && target) return openTarget(target, depth)
    if (depth > 1) return uni.navigateBack({ delta: 1 })
    return uni.switchTab({ url: HOME_PAGE })
  }

  if (target) return openTarget(target, depth)
  if (depth > 1) return uni.navigateBack({ delta: 1 })
  return uni.switchTab({ url: HOME_PAGE })
}
