"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "About",
  onShareAppMessage() {
    return {
      title: "我们的服务",
      path: "/pages/serve/index"
    };
  },
  onShareTimeline() {
    return {
      title: "我们的服务",
      query: ""
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {};
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-2f4948ca"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
