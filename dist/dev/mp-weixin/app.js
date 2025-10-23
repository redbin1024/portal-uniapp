"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/secondary/homepage/index.js";
  "./pages/secondary/winthecustomer/index.js";
  "./pages/secondary/system/index.js";
  "./pages/homepage/index.js";
  "./pages/index/index.js";
  "./pages/about/about.js";
  "./pages/serve/index.js";
  "./pages/clientevaluation/index.js";
  "./pages/case/index.js";
  "./pages/casedetails/index.js";
  "./pages/waterfall-demo/index.js";
  "./pages/teamIntroduction/index.js";
  "./pages/productservice/index.js";
  "./pages/cooperationcase/index.js";
  "./pages/recentUpdates/index.js";
  "./pages/recentdetails/index.js";
  "./pages/recentUpdatesnew/index.js";
  "./pages/productservicenew/index.js";
  "./pages/customer/index.js";
  "./pages/dynamicdetails/index.js";
  "./pages/api-test/index.js";
  "./pages/firmdynamicdetails/index.js";
  "./pages/secondary/businesspartner/index.js";
  "./pages/secondary/index/index.js";
}
const _sfc_main = {
  name: "App",
  onLaunch: function() {
    console.log("App Launch");
    const updateManager = common_vendor.index.getUpdateManager();
    updateManager.onCheckForUpdate(function(res) {
      if (res.hasUpdate) {
        console.log("发现新版本");
      }
    });
    updateManager.onUpdateReady(function(res) {
      common_vendor.index.showModal({
        title: "更新提示",
        content: "新版本已经准备好，是否重启应用？",
        success: function(res2) {
          if (res2.confirm) {
            updateManager.applyUpdate();
          }
        }
      });
    });
    updateManager.onUpdateFailed(function(res) {
      common_vendor.index.showModal({
        title: "更新失败",
        content: "新版本下载失败，请您删除当前小程序后重新搜索打开。",
        showCancel: false
      });
    });
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
