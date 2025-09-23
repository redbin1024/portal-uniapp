"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/homepage/index.js";
  "./pages/index/index.js";
  "./pages/about/about.js";
  "./pages/serve/index.js";
  "./pages/clientevaluation/index.js";
  "./pages/case/index.js";
  "./pages/casedetails/index.js";
  "./pages/teamIntroduction/index.js";
  "./pages/productservice/index.js";
}
const _sfc_main = {
  name: "App",
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
if (!Array) {
  const _component_router_view = common_vendor.resolveComponent("router-view");
  _component_router_view();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {};
}
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
