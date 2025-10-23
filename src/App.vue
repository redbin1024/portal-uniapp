<template>
  <view class="app">
    <router-view />
  </view>
</template>

<script>
export default {
  name: "App",
  onLaunch: function () {
    console.log("App Launch");
    // 使用条件编译，确保仅在微信小程序等平台执行
    // #ifdef MP-WEIXIN
    const updateManager = uni.getUpdateManager();
    updateManager.onCheckForUpdate(function (res) {
      // 检查到新版本后的回调
      if (res.hasUpdate) {
        console.log("发现新版本");
      }
    });

    updateManager.onUpdateReady(function (res) {
      uni.showModal({
        title: "更新提示",
        content: "新版本已经准备好，是否重启应用？",
        success: function (res) {
          if (res.confirm) {
            // 用户点击确定，应用新版本并重启
            updateManager.applyUpdate();
          }
        },
      });
    });

    updateManager.onUpdateFailed(function (res) {
      // 新版本下载失败
      uni.showModal({
        title: "更新失败",
        content: "新版本下载失败，请您删除当前小程序后重新搜索打开。",
        showCancel: false,
      });
    });
    // #endif
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
};
</script>

<style></style>
