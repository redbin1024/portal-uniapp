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
  _easycom_BackHome();
}
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
    common_vendor.ref(0);
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
      return {};
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e4863047"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
