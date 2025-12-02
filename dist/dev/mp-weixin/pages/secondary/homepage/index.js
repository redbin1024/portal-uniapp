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
const utils_basePoint = require("../../../utils/basePoint.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    common_vendor.ref(false);
    common_vendor.ref({});
    common_vendor.ref([]);
    const caseDataList = common_vendor.ref([]);
    const nextVideo = (url, coverImage, visitContent) => {
      common_vendor.index.navigateTo({
        url: "/pages/secondary/index/index?url=" + url + "&coverImage=" + coverImage + "&visitContent=" + visitContent
      });
    };
    const viewmore = () => {
      common_vendor.index.navigateTo({
        url: "/pages/secondary/businesspartner/index"
      });
    };
    const caseList = () => __async(this, null, function* () {
      try {
        const response = yield api_activity.getcaseList({
          pageSize: 9,
          pageNum: 1
        });
        console.log("企业列表数据:", response);
        if (response && response.rows && Array.isArray(response.rows) && response.rows.length > 0) {
          caseDataList.value = response.rows;
        }
      } catch (error) {
        console.error("获取企业列表失败:", error);
        common_vendor.index.showToast({
          title: "获取企业列表失败",
          icon: "none"
        });
      }
    });
    const fetchCompanyNewsList = () => __async(this, null, function* () {
      try {
        const response = yield api_activity.getCompanyNewsList({
          pageSize: 10,
          pageNum: 1,
          type: 0
        });
        console.log("企业列表数据:", response);
        if (response && response.rows && Array.isArray(response.rows) && response.rows.length > 0) {
          companyNewsList.value = response.rows;
        }
      } catch (error) {
        console.error("获取企业列表失败:", error);
        common_vendor.index.showToast({
          title: "获取企业列表失败",
          icon: "none"
        });
      }
    });
    const nextDetile = (item) => {
      try {
        common_vendor.index.switchTab({
          url: "/pages/secondary/winthecustomer/index"
        });
      } catch (error) {
        console.error("序列化参数失败:", error);
        common_vendor.index.showToast({
          title: "参数传递失败",
          icon: "none"
        });
      }
    };
    const fetchServiceList = () => __async(this, null, function* () {
      try {
        const response = yield api_activity.getServiceList({
          pageSize: 5,
          pageNum: 1
        });
        console.log("企业列表数据:", response);
        if (response && response.rows && Array.isArray(response.rows) && response.rows.length > 0) {
          serviceList.value = response.rows[0];
          serviceLists.value = response.rows.slice(1);
        }
      } catch (error) {
        console.error("获取企业列表失败:", error);
        common_vendor.index.showToast({
          title: "获取企业列表失败",
          icon: "none"
        });
      }
    });
    const fetchEnterpriseList = () => __async(this, null, function* () {
      try {
        const response = yield api_activity.getEnterpriseList({
          pageSize: 10,
          pageNum: 1
        });
        console.log("企业列表数据:", response);
        if (response && response.rows && Array.isArray(response.rows) && response.rows.length > 0) {
          enterpriseList.value = response.rows[0];
        }
      } catch (error) {
        console.error("获取企业列表失败:", error);
        common_vendor.index.showToast({
          title: "获取企业列表失败",
          icon: "none"
        });
      }
    });
    common_vendor.onMounted(() => {
      fetchEnterpriseList();
      fetchServiceList();
      fetchCompanyNewsList();
      caseList();
    });
    common_vendor.onShow(() => __async(this, null, function* () {
      yield utils_basePoint.basePoint.trackingStart({
        visitModule: "首页",
        visitContent: "首页"
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
    common_vendor.ref([
      {
        image: "http://cdn.xiaodingdang1.com/2025/09/17/3e714aab0c1044f3a6d9ad78dc856e63.png",
        title: "专业团队",
        desc: "拥有多年行业经验的专业团队"
      },
      {
        image: "http://cdn.xiaodingdang1.com/2025/09/17/dff756b4214e4fdb94a2a803a38a16fa.png",
        title: "优质服务",
        desc: "为客户提供一站式解决方案"
      },
      {
        image: "http://cdn.xiaodingdang1.com/2025/09/12/bcf4ff23413847129727a6a265fd2b34.png",
        title: "创新技术",
        desc: "运用最新技术为客户创造价值"
      }
    ]);
    common_vendor.ref([
      {
        image: "http://cdn.xiaodingdang1.com/2025/09/17/e7c6eb7643134423ab31c7726397b807.png",
        title: "销售部",
        content: '拥有超过10年的建筑经验，包括担任奥地利"蓝天组"建筑事务所的首席设计师(奥地利的Coophimmelblau)和Hernan Diaz Alonso在洛杉矶的Xefirotarch。2008年得南加州建筑学院建筑学硕士学位。'
      },
      {
        image: "http://cdn.xiaodingdang1.com/2025/09/17/3e714aab0c1044f3a6d9ad78dc856e63.png",
        title: "技术部",
        content: "专业的技术团队，拥有丰富的软件开发经验，致力于为客户提供最优质的技术解决方案。团队成员均具备扎实的技术功底和创新思维。"
      },
      {
        image: "http://cdn.xiaodingdang1.com/2025/09/17/dff756b4214e4fdb94a2a803a38a16fa.png",
        title: "运营部",
        content: "负责公司日常运营管理，拥有丰富的项目管理经验。致力于优化业务流程，提升工作效率，确保项目顺利进行。"
      },
      {
        image: "http://cdn.xiaodingdang1.com/2025/09/12/bcf4ff23413847129727a6a265fd2b34.png",
        title: "市场部",
        content: "专业的市场推广团队，深谙市场营销策略，具备敏锐的市场洞察力，为公司业务拓展提供强有力的支持。"
      }
    ]);
    common_vendor.ref([
      {
        image: "http://cdn.xiaodingdang1.com/2025/09/18/fd0961babb634f3b9fefb2f9ad8c0855.png",
        name: "优秀企业证书"
      },
      {
        image: "http://cdn.xiaodingdang1.com/2025/09/18/fd0961babb634f3b9fefb2f9ad8c0855.png",
        name: "技术创新奖"
      },
      {
        image: "http://cdn.xiaodingdang1.com/2025/09/18/fd0961babb634f3b9fefb2f9ad8c0855.png",
        name: "服务质量奖"
      },
      {
        image: "http://cdn.xiaodingdang1.com/2025/09/18/fd0961babb634f3b9fefb2f9ad8c0855.png",
        name: "行业领先奖"
      },
      {
        image: "http://cdn.xiaodingdang1.com/2025/09/18/fd0961babb634f3b9fefb2f9ad8c0855.png",
        name: "客户满意奖"
      }
    ]);
    common_vendor.ref([
      {
        image: "http://cdn.xiaodingdang1.com/2025/09/18/cc70bc251d644d78866a0ad1e0ba546c.png",
        name: "合作伙伴1"
      },
      {
        image: "http://cdn.xiaodingdang1.com/2025/09/18/cc70bc251d644d78866a0ad1e0ba546c.png",
        name: "合作伙伴2"
      },
      {
        image: "http://cdn.xiaodingdang1.com/2025/09/18/cc70bc251d644d78866a0ad1e0ba546c.png",
        name: "合作伙伴3"
      },
      {
        image: "http://cdn.xiaodingdang1.com/2025/09/18/cc70bc251d644d78866a0ad1e0ba546c.png",
        name: "合作伙伴4"
      },
      {
        image: "http://cdn.xiaodingdang1.com/2025/09/18/cc70bc251d644d78866a0ad1e0ba546c.png",
        name: "合作伙伴5"
      },
      {
        image: "http://cdn.xiaodingdang1.com/2025/09/18/cc70bc251d644d78866a0ad1e0ba546c.png",
        name: "合作伙伴5"
      },
      {
        image: "http://cdn.xiaodingdang1.com/2025/09/18/cc70bc251d644d78866a0ad1e0ba546c.png",
        name: "合作伙伴5"
      },
      {
        image: "http://cdn.xiaodingdang1.com/2025/09/18/cc70bc251d644d78866a0ad1e0ba546c.png",
        name: "合作伙伴5"
      }
    ]);
    const enterpriseList = common_vendor.ref([]);
    const serviceList = common_vendor.ref([]);
    const serviceLists = common_vendor.ref([]);
    const companyNewsList = common_vendor.ref([]);
    common_vendor.ref(0);
    common_vendor.ref(false);
    common_vendor.ref(-1);
    common_vendor.ref(0);
    common_vendor.ref(0);
    common_vendor.ref(0);
    common_vendor.ref(0);
    common_vendor.ref(false);
    const showPreview = common_vendor.ref(false);
    const isVideoFullscreen = common_vendor.ref(false);
    const previewMedia = common_vendor.ref({
      src: "",
      type: "image",
      // 'image' 或 'video'
      index: 0
    });
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
    const closePreview = () => {
      if (isVideoFullscreen.value) {
        return;
      }
      showPreview.value = false;
    };
    const onFullscreenChange = (e) => {
      console.log("视频全屏状态变化:", e);
      const isEnteringFullscreen = !!(e && e.detail && (e.detail.fullScreen || e.detail.fullscreen));
      isVideoFullscreen.value = isEnteringFullscreen;
      if (isEnteringFullscreen) {
        console.log("视频进入全屏，保持showPreview显示");
      } else {
        console.log("视频退出全屏");
      }
    };
    const handlePreviewModalClick = (e) => {
      if (isVideoFullscreen.value) {
        console.log("视频全屏中，不关闭预览");
        return;
      }
      closePreview();
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
    const handleCustomerServiceClick = () => {
      console.log("Customer service clicked");
    };
    const getFirstRowCertificates = (certificates) => {
      if (!certificates || !Array.isArray(certificates))
        return [];
      return certificates.filter((_, index) => index % 2 === 0);
    };
    const getSecondRowCertificates = (certificates) => {
      if (!certificates || !Array.isArray(certificates))
        return [];
      return certificates.filter((_, index) => index % 2 === 1);
    };
    common_vendor.onPageScroll((e) => {
    });
    return (_ctx, _cache) => {
      var _a, _b, _c, _d, _e, _f;
      return common_vendor.e({
        a: common_vendor.f(caseDataList.value, (item, index, i0) => {
          return {
            a: item.coverImage + "?image_process=format,webp",
            b: common_vendor.o(($event) => nextVideo(item.caseImages, item.coverImage, item.caseTitle), index),
            c: index
          };
        }),
        b: common_vendor.o(viewmore),
        c: enterpriseList.value.bannerImages[0] + "?image_process=format,webp",
        d: ((_b = (_a = serviceList.value) == null ? void 0 : _a.serviceImage) == null ? void 0 : _b[0]) + "?image_process=format,webp"
      }, ((_d = (_c = serviceList.value) == null ? void 0 : _c.serviceImage) == null ? void 0 : _d[0]) + "?image_process=format,webp" ? {
        e: (_f = (_e = serviceList.value) == null ? void 0 : _e.serviceImage) == null ? void 0 : _f[0]
      } : {}, {
        f: common_vendor.o(($event) => nextDetile()),
        g: common_vendor.f(serviceLists.value, (item, index, i0) => {
          return {
            a: item.serviceImage + "?image_process=format,webp",
            b: common_vendor.t(item.serviceName),
            c: index,
            d: common_vendor.o(($event) => next(item), index)
          };
        }),
        h: common_vendor.f(getFirstRowCertificates(enterpriseList.value.honorCertificates), (certificate, index, i0) => {
          return {
            a: certificate + "?image_process=format,webp",
            b: "row1-" + index
          };
        }),
        i: getSecondRowCertificates(enterpriseList.value.honorCertificates).length > 0
      }, getSecondRowCertificates(enterpriseList.value.honorCertificates).length > 0 ? {
        j: common_vendor.f(getSecondRowCertificates(enterpriseList.value.honorCertificates), (certificate, index, i0) => {
          return {
            a: certificate,
            b: "row2-" + index
          };
        })
      } : {}, {
        k: common_vendor.t(enterpriseList.value.enterpriseAddress),
        l: `url(${enterpriseList.value.enterpriseLogo}?image_process=format,webp)`,
        m: showPreview.value
      }, showPreview.value ? common_vendor.e({
        n: previewMedia.value.type === "video"
      }, previewMedia.value.type === "video" ? {
        o: previewMedia.value.src,
        p: getVideoPoster(previewMedia.value.src),
        q: common_vendor.o(onFullscreenChange),
        r: "preview-video-" + previewMedia.value.index
      } : {
        s: previewMedia.value.src
      }, {
        t: isVideoFullscreen.value ? 1 : "",
        v: common_vendor.o(handlePreviewModalClick)
      }) : {}, {
        w: common_vendor.o(handleCustomerServiceClick),
        x: showPreview.value ? 1 : ""
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-24abe20b"]]);
_sfc_main.__runtimeHooks = 7;
wx.createPage(MiniProgramPage);
