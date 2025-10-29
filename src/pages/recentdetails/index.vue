<template>
  <view class="main">
    <view class="title">{{ detailData.newsTitle }}</view>
    <!-- <view class="image">
      <image :src="detailData.newsImages[0]"></image>
    </view> -->
    <view class="content">
      {{ detailData.newsContent }}
    </view>
    <rich-text class="activity" :nodes="richText" type="text"></rich-text>
  </view>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getCompanyNews } from "@/api/activity.js";
const richText = ref("");
// 定义组件名称
defineOptions({
  name: "RecentDetails",
});

// 响应式数据
const detailData = ref({});
//查询公司动态列表
const CompanyNews = async (newsId) => {
  try {
    const response = await getCompanyNews({
      newsId,
    });
    if (response && response.data) {
      detailData.value = response.data;
      processContent(response.data.newDetails);
    }
  } catch (error) {
    console.error("获取企业列表失败:", error);
    uni.showToast({
      title: "获取企业列表失败",
      icon: "none",
    });
  } finally {
  }
};
// 获取页面参数
const getPageParams = () => {
  // 获取页面实例
  const pages = getCurrentPages();
  const currentPage = pages[pages.length - 1];

  // 获取页面参数
  if (currentPage.options && currentPage.options.newsId) {
    // 先解码URL编码的参数
    // const decodedItem = decodeURIComponent(currentPage.options.item);
    // let detailDatas = JSON.parse(decodedItem);
    CompanyNews(currentPage.options.newsId);
  }
};
const processContent = (content) => {
  // 处理图片样式
  richText.value = content
    .replace(/<img[^>]*>/gi, function (match, capture) {
      return match.replace(/style=".*"/gi, "").replace(/style='.*'/gi, "");
    })
    .replace(/\<img/gi, '<img style="width:100%;height:auto;display:block;"');
};
// 页面加载时获取参数
onMounted(() => {
  getPageParams();
});
</script>

<style scoped>
.main {
  padding: 20rpx 32rpx;
  background: #fff;
}
.title {
  font-size: 40rpx;
  color: #111111;
  font-weight: bold;
}
.image {
  width: 686rpx;
  height: 490rpx;
  margin-top: 48rpx;
}
.image image {
  width: 100%;
  height: 100%;
  border-radius: 8rpx;
}
.content {
  font-size: 32rpx;
  color: #3d3d3d;
  margin: 48rpx 0;
}
.date {
  font-size: 28rpx;
  color: #999999;
  margin-top: 32rpx;
}
</style>
