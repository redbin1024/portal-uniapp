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
require("../../utils/request.js");
const utils_basePoint = require("../../utils/basePoint.js");
if (!Math) {
  mpHtml();
}
const mpHtml = () => "../../node-modules/uni-app-mp-html/components/mp-html/mp-html.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const richText = common_vendor.ref("");
    const loading = common_vendor.ref(false);
    const error = common_vendor.ref(null);
    common_vendor.ref("1951194533574815746");
    const getTracking = (customerName) => __async(this, null, function* () {
      yield utils_basePoint.basePoint.trackingStart({
        visitModule: "商家案例",
        visitContent: customerName
      });
    });
    common_vendor.onUnload(() => __async(this, null, function* () {
      let trackingId = common_vendor.index.getStorageSync("trackingId");
      if (trackingId) {
        yield utils_basePoint.basePoint.trackingEnd({
          id: trackingId
        });
      }
    }));
    const processContent = (content) => {
      richText.value = content.replace(/<img[^>]*>/gi, function(match, capture) {
        return match.replace(/style=".*"/gi, "").replace(/style='.*'/gi, "");
      }).replace(/\<img/gi, '<img style="width:100%;height:auto;display:block;"');
    };
    common_vendor.onLoad((options) => {
      getPageParams();
    });
    const getPageParams = () => {
      const pages = getCurrentPages();
      const currentPage = pages[pages.length - 1];
      if (currentPage.options && currentPage.options.item) {
        const decodedItem = decodeURIComponent(currentPage.options.item);
        let detailDatas = JSON.parse(decodedItem);
        processContent(detailDatas.caseDetails);
        getTracking(detailDatas.customerName);
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: loading.value
      }, loading.value ? {} : error.value ? {
        c: common_vendor.t(error.value)
      } : {
        d: common_vendor.o(_ctx.previewImage),
        e: common_vendor.p({
          content: richText.value
        })
      }, {
        b: error.value
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-49e065b9"]]);
wx.createPage(MiniProgramPage);
