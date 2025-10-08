"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ Object.assign({
  name: "RecentDetails"
}, {
  __name: "index",
  setup(__props) {
    const richText = common_vendor.ref("");
    const detailData = common_vendor.ref({});
    const getPageParams = () => {
      const pages = getCurrentPages();
      const currentPage = pages[pages.length - 1];
      if (currentPage.options && currentPage.options.item) {
        const decodedItem = decodeURIComponent(currentPage.options.item);
        let detailDatas = JSON.parse(decodedItem);
        processContent(detailDatas.newDetails);
        detailData.value = detailDatas;
      }
    };
    const processContent = (content) => {
      richText.value = content.replace(/<img[^>]*>/gi, function(match, capture) {
        return match.replace(/style=".*"/gi, "").replace(/style='.*'/gi, "");
      }).replace(/\<img/gi, '<img style="width:100%;height:auto;display:block;"');
    };
    common_vendor.onMounted(() => {
      getPageParams();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(detailData.value.newsTitle),
        b: common_vendor.t(detailData.value.newsContent),
        c: richText.value
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-eede22fe"]]);
wx.createPage(MiniProgramPage);
