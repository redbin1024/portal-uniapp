<template>
  <view class="main">
    <view class="header" :class="{ 'header-with-bg': showHeaderBg }">
      <view class="title-wrapper">
        <view class="headLogo">
          <image
            class="logo"
            src="http://cdn.xiaodingdang1.com/2025/09/18/45411cdc8ffd4ca9a16fc436c85ae0e8.png"
            mode="aspectFit"
          />
        </view>
        <view class="title">天天拓客</view>
      </view>
    </view>
    <view class="container">
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
          :class="{
            'btn-animate': buttonsVisible,
            'btn-delay-1': buttonsVisible,
          }"
          @click="handleContactClick"
        >
          <image
            src="http://cdn.xiaodingdang1.com/2025/09/12/82c65b95ac1e4e29bc18d3efd67b0933.png"
          ></image>
        </button>
        <button
          class="contact-btn"
          :class="{
            'btn-animate': buttonsVisible,
            'btn-delay-2': buttonsVisible,
          }"
          @click="handleContactClick"
        >
          <image
            src="http://cdn.xiaodingdang1.com/2025/09/12/3f38644e6fec4136958afa513bd8c96c.png"
          ></image>
        </button>
        <button
          class="contact-btn"
          :class="{
            'btn-animate': buttonsVisible,
            'btn-delay-3': buttonsVisible,
          }"
          @click="handleContactClick"
        >
          <image
            src="http://cdn.xiaodingdang1.com/2025/09/12/29846ffbc5d54aaca318f5b1723fffff.png"
          ></image>
        </button>
      </view>
    </view>
    <view class="winthecustomer">
      <view class="winthecustomer-head">
        <view class="winthecustomer-head1">
          <image
            src="http://cdn.xiaodingdang1.com/2025/09/25/f938be0b9c4e417d8a35a0e441fc8962.png"
            style="width: 50rpx; height: 50rpx"
          ></image>
          <view
            class="winthecustomer-title"
            :class="{ 'title-fade-in': titleVisible }"
            >线上获客</view
          >
        </view>
      </view>
      <view class="winthecustomer-line">
        <image
          src="http://cdn.xiaodingdang1.com/2025/09/25/86d0493187254bbb9969aeca66046f29.png"
        ></image>
      </view>
    </view>
    <view class="winthecustomer">
      <view class="winthecustomer-head">
        <view class="winthecustomer-head1">
          <image
            src="http://cdn.xiaodingdang1.com/2025/09/25/1f1fa1d642064970832273565705bff0.png"
            style="width: 50rpx; height: 50rpx"
          ></image>
          <view
            class="winthecustomer-title"
            :class="{ 'title-fade-in': titleVisible }"
            >系统服务</view
          >
        </view>
      </view>
      <view class="winthecustomer-content">
        <view
          class="winthecustomer-content1"
          v-for="(item, index) in [1, 2, 3, 4, 5, 6]"
          :key="index"
          :class="{ 'content1-animate': content1Visible[index] }"
        >
          <image
            src="http://cdn.xiaodingdang1.com/2025/09/25/20c54857feda44eba2d1cd3eb1f9603c.png"
          ></image>
          <view class="winthecustomer-content2">谈单系统</view>
        </view>
      </view>
    </view>
    <view class="brand-story">
      <!-- <view class="brand-story-title">品牌故事</view>
      <view class="brand-story-content">
        <image
          src="http://cdn.xiaodingdang1.com/2025/09/17/3e714aab0c1044f3a6d9ad78dc856e63.png"
        ></image>
      </view> -->
      <!-- <view class="systemservice">
        <view class="systemservice-title">系统服务</view>
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
      </view> -->
      <view class="teamappearance">
        <view
          class="headContent"
          :class="{ 'headContent-animate': headContentVisible[0] }"
        >
          <view class="headLeft"></view>
          <view class="teamappearance-title">公司动态</view>
          <view class="headRight"></view>
        </view>
        <view class="teamappearance-content">
          <view
            v-for="(team, index) in teamList"
            :key="index"
            class="teamappearance-item"
          >
            <view class="teamappearance-item-image">
              <image :src="team.image"></image>
            </view>
            <view class="teamappearance-item-content">{{ team.content }}</view>
          </view>
        </view>
      </view>
    </view>
    <view class="brand-story">
      <view class="certificate">
        <view
          class="headContent"
          :class="{ 'headContent-animate': headContentVisible[1] }"
        >
          <view class="headLeft"></view>
          <view class="teamappearance-title">荣誉证书</view>
          <view class="headRight"></view>
        </view>
        <view class="certificate-list">
          <view
            v-for="(certificate, index) in certificateList"
            :key="index"
            class="certificate-item"
          >
            <image :src="certificate.image" mode="aspectFit"></image>
          </view>
        </view>
      </view>
    </view>
    <view class="businesspartner">
      <view
        class="headContent"
        :class="{ 'headContent-animate': headContentVisible[2] }"
      >
        <view class="headLeft"></view>
        <view class="teamappearance-title">合作商家</view>
        <view class="headRight"></view>
      </view>
      <view class="businesspartner-list">
        <view
          v-for="(partner, index) in businessPartnerList"
          :key="index"
          class="businesspartner-item"
        >
          <image :src="partner.image" mode="aspectFit"></image>
        </view>
      </view>
    </view>
    <view class="introduce">
      <view class="introduce-container">
        <view class="introduce-title1">天天拓客</view>
        <view class="introduce-title2">湖南省长沙市芙蓉区壹号座品A座613</view>
        <view class="introduce-title3"></view>
        <view class="introduce-title4">电话：073169557550</view>
      </view>
      <view class="introduce-container5">
        <image
          src="http://cdn.xiaodingdang1.com/2025/09/25/95725c97c3b24d469b529453c3206b7e.png"
        ></image>
        <view class="introduce-container6">扫码添加微信</view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { onPageScroll } from "@dcloudio/uni-app";

