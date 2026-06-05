<template>
  <view class="main">
    <ProblemList
      :list="problemList"
      :limit="0"
      :show-more="false"
      :show-title="false"
      @click="goToIndex"
    />
    <BackHome />
    <ShareFloatBtn />
  </view>
</template>

<script>
export default {
  onShareAppMessage() {
    return {
      title: "列表",
      path: "/pages/issueList/index",
    };
  },
  onShareTimeline() {
    return {
      title: "列表",
      query: "",
    };
  },
};
</script>

<script setup>
import { ref, onMounted } from "vue";
import { onShow, onReachBottom } from "@dcloudio/uni-app";
import { getProductIntroList } from "@/api/activity.js";
import ProblemList from "@/pages/index/components/ProblemList.vue";
import BackHome from "@/components/BackHome/BackHome.vue";

const problemList = ref([]);
const pageNum = ref(1);
const pageSize = ref(10);
const total = ref(0);
const isFinish = ref(false);

const goToIndex = (item) => {
  if (item.introType == 2) {
    let url =
      "/pages/videoplay/index?url=" +
      item.videoUrl +
      "&visitContent=" +
      item.title;
    if (item.coverImage) {
      url += "&coverImage=" + encodeURIComponent(item.coverImage);
    }
    uni.navigateTo({ url });
  } else {
    uni.navigateTo({
      url: "/pages/issueDetails/index?introId=" + item.introId,
    });
  }
};

const fetchProductIntroList = async () => {
  if (isFinish.value && pageNum.value > 1) return;
  try {
    const response = await getProductIntroList({
      pageSize: pageSize.value,
      pageNum: pageNum.value,
    });
    if (response && response.rows) {
      if (pageNum.value === 1) {
        problemList.value = response.rows;
      } else {
        problemList.value = [...problemList.value, ...response.rows];
      }
      if (response.total) {
        total.value = response.total;
        if (problemList.value.length >= total.value) {
          isFinish.value = true;
        }
      } else if (response.rows.length < pageSize.value) {
        isFinish.value = true;
      }
    }
  } catch (error) {
    console.error("获取产品介绍列表失败:", error);
  }
};

onReachBottom(() => {
  if (!isFinish.value) {
    pageNum.value++;
    fetchProductIntroList();
  }
});

onMounted(() => {
  fetchProductIntroList();
});

onShow(async () => {});
</script>

<style scoped>
.main {
  min-height: 100vh;
  background: #f3f5fb;
}
</style>
