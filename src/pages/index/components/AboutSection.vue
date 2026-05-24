<template>
  <view class="about-xdd-section">
    <view class="about-xdd-card">
      <view class="about-xdd-title">{{ title }}</view>
      <view class="about-xdd-desc" v-if="description1">{{ description1 }}</view>
    </view>
  </view>
</template>

<script setup>
/**
 * 关于宝妈小叮当组件
 * 显示产品介绍信息
 */
const props = defineProps({
  title: {
    type: String,
    default: '关于宝妈小叮当',
  },
  description1: {
    type: String,
    default:
      '宝妈小叮当是天天拓客旗下，专为解决“月子中心有客户、但转化难”痛点而生的智能签单系统。解决月子中心“转化差、流失高、管理乱”的顽疾，让每一条客资，都最大可能转化为实打实的业绩。',
  },
});
</script>

<style lang="scss" scoped>
.about-xdd-section {
  background: #ffffff;
  padding: 68rpx 26rpx;
}

.about-xdd-card {
  width: 100%;
  min-height: 400rpx;
  background: #ffffff;
  border: 1rpx solid #e5e5e5;
  border-radius: 24rpx;
  box-sizing: border-box;
  padding: 66rpx 34rpx 56rpx;
}

.about-xdd-title {
  font-size: 40rpx;
  font-weight: 700;
  color: #0076ff;
  line-height: 56rpx;
  text-align: center;
  margin-bottom: 40rpx;
}

.about-xdd-desc {
  font-size: 28rpx;
  font-weight: 400;
  color: #666666;
  line-height: 48rpx;
  text-align: justify;
}

.about-xdd-desc + .about-xdd-desc {
  margin-top: 38rpx;
}
</style>
