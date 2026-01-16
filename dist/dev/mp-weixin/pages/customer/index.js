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
const api_activity = require("../../api/activity.js");
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
    const serviceDescription = common_vendor.ref("");
    const richText = common_vendor.ref("");
    const serviceName = common_vendor.ref("");
    const currentServiceId = common_vendor.ref("");
    const logoSrc = common_vendor.ref("");
    const enterinto = common_vendor.ref(1);
    common_vendor.onShareAppMessage(() => {
      return {
        title: serviceName.value,
        path: `/pages/customer/index?serviceId=${currentServiceId.value}`
      };
    });
    common_vendor.onShareTimeline(() => {
      return {
        title: serviceName.value,
        query: `serviceId=${currentServiceId.value}`
      };
    });
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
    common_vendor.onLoad((options) => {
      const pages = getCurrentPages();
      if (pages.length === 1) {
        logoSrc.value = "http://cdn.xiaodingdang1.com/2026/01/13/93e1ddecd5504aacbb31d21afc6bda1f.png";
        enterinto.value = 1;
      } else {
        logoSrc.value = "http://cdn.xiaodingdang1.com/2025/10/22/5f4330db13db494d938cb202b88dfaa2.png";
        enterinto.value = 2;
      }
      if (options && options.serviceId) {
        const serviceId = options.serviceId;
        currentServiceId.value = serviceId;
        api_activity.getservice({ newsId: serviceId }).then((res) => {
          if (res && res.data) {
            serviceName.value = res.data.serviceName;
            processContent(res.data.serviceDescription);
          }
        });
      }
      getTracking();
    });
    const processContent = (content) => {
      richText.value = content.replace(/<img[^>]*>/gi, function(match, capture) {
        return match.replace(/style=".*"/gi, "").replace(/style='.*'/gi, "");
      }).replace(/\<img/gi, '<img style="width:100%;height:auto;display:block;"');
    };
    const goBack = () => {
      const pages = getCurrentPages();
      if (pages.length > 1) {
        common_vendor.index.navigateBack();
      } else {
        common_vendor.index.switchTab({
          url: "/pages/secondary/homepage/index"
        });
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: enterinto.value === 2
      }, enterinto.value === 2 ? {
        b: logoSrc.value,
        c: common_vendor.o(goBack)
      } : {}, {
        d: enterinto.value === 1
      }, enterinto.value === 1 ? {
        e: logoSrc.value,
        f: common_vendor.o(goBack)
      } : {}, {
        g: common_vendor.t(serviceName.value),
        h: _ctx.showHeaderBg ? 1 : "",
        i: common_vendor.o(_ctx.previewImage),
        j: common_vendor.p({
          content: richText.value
        }),
        k: serviceDescription.value
      }, serviceDescription.value ? {
        l: common_vendor.t(serviceDescription.value)
      } : {});
    };
  }
};
_sfc_main.__runtimeHooks = 7;
wx.createPage(_sfc_main);
