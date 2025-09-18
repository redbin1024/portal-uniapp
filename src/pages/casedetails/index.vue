<template>
  <view class="container">
    <view v-if="loading" class="loading">
      <text>加载中...</text>
    </view>
    <view v-else-if="error" class="error">
      <text>{{ error }}</text>
    </view>
    <view v-else>
      <rich-text class="activity" :nodes="richText" type="text"></rich-text>
    </view>
  </view>
</template>

<script>
import { getActivityDetail } from "@/api/activity.js";

export default {
  name: "CaseDetails",
  data() {
    return {
      richText: "",
      loading: false,
      error: null,
      activityId: null,
    };
  },
  onLoad(options) {
    // 从页面参数中获取活动ID
    this.activityId = "1951194533574815746";
    this.loadActivityDetail();
  },
  methods: {
    async loadActivityDetail() {
      try {
        this.loading = true;
        this.error = null;

        const response = await getActivityDetail(this.activityId);

        if (response && response.data) {
          // 假设接口返回的数据结构中包含 content 字段
          const content = response.data.content || response.data.detail || "";
          this.processContent(content);
        } else {
          throw new Error("获取活动详情失败");
        }
      } catch (err) {
        console.error("获取活动详情失败:", err);
        this.error = err.message || "获取活动详情失败，请稍后重试";
        // 出错时显示默认内容
        this.setDefaultContent();
      } finally {
        this.loading = false;
      }
    },

    processContent(content) {
      // 处理图片样式
      this.richText = content
        .replace(/<img[^>]*>/gi, function (match, capture) {
          return match.replace(/style=".*"/gi, "").replace(/style='.*'/gi, "");
        })
        .replace(
          /\<img/gi,
          '<img style="width:100%;height:auto;display:block;"'
        );
    },
  },
};
</script>

<style scoped>
.container {
  min-height: 100vh;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200rpx;
  color: #666;
}

.error {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200rpx;
  color: #ff4757;
  text-align: center;
  padding: 0 40rpx;
}

.activity {
  margin: 20rpx 20rpx 40rpx 20rpx;
  display: block;
}
</style>
