<template>
  <view class="main">
    <view class="title">{{ detailData.newsTitle }}</view>
    <view class="content">
      {{ detailData.newsContent }}
    </view>
    <mp-html :content="richText" @imgtap="previewImage"></mp-html>
  </view>
  <BackHome />
  <ShareFloatBtn />
</template>

<script setup>
import { ref, onMounted } from "vue";
import mpHtml from "uni-app-mp-html/components/mp-html/mp-html.vue";
import { getCompanyNews } from "@/api/activity.js";
import {
  onPageScroll,
  onLoad,
  onShow,
  onHide,
  onUnload,
  onShareAppMessage,
  onShareTimeline,
} from "@dcloudio/uni-app";

onShareAppMessage(() => {
  return {
    title: detailData.value.newsTitle || "最近动态",
    path: `/pages/recentdetails/index?newsId=${currentNewsId.value}`,
  };
});

onShareTimeline(() => {
  return {
    title: detailData.value.newsTitle || "最近动态",
    query: `newsId=${currentNewsId.value}`,
  };
});
import basePoint from "@/utils/basePoint.js";
const richText = ref("");
const detailData = ref({});
const currentNewsId = ref("");

defineOptions({ name: "RecentDetails" });

// 查询公司动态列表
const CompanyNews = async (newsId) => {
  currentNewsId.value = newsId;
  try {
    const response = await getCompanyNews({ newsId });
    if (response && response.data) {
      detailData.value = response.data;
      getTracking(response.data.newsTitle);
      processContent(response.data.newDetails);
    }
  } catch (error) {
    uni.showToast({ title: "获取企业列表失败", icon: "none" });
  }
};
const getTracking = async (newsTitle) => {
  await basePoint.trackingStart({
    visitModule: "最近动态",
    visitContent: newsTitle,
  });
};
onUnload(async () => {
  let trackingId = uni.getStorageSync("trackingId");
  if (trackingId) {
    await basePoint.trackingEnd({
      id: trackingId,
    });
  }
});
const getPageParams = () => {
  const pages = getCurrentPages();
  const currentPage = pages[pages.length - 1];
  if (currentPage.options && currentPage.options.newsId) {
    CompanyNews(currentPage.options.newsId);
  }
};

const processContent = (content) => {
  richText.value = content
    .replace(/<img[^>]*>/gi, function (match, capture) {
      return match.replace(/style=".*"/gi, "").replace(/style='.*'/gi, "");
    })
    .replace(/\<img/gi, '<img style="width:100%;height:auto;display:block;"');
};

// 支持图片预览
const previewImage = (e) => {
  uni.previewImage({
    current: e.detail.src,
    urls: e.detail.imgs,
  });
};
defineExpose({ previewImage });

onMounted(() => {
  // 显示分享菜单
  uni.showShareMenu({
    withShareTicket: true,
    menus: ["shareAppMessage", "shareTimeline"],
  });
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
