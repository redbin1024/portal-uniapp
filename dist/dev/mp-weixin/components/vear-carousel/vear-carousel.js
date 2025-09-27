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
      dontFirstAnimation: true
    };
  },
  computed: {
    currentItem() {
      return this.imgList[this.currentIndex] || {};
    }
  },
  methods: {
    swiperChange(e) {
      this.dontFirstAnimation = false;
      this.currentIndex = e.detail.current;
      this.pauseAllVideos();
    },
    clickImg(item) {
      this.$emit("selected", item, this.currentIndex);
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
      this.$emit("fullscreen-change", e, this.currentIndex);
    },
    // 暂停所有视频
    pauseAllVideos() {
      this.$emit("pause-all-videos");
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($props.imgList, (item, index, i0) => {
      return common_vendor.e({
        a: item.type === "video"
      }, item.type === "video" ? {
        b: common_vendor.o(($event) => $options.clickImg(item), item[$props.urlKey] || item.id),
        c: common_vendor.n($data.currentIndex == index ? "item-video" : "item-video-side"),
        d: item[$props.urlKey] || item.src,
        e: item.poster,
        f: item.autoplay || false,
        g: item.loop || false,
        h: item.muted || true,
        i: item.controls || true,
        j: item.showFullscreenBtn || true,
        k: common_vendor.s($data.dontFirstAnimation ? "animation: none;" : ""),
        l: common_vendor.o((...args) => $options.onVideoPlay && $options.onVideoPlay(...args), item[$props.urlKey] || item.id),
        m: common_vendor.o((...args) => $options.onVideoPause && $options.onVideoPause(...args), item[$props.urlKey] || item.id),
        n: common_vendor.o((...args) => $options.onVideoEnded && $options.onVideoEnded(...args), item[$props.urlKey] || item.id),
        o: common_vendor.o((...args) => $options.onVideoError && $options.onVideoError(...args), item[$props.urlKey] || item.id),
        p: common_vendor.o((...args) => $options.onFullscreenChange && $options.onFullscreenChange(...args), item[$props.urlKey] || item.id)
      } : {
        q: common_vendor.o(($event) => $options.clickImg(item), item[$props.urlKey] || item.id),
        r: common_vendor.n($data.currentIndex == index ? "item-img" : "item-img-side"),
        s: item[$props.urlKey] || item.src,
        t: common_vendor.s($data.dontFirstAnimation ? "animation: none;" : "")
      }, {
        v: common_vendor.t(item.caseTitle),
        w: common_vendor.n($data.currentIndex == index ? "title-active" : "title-side"),
        x: common_vendor.n($data.currentIndex == index ? "swiper-item" : "swiper-item-side"),
        y: item[$props.urlKey] || item.id
      });
    }),
    b: common_vendor.o((...args) => $options.swiperChange && $options.swiperChange(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-ea02fb7a"]]);
wx.createComponent(Component);
