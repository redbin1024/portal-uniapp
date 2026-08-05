<template>
  <view class="business-system">
    <!-- 模块标题 -->
    <view class="bs-title">
      <!-- 业务板块：CSS 标题（BUSINESS 水印 + 主标题 + 口号） -->
      <view v-if="isBusinessBlock" class="bs-title-block">
        <view class="bs-title-main">
          <text class="bs-title-en">{{ enTitle }}</text>
          <text class="bs-title-zh">{{ title }}</text>
        </view>
        <view class="bs-title-slogan">
          <view class="bs-title-decor" aria-hidden="true">
            <view v-for="n in 7" :key="'l' + n" class="bs-title-decor-dot" :class="'dot-' + n" />
          </view>
          <text class="bs-title-slogan-text">{{ slogan }}</text>
          <view class="bs-title-decor" aria-hidden="true">
            <view v-for="n in 7" :key="'r' + n" class="bs-title-decor-dot" :class="'dot-' + n" />
          </view>
        </view>
      </view>
      <!-- 其他模块：双行文字标题 -->
      <template v-else>
        <text class="bs-title-text">{{ title }}</text>
        <text class="bs-title-text bs-title-gradient">{{ '\n' }}{{ subtitle }}</text>
      </template>
    </view>

    <!-- 业务板块：01 + 02 结构 -->
    <template v-if="isBusinessBlock">
      <!-- 01 天天拓客 · 线上获客（导入切图 + 清晰文字） -->
      <view class="card01" @click="handleTokerClick">
        <view class="card01-header">
          <image class="card01-header-bg" src="/static/index/card-01-header.png" mode="aspectFill" />
          <text class="card01-num">01</text>
          <view class="card01-header-title">
            <text class="card01-header-line">天天拓客</text>
            <text class="card01-header-line">月子中心线上获客</text>
          </view>
        </view>
        <view class="card01-body">
          <view class="card01-left">
            <view class="card01-bullets">
              <view v-for="(t, i) in tokerBullets" :key="i" class="card01-bullet">
                <view class="card01-dot" />
                <text class="card01-bullet-text">{{ t }}</text>
              </view>
            </view>
            <view class="card01-more">
              <text class="card01-more-text">了解更多</text>
              <image class="card01-more-arrow" src="/static/index/card-01-arrow.png" mode="aspectFit" />
            </view>
            <view class="card01-feats">
              <view v-for="(f, i) in tokerFeats" :key="i" class="card01-feat">
                <image class="card01-feat-icon" :src="f.icon" mode="aspectFit" />
                <text class="card01-feat-label">{{ f.label }}</text>
              </view>
            </view>
          </view>
          <image class="card01-cube" src="/static/index/card-01-cube.png" mode="aspectFit" />
        </view>
      </view>

      <!-- 02 宝妈小叮当 · 业务系统（CSS + 导入切图） -->
      <view class="card02">
        <view class="card02-header" @click="handleMoreClick">
          <image class="card02-header-bg" src="/static/index/card-02-header.png" mode="aspectFill" />
          <text class="card02-num">02</text>
          <view class="card02-header-title">
            <text class="card02-header-line">宝妈小叮当</text>
            <text class="card02-header-line">月子中心业务系统</text>
          </view>
        </view>

        <view class="card02-intro" @click="handleMoreClick">
          <view class="card02-intro-left">
            <view class="card02-bullets">
              <view v-for="(t, i) in bizBullets" :key="i" class="card02-bullet">
                <view class="card02-dot" />
                <text class="card02-bullet-text">{{ t }}</text>
              </view>
            </view>
            <view class="card02-more">
              <text class="card02-more-text">了解更多</text>
              <image class="card02-more-arrow" src="/static/index/card-02-arrow.png" mode="aspectFit" />
            </view>
          </view>
          <image class="card02-phones" src="/static/index/card-02-phones.png" mode="aspectFit" />
        </view>

        <view class="card02-feats">
          <view v-for="(f, i) in bizFeats" :key="i" class="card02-feat">
            <image class="card02-feat-icon" :src="f.icon" mode="aspectFit" />
            <text class="card02-feat-label">{{ f.label }}</text>
          </view>
        </view>

        <!-- 功能区与介绍列表分割线 -->
        <view class="card02-divider" v-if="list.length > 0" />

        <!-- 介绍列表（业务+管理） -->
        <view class="bs-panel-body" v-if="list.length > 0">
          <view v-for="(item, index) in list" :key="index" class="bs-item" @click="handleClick(item)">
            <view class="bs-item-head">
              <view class="bs-item-bar" />
              <text class="bs-item-title">{{ item.serviceName }}</text>
            </view>
            <view class="bs-item-card">
              <view class="bs-item-media" v-if="resolveImage(item)">
                <image class="bs-item-image" :src="resolveImage(item) + '?image_process=format,webp'" mode="widthFix" />
              </view>

              <text v-if="plainDesc(item)" class="bs-item-desc">{{
                plainDesc(item)
              }}</text>
            </view>

          </view>
        </view>
      </view>
    </template>

    <!-- 其他模块保留原卡片列表 -->
    <view v-else class="bs-list">
      <view v-for="(item, index) in list" :key="index" class="bs-card" @click="handleClick(item)">
        <view class="bs-card-head">
          <text class="bs-card-title">{{ item.serviceName }}</text>
          <UIcon name="right" size="20rpx" color="#9CA2BE" />
        </view>
        <view class="bs-divider">
          <view class="bs-divider-active"></view>
        </view>
        <view class="bs-image-wrap">
          <image class="bs-image" :src="resolveImage(item) + '?image_process=format,webp'" mode="aspectFill" />
        </view>
        <rich-text class="bs-desc" :nodes="item.description || ''" />
      </view>
    </view>
  </view>
