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
    const columns = common_vendor.ref([[], []]);
    const columnHeights = common_vendor.ref([0, 0]);
    const loading = common_vendor.ref(false);
    const merchantData = common_vendor.ref([]);
    const fetchMerchantData = () => __async(this, null, function* () {
      try {
        loading.value = true;
        const response = yield api_activity.getCompanyNewsList({
          pageSize: 10,
          pageNum: 1,
          type: 2
        });
        console.log("API响应数据:", response);
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
        merchantData.value = dataArray;
        console.log("处理后的商家数据:", merchantData.value);
        initWaterfall();
      } catch (error) {
        console.error("获取商家数据失败:", error);
        merchantData.value = [];
        common_vendor.index.showToast({
          title: "获取数据失败",
          icon: "none"
        });
      } finally {
        loading.value = false;
      }
    });
    const initWaterfall = () => {
      columns.value = [[], []];
      columnHeights.value = [0, 0];
      if (!Array.isArray(merchantData.value)) {
        console.warn("merchantData.value is not an array:", merchantData.value);
        return;
      }
      merchantData.value.forEach((item) => {
        const minHeightIndex = columnHeights.value[0] <= columnHeights.value[1] ? 0 : 1;
        columns.value[minHeightIndex].push(item);
        const estimatedHeight = getEstimatedHeight();
        columnHeights.value[minHeightIndex] += estimatedHeight;
      });
    };
    const getEstimatedHeight = (item) => {
      const baseHeight = 200;
      const randomHeight = Math.random() * 150 + 100;
      return baseHeight + randomHeight;
    };
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
        ".m4v"
      ];
      const lowerUrl = url.toLowerCase();
      return videoExtensions.some((ext) => lowerUrl.includes(ext));
    };
    const onImageLoad = (itemId, columnIndex, itemIndex) => {
      console.log("Image loaded:", itemId);
    };
    const onVideoLoad = (itemId, columnIndex, itemIndex) => {
      console.log("Video loaded:", itemId);
    };
    const handleMediaClick = (item, mediaType) => {
      console.log("Media clicked:", mediaType, item);
      if (mediaType === "video") {
        common_vendor.index.showModal({
          title: "视频播放",
          content: "点击了视频内容",
          showCancel: false
        });
      } else {
        const imageUrl = item.newsImages || "";
        if (imageUrl) {
          common_vendor.index.previewImage({
            urls: [imageUrl],
            current: imageUrl
          });
        }
      }
    };
    const handleCardClick = (item) => {
      console.log("Card clicked:", item);
      common_vendor.index.navigateTo({
        url: `/pages/dynamicdetails/index?id=${item.id || item.newsId || ""}&title=${encodeURIComponent(item.newsTitle || "")}`
      });
    };
    common_vendor.onMounted(() => {
      fetchMerchantData();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: loading.value
      }, loading.value ? {} : {
        b: common_vendor.f(columns.value[0], (item, index, i0) => {
          return common_vendor.e({
            a: !isVideo(item.newsImages)
          }, !isVideo(item.newsImages) ? {
            b: item.newsImages[0] || "/static/video-placeholder.png",
            c: common_vendor.o(($event) => onImageLoad(item.id || item.newsId), `left-${item.id || item.newsId || index}`),
            d: common_vendor.o(($event) => handleMediaClick(item, "image"), `left-${item.id || item.newsId || index}`)
          } : {
            e: item.newsImages[0],
            f: item.videoPoster || "/static/video-placeholder.png",
            g: common_vendor.o(($event) => onVideoLoad(item.id || item.newsId), `left-${item.id || item.newsId || index}`),
            h: common_vendor.o(($event) => handleMediaClick(item, "video"), `left-${item.id || item.newsId || index}`)
          }, {
            i: common_vendor.t(item.newsTitle || "暂无标题"),
            j: `left-${item.id || item.newsId || index}`,
            k: common_vendor.o(($event) => handleCardClick(item), `left-${item.id || item.newsId || index}`)
          });
        }),
        c: common_vendor.f(columns.value[1], (item, index, i0) => {
          return common_vendor.e({
            a: !isVideo(item.newsImages)
          }, !isVideo(item.newsImages) ? {
            b: item.newsImages || "/static/video-placeholder.png",
            c: common_vendor.o(($event) => onImageLoad(item.id || item.newsId), `right-${item.id || item.newsId || index}`),
            d: common_vendor.o(($event) => handleMediaClick(item, "image"), `right-${item.id || item.newsId || index}`)
          } : {
            e: item.newsImages,
            f: item.videoPoster || "/static/video-placeholder.png",
            g: common_vendor.o(($event) => onVideoLoad(item.id || item.newsId), `right-${item.id || item.newsId || index}`),
            h: common_vendor.o(($event) => handleMediaClick(item, "video"), `right-${item.id || item.newsId || index}`)
          }, {
            i: common_vendor.t(item.newsTitle || "暂无标题"),
            j: `right-${item.id || item.newsId || index}`,
            k: common_vendor.o(($event) => handleCardClick(item), `right-${item.id || item.newsId || index}`)
          });
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-dbba45b8"]]);
wx.createPage(MiniProgramPage);
