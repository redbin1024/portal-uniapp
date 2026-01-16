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
const utils_basePoint = require("../../utils/basePoint.js");
if (!Array) {
  const _easycom_BackHome2 = common_vendor.resolveComponent("BackHome");
  _easycom_BackHome2();
}
const _easycom_BackHome = () => "../../components/BackHome/BackHome.js";
if (!Math) {
  (mpHtml + _easycom_BackHome)();
}
const mpHtml = () => "../../node-modules/uni-app-mp-html/components/mp-html/mp-html.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    common_vendor.onShareAppMessage(() => {
      return {
        title: customerName.value || "商家案例",
        path: `/pages/casedetails/index?successCaseId=${currentCaseId.value}`
      };
    });
    common_vendor.onShareTimeline(() => {
      return {
        title: customerName.value || "商家案例",
        query: `successCaseId=${currentCaseId.value}`
      };
    });
    const richText = common_vendor.ref("");
    const loading = common_vendor.ref(false);
    const error = common_vendor.ref(null);
    const customerName = common_vendor.ref("");
    const currentCaseId = common_vendor.ref("");
    common_vendor.ref("1951194533574815746");
    const getTracking = (customerName2) => __async(this, null, function* () {
      yield utils_basePoint.basePoint.trackingStart({
        visitModule: "商家案例",
        visitContent: customerName2
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
      common_vendor.index.showShareMenu({
        withShareTicket: true,
        menus: ["shareAppMessage", "shareTimeline"]
      });
      getPageParams();
    });
    const getPageParams = () => __async(this, null, function* () {
      const pages = getCurrentPages();
      const currentPage = pages[pages.length - 1];
      const options = currentPage.options || {};
      if (options.successCaseId) {
        currentCaseId.value = options.successCaseId;
        loading.value = true;
        try {
          const res = yield api_activity.getsuccessCase({
            successCaseId: options.successCaseId
          });
          const data = res.data || res;
          customerName.value = data.customerName || "";
          if (data && data.caseDetails) {
            processContent(data.caseDetails);
            if (data.customerName) {
              getTracking(data.customerName);
            }
          }
        } catch (err) {
          console.error("获取案例详情失败:", err);
          error.value = "加载失败";
        } finally {
          loading.value = false;
        }
      }
    });
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
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
