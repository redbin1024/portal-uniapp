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
const _sfc_main = /* @__PURE__ */ Object.assign({
  name: "RecentUpdates"
}, {
  __name: "index",
  setup(__props) {
    common_vendor.onMounted(() => {
      fetchCompanyNewsList();
    });
    const loading = common_vendor.ref(false);
    const loadingMore = common_vendor.ref(false);
    const companyNewsList = common_vendor.ref([]);
    const types = common_vendor.ref([]);
    const pageNum = common_vendor.ref(1);
    common_vendor.onReachBottom(() => {
      if (types.value == 1) {
        pageNum.value += 1;
        fetchCompanyNewsList();
      }
    });
    const fetchCompanyNewsList = () => __async(this, null, function* () {
      try {
        if (pageNum.value === 1) {
          loading.value = true;
        } else {
          loadingMore.value = true;
        }
        const response = yield api_activity.getCompanyNewsList({
          pageSize: 10,
          pageNum: pageNum.value,
          type: 1
        });
        console.log("企业列表数据:", response);
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
          companyNewsList.value = dataArray;
        } else {
          companyNewsList.value = companyNewsList.value.concat(dataArray);
        }
        types.value = dataArray.length >= 10 ? 1 : 2;
      } catch (error) {
        console.error("获取企业列表失败:", error);
        common_vendor.index.showToast({
          title: "获取企业列表失败",
          icon: "none"
        });
      } finally {
        loading.value = false;
        loadingMore.value = false;
      }
    });
    common_vendor.ref([
      {
        date: "2024-01-15",
        title: "月子中心一般为生产母亲",
        description: "月子中心一般为生产母亲提供专业产后恢复（即坐月子）服务的场所，也称为月子会所",
        image: "http://cdn.xiaodingdang1.com/2025/09/24/0f0d79a3bc9c4bb999418531047e1af4.jpg"
      },
      {
        date: "2024-01-10",
        title: "月子中心一般为生产母亲",
        description: "月子中心一般为生产母亲提供专业产后恢复（即坐月子）服务的场所，也称为月子会所",
        image: "http://cdn.xiaodingdang1.com/2025/09/24/0f0d79a3bc9c4bb999418531047e1af4.jpg"
      },
      {
        date: "2024-01-05",
        title: "月子中心一般为生产母亲",
        description: "月子中心一般为生产母亲提供专业产后恢复（即坐月子）服务的场所，也称为月子会所",
        image: "http://cdn.xiaodingdang1.com/2025/09/24/0f0d79a3bc9c4bb999418531047e1af4.jpg"
      }
    ]);
    const formatDate = (dateString) => {
      if (!dateString)
        return "";
      if (typeof dateString === "number") {
        const date = new Date(dateString);
        return date.toISOString().split("T")[0];
      }
      if (typeof dateString === "string") {
        if (dateString.includes(" ")) {
          return dateString.split(" ")[0];
        }
        if (dateString.includes("T")) {
          return dateString.split("T")[0];
        }
        return dateString;
      }
      return dateString;
    };
    const next = (item) => {
      let itemStr = JSON.stringify(item);
      common_vendor.index.navigateTo({
        url: "/pages/recentdetails/index?item=" + itemStr
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: loading.value
      }, loading.value ? {} : {}, {
        b: common_vendor.f(companyNewsList.value, (item, index, i0) => {
          return {
            a: common_vendor.t(formatDate(item.createTime)),
            b: common_vendor.t(item.newsTitle),
            c: common_vendor.t(item.newsContent),
            d: common_vendor.f(item.newsImages, (res, index2, i1) => {
              return {
                a: res,
                b: index2
              };
            }),
            e: index,
            f: common_vendor.o(($event) => next(item), index)
          };
        }),
        c: loadingMore.value
      }, loadingMore.value ? {} : {});
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-5bab1513"]]);
wx.createPage(MiniProgramPage);
