<template>
  <view class="app">
    <router-view />
  </view>
</template>

<script setup>
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";

onLaunch(() => {
  checkUpdate();
});

onShow(() => {
  console.log("App Show");
});

onHide(() => {
  console.log("App Hide");
});
/**
 * 检查小程序版本更新
 * 仅在微信小程序环境下有效
 */
const checkUpdate = () => {
  // #ifdef MP-WEIXIN
  if (uni.canIUse("getUpdateManager")) {
    const updateManager = uni.getUpdateManager();

    // 检查更新
    updateManager.onCheckForUpdate((res) => {
      console.log("版本更新检查:", res.hasUpdate ? "有新版本" : "无新版本");
    });

    // 新版本下载成功
    updateManager.onUpdateReady(() => {
      uni.showModal({
        title: "更新提示",
        content: "新版本已准备好,是否重启应用?",
        success: (res) => {
          if (res.confirm) {
            // 应用新版本并重启
            updateManager.applyUpdate();
          }
        },
      });
    });

    // 新版本下载失败
    updateManager.onUpdateFailed(() => {
      uni.showModal({
        title: "更新失败",
        content: "新版本下载失败,请删除当前小程序后重新搜索打开",
        showCancel: false,
      });
    });
  }
  // #endif
};
</script>

<style></style>
