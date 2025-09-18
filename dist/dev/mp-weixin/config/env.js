"use strict";
const envConfig = {
  // 开发环境
  dev: {
    baseURL: "https://test-api.xiaodingdang1.com/",
    appId: "wx573564cfaa3b019d",
    debug: true,
    vconsole: true,
    mock: false,
    title: "开发版"
  },
  // 测试环境
  test: {
    baseURL: "https://test-api.xiaodingdang1.com/",
    appId: "wx573564cfaa3b019d",
    debug: true,
    vconsole: true,
    mock: false,
    title: "测试版"
  },
  // 预发布环境
  staging: {
    baseURL: "https://staging-api.xiaodingdang1.com/",
    appId: "wx573564cfaa3b019d",
    debug: false,
    vconsole: false,
    mock: false,
    title: "预发布版"
  },
  // 生产环境
  pro: {
    baseURL: "https://admin-api.xiaodingdang1.com/",
    appId: "wx573564cfaa3b019d",
    debug: false,
    vconsole: false,
    mock: false,
    title: "正式版"
  }
};
function getEnvType() {
  const processEnv = typeof process !== "undefined" ? process.env : {};
  return processEnv.ENV_TYPE || "dev";
}
function getConfig() {
  const envType = getEnvType();
  return envConfig[envType] || envConfig.dev;
}
const config = getConfig();
getEnvType();
exports.config = config;
