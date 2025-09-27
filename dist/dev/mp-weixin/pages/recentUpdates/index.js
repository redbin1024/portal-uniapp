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
    const companyNewsList = common_vendor.ref([]);
    const fetchCompanyNewsList = () => __async(this, null, function* () {
      try {
        const response = yield api_activity.getCompanyNewsList({
          pageSize: 20,
          pageNum: 1,
          type: 1
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
    const next = (item) => {
      let itemStr = JSON.stringify(item);
      common_vendor.index.navigateTo({
        url: "/pages/recentdetails/index?item=" + itemStr
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(companyNewsList.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.createTime),
            b: common_vendor.t(item.newsTitle),
            c: common_vendor.t(item.newsTitle),
            d: item.newsImages[0],
            e: index,
            f: common_vendor.o(($event) => next(item), index)
          };
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9b5f4591"]]);
wx.createPage(MiniProgramPage);
