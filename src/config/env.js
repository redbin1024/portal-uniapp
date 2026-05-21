// 环境配置管理
const envConfig = {
  // 开发环境
  dev: {
    baseURL: 'https://test-api.xiaodingdang1.com/',
    appId: 'wx573564cfaa3b019d',
    debug: true,
    vconsole: true,
    mock: false,
    title: '开发版'
  },
  
  // 测试环境
  test: {
    baseURL: 'https://admin-api.xiaodingdang1.com/',
    appId: 'wx573564cfaa3b019d',
    debug: true,
    vconsole: true,
    mock: false,
    title: '测试版'
  },
  
  // 预发布环境
  staging: {
    baseURL: 'https://staging-api.xiaodingdang1.com/',
    appId: 'wx573564cfaa3b019d',
    debug: false,
    vconsole: false,
    mock: false,
    title: '预发布版'
  },
  
  // 生产环境
  pro: {
    baseURL: 'https://admin-api.xiaodingdang1.com/',
    appId: 'wx573564cfaa3b019d',
    debug: false,
    vconsole: false,
    mock: false,
    title: '正式版'
  }
}

// 获取当前环境类型
function getEnvType() {
  // 检查 process 对象是否存在（兼容浏览器环境）
  const processEnv = typeof process !== 'undefined' ? process.env : {}
  
  // #ifdef MP-WEIXIN
  return processEnv.ENV_TYPE || 'dev'
  // #endif
  
  // #ifdef H5
  return processEnv.NODE_ENV === 'production' ? 'pro' : 'dev'
  // #endif
  
  // #ifdef APP-PLUS
  return processEnv.NODE_ENV === 'production' ? 'pro' : 'dev'
  // #endif
  
  return 'dev'
}

// 获取当前环境配置
function getConfig() {
  const envType = getEnvType()
  return envConfig[envType] || envConfig.dev
}

// 导出配置
export default getConfig()

// 导出环境类型
export const ENV_TYPE = getEnvType()

// 导出所有环境配置
export const ENV_CONFIG = envConfig