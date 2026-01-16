"use strict";
var define_process_env_default = { ENV_TYPE: "dev" };
const envConfig = {
  // 开发环境
  dev: {
    baseURL: "https://admin-api.xiaodingdang1.com/",
    appId: "wx573564cfaa3b019d",
    debug: true,
    vconsole: true,
    mock: false,
    title: "开发版"
  },
  // 测试环境
  test: {
    baseURL: "https://admin-api.xiaodingdang1.com/",
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
  const processEnv = typeof process !== "undefined" ? define_process_env_default : {};
  return processEnv.ENV_TYPE || "dev";
}
function getConfig() {
  const envType = getEnvType();
  return envConfig[envType] || envConfig.dev;
}
const config = getConfig();
exports.config = config;
