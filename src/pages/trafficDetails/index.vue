<template>
  <view class="traffic-detail-page">
    <ServiceContent :rich-text="richText" />
    <ShareFloatBtn />
  </view>
</template>

<script setup>
import { ref } from "vue";
import {
  onLoad,
  onShow,
  onHide,
  onShareAppMessage,
  onShareTimeline,
} from "@dcloudio/uni-app";
import { getServiceList } from "@/api/activity.js";
import basePoint from "@/utils/basePoint.js";
import { formatRichText } from "@/utils/richText.js";
import ServiceContent from "@/pages/winthecustomer/components/ServiceContent.vue";

const richText = ref("");
const loading = ref(false);

const fetchServiceList = async () => {
  try {
    loading.value = true;
    const response = await getServiceList({ pageSize: 5, pageNum: 1 });
    if (response?.rows?.[0]) {
      richText.value = formatRichText(response.rows[0].serviceDescription);
    }
  } catch (error) {
    console.error("获取服务详情失败: ", error);
    uni.showToast({ title: "获取服务详情失败", icon: "none" });
  } finally {
    loading.value = false;
  }
};

onLoad(() => {
  fetchServiceList();
});

onShow(async () => {
  await basePoint.trackingStart({
    visitModule: "精准流量服务详情",
    visitContent: "精准流量服务详情",
  });
});

onHide(async () => {
  const trackingId = uni.getStorageSync("trackingId");
  if (trackingId) {
    await basePoint.trackingEnd({ id: trackingId });
  }
});

onShareAppMessage(() => ({
  title: "天天拓客 - 精准获取线上流量",
  path: "/pages/trafficDetails/index",
}));

onShareTimeline(() => ({
  title: "天天拓客 - 精准获取线上流量",
  query: "",
}));
</script>

<style scoped>
.traffic-detail-page {
  background: #ffffff;
  min-height: 100vh;
  box-sizing: border-box;
}
</style>
