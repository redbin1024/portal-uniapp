<template>
  <view class="container">
    <view class="header">
      <text class="title">API测试页面</text>
    </view>

    <view class="test-section">
      <button @click="testAPI" class="test-btn" :disabled="loading">
        {{ loading ? "测试中..." : "测试API请求" }}
      </button>
    </view>

    <view class="result-section">
      <view class="result-title">测试结果：</view>
      <view class="result-content">{{ resultText }}</view>
    </view>

    <view class="data-section" v-if="apiData.length > 0">
      <view class="data-title">数据列表：</view>
      <view class="data-item" v-for="(item, index) in apiData" :key="index">
        <text class="data-text">{{ JSON.stringify(item, null, 2) }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";
import { onShareAppMessage, onShareTimeline } from "@dcloudio/uni-app";

onShareAppMessage(() => {
  return {
    title: "API测试",
    path: "/pages/api-test/index",
  };
});

onShareTimeline(() => {
  return {
    title: "API测试",
    query: "",
  };
});
import { getsuccessCaseList } from "@/api/activity.js";

const loading = ref(false);
const resultText = ref("点击按钮开始测试");
const apiData = ref([]);

const testAPI = async () => {
  loading.value = true;
  resultText.value = "正在请求API...";
  apiData.value = [];

  try {
    console.log("开始API测试");

    const response = await getsuccessCaseList({
      pageSize: 10,
      pageNum: 1,
    });

    console.log("API响应:", response);
    console.log("响应类型:", typeof response);
    console.log("响应是否为null:", response === null);
    console.log("响应是否为undefined:", response === undefined);

    if (response) {
      console.log("响应对象属性:", Object.keys(response));

      // 尝试不同的数据结构
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
        resultText.value = `✅ 成功获取数据！\n数据来源: ${dataSource}\n数据条数: ${dataArray.length}`;
      } else {
        resultText.value = `⚠️ API响应成功但无数据\n响应结构: ${JSON.stringify(
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
    resultText.value = `❌ API请求失败\n错误信息: ${
      error.message || "未知错误"
    }\n错误详情: ${JSON.stringify(error, null, 2)}`;
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.container {
  padding: 20px;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.header {
  text-align: center;
  margin-bottom: 30px;
}

.title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.test-section {
  margin-bottom: 30px;
  text-align: center;
}

.test-btn {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 8px;
  font-size: 16px;
}

.test-btn:disabled {
  background-color: #ccc;
}

.result-section {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.result-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
}

.result-content {
  font-size: 14px;
  line-height: 1.5;
  color: #666;
  white-space: pre-wrap;
  word-break: break-all;
}

.data-section {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.data-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #333;
}

.data-item {
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 6px;
  margin-bottom: 10px;
  border-left: 4px solid #007bff;
}

.data-text {
  font-size: 12px;
  font-family: monospace;
  color: #495057;
  white-space: pre-wrap;
  word-break: break-all;
}
</style>
