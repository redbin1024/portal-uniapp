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
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
const common_vendor = require("../../../common/vendor.js");
const api_activity = require("../../../api/activity.js");
const utils_basePoint = require("../../../utils/basePoint.js");
if (!Math) {
  (RecentDynamic + MerchantCase + ServiceContent)();
}
const RecentDynamic = () => "./components/RecentDynamic.js";
const MerchantCase = () => "./components/MerchantCase.js";
const ServiceContent = () => "./components/ServiceContent.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const richText = common_vendor.ref("");
    const companyNewsList = common_vendor.ref([]);
    const successCaseList = common_vendor.ref([]);
    const truncateText = (text, max) => {
      if (!text)
        return "";
      return text.length > max ? text.substring(0, max) : text;
    };
    const processContent = (content) => {
      if (!content)
        return;
      let imgIndex = 0;
      richText.value = content.replace(/<img[^>]*>/gi, function(match) {
        match = match.replace(/style=".*"/gi, "").replace(/style='.*'/gi, "");
        return match.replace(
          /<img/gi,
          `<img data-index="${imgIndex++}" style="width:100%;height:auto;display:block;"`
        );
      });
    };
    const fetchServiceList = () => __async(this, null, function* () {
      var _a;
      try {
        const response = yield api_activity.getServiceList({ pageSize: 5, pageNum: 1 });
        if ((_a = response == null ? void 0 : response.rows) == null ? void 0 : _a[0]) {
          processContent(response.rows[0].serviceDescription);
        }
      } catch (error) {
        common_vendor.index.showToast({ title: "获取服务列表失败", icon: "none" });
      }
    });
    const fetchsuccessCaseList = () => __async(this, null, function* () {
      var _a;
      try {
        const response = yield api_activity.getsuccessCaseList({ pageSize: 6, pageNum: 1 });
        if (((_a = response == null ? void 0 : response.rows) == null ? void 0 : _a.length) > 0) {
          successCaseList.value = response.rows;
        }
      } catch (error) {
        common_vendor.index.showToast({ title: "获取案例列表失败", icon: "none" });
      }
    });
    const fetchCompanyNewsList = () => __async(this, null, function* () {
      var _a;
      try {
        const response = yield api_activity.getCompanyNewsList({
          pageSize: 4,
          pageNum: 1,
          type: 1
        });
        if (((_a = response == null ? void 0 : response.rows) == null ? void 0 : _a.length) > 0) {
          companyNewsList.value = response.rows.map((item, index) => __spreadProps(__spreadValues({}, item), {
            newsTitle: truncateText(
              item.newsTitle || item.title || `动态标题${index + 1}`,
              21
            ),
            newsContent: truncateText(
              item.newsContent || item.content || item.description || "",
              24
            ),
            newsImages: Array.isArray(item.newsImages) && item.newsImages.length ? item.newsImages : Array.isArray(item.images) && item.images.length ? item.images : item.image ? [item.image] : [
              "http://cdn.xiaodingdang1.com/2025/09/15/cbbd7e2aa0cd4016b59a3f31dbe46cb2.png"
            ],
            createTime: item.createTime || item.createDate || item.date || (/* @__PURE__ */ new Date()).toISOString(),
            newsId: item.newsId || item.id || index + 1
          }));
        }
      } catch (error) {
        common_vendor.index.showToast({ title: "获取动态信息失败", icon: "none" });
      }
    });
    const navigateToRecentDetails = (item) => {
      common_vendor.index.navigateTo({
        url: "/pages/recentdetails/index?newsId=" + item.newsId + "&newsTitle=" + item.newsTitle
      });
    };
    const goToRecentUpdates = () => {
      common_vendor.index.navigateTo({ url: "/pages/recentUpdatesnew/index" });
    };
    const goToCooperationcase = () => {
      common_vendor.index.navigateTo({ url: "/pages/case/index" });
    };
    const navigateToDetail = (item) => {
      common_vendor.index.navigateTo({
        url: "/pages/casedetails/index?successCaseId=" + item.successCaseId
      });
    };
    common_vendor.onMounted(() => {
      fetchCompanyNewsList();
      fetchsuccessCaseList();
      fetchServiceList();
    });
    common_vendor.onShow(() => __async(this, null, function* () {
      yield utils_basePoint.basePoint.trackingStart({
        visitModule: "获客",
        visitContent: "获客"
      });
    }));
    common_vendor.onHide(() => __async(this, null, function* () {
      const trackingId = common_vendor.index.getStorageSync("trackingId");
      if (trackingId) {
        yield utils_basePoint.basePoint.trackingEnd({ id: trackingId });
      }
    }));
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(navigateToRecentDetails),
        b: common_vendor.o(goToRecentUpdates),
        c: common_vendor.p({
          list: companyNewsList.value
        }),
        d: common_vendor.o(navigateToDetail),
        e: common_vendor.o(goToCooperationcase),
        f: common_vendor.p({
          list: successCaseList.value
        }),
        g: common_vendor.p({
          ["rich-text"]: richText.value
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d3baa155"]]);
wx.createPage(MiniProgramPage);
