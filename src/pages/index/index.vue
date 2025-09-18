<template>
  <view class="main">
    <view class="container">
      <view class="header">
        <view class="title-wrapper">
          <view class="headLogo">
            <image
              class="logo"
              src="http://cdn.xiaodingdang1.com/2025/09/12/bcf4ff23413847129727a6a265fd2b34.png"
              mode="aspectFit"
            />
          </view>
          <view class="title">天天拓客</view>
        </view>
      </view>
      <view style="height: 200rpx"></view>
      <!-- 轮播图组件 -->
      <view class="slideshow">
        <swiper
          class="swiper-container"
          :indicator-dots="true"
          :autoplay="true"
          :interval="3000"
          :duration="500"
          :circular="true"
          indicator-color="rgba(255, 255, 255, 0.5)"
          indicator-active-color="#ffffff"
          @change="onSwiperChange"
        >
          <swiper-item
            v-for="(item, index) in bannerList"
            :key="index"
            class="swiper-item"
          >
            <image
              :src="item.image"
              class="banner-image"
              mode="aspectFill"
              @click="onBannerClick(item, index)"
            />
            <view class="banner-content" v-if="item.title || item.desc">
              <view class="banner-title" v-if="item.title">{{
                item.title
              }}</view>
              <view class="banner-desc" v-if="item.desc">{{ item.desc }}</view>
            </view>
          </swiper-item>
        </swiper>

        <!-- 自定义指示器 -->
        <view class="custom-indicators">
          <view
            v-for="(item, index) in bannerList"
            :key="index"
            class="indicator-dot"
            :class="{ active: currentIndex === index }"
            @click="goToSlide(index)"
          ></view>
        </view>
      </view>
      <view class="company-info">
        <text class="company-title">天天拓客</text>
        <text class="company-desc">
          天天拓客是一家集网络营销、导客软件开发、互联网服务于一体的创新科技公司。核心团队服务于全国400多家服务行业媒体公司。历经一年的技术研发与沉淀，形成针对中小企业行业营销的线上流量整体解决方案。
        </text>
      </view>
      <view class="company-btn">
        <button
          class="contact-btn"
          @click="handleContactClick"
          style="border: none"
        >
          <image
            src="http://cdn.xiaodingdang1.com/2025/09/12/82c65b95ac1e4e29bc18d3efd67b0933.png"
          ></image>
        </button>
        <button class="contact-btn" @click="handleContactClick">
          <image
            src="http://cdn.xiaodingdang1.com/2025/09/12/3f38644e6fec4136958afa513bd8c96c.png"
          ></image>
        </button>
        <button class="contact-btn" @click="handleContactClick">
          <image
            src="http://cdn.xiaodingdang1.com/2025/09/12/29846ffbc5d54aaca318f5b1723fffff.png"
          ></image>
        </button>
      </view>
    </view>
    <view class="brand-story">
      <view class="brand-story-title">品牌故事</view>
      <view class="brand-story-content"
        >我们为什么专注月子中心赛道？我们的使命是什么？</view
      >
      <image
        src="http://cdn.xiaodingdang1.com/2025/09/17/3e714aab0c1044f3a6d9ad78dc856e63.png"
        style="width: 100%; height: 498rpx; z-index: 999"
      ></image>
      <image
        src="http://cdn.xiaodingdang1.com/2025/09/17/dff756b4214e4fdb94a2a803a38a16fa.png"
        style="width: 400rpx; height: 400rpx"
        class="brand-story-decoration"
      ></image>
    </view>
    <view class="teamappearance">
      <view class="teamappearance-title">团队亮相</view>
      <scroll-view
        class="top-container"
        scroll-x="true"
        :show-scrollbar="false"
        :enable-flex="true"
        scroll-with-animation="true"
        style="width: 100%; height: 420rpx"
      >
        <view class="scroll-content">
          <view
            :class="['top', topStyle]"
            v-for="(item, index) in roomList"
            :key="index"
            @tap="postpartumNext(item)"
          >
            <view class="team-card">
              <view class="team-card-image">
                <image
                  :src="item.displayPhotos[0]"
                  mode="aspectFill"
                  class="member-image"
                />
              </view>
              <view class="team-card-info">
                <view class="member-name">{{ item.projectName }}</view>
                <view class="member-tags">
                  <view
                    class="tag-item"
                    v-for="(tag, tagIndex) in item.tag"
                    :key="tagIndex"
                  >
                    {{ tag }}
                  </view>
                </view>
                <view class="member-price">{{ item.prices }}</view>
              </view>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from "vue";

// 轮播图数据
const bannerList = ref([
  {
    image:
      "http://cdn.xiaodingdang1.com/2025/09/17/3e714aab0c1044f3a6d9ad78dc856e63.png",
    title: "专业团队",
    desc: "拥有多年行业经验的专业团队",
  },
  {
    image:
      "http://cdn.xiaodingdang1.com/2025/09/17/dff756b4214e4fdb94a2a803a38a16fa.png",
    title: "优质服务",
    desc: "为客户提供一站式解决方案",
  },
  {
    image:
      "http://cdn.xiaodingdang1.com/2025/09/12/bcf4ff23413847129727a6a265fd2b34.png",
    title: "创新技术",
    desc: "运用最新技术为客户创造价值",
  },
]);

// 当前轮播图索引
const currentIndex = ref(0);