// 按钮动画状态
const buttonsVisible = ref(false);
// 标题动画状态
const titleVisible = ref(false);
// headContent 动画状态
const headContentVisible = ref({});
// winthecustomer-content1 动画状态
const content1Visible = ref([]);

// 页面加载完成后触发按钮动画
onMounted(() => {
  setTimeout(() => {
    buttonsVisible.value = true;
  }, 400); // 延迟400ms开始动画

  // 初始化时检查标题是否在视窗内
  setTimeout(() => {
    checkTitleVisibility();
    checkHeadContentVisibility();
    checkContent1Visibility();
    checkImageVisibility();
  }, 100);
});

// 图片弹出动画状态
const imagePopVisible = ref([]);

// 检查标题是否在视窗内的函数 - 适配 uni-app
const checkTitleVisibility = () => {
  // 如果动画已经触发过，就不再检查
  if (titleVisible.value) {
    return;
  }

  // 使用 uni.createSelectorQuery 来获取元素位置信息
  const query = uni.createSelectorQuery();
  query
    .selectAll(".winthecustomer-title")
    .boundingClientRect((rects) => {
      if (rects && rects.length > 0) {
        rects.forEach((rect, index) => {
          // 获取系统信息来获取窗口高度
          uni.getSystemInfo({
            success: (res) => {
              const windowHeight = res.windowHeight;
              // 当元素进入视窗时触发动画，提前触发点，增加延迟让动画更自然
              if (
                rect.top < windowHeight * 0.85 &&
                rect.bottom > 0 &&
                !titleVisible.value
              ) {
                // 添加延迟让每个标题依次出现
                setTimeout(() => {
                  titleVisible.value = true;
                }, index * 300); // 每个标题间隔300ms
              }
            },
          });
        });
      }
    })
    .exec();
};

// 检查 headContent 是否在视窗内的函数
const checkHeadContentVisibility = () => {
  const query = uni.createSelectorQuery();
  query
    .selectAll(".headContent")
    .boundingClientRect((rects) => {
      if (rects && rects.length > 0) {
        rects.forEach((rect, index) => {
          uni.getSystemInfo({
            success: (res) => {
              const windowHeight = res.windowHeight;
              // 当元素进入视窗时触发动画
              if (rect.top < windowHeight * 0.8 && rect.bottom > 0) {
                // 为每个 headContent 元素添加动画效果
                setTimeout(() => {
                  headContentVisible.value[index] = true;
                }, index * 300); // 每个元素间隔300ms
              }
            },
          });
        });
      }
    })
    .exec();
};

// 检查 winthecustomer-content1 是否在视窗内的函数
const checkContent1Visibility = () => {
  const query = uni.createSelectorQuery();
  query
    .selectAll(".winthecustomer-content1")
    .boundingClientRect((rects) => {
      if (rects && rects.length > 0) {
        rects.forEach((rect, index) => {
          uni.getSystemInfo({
            success: (res) => {
              const windowHeight = res.windowHeight;
              // 当元素进入视窗时触发动画
              if (rect.top < windowHeight * 1 && rect.bottom > 0) {
                // 为每个 content1 元素添加动画效果
                setTimeout(() => {
                  if (!content1Visible.value[index]) {
                    content1Visible.value[index] = true;
                  }
                }, index * 200); // 每个元素间隔200ms
              }
            },
          });
        });
      }
    })
    .exec();
};

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

