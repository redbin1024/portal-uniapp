"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  name: "About",
  setup() {
    const handleBack = () => {
      common_vendor.index.switchTab({
        url: "/pages/index/index"
      });
    };
    return {
      handleBack
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_0,
    b: common_vendor.o((...args) => $setup.handleBack && $setup.handleBack(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-b5177f87"]]);
wx.createPage(MiniProgramPage);
