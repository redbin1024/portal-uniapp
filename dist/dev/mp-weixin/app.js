"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/secondary/homepage/index.js";
  "./pages/secondary/winthecustomer/index.js";
  "./pages/secondary/system/index.js";
  "./pages/index/index.js";
  "./pages/case/index.js";
  "./pages/casedetails/index.js";
  "./pages/recentdetails/index.js";
  "./pages/recentUpdatesnew/index.js";
  "./pages/customer/index.js";
  "./pages/firmdynamicdetails/index.js";
  "./pages/secondary/businesspartner/index.js";
  "./pages/secondary/index/index.js";
  "./pages/secondary/issueDetails/index.js";
  "./pages/secondary/issueList/index.js";
}
if (!Array) {
  const _component_router_view = common_vendor.resolveComponent("router-view");
  _component_router_view();
}
const _sfc_main = {
  __name: "App",
  setup(__props) {
    common_vendor.onLaunch(() => {
      checkUpdate();
    });
    common_vendor.onShow(() => {
      console.log("App Show");
    });
    common_vendor.onHide(() => {
      console.log("App Hide");
    });
    const checkUpdate = () => {
      if (common_vendor.index.canIUse("getUpdateManager")) {
        const updateManager = common_vendor.index.getUpdateManager();
        updateManager.onCheckForUpdate((res) => {
          console.log("版本更新检查:", res.hasUpdate ? "有新版本" : "无新版本");
        });
        updateManager.onUpdateReady(() => {
          common_vendor.index.showModal({
            title: "更新提示",
            content: "新版本已准备好,是否重启应用?",
            success: (res) => {
              if (res.confirm) {
                updateManager.applyUpdate();
              }
            }
          });
        });
        updateManager.onUpdateFailed(() => {
          common_vendor.index.showModal({
            title: "更新失败",
            content: "新版本下载失败,请删除当前小程序后重新搜索打开",
            showCancel: false
          });
        });
      }
    };
    return (_ctx, _cache) => {
      return {};
    };
  }
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
