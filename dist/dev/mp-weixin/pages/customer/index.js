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
const utils_basePoint = require("../../utils/basePoint.js");
if (!Math) {
  mpHtml();
}
const mpHtml = () => "../../node-modules/uni-app-mp-html/components/mp-html/mp-html.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const serviceDescription = common_vendor.ref("");
    const richText = common_vendor.ref("");
    const serviceName = common_vendor.ref("");
    const getTracking = () => __async(this, null, function* () {
      yield utils_basePoint.basePoint.trackingStart({
        visitModule: "产品服务",
        visitContent: serviceName.value
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
    common_vendor.onMounted(() => {
      const pages = getCurrentPages();
      const currentPage = pages[pages.length - 1];
      if (currentPage.options && currentPage.options.item) {
        try {
          const decodedItem = decodeURIComponent(currentPage.options.item);
          let serviceDescription2 = JSON.parse(decodedItem);
          serviceName.value = serviceDescription2.serviceName;
          processContent(serviceDescription2.serviceDescription);
        } catch (e) {
          console.error("解析服务描述参数失败:", e);
          try {
            let serviceDescription2 = JSON.parse(currentPage.options.item);
            serviceName.value = serviceDescription2.serviceName;
            processContent(serviceDescription2.serviceDescription);
          } catch (e2) {
            serviceDescription.value = currentPage.options.item;
          }
        }
      }
      getTracking();
    });
    const processContent = (content) => {
      richText.value = content.replace(/<img[^>]*>/gi, function(match, capture) {
        return match.replace(/style=".*"/gi, "").replace(/style='.*'/gi, "");
      }).replace(/\<img/gi, '<img style="width:100%;height:auto;display:block;"');
    };
    const goBack = () => {
      common_vendor.index.navigateBack();
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(goBack),
        b: common_vendor.t(serviceName.value),
        c: _ctx.showHeaderBg ? 1 : "",
        d: common_vendor.o(_ctx.previewImage),
        e: common_vendor.p({
          content: richText.value
        }),
        f: serviceDescription.value
      }, serviceDescription.value ? {
        g: common_vendor.t(serviceDescription.value)
      } : {});
    };
  }
};
_sfc_main.__runtimeHooks = 1;
wx.createPage(_sfc_main);
