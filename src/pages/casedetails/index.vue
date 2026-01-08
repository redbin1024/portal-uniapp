<template>
  <view class="container">
    <view v-if="loading" class="loading">
      <text>加载中...</text>
    </view>
    <view v-else-if="error" class="error">
      <text>{{ error }}</text>
    </view>
    <view v-else>
      <!-- <rich-text class="activity" :nodes="richText" type="text"></rich-text> -->
      <mp-html :content="richText" @imgtap="previewImage"></mp-html>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";
import { onLoad, onShow, onHide, onUnload, onShareAppMessage, onShareTimeline } from "@dcloudio/uni-app";
import mpHtml from "uni-app-mp-html/components/mp-html/mp-html.vue";

onShareAppMessage(() => {
  return {
    title: "案例详情",
    path: "/pages/casedetails/index",
  };
});

onShareTimeline(() => {
  return {
    title: "案例详情",
    query: "",
  };
});

import { getActivityDetail } from "@/api/activity.js";
import basePoint from "@/utils/basePoint.js";

// 定义响应式数据
const richText = ref("");
const loading = ref(false);
const error = ref(null);
const activityId = ref("1951194533574815746");
const getTracking = async (customerName) => {
  await basePoint.trackingStart({
    visitModule: "商家案例",
    visitContent: customerName,
  });
};
// onHide(async () => {
//   let trackingId = uni.getStorageSync("trackingId");
//   if (trackingId) {
//     await basePoint.trackingEnd({
//       id: trackingId,
//     });
//   }
// });

onUnload(async () => {
  let trackingId = uni.getStorageSync("trackingId");
  if (trackingId) {
    await basePoint.trackingEnd({
      id: trackingId,
    });
  }
});
// 处理内容的函数
const processContent = (content) => {
  // 处理图片样式
  richText.value = content
    .replace(/<img[^>]*>/gi, function (match, capture) {
      return match.replace(/style=".*"/gi, "").replace(/style='.*'/gi, "");
    })
    .replace(/\<img/gi, '<img style="width:100%;height:auto;display:block;"');
};

// uni-app 页面加载生命周期
onLoad((options) => {
  // 从页面参数中获取活动ID
  getPageParams();
});
// 获取页面参数
const getPageParams = () => {
  // 获取页面实例
  const pages = getCurrentPages();
  const currentPage = pages[pages.length - 1];

  // 获取页面参数
  if (currentPage.options && currentPage.options.item) {
    // 先解码URL编码的参数
    const decodedItem = decodeURIComponent(currentPage.options.item);
    let detailDatas = JSON.parse(decodedItem);
    processContent(detailDatas.caseDetails);
    getTracking(detailDatas.customerName);
  }
};
</script>

<style scoped>
.container {
  min-height: 100vh;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200rpx;
  color: #666;
}

.error {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200rpx;
  color: #ff4757;
  text-align: center;
  padding: 0 40rpx;
}

.activity {
  margin: 20rpx 20rpx 40rpx 20rpx;
  display: block;
}
</style>
