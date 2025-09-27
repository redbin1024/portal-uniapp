"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "image-wrapper",
  props: {
    // 媒体源地址
    src: {
      type: String,
      required: true
    },
    // 图片模式
    mode: {
      type: String,
      default: "widthFix"
    },
    // 视频封面
    poster: {
      type: String,
      default: ""
    },
    // 是否显示视频控制条
    showControls: {
      type: Boolean,
      default: false
    },
    // 是否自动播放
    autoplay: {
      type: Boolean,
      default: false
    },
    // 是否静音
    muted: {
      type: Boolean,
      default: true
    },
    // 是否循环播放
    loop: {
      type: Boolean,
      default: false
    },
    // 是否显示播放图标
    showPlayIcon: {
      type: Boolean,
      default: true
    },
    // 宽度
    width: {
      type: String,
      default: "100%"
    },
    // 高度
    height: {
      type: String,
      default: "auto"
    },
    // 是否启用预览功能
    enablePreview: {
      type: Boolean,
      default: true
    }
  },
  emits: [
    "load",
    "error",
    "videoLoad",
    "videoError",
    "videoCanPlay",
    "mediaClick"
  ],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const isVideo = (url) => {
      if (!url || typeof url !== "string")
        return false;
      const videoExtensions = [
        ".mp4",
        ".avi",
        ".mov",
        ".wmv",
        ".flv",
        ".webm",
        ".m4v",
        ".3gp",
        ".mkv"
      ];
      const lowerUrl = url.toLowerCase();
      return videoExtensions.some((ext) => lowerUrl.includes(ext));
    };
    const onImageLoad = (e) => {
      emit("load", e);
    };
    const onImageError = (e) => {
      emit("error", e);
    };
    const onVideoLoad = (e) => {
      emit("videoLoad", e);
    };
    const onVideoError = (e) => {
      console.error("视频加载错误:", e);
      emit("videoError", e);
    };
    const onVideoCanPlay = (e) => {
      console.log("视频可以播放:", e);
      emit("videoCanPlay", e);
    };
    const handleMediaClick = (mediaType) => {
      emit("mediaClick", { mediaType, src: props.src });
      if (props.enablePreview) {
        if (mediaType === "video") {
          common_vendor.index.showModal({
            title: "视频播放",
            content: "点击了视频内容",
            showCancel: false
          });
        } else {
          common_vendor.index.previewImage({
            urls: [props.src],
            current: props.src
          });
        }
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: isVideo(__props.src)
      }, isVideo(__props.src) ? {
        b: __props.src,
        c: __props.poster || "/static/video-placeholder.png",
        d: __props.showControls,
        e: __props.autoplay,
        f: __props.muted,
        g: __props.loop,
        h: __props.width,
        i: __props.height,
        j: common_vendor.o(onVideoLoad),
        k: common_vendor.o(onVideoError),
        l: common_vendor.o(onVideoCanPlay),
        m: common_vendor.o(($event) => handleMediaClick("video"))
      } : {
        n: __props.src,
        o: __props.mode,
        p: __props.width,
        q: __props.height,
        r: common_vendor.o(onImageLoad),
        s: common_vendor.o(onImageError),
        t: common_vendor.o(($event) => handleMediaClick("image"))
      }, {
        v: isVideo(__props.src) && __props.showPlayIcon
      }, isVideo(__props.src) && __props.showPlayIcon ? {} : {});
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6d15a96b"]]);
wx.createComponent(Component);
