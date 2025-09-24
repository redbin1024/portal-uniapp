<template>
  <view class="main">
    <view
      class="update-item"
      v-for="(item, index) in updateList"
      :key="index"
      @click="next"
    >
      <view class="content">
        <view class="date">{{ item.date }}</view>
        <view class="title">{{ item.title }}</view>
        <view class="description">{{ item.description }}</view>
      </view>
      <view class="image">
        <image :src="item.image" mode="aspectFill"></image>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "RecentUpdates",
  data() {
    return {
      updateList: [
        {
          date: "2024-01-15",
          title: "月子中心一般为生产母亲",
          description:
            "月子中心一般为生产母亲提供专业产后恢复（即坐月子）服务的场所，也称为月子会所",
          image:
            "http://cdn.xiaodingdang1.com/2025/09/24/0f0d79a3bc9c4bb999418531047e1af4.jpg",
        },
        {
          date: "2024-01-10",
          title: "月子中心一般为生产母亲",
          description:
            "月子中心一般为生产母亲提供专业产后恢复（即坐月子）服务的场所，也称为月子会所",
          image:
            "http://cdn.xiaodingdang1.com/2025/09/24/0f0d79a3bc9c4bb999418531047e1af4.jpg",
        },
        {
          date: "2024-01-05",
          title: "月子中心一般为生产母亲",
          description:
            "月子中心一般为生产母亲提供专业产后恢复（即坐月子）服务的场所，也称为月子会所",
          image:
            "http://cdn.xiaodingdang1.com/2025/09/24/0f0d79a3bc9c4bb999418531047e1af4.jpg",
        },
      ],
    };
  },
  methods: {
    next() {
      uni.navigateTo({
        url: "/pages/recentdetails/index",
      });
    },
  },
};
</script>

<style scoped>
.main {
  padding: 20rpx;
}

.update-item {
  display: flex;
  align-items: center;
  padding: 30rpx 0;
  border-bottom: 1rpx solid #f6f6f6;
}

.update-item:last-child {
  border-bottom: none;
}

.content {
  flex: 1;
  margin-right: 20rpx;
}

.date {
  color: #535353;
  font-size: 22rpx;
  margin-bottom: 10rpx;
}

.title {
  color: #3d3d3d;
  font-size: 28rpx;
  margin-bottom: 10rpx;
  font-weight: bold;
}

.description {
  color: #535353;
  font-size: 22rpx;
  line-height: 1.4;
}

.image {
  width: 280rpx;
  height: 200rpx;
  border-radius: 8rpx;
  overflow: hidden;
}

.image image {
  width: 100%;
  height: 100%;
}
</style>
