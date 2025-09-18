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
        const response = yield api_activity.getFeedPostPage({
          pageSize: 10,
          pageNum: 1
        });
        console.log("API响应数据:", response);
        let dataArray = [];
        if (response && response.rows && Array.isArray(response.rows.list)) {
          dataArray = response.rows.list;
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
    const onImageLoad = (itemId, columnIndex, itemIndex) => {
      console.log("Image loaded:", itemId);
    };
    const handleCardClick = (item) => {
      console.log("Card clicked:", item);
      common_vendor.index.showToast({
        title: item.merchantName,
        icon: "none"
      });
    };
    common_vendor.onMounted(() => {
      fetchMerchantData();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(columns.value, (column, columnIndex, i0) => {
          return {
            a: common_vendor.f(column, (item, index, i1) => {
              return common_vendor.e({
                a: item.contentPhotos[0],
                b: common_vendor.o(($event) => onImageLoad(item.id), item.id),
                c: item.overlayText
              }, item.overlayText ? {
                d: common_vendor.t(item.overlayText)
              } : {}, {
                e: item.avatar,
                f: common_vendor.t(item.nodeName),
                g: item.id,
                h: common_vendor.o(($event) => handleCardClick(item), item.id)
              });
            }),
            b: columnIndex
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-dbba45b8"]]);
wx.createPage(MiniProgramPage);