// 团队数据
const teamList = ref([
  {
    image:
      "http://cdn.xiaodingdang1.com/2025/09/17/e7c6eb7643134423ab31c7726397b807.png",
    title: "销售部",
    content:
      '拥有超过10年的建筑经验，包括担任奥地利"蓝天组"建筑事务所的首席设计师(奥地利的Coophimmelblau)和Hernan Diaz Alonso在洛杉矶的Xefirotarch。2008年得南加州建筑学院建筑学硕士学位。',
  },
  {
    image:
      "http://cdn.xiaodingdang1.com/2025/09/17/3e714aab0c1044f3a6d9ad78dc856e63.png",
    title: "技术部",
    content:
      "专业的技术团队，拥有丰富的软件开发经验，致力于为客户提供最优质的技术解决方案。团队成员均具备扎实的技术功底和创新思维。",
  },
  {
    image:
      "http://cdn.xiaodingdang1.com/2025/09/17/dff756b4214e4fdb94a2a803a38a16fa.png",
    title: "运营部",
    content:
      "负责公司日常运营管理，拥有丰富的项目管理经验。致力于优化业务流程，提升工作效率，确保项目顺利进行。",
  },
  {
    image:
      "http://cdn.xiaodingdang1.com/2025/09/12/bcf4ff23413847129727a6a265fd2b34.png",
    title: "市场部",
    content:
      "专业的市场推广团队，深谙市场营销策略，具备敏锐的市场洞察力，为公司业务拓展提供强有力的支持。",
  },
]);

// 证书数据
const certificateList = ref([
  {
    image:
      "http://cdn.xiaodingdang1.com/2025/09/18/fd0961babb634f3b9fefb2f9ad8c0855.png",
    name: "优秀企业证书",
  },
  {
    image:
      "http://cdn.xiaodingdang1.com/2025/09/18/fd0961babb634f3b9fefb2f9ad8c0855.png",
    name: "技术创新奖",
  },
  {
    image:
      "http://cdn.xiaodingdang1.com/2025/09/18/fd0961babb634f3b9fefb2f9ad8c0855.png",
    name: "服务质量奖",
  },
  {
    image:
      "http://cdn.xiaodingdang1.com/2025/09/18/fd0961babb634f3b9fefb2f9ad8c0855.png",
    name: "行业领先奖",
  },
  {
    image:
      "http://cdn.xiaodingdang1.com/2025/09/18/fd0961babb634f3b9fefb2f9ad8c0855.png",
    name: "客户满意奖",
  },
]);

// 合作商家数据
const businessPartnerList = ref([
  {
    image:
      "http://cdn.xiaodingdang1.com/2025/09/18/cc70bc251d644d78866a0ad1e0ba546c.png",
    name: "合作伙伴1",
  },
  {
    image:
      "http://cdn.xiaodingdang1.com/2025/09/18/cc70bc251d644d78866a0ad1e0ba546c.png",
    name: "合作伙伴2",
  },
  {
    image:
      "http://cdn.xiaodingdang1.com/2025/09/18/cc70bc251d644d78866a0ad1e0ba546c.png",
    name: "合作伙伴3",
  },
  {
    image:
      "http://cdn.xiaodingdang1.com/2025/09/18/cc70bc251d644d78866a0ad1e0ba546c.png",
    name: "合作伙伴4",
  },
  {
    image:
      "http://cdn.xiaodingdang1.com/2025/09/18/cc70bc251d644d78866a0ad1e0ba546c.png",
    name: "合作伙伴5",
  },
  {
    image:
      "http://cdn.xiaodingdang1.com/2025/09/18/cc70bc251d644d78866a0ad1e0ba546c.png",
    name: "合作伙伴5",
  },
  {
    image:
      "http://cdn.xiaodingdang1.com/2025/09/18/cc70bc251d644d78866a0ad1e0ba546c.png",
    name: "合作伙伴5",
  },
  {
    image:
      "http://cdn.xiaodingdang1.com/2025/09/18/cc70bc251d644d78866a0ad1e0ba546c.png",
    name: "合作伙伴5",
  },
]);

// 轮播图相关
const currentIndex = ref(0);

// 滚动相关
const showHeaderBg = ref(false);

const onSwiperChange = (e) => {
  currentIndex.value = e.detail.current;
};

const goToSlide = (index) => {
  currentIndex.value = index;
};

const onBannerClick = (item, index) => {
  console.log("Banner clicked:", item, index);
};

const handleContactClick = () => {
  console.log("Contact clicked");
};

