"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      videoUrl: "http://cdn.xiaodingdang1.com/2025/10/24/14761649ac8a42c693481f96a0b19917.mp4",
      autoplay: true,
      loop: false,
      isPlaying: false,
      isFullScreen: false,
      currentTime: 0,
      duration: 0,
      isLandscape: false,
      videoContext: null
      // 添加用于存储页面参数的数据
    };
  },
  onLoad(options) {
    if (options && options.url) {
      this.videoUrl = decodeURIComponent(options.url);
    }
    console.log(this.videoUrl);
  },
  onReady() {
    this.videoContext = common_vendor.index.createVideoContext("myVideo", this);
  },
  onShow() {
    common_vendor.index.onWindowResize((res) => {
      this.isLandscape = res.deviceOrientation === "landscape";
    });
  },
  methods: {
    // 切换播放状态
    togglePlay() {
      if (this.isPlaying) {
        this.videoContext.pause();
      } else {
        this.videoContext.play();
      }
    },
    // 切换全屏状态
    toggleFullScreen() {
      if (this.isFullScreen) {
        this.videoContext.exitFullScreen();
      } else {
        this.videoContext.requestFullScreen({
          direction: this.isLandscape ? 0 : 90
        });
      }
    },
    // 全屏状态变化回调
    onFullscreenchange(e) {
      this.isFullScreen = e.detail.fullScreen;
      if (!this.isFullScreen) {
        this.videoContext.pause();
      }
    },
    // 播放事件
    onPlay() {
      this.isPlaying = true;
    },
    // 暂停事件
    onPause() {
      this.isPlaying = false;
    },
    // 时间更新
    onTimeupdate(e) {
      this.currentTime = e.detail.currentTime;
    },
    // 视频元数据加载
    onLoadedmetadata(e) {
      this.duration = e.detail.duration;
    },
    // 进度条变化
    onSliderChange(e) {
      const seekTime = e.detail.value;
      this.videoContext.seek(seekTime);
    },
    // 格式化时间显示
    formatTime(seconds) {
      const min = Math.floor(seconds / 60);
      const sec = Math.floor(seconds % 60);
      return `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.videoUrl,
    b: $data.autoplay,
    c: $data.loop,
    d: common_vendor.o((...args) => $options.onPlay && $options.onPlay(...args)),
    e: common_vendor.o((...args) => $options.onPause && $options.onPause(...args)),
    f: common_vendor.o((...args) => $options.onTimeupdate && $options.onTimeupdate(...args)),
    g: common_vendor.o((...args) => $options.onLoadedmetadata && $options.onLoadedmetadata(...args)),
    h: common_vendor.o((...args) => $options.onFullscreenchange && $options.onFullscreenchange(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-0b50ab4e"]]);
wx.createPage(MiniProgramPage);
