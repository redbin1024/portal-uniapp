<template>
  <scroll-view class="main" scroll-y="true" enable-back-to-top="true">
    <RecentDynamic
      :list="companyNewsList"
      @select="navigateToRecentDetails"
      @more="goToRecentUpdates"
    />
    <MerchantCase
      :list="successCaseList"
      @select="navigateToDetail"
      @more="goToCooperationcase"
    />
    <ServiceContent :rich-text="richText" />
  </scroll-view>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { onShow, onHide } from "@dcloudio/uni-app";
import {
  getCompanyNewsList,
  getsuccessCaseList,
  getServiceList,
} from "@/api/activity.js";
import basePoint from "@/utils/basePoint.js";
import RecentDynamic from "./components/RecentDynamic.vue";
import MerchantCase from "./components/MerchantCase.vue";
import ServiceContent from "./components/ServiceContent.vue";

const richText = ref("");
const companyNewsList = ref([]);
const successCaseList = ref([]);

const truncateText = (text, max) => {
  if (!text) return "";
  return text.length > max ? text.substring(0, max) : text;
};

const processContent = (content) => {
  if (!content) return;
  let imgIndex = 0;
  richText.value = content.replace(/<img[^>]*>/gi, function (match) {
    match = match.replace(/style=".*"/gi, "").replace(/style='.*'/gi, "");
    return match.replace(
      /<img/gi,
      `<img data-index="${imgIndex++}" style="width:100%;height:auto;display:block;"`
    );
  });
};

const fetchServiceList = async () => {
  try {
    const response = await getServiceList({ pageSize: 5, pageNum: 1 });
    if (response?.rows?.[0]) {
      processContent(response.rows[0].serviceDescription);
    }
  } catch (error) {
    uni.showToast({ title: "获取服务列表失败", icon: "none" });
  }
};

const fetchsuccessCaseList = async () => {
  try {
    const response = await getsuccessCaseList({ pageSize: 6, pageNum: 1 });
    if (response?.rows?.length > 0) {
      successCaseList.value = response.rows;
    }
  } catch (error) {
    uni.showToast({ title: "获取案例列表失败", icon: "none" });
  }
};

const fetchCompanyNewsList = async () => {
  try {
    const response = await getCompanyNewsList({
      pageSize: 4,
      pageNum: 1,
      type: 1,
    });
    if (response?.rows?.length > 0) {
      companyNewsList.value = response.rows.map((item, index) => ({
        ...item,
        newsTitle: truncateText(
          item.newsTitle || item.title || `动态标题${index + 1}`,
          21
        ),
        newsContent: truncateText(
          item.newsContent || item.content || item.description || "",
          24
        ),
        newsImages:
          Array.isArray(item.newsImages) && item.newsImages.length
            ? item.newsImages
            : Array.isArray(item.images) && item.images.length
            ? item.images
            : item.image
            ? [item.image]
            : [
                "http://cdn.xiaodingdang1.com/2025/09/15/cbbd7e2aa0cd4016b59a3f31dbe46cb2.png",
              ],
        createTime:
          item.createTime ||
          item.createDate ||
          item.date ||
          new Date().toISOString(),
        newsId: item.newsId || item.id || index + 1,
      }));
    }
  } catch (error) {
    uni.showToast({ title: "获取动态信息失败", icon: "none" });
  }
};

const navigateToRecentDetails = (item) => {
  uni.navigateTo({
    url:
      "/pages/recentdetails/index?newsId=" +
      item.newsId +
      "&newsTitle=" +
      item.newsTitle,
  });
};

const goToRecentUpdates = () => {
  uni.navigateTo({ url: "/pages/recentUpdatesnew/index" });
};

const goToCooperationcase = () => {
  uni.navigateTo({ url: "/pages/case/index" });
};

const navigateToDetail = (item) => {
  uni.navigateTo({
    url: "/pages/casedetails/index?successCaseId=" + item.successCaseId,
  });
};

onMounted(() => {
  fetchCompanyNewsList();
  fetchsuccessCaseList();
  fetchServiceList();
});

onShow(async () => {
  await basePoint.trackingStart({
    visitModule: "获客",
    visitContent: "获客",
  });
});

onHide(async () => {
  const trackingId = uni.getStorageSync("trackingId");
  if (trackingId) {
    await basePoint.trackingEnd({ id: trackingId });
  }
});
</script>

<style scoped>
.main {
  background: #ffffff;
  width: 100%;
  max-width: 100vw;
  height: 100vh;
}
</style>
