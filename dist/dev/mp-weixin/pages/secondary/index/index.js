"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const videoSrc = common_vendor.ref(
      "http://cdn.xiaodingdang1.com/2025/10/23/8ee4114c7cf04a4185e5a0442e2cd2e0.mp4"
    );
    const isFullscreen = common_vendor.ref(false);
    let videoContext = null;
    let fullscreenVideoContext = null;
    common_vendor.onMounted(() => {
      videoContext = common_vendor.index.createVideoContext("myVideo");
      fullscreenVideoContext = common_vendor.index.createVideoContext("fullscreenVideo");
    });
    common_vendor.onUnmounted(() => {
      videoContext = null;
      fullscreenVideoContext = null;
    });
    const onVideoPlay = () => {
      enterFullscreen();
    };
    const enterFullscreen = () => {
      isFullscreen.value = true;
      if (fullscreenVideoContext) {
        fullscreenVideoContext.requestFullScreen({ direction: 0 });
        fullscreenVideoContext.play();
      }
    };
    const onFullscreenChange = (e) => {
      const { fullScreen } = e.detail;
      if (!fullScreen) {
        exitFullscreen();
      }
    };
    const exitFullscreen = () => {
      if (fullscreenVideoContext) {
        fullscreenVideoContext.pause();
        fullscreenVideoContext.seek(0);
      }
      isFullscreen.value = false;
      if (videoContext) {
        videoContext.pause();
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: videoSrc.value,
        b: common_vendor.o(onVideoPlay),
        c: isFullscreen.value
      }, isFullscreen.value ? {
        d: videoSrc.value,
        e: common_vendor.o(onFullscreenChange)
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0b50ab4e"]]);
wx.createPage(MiniProgramPage);
