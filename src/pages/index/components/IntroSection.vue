<template>
  <view class="intro-section">
    <view class="intro-title">{{ title }}</view>
    <view class="intro-desc" v-if="description1">{{ description1 }}</view>
    <view class="intro-desc" v-if="description2">{{ description2 }}</view>
  </view>
</template>

<script setup>
/**
 * 企业介绍组件
 * 显示企业名称和介绍文本
 */
const props = defineProps({
  title: {
    type: String,
    default: '天天拓客'
  },
  description1: {
    type: String,
    default: '天天拓客是一家集网络运营、母婴行业软件开发、互联网服务于一体的网络科技公司。4年专注母婴行业，为月子中心提供全案运营、长期陪跑服务，解决月子中心经营难题的实战派团队。'
  },
  description2: {
    type: String,
    default: '"宝妈小叮当"是公司系统品牌，致力于通过"天天拓客"的服务体系与"宝妈小叮当"的系统工具，双轮驱动助力月子中心满房盈利。'
  }
});
</script>

<style lang="scss" scoped>
.intro-section {
  background: #ffffff;
  border-top-right-radius: 52rpx;
  border-top-left-radius: 52rpx;
  padding: 60rpx 46rpx 40rpx;
  position: relative;
  z-index: 1;
}

.intro-title {
  font-size: 40rpx;
  font-weight: bold;
  line-height: 56rpx;
  text-align: center;
  color: #000000;
  margin-bottom: 40rpx;
}

.intro-desc {
  font-size: 26rpx;
  font-weight: normal;
  line-height: 44rpx;
  color: #333333;
  text-align: justify;
  margin-top: 24rpx;
}

.intro-desc:first-of-type {
  margin-top: 0;
}
</style>