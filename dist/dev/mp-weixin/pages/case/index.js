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
if (!Math) {
  (CaseCardGrid + BackHome)();
}
const CaseCardGrid = () => "../secondary/winthecustomer/components/CaseCardGrid.js";
const BackHome = () => "../../components/BackHome/BackHome.js";
const __default__ = {
  onShareAppMessage() {
    return {
      title: "商家案例",
      path: "/pages/case/index"
    };
  },
  onShareTimeline() {
    return {
      title: "商家案例",
      query: ""
    };
  }
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __name: "index",
  setup(__props) {
    const successCaseList = common_vendor.ref([]);
    const loading = common_vendor.ref(false);
    const loadingMore = common_vendor.ref(false);
    const hasMore = common_vendor.ref(true);
    const pageNum = common_vendor.ref(1);
    const pageSize = 10;
    const fetchsuccessCaseList = () => __async(this, null, function* () {
      try {
        if (pageNum.value === 1) {
          loading.value = true;
        } else {
          loadingMore.value = true;
        }
        const response = yield api_activity.getsuccessCaseList({
          pageSize,
          pageNum: pageNum.value
        });
        const rows = response && Array.isArray(response.rows) ? response.rows : [];
        if (pageNum.value === 1) {
          successCaseList.value = rows;
        } else {
          successCaseList.value = [...successCaseList.value, ...rows];
        }
        hasMore.value = rows.length >= pageSize;
      } catch (error) {
        console.error("获取成功案例列表失败:", error);
      } finally {
        loading.value = false;
        loadingMore.value = false;
      }
    });
    const navigateToDetail = (item) => {
      common_vendor.index.navigateTo({
        url: "/pages/casedetails/index?successCaseId=" + item.successCaseId
      });
    };
    common_vendor.onReachBottom(() => {
      if (hasMore.value) {
        pageNum.value += 1;
        fetchsuccessCaseList();
      }
    });
    common_vendor.onMounted(() => {
      fetchsuccessCaseList();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: loading.value
      }, loading.value ? {} : {}, {
        b: common_vendor.o(navigateToDetail),
        c: common_vendor.p({
          list: successCaseList.value
        }),
        d: loadingMore.value
      }, loadingMore.value ? {} : {});
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2786c006"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
