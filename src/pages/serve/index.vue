<template>
  <view class="main">
    <view class="header">
      <view class="header-title">专注月子中心商家</view>
      <view class="header-title1">提供精准获客到转化成交的闭环运营</view>
      <view class="header-tab">
        <view class="header-tab1">
          <image
            src="http://cdn.xiaodingdang1.com/2025/09/13/d37e085c56234755a9bbd6e93c1aa93f.png"
            style="width: 26rpx; height: 26rpx"
          ></image>
          <view class="header-tab-title">获客</view>
        </view>
        <view class="header-tab1">
          <image
            src="http://cdn.xiaodingdang1.com/2025/09/13/d37e085c56234755a9bbd6e93c1aa93f.png"
            style="width: 26rpx; height: 26rpx"
          ></image>
          <view class="header-tab-title">获客</view>
        </view>
        <view class="header-tab1">
          <image
            src="http://cdn.xiaodingdang1.com/2025/09/13/d37e085c56234755a9bbd6e93c1aa93f.png"
            style="width: 26rpx; height: 26rpx"
          ></image>
          <view class="header-tab-title">获客</view>
        </view>
      </view>
    </view>
    <view class="exhibition">
      <view class="exhibition1">
        <image
          src="http://cdn.xiaodingdang1.com/2025/09/15/a95241417fb6435e8de21a1ce7a5bf48.png"
          style="width: 330rpx; height: 330rpx"
        ></image>
        <view class="exhibition-title">抖音获客</view>
      </view>
      <view class="exhibition1">
        <image
          src="http://cdn.xiaodingdang1.com/2025/09/15/a95241417fb6435e8de21a1ce7a5bf48.png"
          style="width: 330rpx; height: 330rpx"
        ></image>
        <view class="exhibition-title">签单系统</view>
      </view>
      <view class="exhibition1">
        <image
          src="http://cdn.xiaodingdang1.com/2025/09/15/a95241417fb6435e8de21a1ce7a5bf48.png"
          style="width: 330rpx; height: 330rpx"
        ></image>
        <view class="exhibition-title">排房系统</view>
      </view>
      <view class="exhibition1">
        <image
          src="http://cdn.xiaodingdang1.com/2025/09/15/a95241417fb6435e8de21a1ce7a5bf48.png"
          style="width: 330rpx; height: 330rpx"
        ></image>
        <view class="exhibition-title">管理系统</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "About",
};
</script>

<style scoped>
.main {
  background-color: #f7f7f7;
  min-height: 100vh;
}
.header {
  background: #ffffff;
  padding: 32rpx 38rpx;
}
.header-title {
  color: #2c80ff;
  font-size: 46rpx;
  font-weight: bold;
}
.header-title1 {
  color: #737373;
  font-size: 28rpx;
  font-weight: bold;
  padding: 15rpx 0 28rpx 0;
}
.header-tab {
  display: flex;
}
.header-tab1 {
  width: 110rpx;
  height: 55rpx;
  border-radius: 17rpx;
  background: #f4f4f4;
  margin-right: 24rpx;
}
.header-tab1 {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.header-tab-title {
  color: #737373;
  font-size: 24rpx;
}

.exhibition {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
}
.exhibition1 {
  text-align: center;
  margin-top: 38rpx;
}
.exhibition-title {
  color: #3d3d3d;
  font-size: 32rpx;
  font-weight: bold;
  margin-top: 24rpx;
}
</style>
