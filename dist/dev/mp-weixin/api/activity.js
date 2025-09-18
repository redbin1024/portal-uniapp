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
const utils_request = require("../utils/request.js");
function getActivityDetail(activityId) {
  return utils_request.get("mp/club/activity_detail", {
    activityId
  });
}
function getFeedPostPage(params = {}) {
  return utils_request.get("mp/feed_post/get_feed_post_page", __spreadValues({}, params));
}
exports.getActivityDetail = getActivityDetail;
exports.getFeedPostPage = getFeedPostPage;
