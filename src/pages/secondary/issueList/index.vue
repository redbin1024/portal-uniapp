<template>
  <view class="main">
    <view class="problem">
      <view class="problem-grid">
        <view
          class="problem-card"
          v-for="(item, index) in problemList"
          :key="index"
          :style="{
            backgroundImage: `url(${problemOverlayImages[index]}) , url('http://cdn.xiaodingdang1.com/2026/01/07/eef8835804c445578657bcd774639c8f.png')`,
          }"
        >
          <view class="problem-card-header">
            <view class="problem-icon">
              <image :src="problemIcons[index]" mode="aspectFit"></image>
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
            <view class="problem-desc">{{ item.desc }}</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import basePoint from "@/utils/basePoint.js";
import { onPageScroll, onLoad, onShow, onHide } from "@dcloudio/uni-app";
import { ref, onMounted } from "vue";
import BlurSwiper from "@/components/blur-swiper/blur-swiper.vue";
import VideoRotateCarousel from "@/components/video-rotate-carousel/video-rotate-carousel.vue";
import {
  getServiceList,
  getcaseList,
  getEnterpriseList,
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
const problemOverlayImages = ref([
  "http://cdn.xiaodingdang1.com/2026/01/07/c4032fd2437547538d32d660aba816b9.png",
  "http://cdn.xiaodingdang1.com/2026/01/07/55bf54069a0f40ec94e9a1b2d17e9492.png",
  "http://cdn.xiaodingdang1.com/2026/01/07/8fecc01bffef42dd9d7273775fca6ee3.png",
  "http://cdn.xiaodingdang1.com/2026/01/07/28ffbcf6db9b453c826b322d8e82e780.png",
  "http://cdn.xiaodingdang1.com/2026/01/07/9779295dc4ca4826b12724f195e51309.png",
  "http://cdn.xiaodingdang1.com/2026/01/07/6297c733c4614cec90bb9caf8d8c0b71.png",
]);
const problemList = ref([
  {
    title: "服务笔记",
    desc: "客户总是要打开怎么教你如何用系统一次性解决",
  },
  {
    title: "宝妈站台",
    desc: "销售如何做到10分钟完成客户信任，快速签单",
  },
  {
    title: "宝妈站台",
    desc: "遇到客户在网上诋毁，会所该如何自救",
  },
  {
    title: "宝宝请帖",
    desc: "如何0成本做品牌曝光？如何0成本做线上获客",
  },
  {
    title: "AI智能销售",
    desc: "每个月到手的资源流失率超过80%，如何用系统完美解决",
  },
  {
    title: "客户轨迹",
    desc: "如何快速找到客户真实需求进行针对性营销 快速拿下订单",
  },
]);

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
// 页面加载完成后触发按钮动画
onMounted(() => {});

onShow(async () => {});
</script>

<style scoped>
.problem {
  background: #ffffff;
  padding: 46rpx 26rpx;
}
.problem-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20rpx;
  margin-top: 24rpx;
}
.problem-card {
  width: 100%;
  height: 366rpx;
  background-image: url("http://cdn.xiaodingdang1.com/2026/01/07/c4032fd2437547538d32d660aba816b9.png"),
    url("http://cdn.xiaodingdang1.com/2026/01/07/eef8835804c445578657bcd774639c8f.png");
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
  width: 128rpx;
  height: 40rpx;
  font-family: PingFang SC, PingFang SC;
  font-weight: 600;
  font-size: 32rpx;
  color: #3351e3;
  line-height: 40rpx;
  text-align: left;
  font-style: normal;
  text-transform: none;
}
.problem-desc {
  width: 270rpx;
  height: 80rpx;
  font-family: PingFang SC, PingFang SC;
  font-weight: 400;
  font-size: 24rpx;
  color: #3d3d3d;
  line-height: 40rpx;
  text-align: left;
  font-style: normal;
  text-transform: none;
  margin-top: 24rpx;
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
