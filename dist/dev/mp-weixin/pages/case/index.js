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
const __default__ = {
  onPageScroll(e) {
    if (this.$refs && this.$refs.handleScroll) {
      this.$refs.handleScroll(e);
    }
  }
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __name: "index",
  setup(__props, { expose: __expose }) {
    const instance = common_vendor.getCurrentInstance();
    const successCaseList = common_vendor.ref([]);
    const animatedItems = common_vendor.ref([]);
    const loading = common_vendor.ref(false);
    const loadingMore = common_vendor.ref(false);
    const types = common_vendor.ref([]);
    const pageNum = common_vendor.ref(1);
    common_vendor.onReachBottom(() => {
      if (types.value == 1) {
        pageNum.value += 1;
        fetchsuccessCaseList();
      }
    });
    common_vendor.reactive([
      {
        image: "http://cdn.xiaodingdang1.com/2025/09/15/cbbd7e2aa0cd4016b59a3f31dbe46cb2.png",
        title: "东方幸福国际母婴会所",
        description: "月子中心一般为生产母亲提供专业产后恢复服务的场所，也称为月子会所，有专业营养师负责给产妇提供月子。"
      },
      {
        image: "http://cdn.xiaodingdang1.com/2025/09/15/d177663900974c55bd7b9d093b77c379.png",
        title: "东方幸福国际母婴会所",
        description: "月子中心一般为生产母亲提供专业产后恢复服务的场所，也称为月子会所，有专业营养师负责给产妇提供月子。"
      },
      {
        image: "http://cdn.xiaodingdang1.com/2025/09/15/b2eb116026c54ead93ac75a6d1c01607.png",
        title: "东方幸福国际母婴会所",
        description: "月子中心一般为生产母亲提供专业产后恢复服务的场所，也称为月子会所，有专业营养师负责给产妇提供月子。"
      },
      {
        image: "http://cdn.xiaodingdang1.com/2025/09/15/b2eb116026c54ead93ac75a6d1c01607.png",
        title: "东方幸福国际母婴会所",
        description: "月子中心一般为生产母亲提供专业产后恢复服务的场所，也称为月子会所，有专业营养师负责给产妇提供月子。"
      },
      {
        image: "http://cdn.xiaodingdang1.com/2025/09/15/b2eb116026c54ead93ac75a6d1c01607.png",
        title: "东方幸福国际母婴会所",
        description: "月子中心一般为生产母亲提供专业产后恢复服务的场所，也称为月子会所，有专业营养师负责给产妇提供月子。"
      },
      {
        image: "http://cdn.xiaodingdang1.com/2025/09/15/b2eb116026c54ead93ac75a6d1c01607.png",
        title: "东方幸福国际母婴会所",
        description: "月子中心一般为生产母亲提供专业产后恢复服务的场所，也称为月子会所，有专业营养师负责给产妇提供月子。"
      },
      {
        image: "http://cdn.xiaodingdang1.com/2025/09/15/b2eb116026c54ead93ac75a6d1c01607.png",
        title: "东方幸福国际母婴会所",
        description: "月子中心一般为生产母亲提供专业产后恢复服务的场所，也称为月子会所，有专业营养师负责给产妇提供月子。"
      }
    ]);
    const fetchsuccessCaseList = () => __async(this, null, function* () {
      try {
        if (pageNum.value === 1) {
          loading.value = true;
        } else {
          loadingMore.value = true;
        }
        const response = yield api_activity.getsuccessCaseList({
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
          successCaseList.value = dataArray;
        } else {
          successCaseList.value = successCaseList.value.concat(dataArray);
        }
        types.value = dataArray.length >= 10 ? 1 : 2;
      } catch (error) {
        console.error("获取成功案例列表失败:", error);
      } finally {
        loading.value = false;
        loadingMore.value = false;
      }
    });
    const navigateToDetail = (item) => {
      common_vendor.index.navigateTo({
        url: "/pages/casedetails/index?item=" + encodeURIComponent(JSON.stringify(item))
      });
    };
    const getBackgroundColor = (index) => {
      const colors = ["#FFEFEB", "#DFF1FF", "#EDF1FF", "#DAF9FF"];
      return colors[index % 4];
    };
    const initAnimation = () => {
      common_vendor.nextTick$1(() => {
        setTimeout(() => {
          successCaseList.value.forEach((_, index) => {
            setTimeout(() => {
              animatedItems.value[index] = true;
            }, index * 150);
          });
        }, 200);
      });
    };
    const handleScroll = (e) => {
      e.scrollTop;
      common_vendor.index.createSelectorQuery().in(instance).selectAll(".list-item").boundingClientRect((rects) => {
        if (rects) {
          rects.forEach((rect, index) => {
            if (rect.top < common_vendor.index.getSystemInfoSync().windowHeight * 0.8 && rect.bottom > 0) {
              if (!animatedItems.value[index]) {
                animatedItems.value[index] = true;
              }
            }
          });
        }
      }).exec();
    };
    common_vendor.onMounted(() => {
      initAnimation();
      fetchsuccessCaseList();
    });
    __expose({
      onPageScroll: handleScroll
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: loading.value
      }, loading.value ? {} : {}, {
        b: common_vendor.f(successCaseList.value, (item, index, i0) => {
          return {
            a: item.caseImages[0],
            b: common_vendor.t(item.customerName),
            c: common_vendor.t(item.caseValue),
            d: animatedItems.value[index] ? 1 : "",
            e: index,
            f: getBackgroundColor(index),
            g: common_vendor.o(($event) => navigateToDetail(item), index)
          };
        }),
        c: loadingMore.value
      }, loadingMore.value ? {} : {});
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2786c006"]]);
_sfc_main.__runtimeHooks = 7;
wx.createPage(MiniProgramPage);
