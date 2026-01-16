"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "About",
  onShareAppMessage() {
    return {
      title: "产品服务",
      path: "/pages/productservice/index"
    };
  },
  onShareTimeline() {
    return {
      title: "产品服务",
      query: ""
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
  return {};
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-46391859"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
