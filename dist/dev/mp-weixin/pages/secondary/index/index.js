"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      coverImage: "",
      videoUrl: "",
      autoplay: true,
      loop: false,
      isPlaying: false,
      isFullScreen: false,
      currentTime: 0,
      duration: 0,
      isLandscape: false,
      videoContext: null,
      // 倍速相关
      playbackRate: 1,
      playbackRates: [0.5, 1, 1.25, 1.5, 2],
      // 下拖返回相关状态
      dragStartY: 0,
      dragTranslateY: 0,
      dragTransitionEnabled: false,
      dragActivated: false,
      dragThreshold: 200,
      lastMoveY: 0,
      // 左右滑动相关状态（用于避免进度条加速/拖动）
      touchStartX: 0,
      touchStartY: 0,
      touchEndX: 0,
      touchEndY: 0,
      isDragging: false,
      horizontalSwipeActive: false,
      // 横向拖拽进度相关
      dragSeekActive: false,
      seekInitialTime: 0,
      seekPreviewTime: 0,
      windowWidth: 375
      // 添加用于存储页面参数的数据
    };
  },
  onLoad(options) {
    if (options && options.url) {
      this.videoUrl = decodeURIComponent(options.url);
      this.coverImage = decodeURIComponent(options.coverImage);
    }
  },
  onReady() {
    this.videoContext = common_vendor.index.createVideoContext("myVideo", this);
    try {
      const info = common_vendor.index.getSystemInfoSync && common_vendor.index.getSystemInfoSync();
      if (info && info.windowWidth)
        this.windowWidth = info.windowWidth;
    } catch (e) {
    }
    try {
      if (this.videoContext && typeof this.videoContext.playbackRate === "function") {
        this.videoContext.playbackRate(this.playbackRate);
      } else {
        const el = typeof document !== "undefined" && document.getElementById && document.getElementById("myVideo");
        if (el)
          el.playbackRate = this.playbackRate;
      }
    } catch (e) {
    }
  },
  onShow() {
    common_vendor.index.onWindowResize((res) => {
      this.isLandscape = res.deviceOrientation === "landscape";
    });
  },
  methods: {
    // 分享当前视频到微信好友/群聊
    onShareAppMessage(res) {
      const sharePath = "/pages/secondary/index/index?url=" + encodeURIComponent(this.videoUrl || "");
      return {
        path: sharePath,
        imageUrl: this.coverImage
      };
    },
    // 返回上一页，若无历史则跳转到首页 Tab
    handleBack() {
      const pages = (getCurrentPages == null ? void 0 : getCurrentPages()) || [];
      if (pages.length > 1) {
        common_vendor.index.navigateBack({ delta: 1 });
      } else {
        common_vendor.index.switchTab({ url: "/pages/secondary/homepage/index" });
      }
    },
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
    // 点击视频区域时，若正在播放则暂停并显示居中播放按钮
    onVideoClick() {
      try {
        if (this.isPlaying && this.videoContext) {
          this.videoContext.pause();
        }
      } catch (err) {
        const el = typeof document !== "undefined" && document.getElementById && document.getElementById("myVideo");
        if (el && !el.paused) {
          el.pause();
        }
      }
    },
    // 进度条变化
    onSliderChange(e) {
      const seekTime = e.detail.value;
      this.videoContext.seek(seekTime);
    },
    // 进度条拖动中（实时预览与 seek）
    onSliderChanging(e) {
      const seekTime = e.detail.value;
      this.seekPreviewTime = seekTime;
      this.dragSeekActive = true;
      try {
        this.videoContext && this.videoContext.seek(seekTime);
      } catch (err) {
      }
    },
    // 格式化时间显示
    formatTime(seconds) {
      const min = Math.floor(seconds / 60);
      const sec = Math.floor(seconds % 60);
      return `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
    },
    // 修改倍速
    changeRate(rate) {
      this.playbackRate = rate;
      try {
        if (this.videoContext && typeof this.videoContext.playbackRate === "function") {
          this.videoContext.playbackRate(rate);
        } else {
          const el = typeof document !== "undefined" && document.getElementById && document.getElementById("myVideo");
          if (el)
            el.playbackRate = rate;
        }
        common_vendor.index.showToast({ title: `已切换为${rate}倍速`, icon: "none" });
      } catch (e) {
        common_vendor.index.showToast({ title: "当前端不支持倍速", icon: "none" });
      }
    },
    // 下拉选择倍速事件
    onRatePickerChange(e) {
      var _a, _b, _c;
      const index = Array.isArray((_a = e == null ? void 0 : e.detail) == null ? void 0 : _a.value) ? e.detail.value[0] : (_b = e == null ? void 0 : e.detail) == null ? void 0 : _b.value;
      const rate = (_c = this.playbackRates[index]) != null ? _c : this.playbackRate;
      this.changeRate(rate);
    },
    // 触摸开始 - 记录起点
    onTouchStart(e) {
      const touch = e.touches && e.touches[0];
      if (!touch)
        return;
      this.touchStartX = touch.clientX || touch.pageX || 0;
      this.touchStartY = touch.clientY || touch.pageY || 0;
      this.touchEndX = this.touchStartX;
      this.touchEndY = this.touchStartY;
      this.isDragging = true;
      this.horizontalSwipeActive = false;
      this.seekInitialTime = this.currentTime || 0;
      this.seekPreviewTime = this.seekInitialTime;
      this.dragSeekActive = false;
      if (!this.isFullScreen) {
        this.dragStartY = this.touchStartY;
        this.lastMoveY = this.dragStartY;
        this.dragActivated = true;
        this.dragTransitionEnabled = false;
      } else {
        this.dragActivated = false;
      }
    },
    // 触摸移动 - 计算下拖位移并跟随
    onTouchMove(e) {
      const touch = e.touches && e.touches[0];
      if (!touch)
        return;
      const currentX = touch.clientX || touch.pageX || 0;
      const currentY = touch.clientY || touch.pageY || 0;
      this.touchEndX = currentX;
      this.touchEndY = currentY;
      const deltaX = currentX - this.touchStartX;
      const deltaY = currentY - this.touchStartY;
      const isMostlyHorizontal = Math.abs(deltaX) > 18 && Math.abs(deltaY) < 12 || Math.abs(deltaX) > Math.abs(deltaY) * 2;
      if (isMostlyHorizontal) {
        this.horizontalSwipeActive = true;
        const width = this.windowWidth || 375;
        const ratio = width > 0 ? deltaX / width : 0;
        let nextTime = (this.seekInitialTime || 0) + ratio * (this.duration || 0);
        if (!isFinite(nextTime))
          nextTime = 0;
        nextTime = Math.max(0, Math.min(nextTime, this.duration || 0));
        this.seekPreviewTime = nextTime;
        this.dragSeekActive = true;
        if (e && typeof e.preventDefault === "function") {
          e.preventDefault();
        }
        try {
          this.videoContext && this.videoContext.seek(nextTime);
        } catch (err) {
        }
        return;
      }
      if (!this.isFullScreen && this.dragActivated) {
        const deltaYDown = currentY - this.dragStartY;
        const translateY = deltaYDown > 0 ? deltaYDown : 0;
        this.dragTranslateY = translateY;
        this.lastMoveY = currentY;
      }
    },
    // 触摸结束 - 阈值判断执行返回或回弹
    onTouchEnd(e) {
      if (this.horizontalSwipeActive) {
        const deltaX = (this.touchEndX || 0) - (this.touchStartX || 0);
        const deltaY = Math.abs(
          (this.touchEndY || 0) - (this.touchStartY || 0)
        );
        if (this.dragSeekActive) {
          this.dragSeekActive = false;
        }
        if (this.isFullScreen && Math.abs(deltaX) > 50 && deltaY < 30) {
          this.videoContext && this.videoContext.exitFullScreen();
        }
        this.horizontalSwipeActive = false;
        this.isDragging = false;
        return;
      }
      if (!this.isFullScreen && this.dragActivated) {
        this.dragActivated = false;
        if (this.dragTranslateY >= this.dragThreshold) {
          const pages = (getCurrentPages == null ? void 0 : getCurrentPages()) || [];
          if (pages.length > 1) {
            common_vendor.index.navigateBack({ delta: 1 });
          } else {
            common_vendor.index.switchTab({ url: "/pages/secondary/homepage/index" });
          }
          this.dragTranslateY = 0;
          this.dragTransitionEnabled = false;
        } else {
          this.dragTransitionEnabled = true;
          this.dragTranslateY = 0;
          setTimeout(() => {
            this.dragTransitionEnabled = false;
          }, 200);
        }
      }
      this.isDragging = false;
    }
  },
  computed: {
    // 页面位移样式
    dragStyle() {
      const t = this.dragTranslateY || 0;
      const transition = this.dragTransitionEnabled ? "transform 0.2s ease-out" : "none";
      return `transform: translate3d(0, ${t}px, 0); transition: ${transition};`;
    }
  },
  computed: {
    // 页面位移样式
    dragStyle() {
      const t = this.dragTranslateY || 0;
      const transition = this.dragTransitionEnabled ? "transform 0.2s ease-out" : "none";
      return `transform: translate3d(0, ${t}px, 0); transition: ${transition};`;
    },
    // 视频容器的缩放、圆角、阴影动画
    dragVideoStyle() {
      const y = this.dragTranslateY || 0;
      const progress = Math.min(Math.max(y / 240, 0), 1);
      const scale = 1 - 0.08 * progress;
      const radius = 24 * progress;
      const shadowOpacity = 0.22 * progress;
      const transition = this.dragTransitionEnabled ? "transform 0.2s ease-out, border-radius 0.2s ease-out, box-shadow 0.2s ease-out" : "none";
      return `transform: scale(${scale}); border-radius: ${radius}rpx; box-shadow: 0 20rpx 60rpx rgba(0,0,0,${shadowOpacity}); overflow: hidden; transition: ${transition};`;
    },
    // 顶部提示的透明度与位移
    dragHintStyle() {
      const y = this.dragTranslateY || 0;
      const progress = Math.min(Math.max(y / 240, 0), 1);
      const offsetY = Math.round(y * 0.15);
      const transition = this.dragTransitionEnabled ? "opacity 0.2s ease-out, transform 0.2s ease-out" : "none";
      return `opacity: ${0.9 * progress}; transform: translate(-50%, ${offsetY}px); transition: ${transition};`;
    },
    // 提示文案
    hintText() {
      return this.dragTranslateY >= this.dragThreshold ? "松手返回上一页" : "下拉返回上一页";
    },
    // 倍速标签
    playbackRateLabels() {
      return this.playbackRates.map((r) => `${r}x`);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o((...args) => $options.handleBack && $options.handleBack(...args)),
    b: common_vendor.t($options.hintText),
    c: common_vendor.s($options.dragHintStyle),
    d: $data.videoUrl,
    e: $data.autoplay,
    f: $data.loop,
    g: common_vendor.o((...args) => $options.onPlay && $options.onPlay(...args)),
    h: common_vendor.o((...args) => $options.onPause && $options.onPause(...args)),
    i: common_vendor.o((...args) => $options.onTimeupdate && $options.onTimeupdate(...args)),
    j: common_vendor.o((...args) => $options.onLoadedmetadata && $options.onLoadedmetadata(...args)),
    k: common_vendor.o((...args) => $options.onFullscreenchange && $options.onFullscreenchange(...args)),
    l: common_vendor.o((...args) => $options.onVideoClick && $options.onVideoClick(...args)),
    m: $data.dragSeekActive
  }, $data.dragSeekActive ? {
    n: common_vendor.t($options.formatTime($data.seekPreviewTime)),
    o: common_vendor.t($options.formatTime($data.duration)),
    p: $data.seekPreviewTime / ($data.duration || 1) * 100 + "%"
  } : {}, {
    q: !$data.isPlaying
  }, !$data.isPlaying ? {
    r: common_vendor.o((...args) => $options.togglePlay && $options.togglePlay(...args))
  } : {}, {
    s: common_vendor.t($data.playbackRate),
    t: $options.playbackRateLabels,
    v: common_vendor.o((...args) => $options.onRatePickerChange && $options.onRatePickerChange(...args)),
    w: common_vendor.s($options.dragVideoStyle),
    x: common_vendor.s($options.dragStyle),
    y: common_vendor.o((...args) => $options.onTouchStart && $options.onTouchStart(...args)),
    z: common_vendor.o((...args) => $options.onTouchMove && $options.onTouchMove(...args)),
    A: common_vendor.o((...args) => $options.onTouchEnd && $options.onTouchEnd(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-0b50ab4e"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
