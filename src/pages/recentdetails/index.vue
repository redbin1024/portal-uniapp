<template>
  <view class="main">
    <view class="title">月子中心一般为生产母亲提供专业产后恢复</view>
    <view class="image">
      <image
        src="http://cdn.xiaodingdang1.com/2025/09/24/f549a577e2d64910a1f7118a54524089.png"
      ></image>
    </view>
    <view class="content"
      >月子中心一般为生产母亲提供专业产后恢复（即坐月子）服务的场所，也称为月子会所，有专业营养师负责给产妇提供月子餐，帮助产妇能够尽快恢复身体，提供喂养知识，另有专业护士照顾宝宝。</view
    >
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
  methods: {},
};
</script>

<style scoped>
.main {
  padding: 20rpx 32rpx;
  background: #fff;
}
.title {
  font-size: 40rpx;
  color: #111111;
  font-weight: bold;
}
.image {
  width: 686rpx;
  height: 490rpx;
  margin-top: 48rpx;
}
.image image {
  width: 100%;
  height: 100%;
  border-radius: 8rpx;
}
.content {
  font-size: 32rpx;
  color: #3d3d3d;
  margin-top: 48rpx;
}
</style>
