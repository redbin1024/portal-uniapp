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
    const types = common_vendor.ref("");
    const pageNum = common_vendor.ref(1);
    const videoFullscreenIndex = common_vendor.ref(-1);
    const onVideoFullscreenChange = (e, index) => {
      console.log("视频全屏状态变化:", e.detail.fullScreen, "索引:", index);
      if (e.detail.fullScreen) {
        videoFullscreenIndex.value = index;
        setTimeout(() => {
          videoFullscreenIndex.value = index;
          console.log("第一次更新:", index);
        }, 100);
        setTimeout(() => {
          videoFullscreenIndex.value = index;
          console.log("第二次更新:", index);
        }, 300);
        setTimeout(() => {
          videoFullscreenIndex.value = index;
          console.log("第三次更新:", index);
        }, 500);
      } else {
        videoContext.stop();
        videoFullscreenIndex.value = -1;
        console.log("退出全屏");
      }
    };
    let videoContext = null;
    const playVideo = (index) => {
      for (let i = 0; i < caseDataList.value.length; i++) {
        if (i !== index) {
          const otherVideoContext = common_vendor.index.createVideoContext("bannerVideo" + i);
          otherVideoContext.pause();
        }
      }
      videoContext = common_vendor.index.createVideoContext("bannerVideo" + index);
      videoContext.play();
      setTimeout(() => {
        videoContext.requestFullScreen({ direction: 0 });
        videoFullscreenIndex.value = index;
        setTimeout(() => {
          videoFullscreenIndex.value = index;
          console.log("强制设置全屏视频索引:", index);
        }, 200);
      }, 100);
    };
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
    common_vendor.onReachBottom(() => {
      if (types.value == 1) {
        pageNum.value += 1;
        caseList();
      }
    });
    const caseList = () => __async(this, null, function* () {
      try {
        const response = yield api_activity.getcaseList({
          pageSize: 10,
          pageNum: pageNum.value
        });
        let dataArray = [];
        if (response && response.rows && Array.isArray(response.rows)) {
          dataArray = response.rows;
        } else if (response && response.data && Array.isArray(response.data)) {
          dataArray = response.data;
        } else if (response && Array.isArray(response)) {
          dataArray = response;
        } else {
          console.warn("API返回的数据格式不正确:", response);
          dataArray = [];
        }
        if (pageNum.value == 1) {
          caseDataList.value = dataArray;
        } else {
          caseDataList.value = caseDataList.value.concat(dataArray);
        }
        types.value = dataArray.length >= 10 ? 1 : 2;
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
    common_vendor.onMounted(() => {
      caseList();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(caseDataList.value, (item, index, i0) => {
          return common_vendor.e({
            a: "bannerVideo" + index,
            b: item.caseImages[0],
            c: common_vendor.o(($event) => onVideoFullscreenChange($event, index), index),
            d: videoFullscreenIndex.value !== index
          }, videoFullscreenIndex.value !== index ? {
            e: common_vendor.o(($event) => playVideo(index), index)
          } : {}, {
            f: index
          });
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
        i: _ctx.isVideoFullscreen ? 1 : "",
        j: common_vendor.o(handlePreviewModalClick)
      }) : {}, {
        k: showPreview.value ? 1 : ""
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-230f088e"]]);
_sfc_main.__runtimeHooks = 7;
wx.createPage(MiniProgramPage);
