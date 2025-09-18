<template>
  <view class="container">
    <view
      class="list-item"
      v-for="(item, index) in listData"
      :key="index"
      :style="{ backgroundColor: getBackgroundColor(index) }"
      @click="navigateToDetail(item)"
    >
      <view class="image-container">
        <image class="item-image" :src="item.image" mode="aspectFill"></image>
      </view>
      <view class="content-container">
        <view class="title">{{ item.title }}</view>
        <view class="description">{{ item.description }}</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "CaseDetails",
  data() {
    return {
      listData: [
        {
          image:
            "http://cdn.xiaodingdang1.com/2025/09/15/cbbd7e2aa0cd4016b59a3f31dbe46cb2.png",
          title: "东方幸福国际母婴会所",
          description:
            "月子中心一般为生产母亲提供专业产后恢复服务的场所，也称为月子会所，有专业营养师负责给产妇提供月子。",
        },
        {
          image:
            "http://cdn.xiaodingdang1.com/2025/09/15/d177663900974c55bd7b9d093b77c379.png",
          title: "东方幸福国际母婴会所",
          description:
            "月子中心一般为生产母亲提供专业产后恢复服务的场所，也称为月子会所，有专业营养师负责给产妇提供月子。",
        },
        {
          image:
            "http://cdn.xiaodingdang1.com/2025/09/15/b2eb116026c54ead93ac75a6d1c01607.png",
          title: "东方幸福国际母婴会所",
          description:
            "月子中心一般为生产母亲提供专业产后恢复服务的场所，也称为月子会所，有专业营养师负责给产妇提供月子。",
        },
        {
          image:
            "http://cdn.xiaodingdang1.com/2025/09/15/b2eb116026c54ead93ac75a6d1c01607.png",
          title: "东方幸福国际母婴会所",
          description:
            "月子中心一般为生产母亲提供专业产后恢复服务的场所，也称为月子会所，有专业营养师负责给产妇提供月子。",
        },
        {
          image:
            "http://cdn.xiaodingdang1.com/2025/09/15/b2eb116026c54ead93ac75a6d1c01607.png",
          title: "东方幸福国际母婴会所",
          description:
            "月子中心一般为生产母亲提供专业产后恢复服务的场所，也称为月子会所，有专业营养师负责给产妇提供月子。",
        },
        {
          image:
            "http://cdn.xiaodingdang1.com/2025/09/15/b2eb116026c54ead93ac75a6d1c01607.png",
          title: "东方幸福国际母婴会所",
          description:
            "月子中心一般为生产母亲提供专业产后恢复服务的场所，也称为月子会所，有专业营养师负责给产妇提供月子。",
        },
        {
          image:
            "http://cdn.xiaodingdang1.com/2025/09/15/b2eb116026c54ead93ac75a6d1c01607.png",
          title: "东方幸福国际母婴会所",
          description:
            "月子中心一般为生产母亲提供专业产后恢复服务的场所，也称为月子会所，有专业营养师负责给产妇提供月子。",
        },
      ],
    };
  },
  methods: {
    navigateToDetail() {
      uni.navigateTo({
        url: "/pages/casedetails/index",
      });
    },
    getBackgroundColor(index) {
      const colors = ["#FFEFEB", "#DFF1FF", "#EDF1FF", "#DAF9FF"];
      return colors[index % 4];
    },
  },
};
</script>

<style scoped>
.container {
  padding: 60rpx 26rpx 20rpx 26rpx;
  background-color: #f5f5f5;
}

.list-item {
  display: flex;
  align-items: flex-start;
  border-radius: 16rpx;
  height: 270rpx;
  padding: 0 24rpx;
  margin-bottom: 62rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
  position: relative;
}

.image-container {
  flex-shrink: 0;
  margin-right: 24rpx;
  position: relative;
  top: -36rpx; /* 图片高出列表50rpx */
}

.item-image {
  width: 214rpx;
  height: 282rpx;
  border-radius: 20rpx;
  background-color: #f0f0f0;
  border: 3rpx solid #ffffff;
}

.content-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.title {
  height: 80rpx;
  line-height: 80rpx;
  font-size: 32rpx;
  font-weight: 600;
  color: #333333;
  margin-bottom: 12rpx;
}

.description {
  font-size: 22rpx;
  color: #7e7f80;
  line-height: 1.5;
  word-break: break-all;
}
</style>
