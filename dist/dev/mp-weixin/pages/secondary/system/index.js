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
if (!Math) {
  (VideoCarousel + BusinessSystem + ProblemList + Partners)();
}
const VideoCarousel = () => "./components/VideoCarousel.js";
const ProblemList = () => "../homepage/components/ProblemList.js";
const BusinessSystem = () => "../homepage/components/BusinessSystem.js";
const Partners = () => "./components/Partners.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const videoList = common_vendor.ref([]);
    const productIntroList = common_vendor.ref([]);
    const serviceLists = common_vendor.ref([]);
    const businessSystemList = common_vendor.ref([]);
    const partnerList = common_vendor.ref([]);
    const extractVideoUrl = (bannerVideos) => {
      if (!Array.isArray(bannerVideos))
        return "";
      for (const item of bannerVideos) {
        if (typeof item === "string" && item.includes(".mp4"))
          return item;
        if (item == null ? void 0 : item.videoUrl)
          return item.videoUrl;
        if (item == null ? void 0 : item.url)
          return item.url;
      }
      return "";
    };
    const formatRichText = (html) => {
      if (!html)
        return "";
      return html.replace(/<[^>]+>/g, "").replace(/&nbsp;/gi, "");
    };
    const fetchEnterpriseList = () => __async(this, null, function* () {
      try {
        const response = yield api_activity.getEnterpriseList({ pageSize: 10, pageNum: 1 });
        if (response && Array.isArray(response.rows) && response.rows.length > 0) {
          videoList.value = response.rows.filter((row) => row.videoEnabled).map((row) => ({
            enterpriseName: row.enterpriseName,
            coverImage: row.coverImage,
            videoUrl: extractVideoUrl(row.bannerVideos)
          })).filter((row) => row.videoUrl && row.coverImage);
          partnerList.value = Array.isArray(response.rows[0].cooperationMerchants) ? response.rows[0].cooperationMerchants : [];
        }
      } catch (error) {
        common_vendor.index.showToast({ title: "获取企业列表失败", icon: "none" });
      }
    });
    const fetchProductIntroList = () => __async(this, null, function* () {
      try {
        const response = yield api_activity.getProductIntroList({ pageSize: 6, pageNum: 1 });
        if (response && Array.isArray(response.rows) && response.rows.length > 0) {
          response.rows.forEach((item) => {
            item.introDetailFormat = formatRichText(item.introDetail);
          });
          productIntroList.value = response.rows;
        }
      } catch (error) {
        common_vendor.index.showToast({ title: "获取产品介绍列表失败", icon: "none" });
      }
    });
    const fetchServiceList = () => __async(this, null, function* () {
      try {
        const response = yield api_activity.getServiceList({ pageSize: 10, pageNum: 1 });
        if (response && Array.isArray(response.rows) && response.rows.length > 0) {
          serviceLists.value = response.rows;
          businessSystemList.value = response.rows.filter(
            (it) => ((it == null ? void 0 : it.serviceName) || "").trim() !== "线上获客"
          );
        }
      } catch (error) {
        common_vendor.index.showToast({ title: "获取服务列表失败", icon: "none" });
      }
    });
    const onVideoPlay = (item) => {
      common_vendor.index.navigateTo({
        url: "/pages/secondary/index/index?url=" + item.videoUrl + "&visitContent=宣传视频"
      });
    };
    const goToIntro = (item) => {
      if (item.introType == 2) {
        let url = "/pages/secondary/index/index?url=" + item.videoUrl + "&visitContent=" + item.title;
        if (item.coverImage) {
          url += "&coverImage=" + encodeURIComponent(item.coverImage);
        }
        common_vendor.index.navigateTo({ url });
      } else {
        common_vendor.index.navigateTo({
          url: "/pages/secondary/issueDetails/index?introId=" + item.introId
        });
      }
    };
    const goToIssueList = () => {
      common_vendor.index.navigateTo({ url: "/pages/secondary/issueList/index" });
    };
    const goToCustomer = (item) => {
      common_vendor.index.navigateTo({
        url: "/pages/customer/index?serviceId=" + item.serviceId
      });
    };
    common_vendor.onMounted(() => {
      fetchEnterpriseList();
      fetchProductIntroList();
      fetchServiceList();
    });
    common_vendor.onShow(() => __async(this, null, function* () {
      yield utils_basePoint.basePoint.trackingStart({ visitModule: "系统", visitContent: "系统" });
    }));
    common_vendor.onHide(() => __async(this, null, function* () {
      const trackingId = common_vendor.index.getStorageSync("trackingId");
      if (trackingId) {
        yield utils_basePoint.basePoint.trackingEnd({ id: trackingId });
      }
    }));
    common_vendor.onShareAppMessage(() => ({
      title: "系统",
      path: "/pages/secondary/system/index"
    }));
    common_vendor.onShareTimeline(() => ({
      title: "系统",
      query: ""
    }));
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(onVideoPlay),
        b: common_vendor.p({
          videos: videoList.value
        }),
        c: businessSystemList.value.length > 0
      }, businessSystemList.value.length > 0 ? {
        d: common_vendor.o(goToCustomer),
        e: common_vendor.p({
          title: "宝妈小叮当",
          subtitle: "业务系统",
          list: businessSystemList.value
        })
      } : {}, {
        f: productIntroList.value.length > 0
      }, productIntroList.value.length > 0 ? {
        g: common_vendor.o(goToIntro),
        h: common_vendor.o(goToIssueList),
        i: common_vendor.p({
          list: productIntroList.value,
          limit: 4
        })
      } : {}, {
        j: common_vendor.p({
          list: partnerList.value
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-8bd1f02a"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
