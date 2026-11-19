// 登录态存储，零依赖，供 request.js 和 auth 模块共用
const TOKEN_KEY = 'token'
const USER_INFO_KEY = 'userInfo'
const USER_PHONE_KEY = 'userPhone'
const USER_STORAGE_KEYS = [
  'userInfo',
  'uid',
  'permissions',
  'roles',
  'hasBindPhone',
  'clubName',
  USER_PHONE_KEY
]

export function getToken() {
  try {
    return uni.getStorageSync(TOKEN_KEY) || ''
  } catch (error) {
    return ''
  }
}

export function isLoggedIn() {
  return !!getToken()
}

export function getUserInfo() {
  try {
    return uni.getStorageSync(USER_INFO_KEY) || null
  } catch (error) {
    return null
  }
}

export function saveAuth(token, userInfo) {
  uni.setStorageSync(TOKEN_KEY, token)
  if (userInfo !== undefined) {
    uni.setStorageSync(USER_INFO_KEY, userInfo)
  }
}

export function getUserPhone() {
  try {
    const user = getUserInfo() || {}
    return (
      uni.getStorageSync(USER_PHONE_KEY) ||
      user.tel ||
      user.phone ||
      user.mobile ||
      user.phonenumber ||
      ''
    )
  } catch (error) {
    return ''
  }
}

export function saveUserInfo(user = {}, extra = {}) {
  const phone = user.tel || user.phone || user.mobile || user.phonenumber || ''
  if (user && Object.keys(user).length) {
    uni.setStorageSync(USER_INFO_KEY, user)
  }
  if (user.userId !== undefined && user.userId !== null) {
    uni.setStorageSync('uid', user.userId)
  }
  if (Array.isArray(extra.permissions)) {
    uni.setStorageSync('permissions', extra.permissions)
  }
  if (Array.isArray(extra.roles)) {
    uni.setStorageSync('roles', extra.roles)
  }
  if (user.hasBindPhone !== undefined) {
    uni.setStorageSync('hasBindPhone', user.hasBindPhone)
  }
  if (user.clubName) {
    uni.setStorageSync('clubName', user.clubName)
  }
  if (phone) {
    uni.setStorageSync(USER_PHONE_KEY, phone)
  }
  return phone
}

export function clearAuth() {
  uni.removeStorageSync(TOKEN_KEY)
  USER_STORAGE_KEYS.forEach(key => {
    uni.removeStorageSync(key)
  })
}