// 团队展示数据 - 为card组件提供数据
const roomList = ref([
  {
    projectName: "张三 - 技术总监",
    displayPhotos: [
      "http://cdn.xiaodingdang1.com/2025/09/17/3e714aab0c1044f3a6d9ad78dc856e63.png",
    ],
    tag: ["Vue.js", "Node.js", "架构设计"],
    prices: "面议",
  },
  {
    projectName: "李四 - 产品经理",
    displayPhotos: [
      "http://cdn.xiaodingdang1.com/2025/09/17/3e714aab0c1044f3a6d9ad78dc856e63.png",
    ],
    tag: ["产品规划", "用户体验", "项目管理"],
    prices: "面议",
  },
  {
    projectName: "王五 - UI设计师",
    displayPhotos: [
      "http://cdn.xiaodingdang1.com/2025/09/17/3e714aab0c1044f3a6d9ad78dc856e63.png",
    ],
    tag: ["UI设计", "交互设计", "Figma"],
    prices: "面议",
  },
  {
    projectName: "赵六 - 前端工程师",
    displayPhotos: [
      "http://cdn.xiaodingdang1.com/2025/09/17/3e714aab0c1044f3a6d9ad78dc856e63.png",
    ],
    tag: ["React", "TypeScript", "移动端"],
    prices: "面议",
  },
]);

// 顶部样式
const topStyle = ref("top-style");

// 轮播图切换事件
const onSwiperChange = (e) => {
  currentIndex.value = e.detail.current;
};

// 点击轮播图事件
const onBannerClick = (item, index) => {
  console.log("点击了轮播图:", item, index);
  // 这里可以添加跳转逻辑
};

// 跳转到指定轮播图
const goToSlide = (index) => {
  currentIndex.value = index;
};

// 联系我们按钮点击事件
const handleContactClick = () => {
  console.log("点击了联系我们");
  // 这里可以添加联系方式的逻辑，比如跳转到客服页面
  uni.showToast({
    title: "联系功能开发中",
    icon: "none",
  });
};

// 团队成员点击事件
const postpartumNext = (item) => {
  console.log("点击了团队成员:", item);
  // 这里可以添加跳转到团队成员详情页的逻辑
  uni.showToast({
    title: `查看${item.projectName}详情`,
    icon: "none",
  });
};

onMounted(() => {
  console.log("页面加载完成");
});
</script>

<style scoped>
.main {
  background-color: #f7f7f7;
  min-height: 100vh;
}
.container {
  padding: 0 26rpx;
}

.header {
  padding: 110rpx 0rpx 30rpx 0rpx;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
}

.title-wrapper {
  display: flex;
  align-items: center;
}
.headLogo {
  border-radius: 100rpx;
  background: #ffffff;
  padding: 8rpx 10rpx;
}
.logo {
  width: 48rpx;
  height: 42rpx;
}

.title {
  font-size: 28rpx;
  font-weight: bold;
  color: #313131;
  margin-left: 12rpx;
}

.right-icons {
  display: flex;
  align-items: center;
}

.search-icon {
  font-size: 32rpx;
  margin-left: 20rpx;
}

.banner {
  margin-top: 250rpx;
  position: relative;
  width: 100%;
  height: 400rpx;
  overflow: hidden;
}

.company-info {
  margin-top: 60rpx;
}

.company-title {
  display: block;
  font-size: 40rpx;
  font-weight: bold;
  color: #000000;
  margin-bottom: 20rpx;
  text-align: center;
}

.company-desc {
  font-size: 24rpx;
  color: #000000;
  text-align: center;
  margin-top: 50rpx;
}

/* 按钮样式 */
.company-btn {
  display: flex;
  margin-top: 80rpx;
  padding-bottom: 60rpx;
  justify-content: space-around;
}
.contact-btn {
  width: 80rpx;
  height: 80rpx;
  padding: 0;
  margin: 0;
  border: none;
  background: transparent;
}
.contact-btn image {
  width: 80rpx;
  height: 80rpx;
}

/* 轮播图样式 */
.slideshow {
  border-radius: 20rpx;
  overflow: hidden;
  position: relative;
  box-shadow: 0 8rpx 30rpx rgba(0, 0, 0, 0.1);
}

.swiper-container {
  width: 100%;
  height: 935rpx;
}

.swiper-item {
  position: relative;
  width: 100%;
  height: 100%;
}

.banner-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.banner-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  padding: 60rpx 30rpx 30rpx;
  color: white;
}

.banner-title {
  font-size: 36rpx;
  font-weight: bold;
  margin-bottom: 10rpx;
  text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.5);
}

.banner-desc {
  font-size: 26rpx;
  opacity: 0.9;
  line-height: 1.4;
  text-shadow: 0 1rpx 2rpx rgba(0, 0, 0, 0.5);
}

/* 自定义指示器样式 */
.custom-indicators {
  position: absolute;
  bottom: 20rpx;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 12rpx;
  z-index: 10;
}

.indicator-dot {
  width: 16rpx;
  height: 16rpx;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
  transition: all 0.3s ease;
  cursor: pointer;
}

.indicator-dot.active {
  background-color: #ffffff;
  transform: scale(1.2);
}

.indicator-dot:hover {
  background-color: rgba(255, 255, 255, 0.8);
}

/* 品牌故事 */
.brand {
  background: #ffffff;
  padding: 80rpx 48rpx;
  color: #000000;
}
.brand-title {
  font-size: 40rpx;
  font-weight: bold;
}
.brand-coment {
  font-size: 26rpx;
  margin: 24rpx 0 81rpx 0;
}

/* 团队亮相 */
.team {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 80rpx 40rpx;
  position: relative;
  overflow: hidden;
}

.team::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="75" cy="75" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="50" cy="10" r="0.5" fill="rgba(255,255,255,0.05)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  opacity: 0.3;
  pointer-events: none;
}

.team-title {
  color: #ffffff;
  font-size: 48rpx;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20rpx;
  text-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.3);
  position: relative;
  z-index: 2;
}

