"use strict";
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
const common_vendor = require("../../../common/vendor.js");
const api_activity = require("../../../api/activity.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const caseDataList = common_vendor.ref([]);
    const showPreview = common_vendor.ref(false);
    const previewMedia = common_vendor.ref({
      src: "",
      type: "image",
      // 'image' 或 'video'
      index: 0
    });
    const handlePreviewModalClick = (e) => {
      if (isVideoFullscreen.value) {
        console.log("视频全屏中，不关闭预览");
        return;
      }
      closePreview();
    };
    const isVideo = (url) => {
      if (!url)
        return false;
      const videoExtensions = [
        ".mp4",
        ".webm",
        ".ogg",
        ".mov",
        ".avi",
        ".wmv",
        ".flv",
        ".mkv"
      ];
      const urlLower = url.toLowerCase();
      return videoExtensions.some((ext) => urlLower.includes(ext));
    };
    const getVideoPoster = (videoUrl) => {
      if (typeof videoUrl !== "string") {
        console.warn("videoUrl is not a string:", videoUrl);
        return "";
      }
      return videoUrl.replace(
        /\.(mp4|webm|ogg|mov|avi|wmv|flv|mkv)$/i,
        "_poster.jpg"
      );
    };
    const prevMedia = () => {
      const currentIndex = previewMedia.value.index;
      const newIndex = currentIndex > 0 ? currentIndex - 1 : caseDataList.value.length - 1;
      const newSrc = caseDataList.value[newIndex];
      previewMedia.value = {
        src: newSrc,
        type: isVideo(newSrc) ? "video" : "image",
        index: newIndex
      };
    };
    const nextMedia = () => {
      const currentIndex = previewMedia.value.index;
      const newIndex = currentIndex < caseDataList.value.length - 1 ? currentIndex + 1 : 0;
      const newSrc = caseDataList.value[newIndex];
      previewMedia.value = {
        src: newSrc,
        type: isVideo(newSrc) ? "video" : "image",
        index: newIndex
      };
    };
    const caseList = () => __async(this, null, function* () {
      try {
        const response = yield api_activity.getcaseList({
          pageSize: 9,
          pageNum: 1
        });
        console.log("企业列表数据:", response);
        if (response && response.rows && Array.isArray(response.rows) && response.rows.length > 0) {
          let data = [];
          for (let i = 0; i < response.rows.length; i++) {
            data.push(response.rows[i].caseImages[0]);
          }
          caseDataList.value = data;
        }
      } catch (error) {
        console.error("获取企业列表失败:", error);
        common_vendor.index.showToast({
          title: "获取企业列表失败",
          icon: "none"
        });
      }
    });
    const closePreview = () => {
      if (isVideoFullscreen.value) {
        return;
      }
      showPreview.value = false;
    };
    const onMediaClick = (item, index, type) => {
      console.log("Media clicked:", item, index, type);
      previewMedia.value = {
        src: item,
        type,
        index
      };
      showPreview.value = true;
    };
    common_vendor.onMounted(() => {
      caseList();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(caseDataList.value, (item, index, i0) => {
          return {
            a: "bannerVideo" + index,
            b: item,
            c: index === _ctx.currentIndex,
            d: common_vendor.o(($event) => onMediaClick(item, index, "video"), index),
            e: index
          };
        }),
        b: showPreview.value
      }, showPreview.value ? common_vendor.e({
        c: previewMedia.value.type === "video"
      }, previewMedia.value.type === "video" ? {
        d: previewMedia.value.src,
        e: getVideoPoster(previewMedia.value.src),
        f: common_vendor.o((...args) => _ctx.onFullscreenChange && _ctx.onFullscreenChange(...args)),
        g: "preview-video-" + previewMedia.value.index
      } : {
        h: previewMedia.value.src
      }, {
        i: common_vendor.o(prevMedia),
        j: common_vendor.o(nextMedia),
        k: _ctx.isVideoFullscreen ? 1 : "",
        l: common_vendor.o(handlePreviewModalClick)
      }) : {}, {
        m: showPreview.value ? 1 : ""
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-230f088e"]]);
wx.createPage(MiniProgramPage);
