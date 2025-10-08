"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  props: {
    imgList: {
      type: Array,
      default() {
        return [];
      }
    },
    urlKey: {
      type: String,
      default() {
        return "url";
      }
    },
    showTitle: {
      type: Boolean,
      default: true
    },
    titleKey: {
      type: String,
      default: "title"
    }
  },
  data() {
    return {
      currentIndex: 0,
      dontFirstAnimation: true,
      isFullscreen: false,
      previewMedia: {
        src: "",
        type: "image",
        // 'image' 或 'video'
        index: 0
      },
      showPreview: false,
      isVideoFullscreen: false
    };
  },
  computed: {
    currentItem() {
      return this.imgList[this.currentIndex] || {};
    }
  },
  methods: {
    // 关闭预览
    closePreview() {
      this.showPreview = false;
    },
    // 处理预览模态框点击事件
    handlePreviewModalClick(e) {
      this.closePreview();
    },
    // 获取视频封面图
    getVideoPoster(videoUrl) {
      if (typeof videoUrl === "string") {
        return videoUrl.replace(
          /\.(mp4|webm|ogg|mov|avi|wmv|flv|mkv)$/i,
          "_poster.jpg"
        );
      }
      return "";
    },
    // 媒体点击事件
    onMediaClick(item, index, type) {
      console.log("Media clicked:", item, index, type);
      this.previewMedia = {
        src: item,
        type,
        index
      };
      this.showPreview = true;
    },
    swiperChange(e) {
      this.dontFirstAnimation = false;
      this.currentIndex = e.detail.current;
      this.pauseAllVideos();
    },
    // 视频事件处理
    onVideoPlay(e) {
      console.log("视频开始播放:", e);
      this.$emit("video-play", e, this.currentIndex);
    },
    onVideoPause(e) {
      console.log("视频暂停:", e);
      this.$emit("video-pause", e, this.currentIndex);
    },
    onVideoEnded(e) {
      console.log("视频播放结束:", e);
      this.$emit("video-ended", e, this.currentIndex);
    },
    onVideoError(e) {
      console.error("视频播放错误:", e);
      this.$emit("video-error", e, this.currentIndex);
    },
    onFullscreenChange(e) {
      console.log("视频全屏状态变化:", e);
      const isEnteringFullscreen = !!(e && e.detail && (e.detail.fullScreen || e.detail.fullscreen));
      this.isFullscreen = isEnteringFullscreen;
      if (isEnteringFullscreen) {
        console.log("进入全屏，取消静音");
      } else {
        console.log("退出全屏，恢复静音");
      }
      this.$emit(
        "fullscreen-change",
        e,
        this.currentIndex,
        isEnteringFullscreen
      );
    },
    // 处理视频点击事件，实现真正的全屏播放
    onVideoClick(index) {
      console.log("视频点击事件，索引:", index);
      const videoId = "video-" + index;
      try {
        const videoContext = common_vendor.index.createVideoContext(videoId, this);
        if (videoContext) {
          console.log("视频上下文创建成功，请求全屏");
          videoContext.requestFullScreen({
            direction: 0,
            // 0: 正常竖向, 90: 屏幕逆时针90度, -90: 屏幕顺时针90度
            success: () => {
              console.log("视频全屏成功");
              setTimeout(() => {
                videoContext.play();
              }, 200);
            },
            fail: (err) => {
              console.error("视频全屏失败:", err);
              videoContext.play();
              common_vendor.index.showToast({
                title: "视频全屏失败，尝试直接播放",
                icon: "none"
              });
            }
          });
        } else {
          console.error("无法创建视频上下文，videoId:", videoId);
        }
      } catch (error) {
        console.error("视频播放异常:", error);
      }
    },
    // 暂停所有视频
    pauseAllVideos() {
      this.$emit("pause-all-videos");
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($props.imgList, (item, index, i0) => {
      return common_vendor.e({
        a: item.type === "video"
      }, item.type === "video" ? {
        b: common_vendor.n($data.currentIndex == index ? "item-video" : "item-video-side"),
        c: item[$props.urlKey] || item.src,
        d: item.autoplay || false,
        e: item.loop || false,
        f: $data.isFullscreen ? false : item.muted !== void 0 ? item.muted : true,
        g: item.controls || true,
        h: common_vendor.s($data.dontFirstAnimation ? "animation: none;" : ""),
        i: $data.isFullscreen ? "contain" : "cover",
        j: "video-" + index,
        k: common_vendor.o((...args) => $options.onVideoPlay && $options.onVideoPlay(...args), item[$props.urlKey] || item.id),
        l: common_vendor.o((...args) => $options.onVideoPause && $options.onVideoPause(...args), item[$props.urlKey] || item.id),
        m: common_vendor.o((...args) => $options.onVideoEnded && $options.onVideoEnded(...args), item[$props.urlKey] || item.id),
        n: common_vendor.o((...args) => $options.onVideoError && $options.onVideoError(...args), item[$props.urlKey] || item.id),
        o: common_vendor.o((...args) => $options.onFullscreenChange && $options.onFullscreenChange(...args), item[$props.urlKey] || item.id),
        p: common_vendor.o(($event) => $options.onMediaClick(item.src, index, "video"), item[$props.urlKey] || item.id)
      } : {
        q: common_vendor.n($data.currentIndex == index ? "item-img" : "item-img-side"),
        r: item[$props.urlKey] || item.src,
        s: common_vendor.s($data.dontFirstAnimation ? "animation: none;" : "")
      }, {
        t: common_vendor.t(item.caseTitle),
        v: common_vendor.n($data.currentIndex == index ? "title-active" : "title-side"),
        w: common_vendor.n($data.currentIndex == index ? "swiper-item" : "swiper-item-side"),
        x: item[$props.urlKey] || item.id
      });
    }),
    b: common_vendor.o((...args) => $options.swiperChange && $options.swiperChange(...args)),
    c: $data.showPreview
  }, $data.showPreview ? common_vendor.e({
    d: $data.previewMedia.type === "video"
  }, $data.previewMedia.type === "video" ? {
    e: $data.previewMedia.src,
    f: $options.getVideoPoster($data.previewMedia.src),
    g: common_vendor.o((...args) => $options.onFullscreenChange && $options.onFullscreenChange(...args)),
    h: "preview-video-" + $data.previewMedia.index
  } : {
    i: $data.previewMedia.src
  }, {
    j: $data.isFullscreen ? 1 : "",
    k: common_vendor.o((...args) => $options.handlePreviewModalClick && $options.handlePreviewModalClick(...args))
  }) : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-ea02fb7a"]]);
wx.createComponent(Component);
