<template>
  <view class="case-page">
    <view v-if="loading" class="loading-container">
      <text class="loading-text">加载中...</text>
    </view>
    <CaseCardGrid :list="successCaseList" @select="navigateToDetail" />
    <view v-if="loadingMore" class="loading-more-container">
      <text class="loading-more-text">加载更多中...</text>
    </view>
    <BackHome />
  </view>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { onReachBottom } from "@dcloudio/uni-app";
import { getsuccessCaseList } from "@/api/activity.js";
import CaseCardGrid from "@/pages/secondary/winthecustomer/components/CaseCardGrid.vue";
import BackHome from "@/components/BackHome/BackHome.vue";

const successCaseList = ref([]);
const loading = ref(false);
const loadingMore = ref(false);
const hasMore = ref(true);
const pageNum = ref(1);
const pageSize = 10;

const fetchsuccessCaseList = async () => {
  try {
    if (pageNum.value === 1) {
      loading.value = true;
    } else {
      loadingMore.value = true;
    }
    const response = await getsuccessCaseList({
      pageSize,
      pageNum: pageNum.value,
    });
    const rows =
      response && Array.isArray(response.rows) ? response.rows : [];
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
};

const navigateToDetail = (item) => {
  uni.navigateTo({
    url: "/pages/casedetails/index?successCaseId=" + item.successCaseId,
  });
};

onReachBottom(() => {
  if (hasMore.value) {
    pageNum.value += 1;
    fetchsuccessCaseList();
  }
});

onMounted(() => {
  fetchsuccessCaseList();
});
</script>

<script>
export default {
  onShareAppMessage() {
    return {
      title: "商家案例",
      path: "/pages/case/index",
    };
  },
  onShareTimeline() {
    return {
      title: "商家案例",
      query: "",
    };
  },
};
</script>

<style scoped lang="scss">
.case-page {
  padding: 40rpx 26rpx 20rpx;
  background-color: #ffffff;
  min-height: 100vh;
}
.loading-container,
.loading-more-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40rpx 0;
}
.loading-text {
  font-size: 28rpx;
  color: #999999;
}
.loading-more-text {
  font-size: 24rpx;
  color: #999999;
}
</style>
