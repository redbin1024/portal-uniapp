import { get, post } from '@/utils/request.js'
import config from '@/config/env.js'
import { AUTH_CONFIG } from '@/config/auth.js'

export function getMiniProgramAppId() {
  // #ifdef MP-WEIXIN
  try {
    const accountInfo = uni.getAccountInfoSync()
    const appId = accountInfo && accountInfo.miniProgram && accountInfo.miniProgram.appId
    if (appId) return appId
  } catch (error) {
    console.warn('[auth] getAccountInfoSync failed:', error)
  }
  // #endif
  return config.appId
}

export function getTenantId() {
  try {
    return String(uni.getStorageSync('tenantId') || AUTH_CONFIG.tenantId)
  } catch (error) {
    return String(AUTH_CONFIG.tenantId)
  }
}

export function buildPhoneLoginPayload({ code, phoneCode }) {
  return {
    code,
    phoneCode,
    appid: getMiniProgramAppId(),
    clientId: AUTH_CONFIG.clientId,
    grantType: AUTH_CONFIG.grantType,
    tenantId: getTenantId()
  }
}

/**
 * 微信小程序手机号登录（参考项目同款接口）
 * @param {object} params
 * @param {string} params.code uni.login() 返回的 code
 * @param {string} params.phoneCode getPhoneNumber 返回的 e.detail.code
 */
export function storeUserInfo({ code, phoneCode }) {
  const tenantId = getTenantId()
  // 每次新建 header，requestInterceptor 会原地修改
  const header = {
    'Content-Type': 'application/json;charset=UTF-8',
    Clientid: AUTH_CONFIG.clientId
  }
  header[AUTH_CONFIG.tenantIdHeader] = tenantId

  return post(AUTH_CONFIG.loginPath, buildPhoneLoginPayload({ code, phoneCode }), {
    header,
    loading: false
  })
}

/**
 * 获取当前登录用户信息（参考项目同款接口）
 * 返回 { user, clubInfo, permissions, roles }，手机号在 user.tel
 */
export function getMpUserInfo() {
  const header = {}
  header[AUTH_CONFIG.tenantIdHeader] = getTenantId()
  // 静默失败：登录成功后补拉用户信息，失败不应打断登录流程
  return get('/mp/user/info', {}, { silent: true, loading: false, header })
}
