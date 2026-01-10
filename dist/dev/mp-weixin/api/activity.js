"use strict";
var __defProp = Object.defineProperty;
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
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
const utils_request = require("../utils/request.js");
function getEnterpriseList(params = {}) {
  return utils_request.get("/mp/tk/enterprise/list", __spreadValues({}, params));
}
function getServiceList(params = {}) {
  return utils_request.get("/mp/tk/service/list", __spreadValues({}, params));
}
function getCompanyNewsList(params = {}) {
  return utils_request.get("/mp/tk/companyNews/list", __spreadValues({}, params));
}
function getCompanyNews(params = {}) {
  return utils_request.get("/mp/tk/companyNews/" + params.newsId, {});
}
function getcaseList(params = {}) {
  return utils_request.get("/mp/tk/case/list", __spreadValues({}, params));
}
function getsuccessCaseList(params = {}) {
  return utils_request.get("/mp/tk/successCase/list", __spreadValues({}, params));
}
function getTrackingStart(params = {}) {
  return utils_request.post("/mp/tk/successCase/tracking/start", __spreadValues({}, params));
}
function getTrackingEnd(params = {}) {
  const _a = params, { id } = _a, rest = __objRest(_a, ["id"]);
  return utils_request.post(`/mp/tk/successCase/tracking/end/${id}`, __spreadValues({}, rest));
}
function getProductIntroList(params = {}) {
  return utils_request.get("/mp/tk/productIntro/list", __spreadValues({}, params));
}
function getproductIntro(params = {}) {
  return utils_request.get("/mp/tk/productIntro/" + params.newsId, {});
}
function getservice(params = {}) {
  return utils_request.get("/mp/tk/service/" + params.newsId, {});
}
function getsuccessCase(params = {}) {
  return utils_request.get("/mp/tk/successCase/" + params.successCaseId, {});
}
exports.getCompanyNews = getCompanyNews;
exports.getCompanyNewsList = getCompanyNewsList;
exports.getEnterpriseList = getEnterpriseList;
exports.getProductIntroList = getProductIntroList;
exports.getServiceList = getServiceList;
exports.getTrackingEnd = getTrackingEnd;
exports.getTrackingStart = getTrackingStart;
exports.getcaseList = getcaseList;
exports.getproductIntro = getproductIntro;
exports.getservice = getservice;
exports.getsuccessCase = getsuccessCase;
exports.getsuccessCaseList = getsuccessCaseList;
