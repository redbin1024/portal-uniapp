<template>
  <view class="about-xdd-section">
    <view class="about-xdd-card">
      <view class="about-xdd-title">{{ title }}</view>
      <view class="about-xdd-desc" v-if="description1">{{ description1 }}</view>
      <view class="about-xdd-desc" v-if="description2">{{ description2 }}</view>
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
    default: '关于宝妈小叮当'
  },
  description1: {
    type: String,
    default: '"宝妈小叮当" 专属月子中心系统品牌，深耕母婴月子行业获客运营赛道。依托天天拓客成熟完整服务体系，搭配宝妈小叮当智能系统工具双轮驱动、强强赋能，从线上精准引流、客户裂变锁客，到私域精细化运营、到店转化成交、老客转介绍复购全流程闭环赋能。'
  },
  description2: {
    type: String,
    default: '专为月子中心量身打造低成本获客、高效率留客、高转化成交的专属解决方案，全方位破解月子中心获客难、客源少、空置率高的经营痛点，助力门店稳定拓客、持续引流、快速满房，实现长久盈利经营。'
  }
});
</script>

<style lang="scss" scoped>
.about-xdd-section {
  background: #ffffff;
  padding: 68rpx 26rpx;
}

.about-xdd-card {
  width: 100%;
  min-height: 670rpx;
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