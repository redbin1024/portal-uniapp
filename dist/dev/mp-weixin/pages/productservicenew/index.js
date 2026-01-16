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
if (!Array) {
  const _easycom_BackHome2 = common_vendor.resolveComponent("BackHome");
  _easycom_BackHome2();
}
const _easycom_BackHome = () => "../../components/BackHome/BackHome.js";
if (!Math) {
  (VearCarousel + _easycom_BackHome)();
}
const VearCarousel = () => "../../components/vear-carousel/vear-carousel.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    common_vendor.onShareAppMessage(() => {
      return {
        title: "产品服务",
        path: "/pages/productservicenew/index"
      };
    });
    common_vendor.onShareTimeline(() => {
      return {
        title: "产品服务",
        query: ""
      };
    });
    const activeTab = common_vendor.ref(0);
    const serviceList = common_vendor.ref([]);
    const serviceLists = common_vendor.ref([]);
    const caseList = common_vendor.ref([]);
    const richText = common_vendor.ref("");
    const imgList = common_vendor.ref([]);
    const fetchcaseList = () => __async(this, null, function* () {
      try {
        const response = yield api_activity.getcaseList({
          pageSize: 10,
          pageNum: 1
        });
        console.log("案例列表数据:", response);
        if (response && response.rows) {
          let data = response.rows;
          let slideshowData = [];
          data.forEach((res, index) => {
            if (res.caseImages && res.caseImages.length > 0) {
              slideshowData.push({
                type: "video",
                url: res.caseImages[0],
                src: res.caseImages[0],
                poster: res.caseImages && res.caseImages[0] ? res.caseImages[0] : "",
                title: res.caseName || "",
                description: res.caseDescription || "",
                id: res.id || index,
                autoplay: false,
                loop: false,
                muted: true,
                // 默认静音自动播放
                controls: true,
                showFullscreenBtn: true,
                caseTitle: res.caseTitle
              });
            } else if (res.caseImages && res.caseImages.length > 0) {
              slideshowData.push({
                type: "image",
                url: res.caseImages[0],
                src: res.caseImages[0],
                title: res.caseName || "",
                description: res.caseDescription || "",
                id: res.id || index,
                caseTitle: res.caseTitle
              });
            }
          });
          console.log("案例轮播数据:", slideshowData);
          caseList.value = slideshowData;
          imgList.value = slideshowData;
        }
      } catch (error) {
        console.error("获取案例列表失败:", error);
        common_vendor.index.showToast({
          title: "获取案例列表失败",
          icon: "none"
        });
      }
    });
    const fetchServiceList = () => __async(this, null, function* () {
      try {
        const response = yield api_activity.getServiceList({
          pageSize: 10,
          pageNum: 1
        });
        console.log("服务列表数据:", response);
        if (response && response.rows && response.rows.length > 0) {
          let data = response.rows[0];
          let slideshowData = [];
          if (data.serviceImage && Array.isArray(data.serviceImage)) {
            data.serviceImage.forEach((res) => {
              slideshowData.push({
                image: res,
                title: "",
                description: ""
              });
            });
          }
          console.log("服务轮播数据:", slideshowData);
          serviceList.value = slideshowData;
          serviceLists.value = response.rows.slice(1);
          if (data.serviceDescription) {
            processContent(data.serviceDescription);
          }
        } else {
          console.log("服务列表数据为空");
        }
      } catch (error) {
        console.error("获取服务列表失败:", error);
        common_vendor.index.showToast({
          title: "获取服务列表失败",
          icon: "none"
        });
      }
    });
    const switchTab = (index) => {
      activeTab.value = index;
      console.log("切换到tab:", index);
      console.log("当前serviceList:", serviceList.value);
    };
    const next = (item) => {
      try {
        const itemStr = JSON.stringify(item);
        common_vendor.index.navigateTo({
          url: "/pages/customer/index?item=" + encodeURIComponent(itemStr)
        });
      } catch (error) {
        console.error("序列化参数失败:", error);
        common_vendor.index.showToast({
          title: "参数传递失败",
          icon: "none"
        });
      }
    };
    const onVideoPlay = (e) => {
      console.log("视频开始播放:", e);
    };
    const onVideoPause = (e) => {
      console.log("视频暂停:", e);
    };
    const onVideoEnded = (e) => {
      console.log("视频播放结束:", e);
    };
    const onVideoError = (e) => {
      console.error("视频播放错误:", e);
      common_vendor.index.showToast({
        title: "视频播放失败",
        icon: "none"
      });
    };
    const onFullscreenChange = (e, index, isEnteringFullscreen) => {
      console.log(
        "视频全屏状态变化:",
        e,
        "索引:",
        index,
        "进入全屏:",
        isEnteringFullscreen
      );
      if (isEnteringFullscreen) {
        console.log("视频进入全屏模式，已取消静音");
        common_vendor.index.showToast({
          title: "全屏播放已开启声音",
          icon: "none",
          duration: 1500
        });
      } else {
        console.log("视频退出全屏模式，已恢复静音");
      }
    };
    const onPauseAllVideos = () => {
      console.log("暂停所有视频");
    };
    const selectedBanner = (item, index) => {
      console.log("选中轮播项:", item, "索引:", index);
      if (item.type === "video") {
        console.log("点击了视频项");
      } else {
        console.log("点击了图片项");
      }
    };
    common_vendor.onMounted(() => {
      fetchServiceList();
      fetchcaseList();
    });
    const processContent = (content) => {
      richText.value = content.replace(/<img[^>]*>/gi, function(match, capture) {
        return match.replace(/style=".*"/gi, "").replace(/style='.*'/gi, "");
      }).replace(/\<img/gi, '<img style="width:100%;height:auto;display:block;"');
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: activeTab.value === 0
      }, activeTab.value === 0 ? {} : {}, {
        b: activeTab.value === 0 ? 1 : "",
        c: common_vendor.o(($event) => switchTab(0)),
        d: activeTab.value === 1
      }, activeTab.value === 1 ? {} : {}, {
        e: activeTab.value === 1 ? 1 : "",
        f: common_vendor.o(($event) => switchTab(1)),
        g: activeTab.value == 0
      }, activeTab.value == 0 ? {
        h: common_vendor.o(selectedBanner),
        i: common_vendor.o(onVideoPlay),
        j: common_vendor.o(onVideoPause),
        k: common_vendor.o(onVideoEnded),
        l: common_vendor.o(onVideoError),
        m: common_vendor.o(onFullscreenChange),
        n: common_vendor.o(onPauseAllVideos),
        o: common_vendor.p({
          ["img-list"]: imgList.value,
          ["url-key"]: "url",
          ["show-title"]: true
        }),
        p: richText.value
      } : {}, {
        q: activeTab.value == 1
      }, activeTab.value == 1 ? {
        r: common_vendor.f(serviceLists.value, (item, index, i0) => {
          return {
            a: item.serviceImage[0],
            b: common_vendor.t(item.serviceName),
            c: index,
            d: common_vendor.o(($event) => next(item), index)
          };
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e4863047"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
