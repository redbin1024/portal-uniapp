import config from '@/config/env.js'

// 请求状态枚举
const REQUEST_STATUS = {
  SUCCESS: 200,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500
}

// 请求拦截器配置
const requestConfig = {
  baseURL: config.baseURL,
  timeout: 30000,
  header: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
}

// 正在进行的请求队列（用于取消重复请求）
const pendingRequests = new Map()

// 生成请求唯一标识
function generateRequestKey(config) {
  const { url, method, data } = config
  return `${method}:${url}:${JSON.stringify(data || {})}`
}

// 取消重复请求
function cancelDuplicateRequest(config) {
  const requestKey = generateRequestKey(config)
  
  if (pendingRequests.has(requestKey)) {
    // 如果有相同的请求正在进行，取消之前的请求
    const cancelToken = pendingRequests.get(requestKey)
    cancelToken.cancel('取消重复请求')
    pendingRequests.delete(requestKey)
  }
  
  // 创建新的取消令牌
  const cancelToken = {
    cancel: (reason) => {
      console.log('请求被取消：', reason)
    }
  }
  
  pendingRequests.set(requestKey, cancelToken)
  return requestKey
}

// 请求拦截器
function requestInterceptor(options) {
  // 处理重复请求
  const requestKey = cancelDuplicateRequest(options)
  options.requestKey = requestKey
  
  // 添加token
  const token = uni.getStorageSync('token')
  if (token) {
    options.header.Authorization = `Bearer ${token}`
  }
  
  // 添加公共参数
  options.header['X-Requested-With'] = 'XMLHttpRequest'
  options.header['X-App-Version'] = '1.0.0'
  options.header['X-Request-ID'] = Date.now().toString()
  
  // 处理GET请求参数
  if (options.method === 'GET' && options.data) {
    const params = Object.keys(options.data)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(options.data[key])}`)
      .join('&');
    options.url += (options.url.includes('?') ? '&' : '?') + params;
    delete options.data;
  }
  
  // 开发环境打印请求信息
  if (config.debug) {
    console.group(`🚀 API请求 - ${options.method} ${options.url}`)
    console.log('请求地址：', options.url)
    console.log('请求方法：', options.method)
    console.log('请求参数：', options.data)
    console.log('请求头：', options.header)
    console.groupEnd()
  }
  
  return options
}

// 响应拦截器
function responseInterceptor(response, requestKey) {
  const { data, statusCode, header } = response
  
  // 请求完成后从队列中移除
  if (requestKey && pendingRequests.has(requestKey)) {
    pendingRequests.delete(requestKey)
  }
  
  // 开发环境打印响应信息
  if (config.debug) {
    console.group(`📦 API响应 - ${statusCode}`)
    console.log('响应状态：', statusCode)
    console.log('响应头：', header)
    console.log('响应数据：', data)
    console.groupEnd()
  }
  
  // 处理HTTP状态码
  if (statusCode !== REQUEST_STATUS.SUCCESS) {
    const errorMessage = getHttpErrorMessage(statusCode)
    showError(errorMessage)
    return Promise.reject({
      code: statusCode,
      message: errorMessage,
      data: null
    })
  }
  
  // 处理业务状态码
  if (data && data.code !== undefined && data.code !== REQUEST_STATUS.SUCCESS) {
    return handleBusinessError(data)
  }
  
  return data
}

// 获取HTTP错误信息
function getHttpErrorMessage(statusCode) {
  const errorMessages = {
    400: '请求参数错误',
    401: '未授权，请重新登录',
    403: '拒绝访问',
    404: '请求的资源不存在',
    405: '请求方法不允许',
    408: '请求超时',
    500: '服务器内部错误',
    502: '网关错误',
    503: '服务不可用',
    504: '网关超时'
  }
  return errorMessages[statusCode] || `请求失败 ${statusCode}`
}

// 处理业务错误
function handleBusinessError(data) {
  const { code, message } = data
  
  // token过期处理
  if (code === REQUEST_STATUS.UNAUTHORIZED) {
    handleTokenExpired()
    return Promise.reject(data)
  }
  
  // 权限不足
  if (code === REQUEST_STATUS.FORBIDDEN) {
    showError('权限不足')
    return Promise.reject(data)
  }
  
  // 其他业务错误
  showError(message || '请求失败')
  return Promise.reject(data)
}

// 处理token过期
function handleTokenExpired() {
  uni.removeStorageSync('token')
  uni.removeStorageSync('userInfo')
  
  // 显示登录提示
  uni.showModal({
    title: '提示',
    content: '登录已过期，请重新登录',
    showCancel: false,
    success: () => {
      uni.reLaunch({
        url: '/pages/login/login'
      })
    }
  })
}

// 显示错误信息
function showError(message, duration = 2000) {
  uni.showToast({
    title: message,
    icon: 'none',
    duration
  })
}

// 获取网络错误信息
function getNetworkErrorMessage(error) {
  if (error.errMsg) {
    if (error.errMsg.includes('timeout')) {
      return '请求超时，请检查网络连接'
    }
    if (error.errMsg.includes('fail')) {
      return '网络连接失败，请检查网络设置'
    }
  }
  return '网络请求失败，请稍后重试'
}

// 封装请求方法
function request(options) {
  return new Promise((resolve, reject) => {
    // 显示加载提示
    if (options.loading !== false) {
      uni.showLoading({
        title: options.loadingText || '加载中...',
        mask: true
      })
    }
    
    // 合并配置
    const config = Object.assign({}, requestConfig, options)
    
    // 请求拦截
    const interceptedConfig = requestInterceptor(config)
    const requestKey = interceptedConfig.requestKey
    
    // 确保URL包含完整的baseURL
    let fullUrl = interceptedConfig.url
    if (!fullUrl.startsWith('http')) {
      const baseURL = interceptedConfig.baseURL || requestConfig.baseURL
      // 确保baseURL以斜杠结尾，url不以斜杠开头，避免双斜杠
      const normalizedBaseURL = baseURL.endsWith('/') ? baseURL : baseURL + '/'
      const normalizedUrl = fullUrl.startsWith('/') ? fullUrl.slice(1) : fullUrl
      fullUrl = normalizedBaseURL + normalizedUrl
    }
    
    // 发起请求
    uni.request({
      ...interceptedConfig,
      url: fullUrl,
      success: (response) => {
        try {
          const result = responseInterceptor(response, requestKey)
          resolve(result)
        } catch (error) {
          reject(error)
        }
      },
      fail: (error) => {
        // 从请求队列中移除
        if (requestKey && pendingRequests.has(requestKey)) {
          pendingRequests.delete(requestKey)
        }
        
        console.error('网络请求失败：', error)
        
        // 处理网络错误
        const errorMessage = getNetworkErrorMessage(error)
        showError(errorMessage)
        
        reject({
          code: -1,
          message: errorMessage,
          data: null,
          originalError: error
        })
      },
      complete: () => {
        // 隐藏加载提示
        if (options.loading !== false) {
          uni.hideLoading()
        }
      }
    })
  })
}

// GET请求
export function get(url, params = {}, options = {}) {
  return request({
    url,
    method: 'GET',
    data: params,
    ...options
  })
}

// POST请求
export function post(url, data = {}, options = {}) {
  return request({
    url,
    method: 'POST',
    data,
    ...options
  })
}

// PUT请求
export function put(url, data = {}, options = {}) {
  return request({
    url,
    method: 'PUT',
    data,
    ...options
  })
}

// DELETE请求
export function del(url, params = {}, options = {}) {
  return request({
    url,
    method: 'DELETE',
    data: params,
    ...options
  })
}

// PATCH请求
export function patch(url, data = {}, options = {}) {
  return request({
    url,
    method: 'PATCH',
    data,
    ...options
  })
}

// 并发请求
export function all(requests) {
  return Promise.all(requests)
}

// 并发请求（有一个成功就返回）
export function race(requests) {
  return Promise.race(requests)
}

// 串行请求
export function series(requests) {
  return requests.reduce((promise, request) => {
    return promise.then(results => {
      return request().then(result => [...results, result])
    })
  }, Promise.resolve([]))
}

// 重试请求
export function retry(requestFn, maxRetries = 3, delay = 1000) {
  return new Promise((resolve, reject) => {
    let retries = 0
    
    function attempt() {
      requestFn()
        .then(resolve)
        .catch(error => {
          retries++
          if (retries < maxRetries) {
            console.log(`请求失败，${delay}ms后进行第${retries + 1}次重试`)
            setTimeout(attempt, delay)
          } else {
            reject(error)
          }
        })
    }
    
    attempt()
  })
}

// 取消所有请求
export function cancelAllRequests() {
  pendingRequests.forEach((cancelToken, key) => {
    cancelToken.cancel('取消所有请求')
  })
  pendingRequests.clear()
}

// 获取当前进行中的请求数量
export function getPendingRequestsCount() {
  return pendingRequests.size
}

// 文件上传
export function upload(url, filePath, options = {}) {
  return new Promise((resolve, reject) => {
    const {
      name = 'file',
      formData = {},
      onProgress,
      loading = true,
      loadingText = '上传中...'
    } = options
    
    // 显示上传进度
    if (loading) {
      uni.showLoading({
        title: loadingText,
        mask: true
      })
    }
    
    const token = uni.getStorageSync('token')
    const header = {
      'X-Requested-With': 'XMLHttpRequest',
      'X-App-Version': '1.0.0'
    }
    
    if (token) {
      header.Authorization = `Bearer ${token}`
    }
    
    let fullUploadUrl = url
    if (!fullUploadUrl.startsWith('http')) {
      const normalizedBaseURL = requestConfig.baseURL.endsWith('/') ? requestConfig.baseURL : requestConfig.baseURL + '/'
      const normalizedUrl = fullUploadUrl.startsWith('/') ? fullUploadUrl.slice(1) : fullUploadUrl
      fullUploadUrl = normalizedBaseURL + normalizedUrl
    }
    
    const uploadTask = uni.uploadFile({
      url: fullUploadUrl,
      filePath,
      name,
      formData,
      header,
      success: (response) => {
        try {
          const data = JSON.parse(response.data)
          if (data.code === REQUEST_STATUS.SUCCESS) {
            resolve(data)
          } else {
            showError(data.message || '上传失败')
            reject(data)
          }
        } catch (error) {
          console.error('上传响应解析失败：', error)
          reject(error)
        }
      },
      fail: (error) => {
        console.error('上传失败：', error)
        showError('上传失败，请稍后重试')
        reject(error)
      },
      complete: () => {
        if (loading) {
          uni.hideLoading()
        }
      }
    })
    
    // 监听上传进度
    if (onProgress && typeof onProgress === 'function') {
      uploadTask.onProgressUpdate((res) => {
        onProgress(res)
      })
    }
    
    return uploadTask
  })
}

// 多文件上传
export function uploadMultiple(url, filePaths, options = {}) {
  const uploadPromises = filePaths.map(filePath => upload(url, filePath, options))
  return Promise.all(uploadPromises)
}

// 文件下载
export function download(url, options = {}) {
  return new Promise((resolve, reject) => {
    const {
      onProgress,
      loading = true,
      loadingText = '下载中...'
    } = options
    
    if (loading) {
      uni.showLoading({
        title: loadingText,
        mask: true
      })
    }
    
    let fullDownloadUrl = url
    if (!fullDownloadUrl.startsWith('http')) {
      const normalizedBaseURL = requestConfig.baseURL.endsWith('/') ? requestConfig.baseURL : requestConfig.baseURL + '/'
      const normalizedUrl = fullDownloadUrl.startsWith('/') ? fullDownloadUrl.slice(1) : fullDownloadUrl
      fullDownloadUrl = normalizedBaseURL + normalizedUrl
    }
    
    const downloadTask = uni.downloadFile({
      url: fullDownloadUrl,
      success: (response) => {
        if (response.statusCode === 200) {
          resolve(response)
        } else {
          showError('下载失败')
          reject(response)
        }
      },
      fail: (error) => {
        console.error('下载失败：', error)
        showError('下载失败，请稍后重试')
        reject(error)
      },
      complete: () => {
        if (loading) {
          uni.hideLoading()
        }
      }
    })
    
    // 监听下载进度
    if (onProgress && typeof onProgress === 'function') {
      downloadTask.onProgressUpdate((res) => {
        onProgress(res)
      })
    }
    
    return downloadTask
  })
}

// 创建请求实例（支持自定义配置）
export function createInstance(customConfig = {}) {
  const instanceConfig = Object.assign({}, requestConfig, customConfig)
  
  return function instanceRequest(options) {
    const config = Object.assign({}, instanceConfig, options)
    return request(config)
  }
}

// 设置全局配置
export function setConfig(newConfig) {
  Object.assign(requestConfig, newConfig)
}

// 获取当前配置
export function getConfig() {
  return { ...requestConfig }
}

export default request