.team-subtitle {
  color: rgba(255, 255, 255, 0.9);
  font-size: 28rpx;
  text-align: center;
  margin-bottom: 60rpx;
  position: relative;
  z-index: 2;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30rpx;
  margin-bottom: 80rpx;
  position: relative;
  z-index: 2;
}

.team-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 24rpx;
  overflow: hidden;
  box-shadow: 0 20rpx 40rpx rgba(0, 0, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  opacity: 0;
  transform: translateY(60rpx);
  backdrop-filter: blur(10rpx);
  border: 1rpx solid rgba(255, 255, 255, 0.2);
}

.team-card.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.team-card:hover {
  transform: translateY(-10rpx) scale(1.02);
  box-shadow: 0 30rpx 60rpx rgba(0, 0, 0, 0.15);
}

.card-inner {
  position: relative;
  padding: 30rpx;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.avatar-container {
  position: relative;
  width: 120rpx;
  height: 120rpx;
  margin: 0 auto 30rpx;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 8rpx 20rpx rgba(0, 0, 0, 0.15);
}

.member-avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.avatar-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.team-card:hover .avatar-overlay {
  opacity: 1;
}

.team-card:hover .member-avatar {
  transform: scale(1.1);
}

.overlay-content {
  text-align: center;
}

.view-detail {
  color: white;
  font-size: 24rpx;
  font-weight: 500;
}

.member-info {
  text-align: center;
  flex: 1;
}

.member-name {
  font-size: 32rpx;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 10rpx;
}

.member-position {
  font-size: 26rpx;
  color: #667eea;
  font-weight: 500;
  margin-bottom: 20rpx;
}

.member-desc {
  font-size: 24rpx;
  color: #666;
  line-height: 1.5;
  margin-bottom: 25rpx;
}

.skills-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10rpx;
  justify-content: center;
}

.skill-tag {
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  padding: 8rpx 16rpx;
  border-radius: 20rpx;
  font-size: 20rpx;
  font-weight: 500;
  box-shadow: 0 4rpx 8rpx rgba(102, 126, 234, 0.3);
}

.card-decoration {
  position: absolute;
  top: -50rpx;
  right: -50rpx;
  width: 100rpx;
  height: 100rpx;
  background: linear-gradient(
    45deg,
    rgba(102, 126, 234, 0.1),
    rgba(118, 75, 162, 0.1)
  );
  border-radius: 50%;
  pointer-events: none;
}

.team-stats {
  display: flex;
  justify-content: space-around;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20rpx;
  padding: 40rpx 20rpx;
  backdrop-filter: blur(10rpx);
  border: 1rpx solid rgba(255, 255, 255, 0.2);
  position: relative;
  z-index: 2;
}

.stat-item {
  text-align: center;
  color: white;
}

.stat-number {
  font-size: 48rpx;
  font-weight: bold;
  display: block;
  margin-bottom: 10rpx;
  text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.3);
}

.stat-label {
  font-size: 24rpx;
  opacity: 0.9;
}

/* 荣誉证书样式 */
.honor {
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  padding: 100rpx 40rpx;
  position: relative;
  overflow: hidden;
}

.honor::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(
      circle at 20% 80%,
      rgba(255, 215, 0, 0.1) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 80% 20%,
      rgba(255, 255, 255, 0.05) 0%,
      transparent 50%
    );
  pointer-events: none;
}

.honor-title {
  color: #ffffff;
  font-size: 48rpx;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20rpx;
  text-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.3);
  position: relative;
  z-index: 2;
}

.honor-subtitle {
  color: rgba(255, 255, 255, 0.9);
  font-size: 28rpx;
  text-align: center;
  margin-bottom: 80rpx;
  position: relative;
  z-index: 2;
}

.certificates-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40rpx;
  margin-bottom: 80rpx;
  position: relative;
  z-index: 2;
}

.certificate-card {
  position: relative;
  background: linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 30rpx;
  padding: 40rpx;
  box-shadow: 0 20rpx 40rpx rgba(0, 0, 0, 0.1), 0 8rpx 16rpx rgba(0, 0, 0, 0.05),
    inset 0 1rpx 0 rgba(255, 255, 255, 0.8);
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  opacity: 0;
  transform: translateY(80rpx) rotateX(10deg);
  overflow: hidden;
  cursor: pointer;
}

.certificate-card.animate-in {
  opacity: 1;
  transform: translateY(0) rotateX(0deg);
}

.certificate-card:hover {
  transform: translateY(-20rpx) scale(1.05);
  box-shadow: 0 40rpx 80rpx rgba(0, 0, 0, 0.15),
    0 16rpx 32rpx rgba(0, 0, 0, 0.1);
}

.certificate-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  border-radius: 30rpx;
}

.bg-pattern {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(
      circle at 25% 25%,
      rgba(255, 215, 0, 0.1) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 75% 75%,
      rgba(255, 215, 0, 0.05) 0%,
      transparent 50%
    );
  animation: rotate 20s linear infinite;
}

.bg-shine {
  position: absolute;
  top: -100%;
  left: -100%;
  width: 300%;
  height: 300%;
  background: linear-gradient(
    45deg,
    transparent 30%,
    rgba(255, 255, 255, 0.1) 50%,
    transparent 70%
  );
  transform: translateX(-100%) translateY(-100%);
  transition: transform 0.6s ease;
}

.certificate-card:hover .bg-shine {
  transform: translateX(100%) translateY(100%);
}

.certificate-content {
  position: relative;
  z-index: 2;
  text-align: center;
}

.certificate-badge {
  position: relative;
  width: 120rpx;
  height: 120rpx;
  margin: 0 auto 30rpx;
}

