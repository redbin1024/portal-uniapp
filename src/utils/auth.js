import { getMpUserInfo, storeUserInfo } from '@/api/auth.js'
import {
  getToken,
  getUserInfo,
  getUserPhone,
  isLoggedIn,
  saveAuth,
  saveUserInfo
} from '@/utils/token.js'

export { getToken, getUserInfo, getUserPhone, isLoggedIn }

function pickToken(payload) {
  if (!payload) return ''
  if (typeof payload === 'string') return payload
  if (typeof payload !== 'object') return ''

  const candidates = [
    payload.access_token,
    payload.token,
    payload.accessToken,
    payload.data && payload.data.access_token,
    payload.data && payload.data.token,
    payload.data && payload.data.accessToken
  ]
  for (const value of candidates) {
    if (typeof value === 'string' && value) return value
  }
  return ''
}

function pickUserInfo(payload) {
  if (!payload || typeof payload !== 'object') return null

  const candidates = [
    payload.userInfo,
    payload.user,
    payload.user_info,
    payload.data && payload.data.userInfo,
    payload.data && payload.data.user,
    payload.data && payload.data.user_info
  ]
  for (const value of candidates) {
    if (value && typeof value === 'object') return value
  }
  return null
}

function pickPhone(payload) {
  if (!payload || typeof payload !== 'object') return ''
  const user =
    payload.user || payload.userInfo || (payload.data && payload.data.user) || payload
  return user.tel || user.phone || user.mobile || user.phonenumber || ''
}

/**
 * 拉取当前登录用户信息（参考项目同款 GET /mp/user/info）
 * 手机号字段为 user.tel，兼容 phone/mobile/phonenumber
 */
export async function fetchUserInfo() {
  const res = await getMpUserInfo()
  const data = (res && res.data) || {}
  const user = data.user || {}
  const phone = saveUserInfo(user, {
    permissions: data.permissions,
    roles: data.roles
  })

  return {
    user,
    clubInfo: data.clubInfo,
    permissions: data.permissions,
    roles: data.roles,
    phone
  }
}

function getWxLoginCode() {
  return new Promise((resolve, reject) => {
    // #ifdef MP-WEIXIN
    uni.login({
      success: (res) => {
        if (res && res.code) {
          resolve(res.code)
          return
        }
        const error = new Error('微信登录失败')
        error.code = 'WX_LOGIN_FAILED'
        reject(error)
      },
      fail: (err) => {
        const error = new Error('微信登录失败')
        error.code = 'WX_LOGIN_FAILED'
        error.originalError = err
        reject(error)
      }
    })
    // #endif

    // #ifndef MP-WEIXIN
    const error = new Error('当前平台不支持微信登录')
    error.code = 'WX_LOGIN_FAILED'
    reject(error)
    // #endif
  })
}

/**
 * 用手机号授权 code 换取登录态（参考项目同款流程）
 * 1. uni.login() 获取 code
 * 2. POST auth/login_phone_wx { code, phoneCode, ... }
 * 3. token 取响应 data.access_token
 * 4. 补拉 /mp/user/info 获取 user.tel
 */
export async function loginWithPhoneCode(phoneCode) {
  if (!phoneCode || typeof phoneCode !== 'string') {
    const error = new Error('缺少手机号授权码')
    error.code = 'NO_PHONE_CODE'
    throw error
  }

  const code = await getWxLoginCode()
  const res = await storeUserInfo({ code, phoneCode })
  const payload = res && res.data !== undefined ? res.data : res
  const token = pickToken(payload) || pickToken(res)

  if (!token) {
    const error = new Error('登录响应缺少 access_token')
    error.code = 'NO_TOKEN'
    throw error
  }

  const userInfo = pickUserInfo(payload) || pickUserInfo(res)
  saveAuth(token, userInfo)

  // 登录响应里带手机号时先兜底存一份
  const loginPhone = pickPhone(payload) || pickPhone(res)
  if (loginPhone) {
    uni.setStorageSync('userPhone', loginPhone)
  }

  let resolvedUserInfo = userInfo
  try {
    const info = await fetchUserInfo()
    resolvedUserInfo = info.user || userInfo
  } catch (error) {
    // 与参考项目一致：用户信息接口失败不阻断登录，token 已保存
    console.warn('[auth] fetch user info failed:', error)
  }

  return {
    token,
    userInfo: resolvedUserInfo,
    phone: getUserPhone()
  }
}