onPageScroll((e) => {
  showHeaderBg.value = e.scrollTop > 50;
  // 滚动时检查标题可见性
  checkTitleVisibility();
  // 滚动时检查 headContent 可见性
  checkHeadContentVisibility();
  // 滚动时检查 content1 可见性
  checkContent1Visibility();
  // 滚动时检查图片可见性
  checkImageVisibility();
});
</script>

<style lang="scss" scoped>
.main {
  background-color: #f7f7f7;
  min-height: 100vh;
}
.container {
  padding: 0 26rpx;
}

.header {
  padding: 110rpx 0rpx 30rpx 26rpx;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
  transition: background-color 0.3s ease;
}

.header-with-bg {
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10rpx);
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
}

.title-wrapper {
  display: flex;
  align-items: center;
}
.headLogo {
  border-radius: 100rpx;
  width: 62rpx;
  height: 62rpx;
}
.logo {
  width: 100%;
  height: 100%;
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
  border: none !important;
  background: transparent;
  transform: scale(0);
  opacity: 0;
  transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
.contact-btn image {
  width: 80rpx;
  height: 80rpx;
}

/* 按钮弹出动画 */
.btn-animate {
  transform: scale(1) !important;
  opacity: 1 !important;
}

.btn-delay-1 {
  transition-delay: 0.1s;
}

.btn-delay-2 {
  transition-delay: 0.3s;
}

.btn-delay-3 {
  transition-delay: 0.5s;
}

/* 按钮悬停效果 */
.contact-btn:hover {
  transform: scale(1.1);
}

.btn-animate:hover {
  transform: scale(1.1) !important;
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
  height: 391rpx;
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
/**线上获客 */
.brand-story {
  background: #ffffff;
  // padding: 80rpx 26rpx;
  color: #000000;
  margin-top: 80rpx;
}
.brand-story-title {
  font-size: 40rpx;
  font-weight: bold;
  text-align: center;
}
.brand-story-decoration {
  position: absolute;
  right: 0;
  top: 16rpx;
  z-index: 0;
}
.brand-story-content {
  width: 698rpx;
  height: 380rpx;
}
.brand-story-content image {
  width: 100%;
  height: 100%;
  margin-top: 38rpx;
}
/**团队亮相 */
.teamappearance {
  padding: 80rpx 0;
}
.teamappearance-title {
  color: #000000;
  font-size: 40rpx;
  font-weight: bold;
  text-align: center;
  margin: 0 20rpx;
}
.teamappearance-item-image {
  width: 440rpx;
  height: 260rpx;
}
.teamappearance-item-image image {
  width: 100%;
  height: 100%;
}
.teamappearance-content {
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 0 26rpx;
  gap: 20rpx;
  margin-top: 38rpx;

  /* 隐藏滚动条 */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.teamappearance-item {
  background: #f7f7f7;
  border-radius: 20rpx;
  flex-shrink: 0;
  width: 440rpx;
  margin-right: 20rpx;
  &:last-child {
    margin-right: 26rpx;
  }
}
.teamappearance-item-content {
  padding: 18rpx 18rpx;
  color: #3d3d3d;
  font-size: 22rpx;
}

.certificate {
  background: #ffffff;
  padding: 30rpx 0;
  margin-top: 38rpx;
}
.certificate-title {
  font-size: 40rpx;
  font-weight: bold;
  color: #000000;
  text-align: center;
  padding: 0 49rpx;
}
.certificate-list {
  margin-top: 40rpx;
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 0 49rpx;
  gap: 20rpx;

  /* 隐藏滚动条 */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.certificate-item {
  border: 1rpx solid #eeeeee;
  border-radius: 12rpx;
  width: 239rpx;
  height: 265rpx;
  flex-shrink: 0;
  background: #ffffff;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
  overflow: hidden;
  display: flex;
  flex-direction: column;

  &:last-child {
    margin-right: 49rpx;
  }
}
.certificate-item image {
  width: 100%;
  height: 265rpx;
  object-fit: cover;
}
/**合作商 */
.businesspartner {
  padding: 80rpx 0;
}
.businesspartner-list {
  margin-top: 40rpx;
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 0 49rpx;
  gap: 20rpx;
  justify-content: center;
  scroll-snap-type: x mandatory;

  /* 隐藏滚动条 */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.businesspartner-item {
  border-radius: 20rpx;
  width: 216rpx;
  height: 88rpx;
  flex-shrink: 0;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  scroll-snap-align: center;

  &:last-child {
    margin-right: 49rpx;
  }
}
.businesspartner-item image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
/**系统服务 */
.systemservice {
  margin-top: 100rpx;
}
.systemservice-title {
  color: #000000;
  font-size: 40rpx;
  font-weight: bold;
  text-align: center;
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
/**线上获客 */
.winthecustomer {
  margin-top: 60rpx;
}
.winthecustomer-head {
  height: 152rpx;
  background: url("http://cdn.xiaodingdang1.com/2025/09/25/7cf1afc487d04a8d834b1bc6aac793b6.png")
    no-repeat center;
  background-size: cover;
  display: flex;
}
.winthecustomer-head1 {
  height: 100rpx;
  display: flex;
  align-items: center;
  margin-left: 26rpx;
}

@keyframes popIn {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.winthecustomer-title {
  color: #ffffff;
  font-weight: bold;
  font-size: 40rpx;
  margin-left: 22rpx;
  opacity: 0;
  transform: translateY(-30rpx) scale(0.8);
  transition: all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.title-fade-in {
  opacity: 1 !important;
  transform: translateY(0) scale(1) !important;
  animation: slowFadeInUp 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  animation-fill-mode: forwards;
}

@keyframes slowFadeInUp {
  0% {
    opacity: 0;
    transform: translateY(-30rpx) scale(0.8);
  }
  25% {
    opacity: 0.3;
    transform: translateY(-15rpx) scale(0.9);
  }
  50% {
    opacity: 0.6;
    transform: translateY(-5rpx) scale(0.95);
  }
  75% {
    opacity: 0.85;
    transform: translateY(2rpx) scale(1.02);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.winthecustomer-line {
  background: linear-gradient(to bottom, #dfebfb 30%, #ffffff 70%);
  border-top-left-radius: 20rpx;
  border-top-right-radius: 20rpx;
  margin-top: -60rpx;
  padding: 38rpx 0 50rpx 0;
  width: 100%;
  text-align: center;
}
.winthecustomer-line image {
  width: 698rpx;
  height: 380rpx;
  border-radius: 20rpx;
}
.winthecustomer-content {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  background: linear-gradient(to bottom, #dfebfb 30%, #ffffff 70%);
  border-top-left-radius: 20rpx;
  border-top-right-radius: 20rpx;
  margin-top: -60rpx;
  padding-bottom: 50rpx;
}
.winthecustomer-content1 {
  width: 350rpx;
  background: #f2f6ff;
  margin-top: 38rpx;
  opacity: 0;
  transform: translateX(-60rpx);
  transition: all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
.content1-animate {
  opacity: 1 !important;
  transform: translateX(0) !important;
  animation: fadeInLeft 0.8s;
}
@keyframes fadeInLeft {
  0% {
    opacity: 0;
    transform: translateX(-60rpx);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
.winthecustomer-content1 image {
  width: 350rpx;
  height: 350rpx;
  border-radius: 20rpx;
}
.winthecustomer-content2 {
  width: 350rpx;
  padding: 20rpx 0;
  background: #f2f6ff;
  color: #3d3d3d;
  font-size: 32rpx;
  text-align: center;
  border-bottom-left-radius: 20rpx;
  border-bottom-right-radius: 20rpx;
}

.headContent {
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: translateY(20rpx);
  transition: all 0.6s ease-out;
}

.headContent.headContent-animate {
  opacity: 1;
  transform: translateY(0);
}
.headLeft {
  width: 142rpx;
  height: 5rpx;
  background: linear-gradient(
    90deg,
    rgba(216, 216, 216, 0) 0%,
    rgba(51, 51, 51, 0.5) 100%
  );
  border-radius: 0rpx 0rpx 0rpx 0rpx;
}
.headRight {
  width: 142rpx;
  height: 5rpx;
  background: linear-gradient(
    90deg,
    rgba(51, 51, 51, 0.5) 0%,
    rgba(216, 216, 216, 0) 100%
  );
  border-radius: 0rpx 0rpx 0rpx 0rpx;
}

.introduce {
  background: #ffffff;
  padding: 63rpx 44rpx;
  display: flex;
  justify-content: space-between;
}
.introduce-title1 {
  color: #3d3d3d;
  font-size: 21rpx;
  font-weight: bold;
}
.introduce-title2 {
  color: #000000;
  font-size: 18rpx;
  margin-top: 8rpx;
}
.introduce-title3 {
  border: 1rpx solid #e2e2e2;
  margin: 24rpx 0;
}
.introduce-title4 {
  color: #000000;
  font-size: 21rpx;
}
.introduce-container5 {
  text-align: center;
}
.introduce-container5 image {
  width: 152rpx;
  height: 152rpx;
}
.introduce-container6 {
  color: #000000;
  font-size: 18rpx;
  margin-top: 18rpx;
}

wx-button {
  border: none !important;
}
</style>
