"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const serviceDescription = common_vendor.ref("");
    const richText = common_vendor.ref("");
    const serviceName = common_vendor.ref("");
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
        d: richText.value,
        e: serviceDescription.value
      }, serviceDescription.value ? {
        f: common_vendor.t(serviceDescription.value)
      } : {});
    };
  }
};
wx.createPage(_sfc_main);