.badge-inner {
  width: 100%;
  height: 100%;
  background: linear-gradient(145deg, #ffd700, #ffed4e);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8rpx 16rpx rgba(255, 215, 0, 0.3),
    inset 0 2rpx 4rpx rgba(255, 255, 255, 0.5);
  position: relative;
  z-index: 2;
}

.badge-icon {
  font-size: 48rpx;
  filter: drop-shadow(0 2rpx 4rpx rgba(0, 0, 0, 0.2));
}

.badge-glow {
  position: absolute;
  top: -10rpx;
  left: -10rpx;
  right: -10rpx;
  bottom: -10rpx;
  background: radial-gradient(
    circle,
    rgba(255, 215, 0, 0.3) 0%,
    transparent 70%
  );
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}

.certificate-info {
  margin-bottom: 30rpx;
}

.certificate-name {
  font-size: 32rpx;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 15rpx;
  line-height: 1.3;
}

.certificate-issuer {
  font-size: 26rpx;
  color: #3498db;
  font-weight: 500;
  margin-bottom: 10rpx;
}

.certificate-date {
  font-size: 24rpx;
  color: #7f8c8d;
  margin-bottom: 15rpx;
}

.certificate-desc {
  font-size: 22rpx;
  color: #666;
  line-height: 1.5;
}

.certificate-level {
  display: inline-block;
  padding: 8rpx 20rpx;
  border-radius: 20rpx;
  font-size: 20rpx;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1rpx;
}

.certificate-level.platinum {
  background: linear-gradient(45deg, #e5e4e2, #ffffff);
  color: #2c3e50;
  box-shadow: 0 4rpx 8rpx rgba(229, 228, 226, 0.3);
}

.certificate-level.gold {
  background: linear-gradient(45deg, #ffd700, #ffed4e);
  color: #8b4513;
  box-shadow: 0 4rpx 8rpx rgba(255, 215, 0, 0.3);
}

.certificate-level.silver {
  background: linear-gradient(45deg, #c0c0c0, #e8e8e8);
  color: #2c3e50;
  box-shadow: 0 4rpx 8rpx rgba(192, 192, 192, 0.3);
}

.certificate-level.bronze {
  background: linear-gradient(45deg, #cd7f32, #daa520);
  color: #ffffff;
  box-shadow: 0 4rpx 8rpx rgba(205, 127, 50, 0.3);
}

.hover-effects {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.certificate-card:hover .hover-effects {
  opacity: 1;
}

.sparkle {
  position: absolute;
  width: 8rpx;
  height: 8rpx;
  background: #ffd700;
  border-radius: 50%;
  animation: sparkle 1.5s ease-in-out infinite;
}

.sparkle-1 {
  top: 20%;
  left: 20%;
  animation-delay: 0s;
}

.sparkle-2 {
  top: 60%;
  right: 25%;
  animation-delay: 0.5s;
}

.sparkle-3 {
  bottom: 30%;
  left: 70%;
  animation-delay: 1s;
}

.honor-stats {
  display: flex;
  justify-content: space-around;
  gap: 30rpx;
  position: relative;
  z-index: 2;
}

.stat-card {
  flex: 1;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 24rpx;
  padding: 40rpx 20rpx;
  text-align: center;
  backdrop-filter: blur(10rpx);
  border: 1rpx solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.stat-card:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-10rpx);
}

.stat-icon {
  font-size: 48rpx;
  margin-bottom: 20rpx;
  display: block;
}

.stat-number {
  font-size: 48rpx;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 10rpx;
  text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.3);
}

.stat-label {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.9);
}

/* 动画定义 */
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes pulse {
  0%,
  100% {
    opacity: 0.5;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.1);
  }
}

@keyframes sparkle {
  0%,
  100% {
    opacity: 0;
    transform: scale(0);
  }
  50% {
    opacity: 1;
    transform: scale(1);
  }
}

/* 团队卡片响应式设计 */
@media screen and (max-width: 750rpx) {
  .team-grid {
    grid-template-columns: 1fr;
    gap: 20rpx;
  }

  .team-card {
    margin: 0 20rpx;
  }

  .avatar-container {
    width: 100rpx;
    height: 100rpx;
  }

  .member-name {
    font-size: 28rpx;
  }

  .member-position {
    font-size: 24rpx;
  }

  .stat-number {
    font-size: 40rpx;
  }

  .certificates-container {
    grid-template-columns: 1fr;
    gap: 30rpx;
  }

  .honor-stats {
    flex-direction: column;
    gap: 20rpx;
  }
}

/* 响应式设计 */
@media screen and (max-width: 750rpx) {
  .slideshow {
    margin: 15rpx;
    border-radius: 15rpx;
  }

  .swiper-container {
    height: 350rpx;
  }

  .banner-title {
    font-size: 32rpx;
  }

  .banner-desc {
    font-size: 24rpx;
  }
}

/* 合作商家样式 */
.partner {
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  padding: 100rpx 40rpx;
  position: relative;
  overflow: hidden;
}

.partner::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(
      circle at 30% 70%,
      rgba(52, 152, 219, 0.1) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 70% 30%,
      rgba(155, 89, 182, 0.05) 0%,
      transparent 50%
    );
  pointer-events: none;
}

.partner-title {
  color: #ffffff;
  font-size: 48rpx;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20rpx;
  text-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.3);
  position: relative;
  z-index: 2;
}

.partner-subtitle {
  color: rgba(255, 255, 255, 0.9);
  font-size: 28rpx;
  text-align: center;
  margin-bottom: 80rpx;
  position: relative;
  z-index: 2;
}

