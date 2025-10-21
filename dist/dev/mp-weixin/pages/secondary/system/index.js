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
    common_vendor.ref(0);
    const serviceList = common_vendor.ref([]);
    const serviceLists = common_vendor.ref([]);
    const caseList = common_vendor.ref([]);
    const richText = common_vendor.ref("");
    const imgList = common_vendor.ref([]);
    const bannerImages = common_vendor.ref("");
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
    const fetchEnterpriseList = () => __async(this, null, function* () {
      try {
        const response = yield api_activity.getEnterpriseList({
          pageSize: 10,
          pageNum: 1
        });
        console.log("企业列表数据:", response);
        if (response && response.rows && Array.isArray(response.rows) && response.rows.length > 0) {
          enterpriseList.value = response.rows[0];
          let video;
          response.rows[0].bannerImages.forEach((str1) => {
            let result1 = str1.slice(-3);
            if (result1 == "mp4") {
              video = str1;
            }
          });
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
    common_vendor.onMounted(() => {
      fetchServiceList();
      fetchcaseList();
      fetchEnterpriseList();
    });
    const processContent = (content) => {
      richText.value = content.replace(/<img[^>]*>/gi, function(match, capture) {
        return match.replace(/style=".*"/gi, "").replace(/style='.*'/gi, "");
      }).replace(/\<img/gi, '<img style="width:100%;height:auto;display:block;"');
    };
    return (_ctx, _cache) => {
      return {
        a: bannerImages.value,
        b: common_vendor.t(enterpriseList.value.enterpriseName),
        c: common_vendor.t(enterpriseList.value.enterpriseDescription),
        d: common_vendor.f(serviceLists.value, (item, index, i0) => {
          return {
            a: item.serviceImage[0],
            b: common_vendor.t(item.serviceName),
            c: index,
            d: common_vendor.o(($event) => next(item), index)
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-8bd1f02a"]]);
wx.createPage(MiniProgramPage);
