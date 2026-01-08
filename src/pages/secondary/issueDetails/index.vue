<template>
  <view>
    <!-- <view class="header" :class="{ 'header-with-bg': showHeaderBg }">
      <view class="title-wrapper">
        <view class="headLogo" @click="goBack">
          <image
            class="logo"
            src="http://cdn.xiaodingdang1.com/2025/10/22/5f4330db13db494d938cb202b88dfaa2.png"
            mode="aspectFit"
          />
        </view>
        <view class="title">{{ serviceName }}</view>
      </view>
    </view> -->
    <view class="content-img">
      <!-- <rich-text class="activity" :nodes="richText" type="text"></rich-text> -->
      <mp-html :content="richText" @imgtap="previewImage"></mp-html>
      <!-- 显示接收到的服务描述参数 -->
      <view v-if="serviceDescription" class="service-description">
        <text>服务描述: {{ serviceDescription }}</text>
      </view>
    </view>
    <view style="height: 150rpx"></view>
    <view class="btns">
      <view class="btn">
        <button
          show-message-card="true"
          open-type="contact"
          bindcontact="handleContact"
          style="
            background: #2f6cf4;
            color: #fff;
            font-size: 32rpx;
            width: 90vw;
            height: 88rpx;
            text-align: center;
            line-height: 85rpx;
            border-radius: 20rpx;
          "
        >
          立即采购
        </button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  onShareAppMessage() {
    return {
      title: "详情",
      path: "/pages/secondary/issueDetails/index",
    };
  },
  onShareTimeline() {
    return {
      title: "详情",
      query: "",
    };
  },
};
</script>

<script setup>
import basePoint from "@/utils/basePoint.js";
import { onPageScroll, onShow, onUnload } from "@dcloudio/uni-app";
import { ref, onMounted } from "vue";
import mpHtml from "uni-app-mp-html/components/mp-html/mp-html.vue";
import { getproductIntro } from "@/api/activity.js";

// 定义响应式数据
const serviceDescription = ref("");
const richText = ref("");
const serviceName = ref("");

// ... existing code ...

const getTracking = async () => {
  await basePoint.trackingStart({
    visitModule: "产品服务",
    visitContent: serviceName.value,
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

// 页面加载时获取参数
onMounted(async () => {
  // 获取页面参数
  const pages = getCurrentPages();
  const currentPage = pages[pages.length - 1];
  // 从页面选项中获取参数
  if (currentPage.options && currentPage.options.item) {
    try {
      // 先解码URL编码的参数
      const decodedItem = decodeURIComponent(currentPage.options.item);
      let item = JSON.parse(decodedItem);

      // 优先显示传递过来的数据
      serviceName.value = item.introName || item.serviceName;
      if (item.introDetail) {
        processContent(item.introDetail);
      }

      // 调用接口获取最新详情
      if (item.id) {
        try {
          const res = await getproductIntro({ newsId: item.id });
          console.log("获取到的产品介绍详情:", res);
          if (res) {
            // 假设返回的数据结构与列表项类似，或者是 res.data
            const data = res.data || res;
            if (data.introName) serviceName.value = data.introName;
            if (data.introDetail) processContent(data.introDetail);
          }
        } catch (error) {
          console.error("获取产品介绍详情失败:", error);
        }
      }
    } catch (e) {
      console.error("解析服务描述参数失败:", e);
      // 如果解析失败，尝试直接使用原始参数
      try {
        let item = JSON.parse(currentPage.options.item);
        serviceName.value = item.introName || item.serviceName;
        processContent(item.introDetail);
      } catch (e2) {
        serviceDescription.value = currentPage.options.item;
      }
    }
  }
  getTracking();
});
const getzh = () => {};
const processContent = (content) => {
  // 处理图片样式
  richText.value = content
    .replace(/<img[^>]*>/gi, function (match, capture) {
      return match.replace(/style=".*"/gi, "").replace(/style='.*'/gi, "");
    })
    .replace(/\<img/gi, '<img style="width:100%;height:auto;display:block;"');
};

// 返回上一页
const goBack = () => {
  uni.navigateBack();
};
</script>

<style>
.content-img {
  width: 750rpx;
  /* margin-top: 150rpx; */
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
.header {
  padding: 110rpx 0rpx 30rpx 0rpx;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
  transition: background-color 0.3s ease;
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10rpx);
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
}

.header-with-bg {
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10rpx);
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
}

.title-wrapper {
  display: flex;
  align-items: center;
  width: 100%;
}
.headLogo {
  border-radius: 100rpx;
  width: 62rpx;
  height: 62rpx;
  position: absolute;
}
.logo {
  width: 100%;
  height: 100%;
}

.title {
  font-size: 28rpx;
  font-weight: bold;
  color: #313131;
  margin: 0 auto;
}
.btns {
  background: #fff;
  width: 100%;
  padding: 20rpx 0 50rpx 0;
  position: fixed;
  bottom: 0;
}
.btn {
  background: #2f6cf4;
  color: #fff;
  font-size: 32rpx;
  width: 90vw;
  height: 88rpx;
  text-align: center;
  line-height: 88rpx;
  border-radius: 20rpx;
  margin: 20rpx 0 20rpx 5vw;
}
.viewmore {
  display: flex;
  justify-content: center;
  background: #f3f5fb;
  border-radius: 8rpx;
  width: 100%;
  height: 72rpx;
  color: #313131;
  font-size: 30rpx;
  line-height: 72rpx;
  margin: 28rpx 0 60rpx 0;
}
</style>
