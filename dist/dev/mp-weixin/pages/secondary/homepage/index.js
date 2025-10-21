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
    common_vendor.ref(false);
    common_vendor.ref({});
    common_vendor.ref([]);
    const caseDataList = common_vendor.ref([]);
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
    const currentIndex = common_vendor.ref(0);
    common_vendor.ref(false);
    const showPreview = common_vendor.ref(false);
    const isVideoFullscreen = common_vendor.ref(false);
    const previewMedia = common_vendor.ref({
      src: "",
      type: "image",
      // 'image' 或 'video'
      index: 0
    });
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
    const onMediaClick = (item, index, type) => {
      console.log("Media clicked:", item, index, type);
      previewMedia.value = {
        src: item,
        type,
        index
      };
      showPreview.value = true;
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
    const prevMedia = () => {
      const currentIndex2 = previewMedia.value.index;
      const newIndex = currentIndex2 > 0 ? currentIndex2 - 1 : caseDataList.value.length - 1;
      const newSrc = caseDataList.value[newIndex];
      previewMedia.value = {
        src: newSrc,
        type: isVideo(newSrc) ? "video" : "image",
        index: newIndex
      };
    };
    const nextMedia = () => {
      const currentIndex2 = previewMedia.value.index;
      const newIndex = currentIndex2 < caseDataList.value.length - 1 ? currentIndex2 + 1 : 0;
      const newSrc = caseDataList.value[newIndex];
      previewMedia.value = {
        src: newSrc,
        type: isVideo(newSrc) ? "video" : "image",
        index: newIndex
      };
    };
    const previewSingleImage = (bannerImages) => {
      let urls = [bannerImages];
      common_vendor.index.previewImage({
        urls,
        current: 0,
        indicator: "number",
        loop: false
      });
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
            a: "bannerVideo" + index,
            b: item,
            c: index === currentIndex.value,
            d: common_vendor.o(($event) => onMediaClick(item, index, "video"), index),
            e: index
          };
        }),
        b: common_vendor.o(viewmore),
        c: enterpriseList.value.bannerImages[0],
        d: common_vendor.o(($event) => previewSingleImage(enterpriseList.value.bannerImages[0])),
        e: (_b = (_a = serviceList.value) == null ? void 0 : _a.serviceImage) == null ? void 0 : _b[0]
      }, ((_d = (_c = serviceList.value) == null ? void 0 : _c.serviceImage) == null ? void 0 : _d[0]) ? {
        f: (_f = (_e = serviceList.value) == null ? void 0 : _e.serviceImage) == null ? void 0 : _f[0]
      } : {}, {
        g: common_vendor.o(($event) => nextDetile()),
        h: common_vendor.f(serviceLists.value, (item, index, i0) => {
          return {
            a: item.serviceImage,
            b: common_vendor.t(item.serviceName),
            c: index,
            d: common_vendor.o(($event) => next(item), index)
          };
        }),
        i: common_vendor.f(getFirstRowCertificates(enterpriseList.value.honorCertificates), (certificate, index, i0) => {
          return {
            a: certificate,
            b: "row1-" + index
          };
        }),
        j: getSecondRowCertificates(enterpriseList.value.honorCertificates).length > 0
      }, getSecondRowCertificates(enterpriseList.value.honorCertificates).length > 0 ? {
        k: common_vendor.f(getSecondRowCertificates(enterpriseList.value.honorCertificates), (certificate, index, i0) => {
          return {
            a: certificate,
            b: "row2-" + index
          };
        })
      } : {}, {
        l: common_vendor.t(enterpriseList.value.enterpriseName),
        m: common_vendor.t(enterpriseList.value.enterpriseAddress),
        n: common_vendor.t(enterpriseList.value.contactPhone),
        o: enterpriseList.value.qrCode,
        p: `url(${enterpriseList.value.enterpriseLogo})`,
        q: showPreview.value
      }, showPreview.value ? common_vendor.e({
        r: previewMedia.value.type === "video"
      }, previewMedia.value.type === "video" ? {
        s: previewMedia.value.src,
        t: getVideoPoster(previewMedia.value.src),
        v: common_vendor.o(onFullscreenChange),
        w: "preview-video-" + previewMedia.value.index
      } : {
        x: previewMedia.value.src
      }, {
        y: common_vendor.o(prevMedia),
        z: common_vendor.o(nextMedia),
        A: isVideoFullscreen.value ? 1 : "",
        B: common_vendor.o(handlePreviewModalClick)
      }) : {}, {
        C: common_vendor.o(handleCustomerServiceClick),
        D: showPreview.value ? 1 : ""
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-24abe20b"]]);
_sfc_main.__runtimeHooks = 1;
wx.createPage(MiniProgramPage);
