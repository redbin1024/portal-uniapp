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
const utils_basePoint = require("../../../utils/basePoint.js");
const api_activity = require("../../../api/activity.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    common_vendor.onShareAppMessage(() => {
      return {
        title: "系统",
        path: "/pages/secondary/system/index"
      };
    });
    common_vendor.onShareTimeline(() => {
      return {
        title: "系统",
        query: ""
      };
    });
    common_vendor.ref(0);
    const serviceList = common_vendor.ref([]);
    const serviceLists = common_vendor.ref([]);
    const caseList = common_vendor.ref([]);
    const richText = common_vendor.ref("");
    const imgList = common_vendor.ref([]);
    const bannerImages = common_vendor.ref("");
    const coverImage = common_vendor.ref("");
    const problemIcons = common_vendor.ref([
      "http://cdn.xiaodingdang1.com/2026/01/07/329586497cb141d69864b7ffe44c01e2.png",
      "http://cdn.xiaodingdang1.com/2026/01/07/3c68ffd0fa574800b29257226f5d92cf.png",
      "http://cdn.xiaodingdang1.com/2026/01/07/3500dffbb8d24fa1970e0e1c33a9fcd4.png",
      "http://cdn.xiaodingdang1.com/2026/01/07/a4859ef57e154df784dde7f35a99a3a8.png",
      "http://cdn.xiaodingdang1.com/2026/01/07/eb5b036256d842e199c48424b5bda131.png",
      "http://cdn.xiaodingdang1.com/2026/01/07/303e3c6ea6b34406bf1024b2cb0e9a70.png"
    ]);
    const problemOverlayImages = common_vendor.ref([
      "http://cdn.xiaodingdang1.com/2026/01/07/c4032fd2437547538d32d660aba816b9.png",
      "http://cdn.xiaodingdang1.com/2026/01/07/55bf54069a0f40ec94e9a1b2d17e9492.png",
      "http://cdn.xiaodingdang1.com/2026/01/07/8fecc01bffef42dd9d7273775fca6ee3.png",
      "http://cdn.xiaodingdang1.com/2026/01/07/28ffbcf6db9b453c826b322d8e82e780.png",
      "http://cdn.xiaodingdang1.com/2026/01/07/9779295dc4ca4826b12724f195e51309.png",
      "http://cdn.xiaodingdang1.com/2026/01/07/6297c733c4614cec90bb9caf8d8c0b71.png"
    ]);
    common_vendor.ref([
      {
        title: "服务笔记",
        desc: "客户总是要打开怎么教你如何用系统一次性解决"
      },
      {
        title: "宝妈站台",
        desc: "销售如何做到10分钟完成客户信任，快速签单"
      },
      {
        title: "宝妈站台",
        desc: "遇到客户在网上诋毁，会所该如何自救"
      },
      {
        title: "宝宝请帖",
        desc: "如何0成本做品牌曝光？如何0成本做线上获客"
      },
      {
        title: "AI智能销售",
        desc: "每个月到手的资源流失率超过80%，如何用系统完美解决"
      },
      {
        title: "客户轨迹",
        desc: "如何快速找到客户真实需求进行针对性营销 快速拿下订单"
      }
    ]);
    const goToIndex = (item) => {
      if (item.introType == 2) {
        common_vendor.index.navigateTo({
          url: "/pages/secondary/index/index?url=" + item.videoUrl
        });
      } else {
        const itemStr = JSON.stringify(item);
        common_vendor.index.navigateTo({
          url: "/pages/secondary/issueDetails/index?item=" + encodeURIComponent(itemStr)
        });
      }
    };
    const enterpriseList = common_vendor.ref([]);
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
            richText.value = processContent(data.serviceDescription);
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
    const nextVideo = (url, coverImage2) => {
      let sources = [];
      sources = [
        {
          url,
          type: "video",
          poster: coverImage2
        }
      ];
      common_vendor.index.previewMedia({
        sources,
        current: 0,
        autoplay: true
      });
    };
    const fetchEnterpriseList = () => __async(this, null, function* () {
      try {
        const response = yield api_activity.getEnterpriseList({
          pageSize: 10,
          pageNum: 1
        });
        console.log("企业列表数据:", response);
        if (response && response.rows && Array.isArray(response.rows) && response.rows.length > 0) {
          enterpriseList.value = response.rows[0];
          coverImage.value = response.rows[0].coverImage;
          let video;
          if (response.rows[0].bannerImages && Array.isArray(response.rows[0].bannerImages)) {
            response.rows[0].bannerImages.forEach((str1) => {
              let result1 = str1.slice(-3);
              if (result1 == "mp4") {
                video = str1;
              }
            });
          }
          bannerImages.value = video;
        }
      } catch (error) {
        console.error("获取企业列表失败:", error);
        common_vendor.index.showToast({
          title: "获取企业列表失败",
          icon: "none"
        });
      }
    });
    const productIntroList = common_vendor.ref([]);
    const fetchProductIntroList = () => __async(this, null, function* () {
      try {
        const response = yield api_activity.getProductIntroList({
          pageSize: 6,
          pageNum: 1
        });
        console.log("产品介绍列表数据:", response);
        if (response && response.rows && Array.isArray(response.rows) && response.rows.length > 0) {
          response.rows.forEach((item) => {
            console.log("原始introDetail:", item.introDetail);
            item.introDetailFormat = formatRichText(item.introDetail);
          });
          console.log("处理后的introDetailFormat:", response.rows);
          productIntroList.value = response.rows;
        }
      } catch (error) {
        console.error("获取产品介绍列表失败:", error);
        common_vendor.index.showToast({
          title: "获取产品介绍列表失败",
          icon: "none"
        });
      }
    });
    common_vendor.onMounted(() => {
      fetchServiceList();
      fetchcaseList();
      fetchEnterpriseList();
      fetchProductIntroList();
    });
    const processContent = (content) => {
      if (!content)
        return "";
      return content.replace(/<img[^>]*>/gi, function(match, capture) {
        return match.replace(/style=".*"/gi, "").replace(/style='.*'/gi, "");
      }).replace(/\<img/gi, '<img style="width:100%;height:auto;display:block;"');
    };
    const formatRichText = (html) => {
      let newContent = html.replace(/<[^>]+>/g, "");
      newContent = newContent.replace(/&nbsp;/gi, "");
      return newContent;
    };
    common_vendor.onShow(() => __async(this, null, function* () {
      yield utils_basePoint.basePoint.trackingStart({
        visitModule: "系统",
        visitContent: "系统"
      });
    }));
    common_vendor.onHide(() => __async(this, null, function* () {
      let trackingId = common_vendor.index.getStorageSync("trackingId");
      if (trackingId) {
        yield utils_basePoint.basePoint.trackingEnd({
          id: trackingId
        });
      }
    }));
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: bannerImages.value
      }, bannerImages.value ? {
        b: enterpriseList.value.coverImage + "?image_process=format,webp",
        c: common_vendor.o(($event) => nextVideo(bannerImages.value, coverImage.value))
      } : {}, {
        d: common_vendor.t(enterpriseList.value.enterpriseName),
        e: common_vendor.f(productIntroList.value, (item, index, i0) => {
          return {
            a: problemIcons.value[index],
            b: common_vendor.t(item.introName),
            c: common_vendor.t(item.introDetailFormat),
            d: index,
            e: `url(${problemOverlayImages.value[index]}) , url('http://cdn.xiaodingdang1.com/2026/01/07/eef8835804c445578657bcd774639c8f.png')`,
            f: common_vendor.o(($event) => goToIndex(item), index)
          };
        }),
        f: common_vendor.f(serviceLists.value, (item, index, i0) => {
          return common_vendor.e({
            a: item.serviceImage && item.serviceImage[0]
          }, item.serviceImage && item.serviceImage[0] ? {
            b: item.serviceImage[0] + "?image_process=format,webp"
          } : {}, {
            c: common_vendor.t(item.serviceName),
            d: index,
            e: common_vendor.o(($event) => next(item), index)
          });
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-8bd1f02a"]]);
_sfc_main.__runtimeHooks = 7;
wx.createPage(MiniProgramPage);
