<template>
  <view class="main">
    <view class="head">
      <view class="left-title">线上获客</view>
      <image
        src="http://cdn.xiaodingdang1.com/2025/09/24/64d13bbac4424748b870ac3ad288bfb4.png"
        class="right-img"
      ></image>
    </view>
    <view class="offrule">
      <view class="offrule1"></view>
    </view>
    <view class="header-image">
      <image
        src="http://cdn.xiaodingdang1.com/2025/09/17/3e714aab0c1044f3a6d9ad78dc856e63.png"
      ></image>
    </view>
    <view class="head">
      <view class="left-title">系统服务</view>
      <image
        src="http://cdn.xiaodingdang1.com/2025/09/24/64d13bbac4424748b870ac3ad288bfb4.png"
        class="right-img"
      ></image>
    </view>
    <view class="offrule">
      <view class="offrule1"></view>
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
  background-color: #ffffff;
  min-height: 100vh;
}
.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx 40rpx;
}
.left-title {
  color: #010101;
  font-size: 28rpx;
  font-weight: bold;
}
.offrule {
  width: 100%;
  height: 1rpx;
  background: #f1f1f3;
  position: relative;
}
.offrule1 {
  background: #010101;
  width: 112rpx;
  height: 4rpx;
  position: absolute;
  left: 40rpx;
}
.header-image {
  width: 714rpx;
  height: 380rpx;
  padding: 26rpx 18rpx;
}
.header-image image {
  width: 100%;
  height: 100%;
}
.exhibition {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
  padding-bottom: 50rpx;
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
.right-img {
  width: 42rpx;
  height: 8rpx;
}
</style>
