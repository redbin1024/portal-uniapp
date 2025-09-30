"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ Object.assign({
  name: "RecentDetails"
}, {
  __name: "index",
  setup(__props) {
    const detailData = common_vendor.ref({});
    const getPageParams = () => {
      const pages = getCurrentPages();
      const currentPage = pages[pages.length - 1];
      if (currentPage.options && currentPage.options.item) {
        const decodedItem = decodeURIComponent(currentPage.options.item);
        let detailDatas = JSON.parse(decodedItem);
        detailData.value = detailDatas;
      }
    };
    common_vendor.onMounted(() => {
      getPageParams();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(detailData.value.newsTitle),
        b: detailData.value.newsImages[0],
        c: common_vendor.t(detailData.value.newsContent)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-b023a030"]]);
wx.createPage(MiniProgramPage);
