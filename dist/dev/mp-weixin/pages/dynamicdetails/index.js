"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const serviceDescription = common_vendor.ref("");
    const richText = common_vendor.ref("");
    common_vendor.onMounted(() => {
      const pages = getCurrentPages();
      const currentPage = pages[pages.length - 1];
      if (currentPage.options && currentPage.options.item) {
        try {
          const decodedItem = decodeURIComponent(currentPage.options.item);
          let serviceDescription2 = JSON.parse(decodedItem);
          processContent(serviceDescription2.newsContent);
        } catch (e) {
          console.error("解析服务描述参数失败:", e);
          try {
            let serviceDescription2 = JSON.parse(currentPage.options.item);
            processContent(serviceDescription2.newsContent);
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
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: richText.value,
        b: serviceDescription.value
      }, serviceDescription.value ? {} : {});
    };
  }
};
wx.createPage(_sfc_main);