</template>

<script setup>
import { computed } from 'vue';
import UIcon from '@/components/UIcon/UIcon.vue';

const props = defineProps({
  title: {
    type: String,
    default: '宝妈小叮当',
  },
  subtitle: {
    type: String,
    default: '业务系统',
  },
  /** 英文水印，业务板块用 */
  enTitle: {
    type: String,
    default: 'BUSINESS',
  },
  /** 副标题口号 */
  slogan: {
    type: String,
    default: '专注月子中心 赋能行业未来',
  },
  /** business = 业务板块布局（01/02 卡片） */
  layout: {
    type: String,
    default: '',
  },
  list: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['click', 'toker-click', 'more-click']);

const isBusinessBlock = computed(() => props.layout === 'business');

const tokerBullets = ['客资对赌', '行业TOP级交付', '专人专岗'];
const tokerFeats = [
  { icon: '/static/index/card-icon-01.png', label: '精准' },
  { icon: '/static/index/card-icon-02.png', label: '量大' },
  { icon: '/static/index/card-icon-03.png', label: '成本低' },
];
const bizBullets = ['行业首个签单系统', '线上签单、获客', '辅助销售'];
const bizFeats = [
  { icon: '/static/index/card-icon-04.png', label: '邀约到店' },
  { icon: '/static/index/card-icon-05.png', label: '服务案例' },
  { icon: '/static/index/card-icon-06.png', label: '品牌口碑' },
  { icon: '/static/index/card-icon-07.png', label: '工具获客' },
  { icon: '/static/index/card-icon-08.png', label: 'CRM管理' },
];

const resolveImage = (item) => {
  if (!item) return '';
  const img = item.serviceImage;
  if (Array.isArray(img)) return img[0] || '';
  return img || '';
};

const plainDesc = (item) => {
  const raw = item?.description || '';
  if (!raw) return '';
  return String(raw)
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .trim();
};

const handleClick = (item) => emit('click', item);
const handleTokerClick = () => emit('toker-click');
const handleMoreClick = () => emit('more-click');
</script>

<style scoped>
.business-system {
  background: #ffffff;
  padding: 46rpx 26rpx 60rpx;
}

.bs-title {
  text-align: center;
  margin-bottom: 36rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* 业务板块 CSS 标题 */
.bs-title-block {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.bs-title-main {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 88rpx;
  margin-bottom: 12rpx;
}

.bs-title-en {
  position: absolute;
  left: 50%;
  top: 42%;
  transform: translate(-50%, -68%);
  font-size: 64rpx;
  font-weight: 700;
  letter-spacing: 6rpx;
  line-height: 1;
  color: #dce8ff;
  white-space: nowrap;
  z-index: 0;
  pointer-events: none;
}

.bs-title-zh {
  position: relative;
  z-index: 1;
  font-size: 48rpx;
  font-weight: 700;
  color: #000000;
  line-height: 68rpx;
  letter-spacing: 4rpx;
}

.bs-title-slogan {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 16rpx;
}

.bs-title-slogan-text {
  font-size: 26rpx;
  font-weight: 400;
  color: #666666;
  line-height: 36rpx;
  letter-spacing: 1rpx;
}

/* 两侧菱形点阵装饰 */
.bs-title-decor {
  position: relative;
  width: 36rpx;
  height: 28rpx;
  flex-shrink: 0;
}

.bs-title-decor-dot {
  position: absolute;
  width: 8rpx;
  height: 8rpx;
  background: #7eb6ff;
  transform: rotate(45deg);
  border-radius: 1rpx;
  opacity: 0.85;
}

.bs-title-decor-dot.dot-1 {
  left: 14rpx;
  top: 2rpx;
  width: 9rpx;
  height: 9rpx;
  background: #5b9bff;
}

.bs-title-decor-dot.dot-2 {
  left: 4rpx;
  top: 10rpx;
  width: 6rpx;
  height: 6rpx;
  opacity: 0.55;
}

.bs-title-decor-dot.dot-3 {
  right: 4rpx;
  top: 10rpx;
  width: 6rpx;
  height: 6rpx;
  opacity: 0.55;
}

.bs-title-decor-dot.dot-4 {
  left: 12rpx;
  top: 12rpx;
  width: 12rpx;
  height: 12rpx;
  background: #4a7eff;
  opacity: 1;
}

.bs-title-decor-dot.dot-5 {
  left: 2rpx;
  bottom: 2rpx;
  width: 5rpx;
  height: 5rpx;
  opacity: 0.4;
}

.bs-title-decor-dot.dot-6 {
  right: 2rpx;
  bottom: 2rpx;
  width: 5rpx;
  height: 5rpx;
  opacity: 0.4;
}

.bs-title-decor-dot.dot-7 {
  left: 14rpx;
  bottom: 0;
  width: 7rpx;
  height: 7rpx;
  opacity: 0.65;
}

.bs-title-text {
  font-size: 40rpx;
  font-weight: 700;
  color: #000000;
  line-height: 56rpx;
}

.bs-title-gradient {
  background-image: linear-gradient(90deg, #006eee 53%, #00bdfe 97%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

/* ========== 01 卡片 ========== */
.card01 {
  width: 100%;
  margin-bottom: 28rpx;
  border-radius: 28rpx;
  overflow: hidden;
  background: #f4f8ff;
  box-shadow: 0 8rpx 28rpx rgba(30, 100, 220, 0.08);
}

.card01-header {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  height: 168rpx;
  padding: 28rpx 36rpx;
  box-sizing: border-box;
  overflow: hidden;
}


.card01-header-bg {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}


.card01-num {
  position: absolute;
  left: 24rpx;
  top: 50%;
  transform: translateY(-50%);
  font-size: 132rpx;
  font-weight: 800;
  line-height: 1;
  letter-spacing: -4rpx;
  z-index: 1;
  /* 文字竖向渐变:上亮下暗 */
  background: linear-gradient(180deg,
      rgba(255, 255, 255, 0.92) 0%,
      rgba(255, 255, 255, 0.45) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

.card01-header-title {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  z-index: 1;
}

.card01-header-line {
  font-size: 36rpx;
  font-weight: 700;
  color: #ffffff;
  line-height: 52rpx;
  text-align: right;
}

.card01-body {
  position: relative;
  display: flex;
  flex-direction: row;
  padding: 36rpx 28rpx 40rpx;
  min-height: 380rpx;
  box-sizing: border-box;
  background: linear-gradient(180deg, #f7faff 0%, #eef5ff 100%);
}

.card01-left {
  flex: 1;
  z-index: 1;
  padding-right: 12rpx;
}

.card01-bullets {
  display: flex;
  flex-direction: column;
  gap: 18rpx;
}

.card01-bullet {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.card01-dot {
  width: 14rpx;
  height: 14rpx;
  border-radius: 50%;
  background: #2c80ff;
  margin-right: 16rpx;
  flex-shrink: 0;
}

.card01-bullet-text {
  font-size: 30rpx;
  font-weight: 600;
  color: #1a1a1a;
  line-height: 42rpx;
}

.card01-more {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 28rpx;
}

.card01-more-text {
  font-size: 28rpx;
  font-weight: 600;
  color: #2c80ff;
  line-height: 40rpx;
  border-bottom: 2rpx solid #2c80ff;
  padding-bottom: 2rpx;
}

.card01-more-arrow {
  width: 32rpx;
  height: 32rpx;
  margin-left: 10rpx;
  flex-shrink: 0;
}

.card01-feats {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 40rpx;
  margin-top: 36rpx;
}

.card01-feat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10rpx;
}

.card01-feat-icon {
  width: 44rpx;
  height: 44rpx;
  display: block;
}

.card01-feat-label {
  font-size: 22rpx;
  color: #666666;
  line-height: 30rpx;
}

.card01-cube {
  position: absolute;
  right: -20rpx;
  bottom: 0;
  width: 360rpx;
  height: 400rpx;
  z-index: 0;
}

/* ========== 02 卡片 ========== */
.card02 {
  width: 100%;
  border-radius: 28rpx;
  overflow: hidden;
  background: linear-gradient(105deg,
      rgba(244, 248, 247, 0.996078) 9.18%,
      #f1ffff 90.82%);
}

.card02-header {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  height: 168rpx;
  padding: 28rpx 36rpx;
  box-sizing: border-box;
  overflow: hidden;
}

.card02-header-bg {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.card02-num {
  position: absolute;
  left: 24rpx;
  top: 50%;
  transform: translateY(-50%);
  font-size: 132rpx;
  font-weight: 800;
  line-height: 1;
  letter-spacing: -4rpx;
  z-index: 1;
  /* 文字竖向渐变:上亮下暗 */
  background: linear-gradient(180deg,
      rgba(255, 255, 255, 0.92) 0%,
      rgba(255, 255, 255, 0.45) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

.card02-header-title {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  z-index: 1;
}

.card02-header-line {
  font-size: 36rpx;
  font-weight: 700;
  color: #ffffff;
  line-height: 52rpx;
  text-align: right;
}

.card02-intro {
  position: relative;
  display: flex;
  flex-direction: row;
  padding: 36rpx 28rpx 8rpx;
  min-height: 320rpx;
  box-sizing: border-box;
}

.card02-intro-left {
  flex: 1;
  z-index: 1;
  padding-right: 12rpx;
}

.card02-bullets {
  display: flex;
  flex-direction: column;
  gap: 18rpx;
}

.card02-bullet {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.card02-dot {
  width: 14rpx;
  height: 14rpx;
  border-radius: 50%;
  background: #139194;
  margin-right: 16rpx;
  flex-shrink: 0;
}

.card02-bullet-text {
  font-size: 30rpx;
  font-weight: 600;
  color: #1a1a1a;
  line-height: 42rpx;
}

.card02-more {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 28rpx;
}

.card02-more-text {
  font-size: 28rpx;
  font-weight: 600;
  color: #139194;
  line-height: 40rpx;
  border-bottom: 2rpx solid #139194;
  padding-bottom: 2rpx;
}

.card02-more-arrow {
  width: 32rpx;
  height: 32rpx;
  margin-left: 10rpx;
  flex-shrink: 0;
}

.card02-phones {
  position: absolute;
  right: 10rpx;
  top: 40rpx;
  width: 320rpx;
  height: 280rpx;
  z-index: 0;
}

.card02-feats {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 12rpx 28rpx 28rpx;
  box-sizing: border-box;
}

.card02-feat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10rpx;
  flex: 1;
}

.card02-feat-icon {
  width: 44rpx;
  height: 44rpx;
  display: block;
}

.card02-feat-label {
  font-size: 22rpx;
  color: #333333;
  line-height: 30rpx;
}

.card02-divider {
  height: 1rpx;
  margin: 8rpx 28rpx 0;
  background: rgba(19, 145, 148, 0.18);
}

/* 介绍列表 */
.bs-panel-body {
  padding: 12rpx 28rpx 44rpx;
  display: flex;
  flex-direction: column;
  gap: 72rpx;
  background: transparent;
}

.bs-item {
  display: flex;
  flex-direction: column;
}

.bs-item-head {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 18rpx;
}

.bs-item-bar {
  width: 6rpx;
  height: 36rpx;
  background: #139194;
  mix-blend-mode: normal;
  margin-right: 16rpx;
  flex-shrink: 0;
}

.bs-item-title {
  flex: 1;
  font-size: 32rpx;
  font-weight: 700;
  color: #1a1a1a;
  line-height: 44rpx;
}

.bs-item-card {
  box-shadow: 0 8rpx 28rpx rgba(26, 166, 160, 0.08);
  border-radius: 24rpx;
}

.bs-item-media {
  width: 100%;
  border-radius: 24rpx 24rpx 0 0;
  overflow: hidden;
  background: #ffffff;
  box-shadow: 0 8rpx 28rpx rgba(26, 166, 160, 0.08);
}

.bs-item-image {
  width: 100%;
  display: block;
  vertical-align: top;
}

.bs-item-desc {
  display: block;
  padding: 16rpx;
  background: #fff;
  border-radius: 0 0 24rpx 24rpx;
  font-size: 26rpx;
  font-weight: 400;
  line-height: 40rpx;
  color: rgba(0, 0, 0, 0.72);
}

/* 原卡片列表 */
.bs-list {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

.bs-card {
  width: 100%;
  border-radius: 24rpx;
  border: 1rpx solid #e5e5e5;
  background: #ffffff;
  box-shadow: 0 6rpx 22rpx 0 rgba(220, 222, 229, 0.5);
  padding: 24rpx;
  box-sizing: border-box;
}

.bs-card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40rpx;
}

.bs-card-title {
  font-size: 32rpx;
  font-weight: 700;
  color: #000000;
  line-height: 40rpx;
}

.bs-divider {
  position: relative;
  width: 100%;
  height: 2rpx;
  background: #e5e5e5;
  margin-top: 11rpx;
}

.bs-divider-active {
  position: absolute;
  left: 0;
  top: 0;
  width: 140rpx;
  height: 2rpx;
  background: #006dff;
}

.bs-image-wrap {
  margin-top: 19rpx;
  width: 100%;
  aspect-ratio: 662 / 372;
  border-radius: 15rpx;
  overflow: hidden;
  background: linear-gradient(123.78deg, #cfecff 9.01%, #f7f9ff 97.39%);
}

.bs-image {
  width: 100%;
  height: 100%;
  display: block;
}

.bs-desc {
  display: block;
  margin-top: 24rpx;
  font-size: 25rpx;
  font-weight: 400;
  line-height: 37rpx;
  color: rgba(0, 0, 0, 0.6);
}
</style>
