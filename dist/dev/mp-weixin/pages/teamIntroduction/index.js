"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  onShareAppMessage() {
    return {
      title: "团队介绍",
      path: "/pages/teamIntroduction/index"
    };
  },
  onShareTimeline() {
    return {
      title: "团队介绍",
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
  return {
    a: common_vendor.f([1, 2, 3, 4], (item, index, i0) => {
      return {
        a: index
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-83f1c0bf"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
