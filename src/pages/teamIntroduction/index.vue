<template>
  <view class="container">
    <view class="list" v-for="(item, index) in [1, 2, 3, 4]" :key="index">
      <image
        src="http://cdn.xiaodingdang1.com/2025/09/17/f4a841860c464d69990a6a547444128a.png"
        style="width: 100%; height: 700rpx; border-radius: 20rpx"
      ></image>
      <view class="list-item">
        <view class="list-item-title">运营部</view>
        <view class="list-item-content"
          >拥有超过10年的建筑经验，包括担任奥地利“蓝天组"建筑事务所的首席设计师(奥地利的Coophimmelblau)和Hernan
          Diaz
          Alonso在洛杉矶的Xefirotarch。2008年得南加州建筑学院建筑学硕士学位。</view
        >
      </view>
    </view>
  </view>
</template>

<script>
export default {};
</script>

<style scoped>
.container {
  height: 100vh;
  background-color: #f7f7f7;
  padding: 24rpx 30rpx;
}
.list {
  background: #ffffff;
  border-top-right-radius: 20rpx;
  border-top-left-radius: 20rpx;
  margin-bottom: 20rpx;
}
.list-item {
  padding: 32rpx 32rpx;
  color: #3d3d3d;
}
.list-item-title {
  font-size: 32rpx;
  font-weight: bold;
}
.list-item-content {
  font-size: 24rpx;
  margin-top: 24rpx;
}
</style>
