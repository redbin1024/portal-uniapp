"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      coverImage: "",
      videoUrl: "http://cdn.xiaodingdang1.com/2025/10/24/14761649ac8a42c693481f96a0b19917.mp4",
      autoplay: true,
      loop: false,
      isPlaying: false,
      isFullScreen: false,
      currentTime: 0,
      duration: 0,
      isLandscape: false,
      videoContext: null,
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
      horizontalSwipeActive: false
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
        if (e && typeof e.preventDefault === "function") {
          e.preventDefault();
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
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
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
    l: common_vendor.s($options.dragVideoStyle),
    m: common_vendor.s($options.dragStyle),
    n: common_vendor.o((...args) => $options.onTouchStart && $options.onTouchStart(...args)),
    o: common_vendor.o((...args) => $options.onTouchMove && $options.onTouchMove(...args)),
    p: common_vendor.o((...args) => $options.onTouchEnd && $options.onTouchEnd(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-0b50ab4e"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