.partners-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40rpx;
  margin-bottom: 80rpx;
  position: relative;
  z-index: 2;
}

.partner-card {
  position: relative;
  background: linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 30rpx;
  padding: 40rpx;
  box-shadow: 0 20rpx 40rpx rgba(0, 0, 0, 0.1), 0 8rpx 16rpx rgba(0, 0, 0, 0.05),
    inset 0 1rpx 0 rgba(255, 255, 255, 0.8);
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  opacity: 0;
  transform: translateY(80rpx) rotateY(10deg);
  overflow: hidden;
  cursor: pointer;
}

.partner-card.animate-in {
  opacity: 1;
  transform: translateY(0) rotateY(0deg);
}

.partner-card:hover {
  transform: translateY(-20rpx) scale(1.05);
  box-shadow: 0 40rpx 80rpx rgba(0, 0, 0, 0.15),
    0 16rpx 32rpx rgba(0, 0, 0, 0.1);
}

.partner-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  border-radius: 30rpx;
}

.bg-gradient {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    rgba(52, 152, 219, 0.05) 0%,
    transparent 30%,
    rgba(155, 89, 182, 0.05) 70%,
    transparent 100%
  );
  animation: rotate 25s linear infinite;
}

.partner-content {
  position: relative;
  z-index: 2;
  text-align: center;
}

.partner-logo-container {
  position: relative;
  width: 120rpx;
  height: 120rpx;
  margin: 0 auto 30rpx;
  border-radius: 20rpx;
  overflow: hidden;
  box-shadow: 0 8rpx 20rpx rgba(0, 0, 0, 0.1);
}

.partner-logo {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;
  background: #ffffff;
  padding: 10rpx;
}

.logo-glow {
  position: absolute;
  top: -10rpx;
  left: -10rpx;
  right: -10rpx;
  bottom: -10rpx;
  background: radial-gradient(
    circle,
    rgba(52, 152, 219, 0.2) 0%,
    transparent 70%
  );
  border-radius: 20rpx;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.partner-card:hover .logo-glow {
  opacity: 1;
}

.partner-card:hover .partner-logo {
  transform: scale(1.1);
}

.partner-info {
  margin-bottom: 30rpx;
}

.partner-name {
  font-size: 32rpx;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 15rpx;
  line-height: 1.3;
}

.partner-industry {
  font-size: 26rpx;
  color: #3498db;
  font-weight: 500;
  margin-bottom: 15rpx;
}

.partner-desc {
  font-size: 24rpx;
  color: #666;
  line-height: 1.5;
  margin-bottom: 25rpx;
}

.cooperation-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10rpx;
  justify-content: center;
  margin-bottom: 25rpx;
}

.cooperation-tag {
  background: linear-gradient(45deg, #3498db, #2980b9);
  color: white;
  padding: 8rpx 16rpx;
  border-radius: 20rpx;
  font-size: 20rpx;
  font-weight: 500;
  box-shadow: 0 4rpx 8rpx rgba(52, 152, 219, 0.3);
}

.partner-level {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10rpx;
  padding: 12rpx 24rpx;
  border-radius: 25rpx;
  font-size: 22rpx;
  font-weight: bold;
  margin: 0 auto;
  width: fit-content;
}

.partner-level.platinum {
  background: linear-gradient(45deg, #e5e4e2, #ffffff);
  color: #2c3e50;
  box-shadow: 0 6rpx 12rpx rgba(229, 228, 226, 0.4);
}

.partner-level.gold {
  background: linear-gradient(45deg, #ffd700, #ffed4e);
  color: #8b4513;
  box-shadow: 0 6rpx 12rpx rgba(255, 215, 0, 0.4);
}

.partner-level.silver {
  background: linear-gradient(45deg, #c0c0c0, #e8e8e8);
  color: #2c3e50;
  box-shadow: 0 6rpx 12rpx rgba(192, 192, 192, 0.4);
}

.partner-level.bronze {
  background: linear-gradient(45deg, #cd7f32, #daa520);
  color: #ffffff;
  box-shadow: 0 6rpx 12rpx rgba(205, 127, 50, 0.4);
}

.level-icon {
  font-size: 24rpx;
}

.level-text {
  font-size: 20rpx;
}

.partner-effects {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.partner-card:hover .partner-effects {
  opacity: 1;
}

.effect-dot {
  position: absolute;
  width: 6rpx;
  height: 6rpx;
  background: #3498db;
  border-radius: 50%;
  animation: float 2s ease-in-out infinite;
}

.effect-1 {
  top: 20%;
  left: 15%;
  animation-delay: 0s;
}

.effect-2 {
  top: 70%;
  right: 20%;
  animation-delay: 0.7s;
}

.effect-3 {
  bottom: 25%;
  left: 75%;
  animation-delay: 1.4s;
}

.partner-stats {
  display: flex;
  justify-content: space-around;
  gap: 30rpx;
  margin-bottom: 80rpx;
  position: relative;
  z-index: 2;
}

.partner-stat-card {
  flex: 1;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 24rpx;
  padding: 40rpx 20rpx;
  text-align: center;
  backdrop-filter: blur(10rpx);
  border: 1rpx solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.partner-stat-card:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-10rpx);
}

.cooperation-process {
  position: relative;
  z-index: 2;
}

.process-title {
  color: #ffffff;
  font-size: 40rpx;
  font-weight: bold;
  text-align: center;
  margin-bottom: 60rpx;
  text-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.3);
}

.process-steps {
  display: flex;
  flex-direction: column;
  gap: 30rpx;
}

.process-step {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20rpx;
  padding: 30rpx;
  backdrop-filter: blur(10rpx);
  border: 1rpx solid rgba(255, 255, 255, 0.2);
  transition: all 0.4s ease;
  opacity: 0;
  transform: translateX(-60rpx);
  position: relative;
}

.process-step.animate-in {
  opacity: 1;
  transform: translateX(0);
}

.process-step:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateX(10rpx);
}

.step-number {
  width: 60rpx;
  height: 60rpx;
  background: linear-gradient(45deg, #3498db, #2980b9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24rpx;
  font-weight: bold;
  margin-right: 30rpx;
  box-shadow: 0 6rpx 12rpx rgba(52, 152, 219, 0.3);
}

.step-content {
  flex: 1;
}

.step-title {
  color: #ffffff;
  font-size: 28rpx;
  font-weight: bold;
  margin-bottom: 10rpx;
}

.step-desc {
  color: rgba(255, 255, 255, 0.8);
  font-size: 24rpx;
  line-height: 1.5;
}

.step-connector {
  position: absolute;
  right: -15rpx;
  top: 50%;
  transform: translateY(-50%);
  width: 30rpx;
  height: 2rpx;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.3), transparent);
}

/* 合作商家动画 */
@keyframes float {
  0%,
  100% {
    transform: translateY(0);
    opacity: 0.7;
  }
  50% {
    transform: translateY(-10rpx);
    opacity: 1;
  }
}

/* 合作商家响应式设计 */
@media screen and (max-width: 750rpx) {
  .partners-container {
    grid-template-columns: 1fr;
    gap: 30rpx;
  }

  .partner-stats {
    flex-direction: column;
    gap: 20rpx;
  }

  .process-steps {
    gap: 20rpx;
  }

  .process-step {
    flex-direction: column;
    text-align: center;
  }

  .step-number {
    margin-right: 0;
    margin-bottom: 20rpx;
  }

  .step-connector {
    display: none;
  }
}

/* 品牌故事高级样式 */
.brand {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%) !important;
  padding: 100rpx 40rpx !important;
  position: relative;
  overflow: hidden;
}

.brand::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(
      circle at 20% 30%,
      rgba(74, 144, 226, 0.1) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 80% 70%,
      rgba(155, 89, 182, 0.05) 0%,
      transparent 50%
    );
  pointer-events: none;
}

