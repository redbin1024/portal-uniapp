"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      coverImage: "",
      videoUrl: "",
      autoplay: true,
      isPlaying: false,
      currentTime: 0,
      duration: 0,
      showControls: true,
      controlsTimer: null,
      // Playback Rate
      playbackRate: 1,
      playbackRates: [1, 1.25, 1.5, 2, 0.5],
      // Drag to Close Logic
      dragStartY: 0,
      dragTranslateY: 0,
      dragActivated: false,
      dragThreshold: 150,
      isDragging: false,
      videoContext: null,
      isSliderChanging: false
      // To prevent timeupdate from jumping slider while dragging
    };
  },
  computed: {
    dragStyle() {
      if (this.dragTranslateY > 0) {
        const scale = 1 - this.dragTranslateY / 1e3;
        return {
          transform: `translateY(${this.dragTranslateY}px) scale(${Math.max(
            0.8,
            scale
          )})`,
          opacity: 1 - this.dragTranslateY / 600,
          transition: this.isDragging ? "none" : "all 0.3s ease",
          backgroundColor: `rgba(0,0,0,${Math.max(
            0,
            1 - this.dragTranslateY / 300
          )})`
        };
      }
      return {
        backgroundColor: "#000"
      };
    }
  },
  onLoad(options) {
    if (options && options.url) {
      this.videoUrl = decodeURIComponent(options.url);
      this.coverImage = options.coverImage ? decodeURIComponent(options.coverImage) : "";
    }
  },
  onReady() {
    this.videoContext = common_vendor.index.createVideoContext("myVideo", this);
    this.resetControlsTimer();
  },
  methods: {
    handleBack() {
      this.showControls = true;
      this.resetControlsTimer();
      const pages = getCurrentPages();
      if (pages.length > 1) {
        common_vendor.index.navigateBack({ delta: 1 });
      } else {
        common_vendor.index.switchTab({ url: "/pageA/home" });
      }
    },
    togglePlay() {
      if (this.isPlaying) {
        this.videoContext.pause();
      } else {
        this.videoContext.play();
      }
    },
    onPlay() {
      this.isPlaying = true;
      this.showControls = true;
      this.resetControlsTimer();
    },
    onPause() {
      this.isPlaying = false;
      this.showControls = true;
      if (this.controlsTimer)
        clearTimeout(this.controlsTimer);
    },
    onEnded() {
      this.isPlaying = false;
      this.showControls = true;
    },
    onTimeupdate(e) {
      if (!this.isSliderChanging) {
        this.currentTime = e.detail.currentTime;
      }
    },
    onLoadedmetadata(e) {
      this.duration = e.detail.duration;
    },
    onVideoClick() {
      this.togglePlay();
    },
    toggleControls() {
      this.showControls = !this.showControls;
      if (this.showControls && this.isPlaying) {
        this.resetControlsTimer();
      }
    },
    resetControlsTimer() {
      if (this.controlsTimer)
        clearTimeout(this.controlsTimer);
      this.controlsTimer = setTimeout(() => {
        if (this.isPlaying) {
          this.showControls = false;
        }
      }, 3e3);
    },
    formatTime(seconds) {
      const min = Math.floor(seconds / 60);
      const sec = Math.floor(seconds % 60);
      return `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
    },
    toggleRate() {
      const idx = this.playbackRates.findIndex((r) => r === this.playbackRate);
      const nextIndex = (idx + 1) % this.playbackRates.length;
      this.playbackRate = this.playbackRates[nextIndex];
      this.videoContext.playbackRate(this.playbackRate);
      common_vendor.index.showToast({ title: `倍速: ${this.playbackRate}x`, icon: "none" });
    },
    onSliderChanging(e) {
      this.isSliderChanging = true;
      this.currentTime = e.detail.value;
      this.showControls = true;
      this.resetControlsTimer();
    },
    onSliderChange(e) {
      this.isSliderChanging = false;
      this.currentTime = e.detail.value;
      this.videoContext.seek(this.currentTime);
      this.videoContext.play();
      this.isPlaying = true;
      this.resetControlsTimer();
    },
    // Touch Logic for Pull Down to Close
    onTouchStart(e) {
      if (e.touches.length === 1) {
        this.dragStartY = e.touches[0].clientY;
        this.dragActivated = true;
        this.isDragging = true;
      }
    },
    onTouchMove(e) {
      if (this.dragActivated && e.touches.length === 1) {
        const currentY = e.touches[0].clientY;
        const deltaY = currentY - this.dragStartY;
        if (deltaY > 0) {
          this.dragTranslateY = deltaY;
        }
      }
    },
    onTouchEnd(e) {
      this.isDragging = false;
      if (this.dragTranslateY > this.dragThreshold) {
        this.handleBack();
      } else {
        this.dragTranslateY = 0;
      }
      this.dragActivated = false;
    }
  }
};
if (!Array) {
  const _component_uni_icons = common_vendor.resolveComponent("uni-icons");
  _component_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.videoUrl,
    b: $data.coverImage,
    c: $data.autoplay,
    d: common_vendor.o((...args) => $options.onPlay && $options.onPlay(...args)),
    e: common_vendor.o((...args) => $options.onPause && $options.onPause(...args)),
    f: common_vendor.o((...args) => $options.onTimeupdate && $options.onTimeupdate(...args)),
    g: common_vendor.o((...args) => $options.onLoadedmetadata && $options.onLoadedmetadata(...args)),
    h: common_vendor.o((...args) => $options.onEnded && $options.onEnded(...args)),
    i: common_vendor.o((...args) => $options.onVideoClick && $options.onVideoClick(...args)),
    j: !$data.isPlaying
  }, !$data.isPlaying ? {
    k: common_vendor.o((...args) => $options.togglePlay && $options.togglePlay(...args))
  } : {}, {
    l: common_vendor.p({
      type: $data.isPlaying ? "pause-filled" : "play-filled",
      size: "28",
      color: "#fff"
    }),
    m: common_vendor.o((...args) => $options.togglePlay && $options.togglePlay(...args)),
    n: common_vendor.t($options.formatTime($data.currentTime)),
    o: common_vendor.t($options.formatTime($data.duration)),
    p: $data.currentTime,
    q: $data.duration,
    r: common_vendor.o((...args) => $options.onSliderChange && $options.onSliderChange(...args)),
    s: common_vendor.o((...args) => $options.onSliderChanging && $options.onSliderChanging(...args)),
    t: common_vendor.t($data.playbackRate === 1 ? "倍速" : $data.playbackRate + "x"),
    v: common_vendor.o((...args) => $options.toggleRate && $options.toggleRate(...args)),
    w: !$data.showControls ? 1 : "",
    x: common_vendor.p({
      type: $data.showControls ? "bottom" : "top",
      size: "24",
      color: "#fff"
    }),
    y: common_vendor.o((...args) => $options.toggleControls && $options.toggleControls(...args)),
    z: common_vendor.s($options.dragStyle),
    A: common_vendor.o((...args) => $options.onTouchStart && $options.onTouchStart(...args)),
    B: common_vendor.o((...args) => $options.onTouchMove && $options.onTouchMove(...args)),
    C: common_vendor.o((...args) => $options.onTouchEnd && $options.onTouchEnd(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-0b50ab4e"]]);
wx.createPage(MiniProgramPage);
