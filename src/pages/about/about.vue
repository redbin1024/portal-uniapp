<template>
  <view class="container">
    <view class="header">
      <image class="logo" src="/static/logo.png" mode="aspectFit" />
      <text class="app-name">MasterGo项目</text>
      <text class="version">v1.0.0</text>
    </view>

    <view class="info-section">
      <view class="info-card">
        <text class="section-title">项目信息</text>
        <view class="info-item">
          <text class="label">框架：</text>
          <text class="value">UniApp + Vue3</text>
        </view>
        <view class="info-item">
          <text class="label">构建工具：</text>
          <text class="value">Vite</text>
        </view>
        <view class="info-item">
          <text class="label">设计来源：</text>
          <text class="value">MasterGo设计稿</text>
        </view>
        <view class="info-item">
          <text class="label">开发语言：</text>
          <text class="value">JavaScript</text>
        </view>
      </view>

      <view class="info-card">
        <text class="section-title">支持平台</text>
        <view class="platform-list">
          <view class="platform-item">
            <text class="platform-name">🌐 H5</text>
          </view>
          <view class="platform-item">
            <text class="platform-name">📱 微信小程序</text>
          </view>
          <view class="platform-item">
            <text class="platform-name">📱 支付宝小程序</text>
          </view>
          <view class="platform-item">
            <text class="platform-name">📱 App</text>
          </view>
        </view>
      </view>
    </view>

    <view class="footer">
      <button class="btn" @click="handleBack">返回首页</button>
    </view>
  </view>
</template>

<script>
export default {
  name: "About",
  onShareAppMessage() {
    return {
      title: "关于我们",
      path: "/pages/about/about",
    };
  },
  onShareTimeline() {
    return {
      title: "关于我们",
      query: "",
    };
  },
  setup() {
    const handleBack = () => {
      uni.switchTab({
        url: "/pages/index/index",
      });
    };

    return {
      handleBack,
    };
  },
};
</script>

<style scoped>
.container {
  padding: 40rpx;
  min-height: 100vh;
  background: #f8f9fa;
}

.header {
  text-align: center;
  margin-bottom: 60rpx;
  padding: 40rpx 0;
  background: #ffffff;
  border-radius: 20rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
}

.logo {
  width: 120rpx;
  height: 120rpx;
  margin-bottom: 20rpx;
}

.app-name {
  display: block;
  font-size: 36rpx;
  font-weight: bold;
  color: #333333;
  margin-bottom: 10rpx;
}

.version {
  display: block;
  font-size: 24rpx;
  color: #999999;
}

.info-section {
  margin-bottom: 40rpx;
}

.info-card {
  background: #ffffff;
  border-radius: 20rpx;
  padding: 40rpx;
  margin-bottom: 30rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
}

.section-title {
  display: block;
  font-size: 32rpx;
  font-weight: bold;
  color: #333333;
  margin-bottom: 30rpx;
  padding-bottom: 20rpx;
  border-bottom: 2rpx solid #f0f0f0;
}

.info-item {
  display: flex;
  align-items: center;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #f8f9fa;
}

.info-item:last-child {
  border-bottom: none;
}

.label {
  font-size: 28rpx;
  color: #666666;
  width: 160rpx;
}

.value {
  font-size: 28rpx;
  color: #333333;
  font-weight: 500;
}

.platform-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
}

.platform-item {
  flex: 1;
  min-width: 200rpx;
  padding: 20rpx;
  background: #f8f9fa;
  border-radius: 10rpx;
  text-align: center;
}

.platform-name {
  font-size: 26rpx;
  color: #333333;
}

.footer {
  text-align: center;
}

.btn {
  width: 300rpx;
  height: 80rpx;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #ffffff;
  border: none;
  border-radius: 40rpx;
  font-size: 28rpx;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn:active {
  transform: translateY(2rpx);
}
</style>
