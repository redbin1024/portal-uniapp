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
    const enterpriseInfo = common_vendor.ref({});
    const trafficService = common_vendor.ref({});
    const systemServiceList = common_vendor.ref([]);
    const partnerCaseList = common_vendor.ref([]);
    const productIntroList = common_vendor.ref([]);
    const getResponseRows = (response) => {
      return Array.isArray(response == null ? void 0 : response.rows) ? response.rows : [];
    };
    const toWebpUrl = (url) => {
      if (!url)
        return "";
      return `${url}${url.includes("?") ? "&" : "?"}image_process=format,webp`;
    };
    const heroStyle = common_vendor.computed(() => {
      var _a;
      const bg = (_a = enterpriseInfo.value) == null ? void 0 : _a.enterpriseLogo;
      if (!bg)
        return {};
      return { backgroundImage: `url(${toWebpUrl(bg)})` };
    });
    const openPartnerCase = (videoUrl, coverImage, visitContent) => {
      common_vendor.index.navigateTo({
        url: "/pages/secondary/index/index?url=" + encodeURIComponent(videoUrl || "") + "&coverImage=" + encodeURIComponent(coverImage || "") + "&visitContent=" + encodeURIComponent(visitContent || "")
      });
    };
    const goToPartnerListPage = () => {
      common_vendor.index.navigateTo({
        url: "/pages/secondary/businesspartner/index"
      });
    };
    const goToIssueListPage = () => {
      common_vendor.index.navigateTo({
        url: "/pages/secondary/issueList/index"
      });
    };
    const fetchPartnerCaseList = () => __async(this, null, function* () {
      try {
        const rows = getResponseRows(yield api_activity.getcaseList({ pageSize: 9, pageNum: 1 }));
        partnerCaseList.value = rows;
      } catch (error) {
        common_vendor.index.showToast({
          title: "获取合作商家失败",
          icon: "none"
        });
      }
    });
    const goToTrafficServicePage = () => {
      try {
        common_vendor.index.switchTab({
          url: "/pages/secondary/winthecustomer/index"
        });
      } catch (error) {
        common_vendor.index.showToast({
          title: "跳转失败",
          icon: "none"
        });
      }
    };
    const fetchServiceList = () => __async(this, null, function* () {
      try {
        const rows = getResponseRows(yield api_activity.getServiceList({ pageSize: 5, pageNum: 1 }));
        trafficService.value = rows[0] || {};
        systemServiceList.value = rows.slice(1);
      } catch (error) {
        common_vendor.index.showToast({
          title: "获取服务列表失败",
          icon: "none"
        });
      }
    });
    const fetchProductIntroList = () => __async(this, null, function* () {
      try {
        const rows = getResponseRows(
          yield api_activity.getProductIntroList({ pageSize: 10, pageNum: 1 })
        );
        productIntroList.value = rows;
      } catch (error) {
        common_vendor.index.showToast({
          title: "获取产品介绍列表失败",
          icon: "none"
        });
      }
    });
    const fetchEnterpriseInfo = () => __async(this, null, function* () {
      var _a;
      try {
        const rows = getResponseRows(
          yield api_activity.getEnterpriseList({ pageSize: 10, pageNum: 1 })
        );
        if (rows.length > 0) {
          enterpriseInfo.value = rows[0] || {};
          common_vendor.index.setStorageSync("videoEnabled", !!((_a = rows[0]) == null ? void 0 : _a.videoEnabled));
        }
      } catch (error) {
        common_vendor.index.showToast({
          title: "获取企业信息失败",
          icon: "none"
        });
      }
    });
    const handleIntroClick = (item) => {
      if (item.introType == 2) {
        common_vendor.index.navigateTo({
          url: "/pages/secondary/index/index?url=" + encodeURIComponent(item.videoUrl || "") + "&visitContent=" + encodeURIComponent(item.title || "")
        });
      } else {
        common_vendor.index.navigateTo({
          url: "/pages/secondary/issueDetails/index?introId=" + item.introId
        });
      }
    };
    const goToServiceDetail = (item) => {
      common_vendor.index.navigateTo({
        url: "/pages/customer/index?serviceId=" + item.serviceId
      });
    };
    common_vendor.onMounted(() => {
      fetchEnterpriseInfo();
      fetchProductIntroList();
      fetchServiceList();
      fetchPartnerCaseList();
    });
    common_vendor.onShow(() => __async(this, null, function* () {
      yield utils_basePoint.basePoint.trackingStart({
        visitModule: "首页",
        visitContent: "首页"
      });
    }));
    common_vendor.onHide(() => __async(this, null, function* () {
      const trackingId = common_vendor.index.getStorageSync("trackingId");
      if (trackingId) {
        yield utils_basePoint.basePoint.trackingEnd({
          id: trackingId
        });
      }
    }));
    const getEvenIndexItems = (items) => {
      if (!items || !Array.isArray(items))
        return [];
      return items.filter((_, index) => index % 2 === 0);
    };
    const getOddIndexItems = (items) => {
      if (!items || !Array.isArray(items))
        return [];
      return items.filter((_, index) => index % 2 === 1);
    };
    common_vendor.onShareAppMessage(() => {
      return {
        title: enterpriseInfo.value.enterpriseName || "天天拓客",
        path: "/pages/secondary/homepage/index",
        imageUrl: enterpriseInfo.value.enterpriseLogo || ""
      };
    });
    common_vendor.onShareTimeline(() => {
      return {
        title: enterpriseInfo.value.enterpriseName || "天天拓客",
        query: "",
        imageUrl: enterpriseInfo.value.enterpriseLogo || ""
      };
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: enterpriseInfo.value.videoEnabled
      }, enterpriseInfo.value.videoEnabled ? common_vendor.e({
        b: common_vendor.f(partnerCaseList.value, (item, index, i0) => {
          return {
            a: toWebpUrl(item.coverImage),
            b: common_vendor.o(($event) => openPartnerCase(item.caseImages, item.coverImage, item.caseTitle), index),
            c: index
          };
        }),
        c: common_vendor.o(goToPartnerListPage),
        d: enterpriseInfo.value.bannerImages && enterpriseInfo.value.bannerImages[0]
      }, enterpriseInfo.value.bannerImages && enterpriseInfo.value.bannerImages[0] ? {
        e: toWebpUrl(enterpriseInfo.value.bannerImages[0])
      } : {}) : {}, {
        f: productIntroList.value.length > 0
      }, productIntroList.value.length > 0 ? {
        g: common_vendor.o(goToIssueListPage),
        h: common_vendor.f(productIntroList.value, (item, index, i0) => {
          return {
            a: toWebpUrl(item.coverImage),
            b: common_vendor.o(($event) => handleIntroClick(item), "problem-" + index),
            c: "problem-" + index
          };
        })
      } : {}, {
        i: trafficService.value.serviceImage && trafficService.value.serviceImage[0]
      }, trafficService.value.serviceImage && trafficService.value.serviceImage[0] ? {
        j: toWebpUrl(trafficService.value.serviceImage[0])
      } : {}, {
        k: common_vendor.o(goToTrafficServicePage),
        l: common_vendor.f(systemServiceList.value, (item, index, i0) => {
          return {
            a: toWebpUrl(item.serviceImage),
            b: common_vendor.t(item.serviceName),
            c: index,
            d: common_vendor.o(($event) => goToServiceDetail(item), index)
          };
        }),
        m: common_vendor.f(getEvenIndexItems(enterpriseInfo.value.honorCertificates), (certificate, index, i0) => {
          return {
            a: toWebpUrl(certificate),
            b: "row1-" + index
          };
        }),
        n: getOddIndexItems(enterpriseInfo.value.honorCertificates).length > 0
      }, getOddIndexItems(enterpriseInfo.value.honorCertificates).length > 0 ? {
        o: common_vendor.f(getOddIndexItems(enterpriseInfo.value.honorCertificates), (certificate, index, i0) => {
          return {
            a: toWebpUrl(certificate),
            b: "row2-" + index
          };
        })
      } : {}, {
        p: common_vendor.t(enterpriseInfo.value.enterpriseAddress),
        q: common_vendor.s(heroStyle.value)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-24abe20b"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
