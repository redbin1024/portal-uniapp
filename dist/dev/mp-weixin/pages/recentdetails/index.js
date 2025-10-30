"use strict";
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
const common_vendor = require("../../common/vendor.js");
const api_activity = require("../../api/activity.js");
if (!Math) {
  common_vendor.unref(mpHtml)();
}
const mpHtml = () => "../../node-modules/mp-html/dist/uni-app/components/mp-html/mp-html.js";
const _sfc_main = /* @__PURE__ */ Object.assign({ name: "RecentDetails" }, {
  __name: "index",
  setup(__props, { expose: __expose }) {
    const richText = common_vendor.ref("");
    const detailData = common_vendor.ref({});
    const CompanyNews = (newsId) => __async(this, null, function* () {
      try {
        const response = yield api_activity.getCompanyNews({ newsId });
        if (response && response.data) {
          detailData.value = response.data;
          processContent(response.data.newDetails);
        }
      } catch (error) {
        common_vendor.index.showToast({ title: "获取企业列表失败", icon: "none" });
      }
    });
    const getPageParams = () => {
      const pages = getCurrentPages();
      const currentPage = pages[pages.length - 1];
      if (currentPage.options && currentPage.options.newsId) {
        CompanyNews(currentPage.options.newsId);
      }
    };
    const processContent = (content) => {
      richText.value = content.replace(/<img[^>]*>/gi, function(match, capture) {
        return match.replace(/style=".*"/gi, "").replace(/style='.*'/gi, "");
      }).replace(/\<img/gi, '<img style="width:100%;height:auto;display:block;"');
    };
    const previewImage = (e) => {
      common_vendor.index.previewImage({
        current: e.detail.src,
        urls: e.detail.imgs
      });
    };
    __expose({ previewImage });
    common_vendor.onMounted(() => {
      getPageParams();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(detailData.value.newsTitle),
        b: common_vendor.t(detailData.value.newsContent),
        c: common_vendor.o(previewImage),
        d: common_vendor.p({
          content: richText.value
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-eede22fe"]]);
wx.createPage(MiniProgramPage);
