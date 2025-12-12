"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
const common_vendor = require("../common/vendor.js");
const config_env = require("../config/env.js");
const REQUEST_STATUS = {
  SUCCESS: 200,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403
};
const requestConfig = {
  baseURL: config_env.config.baseURL,
  timeout: 3e4,
  header: {
    "Content-Type": "application/json;charset=UTF-8"
  }
};
const pendingRequests = /* @__PURE__ */ new Map();
function generateRequestKey(config) {
  const { url, method, data } = config;
  return `${method}:${url}:${JSON.stringify(data || {})}`;
}
function cancelDuplicateRequest(config) {
  const requestKey = generateRequestKey(config);
  if (pendingRequests.has(requestKey)) {
    const cancelToken2 = pendingRequests.get(requestKey);
    cancelToken2.cancel("取消重复请求");
    pendingRequests.delete(requestKey);
  }
  const cancelToken = {
    cancel: (reason) => {
      console.log("请求被取消：", reason);
    }
  };
  pendingRequests.set(requestKey, cancelToken);
  return requestKey;
}
function requestInterceptor(options) {
  const requestKey = cancelDuplicateRequest(options);
  options.requestKey = requestKey;
  const token = common_vendor.index.getStorageSync("token");
  if (token) {
    options.header.Authorization = `Bearer ${token}`;
  }
  options.header["X-Requested-With"] = "XMLHttpRequest";
  options.header["X-App-Version"] = "1.0.0";
  options.header["X-Request-ID"] = Date.now().toString();
  if (options.method === "GET" && options.data) {
    const params = Object.keys(options.data).map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(options.data[key])}`).join("&");
    options.url += (options.url.includes("?") ? "&" : "?") + params;
    delete options.data;
  }
  if (config_env.config.debug) {
    console.group(`🚀 API请求 - ${options.method} ${options.url}`);
    console.log("请求地址：", options.url);
    console.log("请求方法：", options.method);
    console.log("请求参数：", options.data);
    console.log("请求头：", options.header);
    console.groupEnd();
  }
  return options;
}
function responseInterceptor(response, requestKey) {
  const { data, statusCode, header } = response;
  if (requestKey && pendingRequests.has(requestKey)) {
    pendingRequests.delete(requestKey);
  }
  if (config_env.config.debug) {
    console.group(`📦 API响应 - ${statusCode}`);
    console.log("响应状态：", statusCode);
    console.log("响应头：", header);
    console.log("响应数据：", data);
    console.groupEnd();
  }
  if (statusCode !== REQUEST_STATUS.SUCCESS) {
    const errorMessage = getHttpErrorMessage(statusCode);
    showError(errorMessage);
    return Promise.reject({
      code: statusCode,
      message: errorMessage,
      data: null
    });
  }
  if (data && data.code !== void 0 && data.code !== REQUEST_STATUS.SUCCESS) {
    return handleBusinessError(data);
  }
  return data;
}
function getHttpErrorMessage(statusCode) {
  const errorMessages = {
    400: "请求参数错误",
    401: "未授权，请重新登录",
    403: "拒绝访问",
    404: "请求的资源不存在",
    405: "请求方法不允许",
    408: "请求超时",
    500: "服务器内部错误",
    502: "网关错误",
    503: "服务不可用",
    504: "网关超时"
  };
  return errorMessages[statusCode] || `请求失败 ${statusCode}`;
}
function handleBusinessError(data) {
  const { code, message } = data;
  if (code === REQUEST_STATUS.UNAUTHORIZED) {
    handleTokenExpired();
    return Promise.reject(data);
  }
  if (code === REQUEST_STATUS.FORBIDDEN) {
    showError("权限不足");
    return Promise.reject(data);
  }
  showError(message || "请求失败");
  return Promise.reject(data);
}
function handleTokenExpired() {
  common_vendor.index.removeStorageSync("token");
  common_vendor.index.removeStorageSync("userInfo");
  common_vendor.index.showModal({
    title: "提示",
    content: "登录已过期，请重新登录",
    showCancel: false,
    success: () => {
      common_vendor.index.reLaunch({
        url: "/pages/login/login"
      });
    }
  });
}
function showError(message, duration = 2e3) {
  common_vendor.index.showToast({
    title: message,
    icon: "none",
    duration
  });
}
function getNetworkErrorMessage(error) {
  if (error.errMsg) {
    if (error.errMsg.includes("timeout")) {
      return "请求超时，请检查网络连接";
    }
    if (error.errMsg.includes("fail")) {
      return "网络连接失败，请检查网络设置";
    }
  }
  return "网络请求失败，请稍后重试";
}
function request(options) {
  return new Promise((resolve, reject) => {
    if (options.loading !== false)
      ;
    const config = Object.assign({}, requestConfig, options);
    const interceptedConfig = requestInterceptor(config);
    const requestKey = interceptedConfig.requestKey;
    let fullUrl = interceptedConfig.url;
    if (!fullUrl.startsWith("http")) {
      const baseURL = interceptedConfig.baseURL || requestConfig.baseURL;
      const normalizedBaseURL = baseURL.endsWith("/") ? baseURL : baseURL + "/";
      const normalizedUrl = fullUrl.startsWith("/") ? fullUrl.slice(1) : fullUrl;
      fullUrl = normalizedBaseURL + normalizedUrl;
    }
    common_vendor.index.request(__spreadProps(__spreadValues({}, interceptedConfig), {
      url: fullUrl,
      success: (response) => {
        try {
          const result = responseInterceptor(response, requestKey);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      },
      fail: (error) => {
        if (requestKey && pendingRequests.has(requestKey)) {
          pendingRequests.delete(requestKey);
        }
        console.error("网络请求失败：", error);
        const errorMessage = getNetworkErrorMessage(error);
        showError(errorMessage);
        reject({
          code: -1,
          message: errorMessage,
          data: null,
          originalError: error
        });
      },
      complete: () => {
        if (options.loading !== false) {
          common_vendor.index.hideLoading();
        }
      }
    }));
  });
}
function get(url, params = {}, options = {}) {
  return request(__spreadValues({
    url,
    method: "GET",
    data: params
  }, options));
}
function post(url, data = {}, options = {}) {
  return request(__spreadValues({
    url,
    method: "POST",
    data
  }, options));
}
exports.get = get;
exports.post = post;
