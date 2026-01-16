"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  name: "About",
  onShareAppMessage() {
    return {
      title: "关于我们",
      path: "/pages/about/about"
    };
  },
  onShareTimeline() {
    return {
      title: "关于我们",
      query: ""
    };
  },
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
if (!Array) {
  const _easycom_BackHome2 = common_vendor.resolveComponent("BackHome");
  _easycom_BackHome2();
}
const _easycom_BackHome = () => "../../components/BackHome/BackHome.js";
if (!Math) {
  _easycom_BackHome();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_0,
    b: common_vendor.o((...args) => $setup.handleBack && $setup.handleBack(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-b5177f87"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
