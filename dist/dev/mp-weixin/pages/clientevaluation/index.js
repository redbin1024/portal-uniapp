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
const common_vendor = require("../../common/vendor.js");
const api_activity = require("../../api/activity.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const columns = common_vendor.ref([]);
    const columnsList = common_vendor.ref([]);
    const loading = common_vendor.ref(false);
    const loadingMore = common_vendor.ref(false);
    const pageNum = common_vendor.ref(1);
    const types = common_vendor.ref("");
    common_vendor.ref([]);
    const fetchMerchantData = () => __async(this, null, function* () {
      try {
        loading.value = true;
        const response = yield api_activity.getCompanyNewsList({
          pageSize: 6,
          pageNum: 1,
          type: 2
        });
        let dataArray = [];
        if (response && response.rows && Array.isArray(response.rows)) {
          dataArray = response.rows;
        } else if (response && response.rows && Array.isArray(response.rows)) {
          dataArray = response.rows;
        } else if (response && Array.isArray(response)) {
          dataArray = response;
        } else {
          console.warn("API返回的数据格式不正确:", response);
          dataArray = [];
        }
        columns.value = dataArray;
      } catch (error) {
        console.error("获取商家数据失败:", error);
        columns.value = [];
        common_vendor.index.showToast({
          title: "获取数据失败",
          icon: "none"
        });
      } finally {
        loading.value = false;
      }
    });
    common_vendor.onReachBottom(() => {
      if (types.value == 1) {
        pageNum.value += 1;
        fetchMerchantData1();
      }
    });
    const fetchMerchantData1 = () => __async(this, null, function* () {
      try {
        if (pageNum.value === 1) {
          loading.value = true;
        } else {
          loadingMore.value = true;
        }
        const response = yield api_activity.getCompanyNewsList({
          pageSize: 20,
          pageNum: pageNum.value,
          type: 3
        });
        console.log("API响应数据:", response);
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
          columnsList.value = dataArray;
        } else {
          columnsList.value = columnsList.value.concat(dataArray);
        }
        types.value = dataArray.length >= 10 ? 1 : 2;
        console.log("columnsList数据:", columnsList.value);
      } catch (error) {
        console.error("获取公众号动态数据失败:", error);
        if (pageNum.value === 1) {
          columnsList.value = [];
        }
        common_vendor.index.showToast({
          title: "获取数据失败",
          icon: "none"
        });
      } finally {
        loading.value = false;
        loadingMore.value = false;
      }
    });
    const onImageLoad = (itemId, columnIndex, itemIndex) => {
      console.log("Image loaded:", itemId);
    };
    const onVideoLoad = (itemId, columnIndex, itemIndex) => {
      console.log("Video loaded:", itemId);
    };
    const onVideoError = (itemId, columnIndex, itemIndex) => {
      console.error("Video error:", itemId);
      common_vendor.index.showToast({
        title: "视频加载失败",
        icon: "none",
        duration: 2e3
      });
    };
    const onVideoCanPlay = (itemId, columnIndex, itemIndex) => {
      console.log("Video can play:", itemId);
    };
    const handleVideoFullscreenPlay = (item) => {
      console.log("处理视频全屏播放:", item);
      const videoId = `video-${item.id || item.newsId}`;
      try {
        const videoContext = common_vendor.index.createVideoContext(videoId);
        if (videoContext) {
          console.log("视频上下文创建成功，准备全屏播放");
          currentFullscreenVideoContext.value = videoContext;
          currentFullscreenVideoId.value = videoId;
          console.log("设置全屏视频ID:", currentFullscreenVideoId.value);
          videoContext.requestFullScreen({
            direction: 0,
            // 0: 正常竖向, 90: 屏幕逆时针90度, -90: 屏幕顺时针90度
            success: () => {
              console.log("视频全屏成功，开始自动播放");
              currentFullscreenVideoId.value = videoId;
              setTimeout(() => {
                videoContext.play();
              }, 300);
            },
            fail: (err) => {
              console.error("视频全屏失败:", err);
              videoContext.play();
              common_vendor.index.showToast({
                title: "全屏失败，直接播放",
                icon: "none",
                duration: 2e3
              });
              currentFullscreenVideoContext.value = null;
              currentFullscreenVideoId.value = null;
            }
          });
        } else {
          console.error("无法创建视频上下文，videoId:", videoId);
          common_vendor.index.showToast({
            title: "视频播放失败",
            icon: "none",
            duration: 2e3
          });
        }
      } catch (error) {
        console.error("视频播放异常:", error);
        common_vendor.index.showToast({
          title: "视频播放异常",
          icon: "none",
          duration: 2e3
        });
      }
    };
    const onVideoPlay = (e) => {
      console.log("视频开始播放:", e);
    };
    const onVideoPause = (e) => {
      console.log("视频暂停播放:", e);
    };
    const currentFullscreenVideoContext = common_vendor.ref(null);
    const currentFullscreenVideoId = common_vendor.ref(null);
    const onVideoFullscreenChange = (e) => {
      console.log("视频全屏状态变化:", e);
      const isEnteringFullscreen = !!(e && e.detail && (e.detail.fullScreen === true || e.detail.fullscreen === true));
      if (isEnteringFullscreen) {
        console.log("进入全屏模式");
        if (!currentFullscreenVideoId.value && e.target && e.target.id) {
          currentFullscreenVideoId.value = e.target.id;
          console.log("设置全屏视频ID:", currentFullscreenVideoId.value);
        }
        if (currentFullscreenVideoContext.value) {
          setTimeout(() => {
            currentFullscreenVideoContext.value.play();
          }, 300);
        }
      } else {
        console.log("退出全屏模式");
        if (currentFullscreenVideoContext.value) {
          currentFullscreenVideoContext.value.pause();
        }
        setTimeout(() => {
          currentFullscreenVideoContext.value = null;
          currentFullscreenVideoId.value = null;
        }, 100);
      }
    };
    const exitFullscreen = () => {
      console.log("尝试退出全屏...");
      if (currentFullscreenVideoContext.value) {
        currentFullscreenVideoContext.value.exitFullScreen({
          success: () => {
            console.log("成功退出全屏");
            currentFullscreenVideoContext.value = null;
            currentFullscreenVideoId.value = null;
          },
          fail: (err) => {
            console.error("退出全屏失败:", err);
            currentFullscreenVideoContext.value = null;
            currentFullscreenVideoId.value = null;
            forceExitFullscreen();
          }
        });
      } else {
        forceExitFullscreen();
      }
    };
    const forceExitFullscreen = () => {
      console.log("尝试强制退出全屏...");
      if (typeof document !== "undefined") {
        if (document.exitFullscreen) {
          document.exitFullscreen().catch((err) => {
            console.log("document.exitFullscreen失败:", err);
          });
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      }
      if (typeof document !== "undefined" && document.querySelectorAll) {
        const videoElements = document.querySelectorAll("video");
        videoElements.forEach((video) => {
          if (video.webkitExitFullscreen) {
            video.webkitExitFullscreen();
          } else if (video.mozCancelFullScreen) {
            video.mozCancelFullScreen();
          } else if (video.msExitFullscreen) {
            video.msExitFullscreen();
          }
        });
      }
      setTimeout(() => {
        currentFullscreenVideoContext.value = null;
        currentFullscreenVideoId.value = null;
      }, 500);
    };
    const onVideoClick = (e) => {
      console.log("视频被点击:", e);
      e.stopPropagation();
      if (currentFullscreenVideoContext.value) {
        console.log("检测到全屏状态，准备退出全屏");
        exitFullscreen();
      }
    };
    let clickTimer = null;
    let clickCount = 0;
    const handleVideoTap = (e) => {
      console.log("视频被轻触:", e);
      e.stopPropagation();
      const videoElement = e.currentTarget;
      const videoId = videoElement.id;
      let currentItem = null;
      [...columns.value, ...columnsList.value].forEach((item) => {
        if (`video-${item.id || item.newsId}` === videoId) {
          currentItem = item;
        }
      });
      if (!currentItem) {
        console.error("未找到对应的视频项目");
        return;
      }
      clickCount++;
      if (clickCount === 1) {
        clickTimer = setTimeout(() => {
          if (currentFullscreenVideoContext.value) {
            console.log("单击视频，退出全屏");
            exitFullscreen();
          } else {
            console.log("单击视频，进入全屏");
            currentFullscreenVideoId.value = videoId;
            console.log("测试：直接设置全屏ID为:", videoId);
            handleVideoFullscreenPlay(currentItem);
          }
          clickCount = 0;
        }, 300);
      } else if (clickCount === 2) {
        clearTimeout(clickTimer);
        if (currentFullscreenVideoContext.value) {
          console.log("双击视频，退出全屏");
          exitFullscreen();
        } else {
          console.log("双击视频，进入全屏");
          currentFullscreenVideoId.value = videoId;
          console.log("测试：直接设置全屏ID为:", videoId);
          handleVideoFullscreenPlay(currentItem);
        }
        clickCount = 0;
      }
    };
    const onVideoEnded = (e) => {
      console.log("视频播放结束:", e);
      if (currentFullscreenVideoContext.value) {
        exitFullscreen();
      }
    };
    const handleMediaClick = (item, mediaType) => {
      console.log("Media clicked:", mediaType, item);
      {
        let imageUrls = [];
        let currentUrl = "";
        if (Array.isArray(item.newsImages)) {
          imageUrls = item.newsImages.filter(
            (url) => url && typeof url === "string"
          );
          currentUrl = imageUrls[0] || "";
        } else if (item.newsImages && typeof item.newsImages === "string") {
          imageUrls = [item.newsImages];
          currentUrl = item.newsImages;
        }
        if (imageUrls.length > 0 && currentUrl) {
          common_vendor.index.previewImage({
            urls: imageUrls,
            current: currentUrl,
            success: () => {
              console.log("图片预览成功");
            },
            fail: (err) => {
              console.error("图片预览失败:", err);
              common_vendor.index.showToast({
                title: "图片预览失败",
                icon: "none",
                duration: 2e3
              });
            }
          });
        } else {
          common_vendor.index.showToast({
            title: "暂无图片可预览",
            icon: "none",
            duration: 2e3
          });
        }
      }
    };
    const handleCardClick = (item) => {
      console.log("Card clicked:", item);
      const itemStr = JSON.stringify(item);
      common_vendor.index.navigateTo({
        url: "/pages/dynamicdetails/index?item=" + encodeURIComponent(itemStr)
      });
    };
    const handleKeyDown = (e) => {
      if (currentFullscreenVideoContext.value && (e.keyCode === 27 || e.keyCode === 32 || e.keyCode === 13)) {
        e.preventDefault();
        exitFullscreen();
      }
    };
    const handleTouchStart = (e) => {
      if (currentFullscreenVideoContext.value) {
        touchStartTime.value = Date.now();
      }
    };
    const handleTouchEnd = (e) => {
      if (currentFullscreenVideoContext.value && touchStartTime.value) {
        const touchDuration = Date.now() - touchStartTime.value;
        if (touchDuration < 300) {
          exitFullscreen();
        }
        touchStartTime.value = null;
      }
    };
    const touchStartTime = common_vendor.ref(null);
    common_vendor.onMounted(() => {
      fetchMerchantData();
      fetchMerchantData1();
      if (typeof document !== "undefined") {
        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("touchstart", handleTouchStart);
        document.addEventListener("touchend", handleTouchEnd);
        document.addEventListener(
          "fullscreenchange",
          handleDocumentFullscreenChange
        );
        document.addEventListener(
          "webkitfullscreenchange",
          handleDocumentFullscreenChange
        );
        document.addEventListener(
          "mozfullscreenchange",
          handleDocumentFullscreenChange
        );
        document.addEventListener(
          "MSFullscreenChange",
          handleDocumentFullscreenChange
        );
      }
    });
    const handleDocumentFullscreenChange = () => {
      const isFullscreen = !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement);
      console.log("文档全屏状态变化:", isFullscreen);
      if (!isFullscreen && currentFullscreenVideoContext.value) {
        console.log("检测到退出全屏，清理视频状态");
        if (currentFullscreenVideoContext.value) {
          currentFullscreenVideoContext.value.pause();
        }
        currentFullscreenVideoContext.value = null;
        currentFullscreenVideoId.value = null;
      }
    };
    common_vendor.onUnload(() => {
      if (typeof document !== "undefined") {
        document.removeEventListener("keydown", handleKeyDown);
        document.removeEventListener("touchstart", handleTouchStart);
        document.removeEventListener("touchend", handleTouchEnd);
        document.removeEventListener(
          "fullscreenchange",
          handleDocumentFullscreenChange
        );
        document.removeEventListener(
          "webkitfullscreenchange",
          handleDocumentFullscreenChange
        );
        document.removeEventListener(
          "mozfullscreenchange",
          handleDocumentFullscreenChange
        );
        document.removeEventListener(
          "MSFullscreenChange",
          handleDocumentFullscreenChange
        );
      }
      if (currentFullscreenVideoContext.value) {
        currentFullscreenVideoContext.value.exitFullScreen({
          success: () => {
            console.log("页面卸载时成功退出全屏");
          },
          fail: (err) => {
            console.error("页面卸载时退出全屏失败:", err);
            forceExitFullscreen();
          }
        });
        currentFullscreenVideoContext.value = null;
        currentFullscreenVideoId.value = null;
      }
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: loading.value
      }, loading.value ? {} : {
        b: common_vendor.f(columnsList.value, (team, index, i0) => {
          var _a, _b;
          return common_vendor.e({
            a: (_a = team.newsImages) == null ? void 0 : _a[0]
          }, ((_b = team.newsImages) == null ? void 0 : _b[0]) ? {
            b: Array.isArray(team.newsImages) ? team.newsImages[0] : team.newsImages,
            c: common_vendor.o(($event) => onImageLoad(team.id || team.newsId), index),
            d: common_vendor.o(($event) => handleMediaClick(team, "image"), index)
          } : {}, {
            e: common_vendor.t(team.newsTitle),
            f: common_vendor.t(team.newsTitle),
            g: index,
            h: common_vendor.o(($event) => handleCardClick(team), index)
          });
        }),
        c: common_vendor.f(columns.value, (item, index, i0) => {
          return common_vendor.e({
            a: `video-${item.id || item.newsId}`,
            b: item.newsImages[0],
            c: item.poster || "",
            d: common_vendor.o(($event) => onVideoLoad(item.id || item.newsId), `left-${item.id || item.newsId || index}`),
            e: common_vendor.o(($event) => onVideoError(item.id || item.newsId), `left-${item.id || item.newsId || index}`),
            f: common_vendor.o(($event) => onVideoCanPlay(item.id || item.newsId), `left-${item.id || item.newsId || index}`),
            g: common_vendor.o(handleVideoTap, `left-${item.id || item.newsId || index}`),
            h: common_vendor.o(onVideoFullscreenChange, `left-${item.id || item.newsId || index}`),
            i: common_vendor.o(onVideoPlay, `left-${item.id || item.newsId || index}`),
            j: common_vendor.o(onVideoPause, `left-${item.id || item.newsId || index}`),
            k: common_vendor.o(onVideoEnded, `left-${item.id || item.newsId || index}`),
            l: common_vendor.o(onVideoClick, `left-${item.id || item.newsId || index}`)
          }, currentFullscreenVideoId.value ? {
            m: common_vendor.t(currentFullscreenVideoId.value),
            n: common_vendor.t(item.id || item.newsId)
          } : {}, {
            o: currentFullscreenVideoId.value === `video-${item.id || item.newsId}`
          }, currentFullscreenVideoId.value === `video-${item.id || item.newsId}` ? {
            p: common_vendor.o(exitFullscreen, `left-${item.id || item.newsId || index}`)
          } : {}, {
            q: common_vendor.t(item.newsTitle || "暂无标题"),
            r: `left-${item.id || item.newsId || index}`
          });
        }),
        d: currentFullscreenVideoId.value
      }, {
        e: loadingMore.value
      }, loadingMore.value ? {} : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-dbba45b8"]]);
_sfc_main.__runtimeHooks = 7;
wx.createPage(MiniProgramPage);
