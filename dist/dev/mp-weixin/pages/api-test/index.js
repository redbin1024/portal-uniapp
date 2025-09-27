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
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const loading = common_vendor.ref(false);
    const resultText = common_vendor.ref("点击按钮开始测试");
    const apiData = common_vendor.ref([]);
    const testAPI = () => __async(this, null, function* () {
      loading.value = true;
      resultText.value = "正在请求API...";
      apiData.value = [];
      try {
        console.log("开始API测试");
        const response = yield api_activity.getsuccessCaseList({
          pageSize: 10,
          pageNum: 1
        });
        console.log("API响应:", response);
        console.log("响应类型:", typeof response);
        console.log("响应是否为null:", response === null);
        console.log("响应是否为undefined:", response === void 0);
        if (response) {
          console.log("响应对象属性:", Object.keys(response));
          let dataArray = null;
          let dataSource = "";
          if (response.rows && Array.isArray(response.rows)) {
            dataArray = response.rows;
            dataSource = "response.rows";
          } else if (response.data && Array.isArray(response.data)) {
            dataArray = response.data;
            dataSource = "response.data";
          } else if (response.list && Array.isArray(response.list)) {
            dataArray = response.list;
            dataSource = "response.list";
          } else if (response.records && Array.isArray(response.records)) {
            dataArray = response.records;
            dataSource = "response.records";
          } else if (Array.isArray(response)) {
            dataArray = response;
            dataSource = "response (直接数组)";
          }
          if (dataArray && dataArray.length > 0) {
            apiData.value = dataArray;
            resultText.value = `✅ 成功获取数据！
数据来源: ${dataSource}
数据条数: ${dataArray.length}`;
          } else {
            resultText.value = `⚠️ API响应成功但无数据
响应结构: ${JSON.stringify(
              response,
              null,
              2
            )}`;
          }
        } else {
          resultText.value = "❌ API响应为空";
        }
      } catch (error) {
        console.error("API测试失败:", error);
        resultText.value = `❌ API请求失败
错误信息: ${error.message || "未知错误"}
错误详情: ${JSON.stringify(error, null, 2)}`;
      } finally {
        loading.value = false;
      }
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(loading.value ? "测试中..." : "测试API请求"),
        b: common_vendor.o(testAPI),
        c: loading.value,
        d: common_vendor.t(resultText.value),
        e: apiData.value.length > 0
      }, apiData.value.length > 0 ? {
        f: common_vendor.f(apiData.value, (item, index, i0) => {
          return {
            a: common_vendor.t(JSON.stringify(item, null, 2)),
            b: index
          };
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a165d3e7"]]);
wx.createPage(MiniProgramPage);
