<template>
  <view class="main">
    <view class="problem">
      <view class="problem-grid">
        <view
          class="problem-card"
          v-for="(item, index) in problemList"
          :key="index"
          @click="goToIndex(item)"
        >
          <image
            :src="item.coverImage"
            mode="aspectFit"
            style="width: 100%; height: 100%; border-radius: 20rpx"
          ></image>
        </view>
      </view>
      <!-- <view class="problem-grid">
        <view
          class="problem-card"
          @click="goToIndex(item)"
          v-for="(item, index) in problemList"
          :key="index"
          :style="{
            backgroundImage: `url(${
              problemOverlayImages[index % problemOverlayImages.length]
            }) , url('http://cdn.xiaodingdang1.com/2026/01/07/eef8835804c445578657bcd774639c8f.png')`,
          }"
        >
          <view class="problem-card-header">
            <view class="problem-icon">
              <image :src="item.icon" mode="aspectFit"></image>
            </view>
            <view class="problem-arrow">
              <image
                src="http://cdn.xiaodingdang1.com/2026/01/07/86381c17c8d74dac891a5b12e1b5e63f.png"
                mode="aspectFit"
              ></image>
            </view>
          </view>
          <view class="problem-card-body">
            <view class="problem-title">{{ item.title }}</view>
            <view class="problem-desc">{{ item.introName }}</view>
          </view>
        </view>
      </view> -->
    </view>
  </view>
  <BackHome />
</template>

<script>
export default {
  onShareAppMessage() {
    return {
      title: "列表",
      path: "/pages/secondary/issueList/index",
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
import basePoint from "@/utils/basePoint.js";
import {
  onPageScroll,
  onLoad,
  onShow,
  onHide,
  onReachBottom,
} from "@dcloudio/uni-app";
import { ref, onMounted } from "vue";
import BlurSwiper from "@/components/blur-swiper/blur-swiper.vue";
import VideoRotateCarousel from "@/components/video-rotate-carousel/video-rotate-carousel.vue";
import {
  getServiceList,
  getcaseList,
  getEnterpriseList,
  getProductIntroList,
} from "@/api/activity.js";
import VearCarousel from "@/components/vear-carousel/vear-carousel.vue";

const problemIcons = ref([
  "http://cdn.xiaodingdang1.com/2026/01/07/329586497cb141d69864b7ffe44c01e2.png",
  "http://cdn.xiaodingdang1.com/2026/01/07/3c68ffd0fa574800b29257226f5d92cf.png",
  "http://cdn.xiaodingdang1.com/2026/01/07/3500dffbb8d24fa1970e0e1c33a9fcd4.png",
  "http://cdn.xiaodingdang1.com/2026/01/07/a4859ef57e154df784dde7f35a99a3a8.png",
  "http://cdn.xiaodingdang1.com/2026/01/07/eb5b036256d842e199c48424b5bda131.png",
  "http://cdn.xiaodingdang1.com/2026/01/07/303e3c6ea6b34406bf1024b2cb0e9a70.png",
]);
const problemOverlayImages = ref([]);
const problemList = ref([]);
const pageNum = ref(1);
const pageSize = ref(10);
const total = ref(0);
const isFinish = ref(false);
const goToIndex = (item) => {
  if (item.introType == 2) {
    let url =
      "/pages/secondary/index/index?url=" +
      item.videoUrl +
      "&visitContent=" +
      item.title;
    if (item.coverImage) {
      url += "&coverImage=" + encodeURIComponent(item.coverImage);
    }
    uni.navigateTo({
      url: url,
    });
  } else {
    uni.navigateTo({
      url: "/pages/secondary/issueDetails/index?introId=" + item.introId,
    });
  }
};
// 获取企业列表数据
const fetchEnterpriseList = async () => {
  try {
    const response = await getEnterpriseList({
      pageSize: 10,
      pageNum: 1,
    });
    console.log("企业列表数据:", response);
    if (
      response &&
      response.rows &&
      Array.isArray(response.rows) &&
      response.rows.length > 0
    ) {
      enterpriseList.value = response.rows[0];
      coverImage.value = response.rows[0].coverImage;
      let video;
      response.rows[0].bannerImages.forEach((str1) => {
        let result1 = str1.slice(-3);
        if (result1 == "mp4") {
          video = str1;
        }
      });
      bannerImages.value = video;
    }
  } catch (error) {
    console.error("获取企业列表失败:", error);
    uni.showToast({
      title: "获取企业列表失败",
      icon: "none",
    });
  }
};
// 获取产品介绍列表
const fetchProductIntroList = async () => {
  if (isFinish.value && pageNum.value > 1) return;
  try {
    const response = await getProductIntroList({
      pageSize: pageSize.value,
      pageNum: pageNum.value,
    });
    console.log("产品介绍列表数据:", response);
    if (response && response.rows) {
      if (pageNum.value === 1) {
        problemList.value = response.rows;
      } else {
        problemList.value = [...problemList.value, ...response.rows];
      }

      // 判断是否加载完成
      if (response.total) {
        total.value = response.total;
        if (problemList.value.length >= total.value) {
          isFinish.value = true;
        }
      } else {
        if (response.rows.length < pageSize.value) {
          isFinish.value = true;
        }
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

// 页面加载完成后触发按钮动画
onMounted(() => {
  fetchProductIntroList();
});

onShow(async () => {});
</script>

<style scoped>
.problem {
  background: #ffffff;
  padding: 26rpx 26rpx;
}
.problem-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20rpx;
  margin-top: 24rpx;
}
.problem-card {
  width: 100%;
  height: 378rpx;
  background-size: 106rpx 112rpx, cover;
  background-position: right 24rpx bottom 24rpx, center;
  background-repeat: no-repeat, no-repeat;
  overflow: hidden;
}
.problem-card-header {
  display: flex;
  align-items: center;
  padding: 60rpx 20rpx 8rpx 30rpx;
  justify-content: space-between;
}
.problem-icon {
}
.problem-icon image {
  width: 56rpx;
  height: 56rpx;
}
.problem-arrow {
}
.problem-arrow image {
  width: 30rpx;
  height: 30rpx;
}
.problem-card-body {
  padding: 24rpx;
}
.problem-title {
  width: 100%;
  height: 40rpx;
  font-family: PingFang SC, PingFang SC;
  font-weight: 600;
  font-size: 32rpx;
  color: #3351e3;
  line-height: 40rpx;
  text-align: left;
  font-style: normal;
  text-transform: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.problem-desc {
  width: 270rpx;
  font-family: PingFang SC, PingFang SC;
  font-weight: 400;
  font-size: 24rpx;
  color: #3d3d3d;
  line-height: 40rpx;
  text-align: left;
  font-style: normal;
  text-transform: none;
  margin-top: 24rpx;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  text-overflow: ellipsis;
}
.winthecustomer-head {
  display: flex;
}
.winthecustomer-head1 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
.winthecustomer-title {
  color: #000000;
  font-weight: bold;
  font-size: 40rpx;
}
.winthecustomer-title1 {
  color: #d6d4d4;
  font-size: 28rpx;
}
</style>
