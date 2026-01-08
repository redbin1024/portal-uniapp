<template>
  <view class="content-img">
    <rich-text class="activity" :nodes="richText" type="text"></rich-text>
    <!-- 显示接收到的服务描述参数 -->
    <view v-if="serviceDescription" class="service-description"> </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { onShareAppMessage, onShareTimeline } from "@dcloudio/uni-app";

onShareAppMessage(() => {
  return {
    title: "动态详情",
    path: "/pages/dynamicdetails/index",
  };
});

onShareTimeline(() => {
  return {
    title: "动态详情",
    query: "",
  };
});

// 定义响应式数据
const serviceDescription = ref("");
const richText = ref("");

// 页面加载时获取参数
onMounted(() => {
  // 获取页面参数
  const pages = getCurrentPages();
  const currentPage = pages[pages.length - 1];
  // 从页面选项中获取参数
  if (currentPage.options && currentPage.options.item) {
    try {
      // 先解码URL编码的参数
      const decodedItem = decodeURIComponent(currentPage.options.item);
      let serviceDescription = JSON.parse(decodedItem);
      processContent(serviceDescription.newDetails);
    } catch (e) {
      console.error("解析服务描述参数失败:", e);
      // 如果解析失败，尝试直接使用原始参数
      try {
        let serviceDescription = JSON.parse(currentPage.options.item);
        processContent(serviceDescription.newDetails);
      } catch (e2) {
        serviceDescription.value = currentPage.options.item;
      }
    }
  }
});

const processContent = (content) => {
  // 处理图片样式
  richText.value = content
    .replace(/<img[^>]*>/gi, function (match, capture) {
      return match.replace(/style=".*"/gi, "").replace(/style='.*'/gi, "");
    })
    .replace(/\<img/gi, '<img style="width:100%;height:auto;display:block;"');
};
</script>

<style>
.content-img {
  width: 750rpx;
}
.content-img image {
  width: 100%;
}
.service-description {
  padding: 20rpx;
  margin: 20rpx;
  background-color: #f5f5f5;
  border-radius: 10rpx;
}
.service-description text {
  font-size: 28rpx;
  color: #333;
}
</style>
