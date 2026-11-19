// 登录授权相关常量（对齐参考项目 aier-merchant-app）
export const AUTH_CONFIG = Object.freeze({
  tenantId: '194338',
  tenantIdHeader: 'X-Tenant-ID',
  clientId: '428a8310cd442757ae699df5d894f051',
  grantType: 'phone',
  loginPath: 'auth/login_phone_wx'
})

export const LOGIN_PAGE = '/pages/login/index'
export const HOME_PAGE = '/pages/index/index'

export const TAB_PAGES = new Set([
  '/pages/index/index',
  '/pages/system/index',
  '/pages/winthecustomer/index',
  '/pages/wisdom/index'
])