.brand-header {
  text-align: center;
  margin-bottom: 80rpx;
  position: relative;
  z-index: 2;
}

.brand-title {
  font-size: 48rpx !important;
  font-weight: bold !important;
  color: #2c3e50 !important;
  margin-bottom: 20rpx;
  text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1);
}

.brand-subtitle {
  font-size: 28rpx;
  color: #7f8c8d;
  margin-bottom: 40rpx;
  font-weight: 300;
}

.title-decoration {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20rpx;
}

.decoration-line {
  width: 60rpx;
  height: 2rpx;
  background: linear-gradient(90deg, transparent, #4a90e2, transparent);
}

.decoration-dot {
  width: 12rpx;
  height: 12rpx;
  background: #4a90e2;
  border-radius: 50%;
  box-shadow: 0 0 20rpx rgba(74, 144, 226, 0.5);
}

.brand-content {
  position: relative;
  z-index: 2;
}

/* 故事时间线样式 */
.story-timeline {
  margin-bottom: 100rpx;
}

.timeline-item {
  display: flex;
  margin-bottom: 60rpx;
  opacity: 0;
  transform: translateX(-80rpx);
  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.timeline-item.animate-in {
  opacity: 1;
  transform: translateX(0);
}

.timeline-item:nth-child(even) {
  flex-direction: row-reverse;
}

.timeline-item:nth-child(even) .story-card {
  transform: translateX(80rpx);
}

.timeline-item:nth-child(even).animate-in .story-card {
  transform: translateX(0);
}

.timeline-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 40rpx;
  position: relative;
}

.node-circle {
  position: relative;
  width: 120rpx;
  height: 120rpx;
  background: linear-gradient(145deg, #4a90e2, #357abd);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10rpx 30rpx rgba(74, 144, 226, 0.3),
    inset 0 2rpx 4rpx rgba(255, 255, 255, 0.3);
  z-index: 2;
}

.node-inner {
  color: white;
  font-size: 24rpx;
  font-weight: bold;
  text-shadow: 0 1rpx 2rpx rgba(0, 0, 0, 0.3);
}

.node-glow {
  position: absolute;
  top: -15rpx;
  left: -15rpx;
  right: -15rpx;
  bottom: -15rpx;
  background: radial-gradient(
    circle,
    rgba(74, 144, 226, 0.3) 0%,
    transparent 70%
  );
  border-radius: 50%;
  animation: pulse 3s ease-in-out infinite;
}

.timeline-connector {
  width: 4rpx;
  height: 100rpx;
  background: linear-gradient(180deg, #4a90e2, rgba(74, 144, 226, 0.3));
  margin-top: 20rpx;
}

.story-card {
  flex: 1;
  max-width: 500rpx;
  position: relative;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 24rpx;
  padding: 40rpx;
  box-shadow: 0 20rpx 40rpx rgba(0, 0, 0, 0.1), 0 8rpx 16rpx rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(10rpx);
  border: 1rpx solid rgba(255, 255, 255, 0.8);
  transition: all 0.4s ease;
  cursor: pointer;
  overflow: hidden;
}

.story-card:hover {
  transform: translateY(-10rpx) scale(1.02);
  box-shadow: 0 30rpx 60rpx rgba(0, 0, 0, 0.15),
    0 12rpx 24rpx rgba(0, 0, 0, 0.1);
}

.card-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  border-radius: 24rpx;
}

.story-content {
  position: relative;
  z-index: 2;
}

.story-icon {
  margin-bottom: 30rpx;
}

.icon-wrapper {
  width: 80rpx;
  height: 80rpx;
  background: linear-gradient(145deg, #4a90e2, #357abd);
  border-radius: 20rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8rpx 16rpx rgba(74, 144, 226, 0.3);
}

.icon-text {
  font-size: 36rpx;
  filter: drop-shadow(0 2rpx 4rpx rgba(0, 0, 0, 0.2));
}

.story-info {
  margin-bottom: 30rpx;
}

.story-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 20rpx;
  line-height: 1.3;
}

.story-desc {
  font-size: 26rpx;
  color: #666;
  line-height: 1.6;
  margin-bottom: 25rpx;
}

.story-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 12rpx;
  margin-bottom: 25rpx;
}

.story-tag {
  background: linear-gradient(45deg, #4a90e2, #357abd);
  color: white;
  padding: 8rpx 16rpx;
  border-radius: 20rpx;
  font-size: 22rpx;
  font-weight: 500;
  box-shadow: 0 4rpx 8rpx rgba(74, 144, 226, 0.3);
}

.story-data {
  text-align: center;
  padding: 20rpx;
  background: rgba(74, 144, 226, 0.1);
  border-radius: 16rpx;
  border: 1rpx solid rgba(74, 144, 226, 0.2);
}

.data-number {
  font-size: 36rpx;
  font-weight: bold;
  color: #4a90e2;
  margin-bottom: 8rpx;
}

.data-label {
  font-size: 22rpx;
  color: #7f8c8d;
}

.card-effects {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.story-card:hover .card-effects {
  opacity: 1;
}

.effect-shine {
  position: absolute;
  top: -100%;
  left: -100%;
  width: 300%;
  height: 300%;
  background: linear-gradient(
    45deg,
    transparent 30%,
    rgba(255, 255, 255, 0.2) 50%,
    transparent 70%
  );
  transform: translateX(-100%) translateY(-100%);
  transition: transform 0.8s ease;
}

.story-card:hover .effect-shine {
  transform: translateX(100%) translateY(100%);
}

.effect-particles {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.particle {
  position: absolute;
  width: 6rpx;
  height: 6rpx;
  background: #4a90e2;
  border-radius: 50%;
  animation: float 3s ease-in-out infinite;
}

.particle-1 {
  top: 20%;
  left: 20%;
  animation-delay: 0s;
}

.particle-2 {
  top: 60%;
  right: 25%;
  animation-delay: 1s;
}

.particle-3 {
  bottom: 30%;
  left: 70%;
  animation-delay: 2s;
}

/* 品牌价值观样式 */
.brand-values {
  margin-bottom: 100rpx;
}

.values-title {
  font-size: 40rpx;
  font-weight: bold;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 60rpx;
  text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1);
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30rpx;
}

.value-card {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20rpx;
  padding: 40rpx 30rpx;
  text-align: center;
  box-shadow: 0 15rpx 30rpx rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(10rpx);
  border: 1rpx solid rgba(255, 255, 255, 0.6);
  transition: all 0.4s ease;
  opacity: 0;
  transform: translateY(40rpx);
}

.value-card.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.value-card:hover {
  transform: translateY(-8rpx);
  box-shadow: 0 25rpx 50rpx rgba(0, 0, 0, 0.12);
}

.value-icon {
  font-size: 48rpx;
  margin-bottom: 20rpx;
  display: block;
}

.value-title {
  font-size: 28rpx;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 15rpx;
}

.value-desc {
  font-size: 24rpx;
  color: #666;
  line-height: 1.5;
}

/* 品牌愿景样式 */
.brand-vision {
  position: relative;
}

.vision-container {
  position: relative;
  background: linear-gradient(145deg, #4a90e2, #357abd);
  border-radius: 30rpx;
  padding: 60rpx 40rpx;
  overflow: hidden;
  box-shadow: 0 20rpx 40rpx rgba(74, 144, 226, 0.3);
}

.vision-content {
  position: relative;
  z-index: 2;
  text-align: center;
  color: white;
}

.vision-title {
  font-size: 40rpx;
  font-weight: bold;
  margin-bottom: 30rpx;
  text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.3);
}

.vision-text {
  font-size: 26rpx;
  line-height: 1.6;
  margin-bottom: 40rpx;
  opacity: 0.95;
}

.vision-highlight {
  padding: 20rpx 30rpx;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 25rpx;
  backdrop-filter: blur(10rpx);
  border: 1rpx solid rgba(255, 255, 255, 0.3);
}

.highlight-text {
  font-size: 24rpx;
  font-weight: 500;
  letter-spacing: 2rpx;
}

.vision-decoration {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.decoration-circle {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  animation: float 6s ease-in-out infinite;
}

.circle-1 {
  width: 100rpx;
  height: 100rpx;
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.circle-2 {
  width: 60rpx;
  height: 60rpx;
  top: 60%;
  right: 15%;
  animation-delay: 2s;
}

.circle-3 {
  width: 80rpx;
  height: 80rpx;
  bottom: 20%;
  left: 70%;
  animation-delay: 4s;
}

/* 品牌故事响应式设计 */
@media screen and (max-width: 750rpx) {
  .timeline-item {
    flex-direction: column !important;
    align-items: center;
  }

  .timeline-item:nth-child(even) .story-card {
    transform: translateY(40rpx);
  }

  .timeline-item:nth-child(even).animate-in .story-card {
    transform: translateY(0);
  }

  .timeline-node {
    margin: 0 0 30rpx 0;
  }

  .timeline-connector {
    height: 60rpx;
  }

  .story-card {
    max-width: 100%;
  }

  .values-grid {
    grid-template-columns: 1fr;
    gap: 20rpx;
  }

  .vision-container {
    padding: 40rpx 30rpx;
  }
}
/**品牌故事 */
.brand-story {
  background: #ffffff;
  padding: 80rpx 48rpx;
  color: #000000;
  position: relative;
}
.brand-story-title {
  font-size: 40rpx;
  font-weight: bold;
}
.brand-story-content {
  font-size: 26rpx;
  margin: 24rpx 0 81rpx 0;
}
.brand-story-decoration {
  position: absolute;
  right: 0;
  top: 16rpx;
  z-index: 0;
}
/**团队亮相 */
.teamappearance {
  padding: 40rpx 26rpx;
}
.teamappearance-title {
  color: #000000;
  font-size: 40rpx;
  font-weight: bold;
  margin-bottom: 30rpx;
}

/* 团队轮播图样式 */
.team-carousel {
  margin-top: 40rpx;
  width: 100%;
}
.team-swiper {
  width: 100%;
  height: 772rpx;
}
.team-swiper-item {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 420rpx;
  overflow: visible;
}
.team-member-card {
  width: 95%;
  height: 772rpx;
  background: #fff;
  border-radius: 24rpx;
  box-shadow: 0 8rpx 30rpx rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 36rpx 20rpx 24rpx 20rpx;
  margin: 0 10rpx;
  position: relative;
}
.member-avatar-wrapper {
  width: 620rpx;
  height: 630rpx;
  border-radius: 20rpx;
  overflow: hidden;
  margin-bottom: 24rpx;
  position: relative;
}
.member-avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20rpx;
}
.avatar-border {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 4rpx solid #764ba2;
  border-radius: 20rpx;
  pointer-events: none;
}
.member-info-wrapper {
  width: 100%;
  text-align: center;
}
.member-name-text {
  font-size: 32rpx;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 8rpx;
}
.member-position-text {
  font-size: 24rpx;
  color: #764ba2;
  margin-bottom: 8rpx;
}
.member-desc-text {
  font-size: 22rpx;
  color: #666;
  margin-bottom: 12rpx;
}
.member-skills {
  display: flex;
  flex-wrap: wrap;
  gap: 10rpx;
  justify-content: center;
  margin-top: 8rpx;
}
.skill-badge {
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  padding: 8rpx 16rpx;
  border-radius: 20rpx;
  font-size: 18rpx;
  font-weight: 500;
  box-shadow: 0 2rpx 6rpx rgba(102, 126, 234, 0.15);
}
.team-indicators {
  display: flex;
  justify-content: center;
  gap: 16rpx;
  margin-top: 18rpx;
}
.team-indicator-dot {
  width: 16rpx;
  height: 16rpx;
  border-radius: 50%;
  background: #e0e0e0;
  transition: background 0.3s;
}
.team-indicator-dot.active {
  background: #764ba2;
}

/* 团队亮相滑动样式优化 */
.teamappearance {
  padding: 40rpx 26rpx;
  background: #f8f9fa;
}

.teamappearance-title {
  color: #000000;
  font-size: 40rpx;
  font-weight: bold;
  margin-bottom: 30rpx;
  text-align: center;
}

.top-container {
  width: 100%;
  height: 420rpx; /* 设置固定高度 */
  white-space: nowrap;
  -webkit-overflow-scrolling: touch; /* iOS 平滑滚动 */
  scrollbar-width: none; /* Firefox 隐藏滚动条 */
  -ms-overflow-style: none; /* IE 隐藏滚动条 */
  display: block; /* 确保显示 */
}

.top-container::-webkit-scrollbar {
  display: none; /* Chrome/Safari 隐藏滚动条 */
}

.scroll-content {
  display: flex;
  padding: 0 10rpx;
  height: 100%;
}

.top {
  flex-shrink: 0;
  width: 280rpx; /* 固定卡片宽度 */
  margin-right: 20rpx;
  display: block; /* 确保显示 */
}

.top:last-child {
  margin-right: 20rpx; /* 保持最后一个卡片的右边距，确保滑动到底部有空间 */
}

/* 团队卡片样式 */
.team-card {
  background: #ffffff;
  border-radius: 16rpx;
  overflow: hidden;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  height: 400rpx;
  display: flex;
  flex-direction: column;
}

.team-card:hover {
  transform: translateY(-4rpx);
  box-shadow: 0 8rpx 30rpx rgba(0, 0, 0, 0.12);
}

.team-card-image {
  width: 100%;
  height: 200rpx;
  overflow: hidden;
  position: relative;
}

.member-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.team-card:hover .member-image {
  transform: scale(1.05);
}

.team-card-info {
  padding: 20rpx 16rpx;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.member-name {
  font-size: 28rpx;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 12rpx;
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.member-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6rpx;
  margin-bottom: 12rpx;
}

.tag-item {
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  padding: 4rpx 8rpx;
  border-radius: 12rpx;
  font-size: 20rpx;
  font-weight: 500;
  box-shadow: 0 2rpx 4rpx rgba(102, 126, 234, 0.2);
  white-space: nowrap;
}

.member-price {
  font-size: 24rpx;
  color: #e74c3c;
  font-weight: bold;
  text-align: center;
  padding: 8rpx;
  background: rgba(231, 76, 60, 0.1);
  border-radius: 8rpx;
}

/* 响应式设计 */
@media screen and (max-width: 750rpx) {
  .top {
    width: 260rpx;
  }

  .team-card {
    height: 380rpx;
  }

  .team-card-image {
    height: 180rpx;
  }

  .member-name {
    font-size: 26rpx;
  }

  .tag-item {
    font-size: 18rpx;
    padding: 3rpx 6rpx;
  }
}
</style>
