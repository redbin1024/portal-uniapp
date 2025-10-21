<template>
  <view class="main" :class="{ 'no-scroll': showPreview }">
    <!-- <view class="header" :class="{ 'header-with-bg': showHeaderBg }">
      <view class="title-wrapper">
        <view class="headLogo">
          <image
            class="logo"
            src="http://cdn.xiaodingdang1.com/2025/09/18/45411cdc8ffd4ca9a16fc436c85ae0e8.png"
            mode="aspectFit"
          />
        </view>
        <view class="title">{{ enterpriseList.enterpriseName }}</view>
      </view>
    </view> -->
    <view
      class="container"
      :style="{
        backgroundImage: `url(${enterpriseList.enterpriseLogo})`,
      }"
    >
      <view style="height: 580rpx"></view>
      <!-- 轮播图组件 -->
      <!-- <view class="slideshow">
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
            v-for="(item, index) in enterpriseList.bannerImages"
            :key="index"
            class="swiper-item"
          >
            判断是图片还是视频
            <view v-if="isVideo(item)" class="media-container">
              <video
                :id="'bannerVideo' + index"
                :src="item"
                class="banner-video"
                :autoplay="index === currentIndex"
                controls
                object-fit="cover"
                @click="onMediaClick(item, index, 'video')"
              />
              <view
                class="media-overlay"
                @click="onMediaClick(item, index, 'video')"
              >
                注释
                <view class="play-icon">
                  <image
                    src="http://cdn.xiaodingdang1.com/2025/09/29/e0672146e9f640ff97debb0b896d2d77.png"
                  ></image>
                </view>
              </view>
            </view>
            <view v-else class="media-container">
              <image
                :src="item"
                class="banner-image"
                mode="aspectFill"
                @click="onMediaClick(item, index, 'image')"
              />
            </view>
          </swiper-item>
        </swiper>
      </view> -->
      <view class="businesspartnernew">
        <view class="winthecustomer-head">
          <view class="winthecustomer-head1">
            <view class="winthecustomer-title">合作商家</view>
            <view class="winthecustomer-title1">Partner Merchant</view>
          </view>
        </view>
        <view class="businesspartnernew-content">
          <view
            class="businesspartnernew-item"
            v-for="(item, index) in caseDataList"
            :key="index"
          >
            <video
              :id="'bannerVideo' + index"
              :src="item"
              class="banner-video"
              :autoplay="index === currentIndex"
              :muted="true"
              controls
              object-fit="cover"
              @click="onMediaClick(item, index, 'video')"
              style="border-radius: 20rpx"
            />
          </view>
        </view>
        <view class="viewmore" @click="viewmore">
          <view>查看更多</view>
          <view>></view>
        </view>
        <view
          class="businesspartnernew-image"
          @click="previewSingleImage(enterpriseList.bannerImages[0])"
        >
          <image :src="enterpriseList.bannerImages[0]"></image>
        </view>
      </view>
      <view id="win-the-customer">
        <view class="winthecustomer">
          <view class="winthecustomer-head">
            <view class="winthecustomer-head1">
              <view class="winthecustomer-title">产品服务</view>
              <view class="winthecustomer-title1">Product Service</view>
            </view>
          </view>
          <view @click="nextDetile()">
            <view class="winthecustomer-line">
              <image
                :src="serviceList?.serviceImage?.[0]"
                v-if="serviceList?.serviceImage?.[0]"
                mode="white"
              ></image>
            </view>
            <view class="winthecustomer-line-bottom">
              <view class="winthecustomer-title2">抖音线上获客</view>
              <view class="winthecustomer-line-bottom1">
                <view class="winthecustomer-title3">了解详情</view>
                <image
                  src="http://cdn.xiaodingdang1.com/2025/10/21/71d280df9062455ca2b23bd5ecda6223.png"
                  style="width: 24rpx; height: 24rpx"
                  mode=""
                />
              </view>
            </view>
          </view>
        </view>
        <view id="winthecustomer">
          <view class="winthecustomer-content">
            <view
              class="winthecustomer-content1"
              v-for="(item, index) in serviceLists"
              :key="index"
              @click="next(item)"
            >
              <image :src="item.serviceImage"></image>
              <view class="winthecustomer-content2">
                <view class="winthecustomer-content2-1">
                  {{ item.serviceName }}
                </view>
                <view class="winthecustomer-content2-2">了解详情</view>
              </view>
            </view>
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
        <!-- <view class="teamappearance">
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
              v-for="(team, index) in companyNewsList"
              :key="index"
              class="teamappearance-item"
              @click="goToDetails(team)"
            >
              <view class="teamappearance-item-image">
                <image
                  :src="team.newsImages?.[0]"
                  v-if="team.newsImages?.[0]"
                ></image>
              </view>
              <view class="teamappearance-item-content">{{
                team.newsTitle
              }}</view>
            </view>
          </view>
        </view> -->
      </view>
      <view class="brand-story">
        <view class="certificate">
          <view class="winthecustomer-head">
            <view class="winthecustomer-head1">
              <view class="winthecustomer-title">荣誉证书</view>
              <view class="winthecustomer-title1">Certificate of Honor</view>
            </view>
          </view>
          <view class="certificate-list">
            <view class="certificate-scroll-container">
              <view class="certificate-double-row">
                <view class="certificate-row">
                  <view
                    v-for="(certificate, index) in getFirstRowCertificates(
                      enterpriseList.honorCertificates
                    )"
                    :key="'row1-' + index"
                    class="certificate-item"
                  >
                    <image :src="certificate" mode="aspectFit"></image>
                  </view>
                </view>
                <view
                  class="certificate-row"
                  v-if="
                    getSecondRowCertificates(enterpriseList.honorCertificates)
                      .length > 0
                  "
                >
                  <view
                    v-for="(certificate, index) in getSecondRowCertificates(
                      enterpriseList.honorCertificates
                    )"
                    :key="'row2-' + index"
                    class="certificate-item"
                  >
                    <image :src="certificate" mode="aspectFit"></image>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>

      <view class="introduce">
        <view class="introduce-container">
          <view class="introduce-title1">{{
            enterpriseList.enterpriseName
          }}</view>
          <view class="introduce-title2">{{
            enterpriseList.enterpriseAddress
          }}</view>
          <view class="introduce-title3"></view>
          <view class="introduce-title4"
            >电话：{{ enterpriseList.contactPhone }}</view
          >
        </view>
        <view class="introduce-container5">
          <image :src="enterpriseList.qrCode"></image>
          <view class="introduce-container6">扫码添加微信</view>
        </view>
      </view>
    </view>

    <!-- 全屏预览组件 -->
    <view
      v-if="showPreview"
      class="preview-modal"
      :class="{ 'video-fullscreen': isVideoFullscreen }"
      @click="handlePreviewModalClick"
    >
      <!-- 媒体内容 -->
      <view class="preview-content">
        <video
          v-if="previewMedia.type === 'video'"
          :src="previewMedia.src"
          class="preview-video"
          controls
          autoplay
          :poster="getVideoPoster(previewMedia.src)"
          :show-fullscreen-btn="true"
          @fullscreenchange="onFullscreenChange"
          :id="'preview-video-' + previewMedia.index"
        />
        <image
          v-else
          :src="previewMedia.src"
          class="preview-image"
          mode="aspectFit"
        />
        <view class="arrows">
          <view class="leftarrows" @click.stop="prevMedia"
            ><image
              src="http://cdn.xiaodingdang1.com/2025/09/29/936dbb6c2ac74e06a550872104bd2231.png"
            ></image
          ></view>
          <view class="rightarrows" @click.stop="nextMedia"
            ><image
              src="http://cdn.xiaodingdang1.com/2025/09/29/3a9d97e8cbf947aaa810020e259a23b8.png"
            ></image
          ></view>
        </view>
      </view>
    </view>

    <!-- 客服按钮 -->
    <view class="customer-service-btn">
      <image
        src="http://cdn.xiaodingdang1.com/2025/09/29/84932e513ebd49d093825177c28edf83.png"
        mode="aspectFit"
        @click="handleCustomerServiceClick"
      />
    </view>
  </view>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { onPageScroll } from "@dcloudio/uni-app";
import {
  getEnterpriseList,
  getServiceList,
  getCompanyNewsList,
  getcaseList,
} from "@/api/activity.js";

// 标题动画状态
const titleVisible = ref(false);
// headContent 动画状态
const headContentVisible = ref({});
// winthecustomer-content1 动画状态
const content1Visible = ref([]);
const caseDataList = ref([]);
//查看更多
const viewmore = () => {
  uni.navigateTo({
    url: "/pages/secondary/businesspartner/index",
  });
};
//查询商家案例列表
const caseList = async () => {
  try {
    const response = await getcaseList({
      pageSize: 9,
      pageNum: 1,
    });
    console.log("企业列表数据:", response);
    if (
      response &&
      response.rows &&
      Array.isArray(response.rows) &&
      response.rows.length > 0
    ) {
      let data = [];
      for (let i = 0; i < response.rows.length; i++) {
        data.push(response.rows[i].caseImages[0]);
      }
      caseDataList.value = data;
    }
  } catch (error) {
    console.error("获取企业列表失败:", error);
    uni.showToast({
      title: "获取企业列表失败",
      icon: "none",
    });
  }
};
//查询公司动态列表
const fetchCompanyNewsList = async () => {
  try {
    const response = await getCompanyNewsList({
      pageSize: 10,
      pageNum: 1,
      type: 0,
    });
    console.log("企业列表数据:", response);
    if (
      response &&
      response.rows &&
      Array.isArray(response.rows) &&
      response.rows.length > 0
    ) {
      companyNewsList.value = response.rows;
    }
  } catch (error) {
    console.error("获取企业列表失败:", error);
    uni.showToast({
      title: "获取企业列表失败",
      icon: "none",
    });
  }
};
const nextDetile = (item) => {
  try {
    // const itemStr = JSON.stringify(item);
    // uni.navigateTo({
    //   url: "/pages/customer/index?item=" + encodeURIComponent(itemStr),
    // });
    uni.switchTab({
      url: "/pages/secondary/winthecustomer/index",
    });
  } catch (error) {
    console.error("序列化参数失败:", error);
    uni.showToast({
      title: "参数传递失败",
      icon: "none",
    });
  }
};
//查询服务信息列表
const fetchServiceList = async () => {
  try {
    const response = await getServiceList({
      pageSize: 5,
      pageNum: 1,
    });
    console.log("企业列表数据:", response);
    if (
      response &&
      response.rows &&
      Array.isArray(response.rows) &&
      response.rows.length > 0
    ) {
      serviceList.value = response.rows[0];
      serviceLists.value = response.rows.slice(1);
    }
  } catch (error) {
    console.error("获取企业列表失败:", error);
    uni.showToast({
      title: "获取企业列表失败",
      icon: "none",
    });
  }
};
// 获取企业列表数据
const fetchEnterpriseList = async () => {
  try {
    const response = await getEnterpriseList({
      pageSize: 10,
      pageNum: 1,
    });
    console.log("企业列表数据:", response);
    if (
      response &&
      response.rows &&
      Array.isArray(response.rows) &&
      response.rows.length > 0
    ) {
      enterpriseList.value = response.rows[0];
    }
  } catch (error) {
    console.error("获取企业列表失败:", error);
    uni.showToast({
      title: "获取企业列表失败",
      icon: "none",
    });
  }
};
/**
 * 跳转到公司动态详情页面并传递item数据
 */
const goToDetails = (item) => {
  uni.navigateTo({
    url:
      "/pages/firmdynamicdetails/index?item=" +
      encodeURIComponent(JSON.stringify(item)),
  });
};
// 页面加载完成后触发按钮动画
onMounted(() => {
  // 获取企业列表数据
  fetchEnterpriseList();
  //查询服务信息列表
  fetchServiceList();
  //查询公司动态列表
  fetchCompanyNewsList();
  caseList();
});

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

// 企业列表数据
const enterpriseList = ref([]);
//查询服务信息列表
const serviceList = ref([]);
const serviceLists = ref([]);
//查询公司动态列表
const companyNewsList = ref([]);
// 轮播图相关
const currentIndex = ref(0);

// 滚动相关
const showHeaderBg = ref(false);

const onSwiperChange = (e) => {
  currentIndex.value = e.detail.current;

  // 如果当前项是视频，则自动播放
  const currentItem = caseDataList.value[currentIndex.value];
  if (isVideo(currentItem)) {
    // 延迟一小段时间确保DOM已更新再播放视频
    setTimeout(() => {
      const videoContext = uni.createVideoContext(
        "bannerVideo" + currentIndex.value
      );
      videoContext.play();
    }, 100);
  }
};

const goToSlide = (index) => {
  currentIndex.value = index;
};

// 媒体预览相关状态
const showPreview = ref(false);
const isVideoFullscreen = ref(false);
const previewMedia = ref({
  src: "",
  type: "image", // 'image' 或 'video'
  index: 0,
});

// 判断是否为视频文件
const isVideo = (url) => {
  if (!url) return false;
  const videoExtensions = [
    ".mp4",
    ".webm",
    ".ogg",
    ".mov",
    ".avi",
    ".wmv",
    ".flv",
    ".mkv",
  ];
  const urlLower = url.toLowerCase();
  return videoExtensions.some((ext) => urlLower.includes(ext));
};

// 获取视频封面图
const getVideoPoster = (videoUrl) => {
  // 确保 videoUrl 是字符串类型
  if (typeof videoUrl !== "string") {
    console.warn("videoUrl is not a string:", videoUrl);
    return "";
  }

  // 这里可以返回视频的封面图，如果没有可以返回默认图片
  return videoUrl.replace(
    /\.(mp4|webm|ogg|mov|avi|wmv|flv|mkv)$/i,
    "_poster.jpg"
  );
};

// 媒体点击事件
const onMediaClick = (item, index, type) => {
  console.log("Media clicked:", item, index, type);
  previewMedia.value = {
    src: item,
    type: type,
    index: index,
  };
  showPreview.value = true;
};

// 预览企业图片
const previewBusinessImage = () => {
  if (
    enterpriseList.value &&
    enterpriseList.value.bannerImages &&
    enterpriseList.value.bannerImages.length > 0
  ) {
    previewMedia.value = {
      src: enterpriseList.value.bannerImages[0],
      type: "image",
      index: 0,
    };
    showPreview.value = true;
  }
};

// 关闭预览
const closePreview = () => {
  // 如果视频正在全屏，不关闭预览
  if (isVideoFullscreen.value) {
    return;
  }
  showPreview.value = false;
};

// 处理视频全屏状态变化
const onFullscreenChange = (e) => {
  console.log("视频全屏状态变化:", e);
  const isEnteringFullscreen = !!(
    e &&
    e.detail &&
    (e.detail.fullScreen || e.detail.fullscreen)
  );

  isVideoFullscreen.value = isEnteringFullscreen;

  if (isEnteringFullscreen) {
    console.log("视频进入全屏，保持showPreview显示");
  } else {
    console.log("视频退出全屏");
  }
};

// 处理预览模态框点击事件
const handlePreviewModalClick = (e) => {
  // 如果视频正在全屏，不关闭预览
  if (isVideoFullscreen.value) {
    console.log("视频全屏中，不关闭预览");
    return;
  }
  closePreview();
};

// 切换到上一个媒体
const prevMedia = () => {
  const currentIndex = previewMedia.value.index;
  const newIndex =
    currentIndex > 0 ? currentIndex - 1 : caseDataList.value.length - 1;
  const newSrc = caseDataList.value[newIndex];
  previewMedia.value = {
    src: newSrc,
    type: isVideo(newSrc) ? "video" : "image",
    index: newIndex,
  };
};

// 切换到下一个媒体
const nextMedia = () => {
  const currentIndex = previewMedia.value.index;
  const newIndex =
    currentIndex < caseDataList.value.length - 1 ? currentIndex + 1 : 0;
  const newSrc = caseDataList.value[newIndex];
  previewMedia.value = {
    src: newSrc,
    type: isVideo(newSrc) ? "video" : "image",
    index: newIndex,
  };
};
//预览大图
const previewSingleImage = (bannerImages) => {
  let urls = [bannerImages];
  uni.previewImage({
    urls: urls,
    current: 0,
    indicator: "number",
    loop: false,
  });
};
// 跳转到指定媒体
const goToMedia = (index) => {
  const newSrc = caseDataList.value[index];
  previewMedia.value = {
    src: newSrc,
    type: isVideo(newSrc) ? "video" : "image",
    index: index,
  };
};

// 打电话功能
const handlePhoneCall = () => {
  uni.makePhoneCall({
    phoneNumber: this.enterpriseList.contactPhone, // 使用页面中显示的电话号码
    success: () => {
      console.log("拨打电话成功");
    },
    fail: (err) => {
      console.error("拨打电话失败:", err);
      uni.showToast({
        title: "拨打电话失败",
        icon: "none",
      });
    },
  });
};

// 定位导航功能
const handleNavigation = () => {
  console.log("Navigation clicked");
  uni.openLocation({
    latitude: 28.1941, // 长沙市芙蓉区的大概坐标
    longitude: 113.0116,
    name: "天天拓客",
    address: "湖南省长沙市芙蓉区壹号座品A座613",
    scale: 18,
    success: () => {
      console.log("打开地图成功");
    },
    fail: (err) => {
      console.error("打开地图失败:", err);
      uni.showToast({
        title: "打开地图失败",
        icon: "none",
      });
    },
  });
};
const next = (item) => {
  try {
    const itemStr = JSON.stringify(item);
    uni.navigateTo({
      url: "/pages/customer/index?item=" + encodeURIComponent(itemStr),
    });
  } catch (error) {
    console.error("序列化参数失败:", error);
    uni.showToast({
      title: "参数传递失败",
      icon: "none",
    });
  }
};
const handleContactClick = () => {
  console.log("Contact clicked");
};

// 客服按钮点击事件
const handleCustomerServiceClick = () => {
  console.log("Customer service clicked");
  // 这里可以添加客服相关的逻辑，比如跳转到客服页面或打开客服对话框
};

// 获取第一排证书数据
const getFirstRowCertificates = (certificates) => {
  if (!certificates || !Array.isArray(certificates)) return [];
  return certificates.filter((_, index) => index % 2 === 0);
};

// 获取第二排证书数据
const getSecondRowCertificates = (certificates) => {
  if (!certificates || !Array.isArray(certificates)) return [];
  return certificates.filter((_, index) => index % 2 === 1);
};

// 获取第一排合作商家数据
const getFirstRowPartners = (partners) => {
  if (!partners || !Array.isArray(partners)) return [];
  return partners.filter((_, index) => index % 2 === 0);
};

// 获取第二排合作商家数据
const getSecondRowPartners = (partners) => {
  if (!partners || !Array.isArray(partners)) return [];
  return partners.filter((_, index) => index % 2 === 1);
};

onPageScroll((e) => {});
</script>

<style lang="scss" scoped>
.main {
  background-color: #f7f7f7;
  min-height: 100vh;
}

.main.no-scroll {
  overflow: hidden;
  height: 100vh;
  position: fixed;
  width: 100%;
}
.container {
  width: 100%;
  height: 600rpx;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
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

// .company-banner {
//   background-image: url("http://cdn.xiaodingdang1.com/2025/09/27/9838f69dbc1c4ded945f24358ae5424e.jpg");
//   background-size: cover;
//   background-position: center;
//   background-repeat: no-repeat;
//   padding: 60rpx 0;
//   width: 100%;
// }

.company-info {
  // background: rgba(255, 255, 255, 0.9);
  border-radius: 20rpx;
  padding: 40rpx 30rpx;
  margin: 0 26rpx;
  backdrop-filter: blur(10rpx);
  text-align: center;
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
  font-size: 28rpx;
  color: #000000;
  text-align: center;
  margin-top: 50rpx;
}

/* 按钮样式 */
.company-btn {
  width: 60%;
  display: flex;
  margin-top: 80rpx;
  justify-content: space-between;
  margin: 60rpx auto;
}
.company-btn1 {
  display: flex;
  justify-content: center;
  width: 20%;
}
.contact-btn {
  width: 80rpx;
  height: 80rpx;
  padding: 0;
  margin: 0;
  border: none !important;
  border-radius: 0 !important;
  outline: none !important;
  box-shadow: none !important;
  background: transparent;
  box-shadow: 0 8rpx 30rpx rgba(0, 0, 0, 0.1);
}

.contact-btn::after {
  border: none !important;
}
.contact-btn image {
  width: 80rpx;
  height: 80rpx;
}

/* 按钮悬停效果 */
.contact-btn:hover {
  transform: scale(1.1);
}

/* 轮播图样式 */
.slideshow {
  border-radius: 32rpx;
  overflow: hidden;
  position: relative;
  padding: 26rpx 26rpx;
}

.swiper-container {
  width: 100%;
  height: 391rpx;
  border-radius: 32rpx;
}

.swiper-item {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 32rpx;
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
  // margin-top: 80rpx;
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
  background: #f4f5fa;
  padding: 30rpx 26rpx;
  // margin-top: 38rpx;
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
}

.certificate-scroll-container {
  overflow-x: auto;
  scroll-behavior: smooth;

  /* 隐藏滚动条 */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.certificate-double-row {
  display: flex;
  flex-direction: column;
  width: max-content;
}

.certificate-row {
  display: flex;
  gap: 0;
  &:last-child {
    margin-bottom: 0;
  }
}

.certificate-item {
  width: 239rpx;
  height: 265rpx;
  flex-shrink: 0;
  background: #ffffff;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  margin: 16rpx 16rpx;
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
  padding: 0 49rpx;
  overflow-x: auto;
  scroll-behavior: smooth;

  /* 隐藏滚动条 */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.businesspartner-row {
  display: flex;
  gap: 20rpx;
  margin-bottom: 20rpx;
  width: max-content;

  &:last-child {
    margin-bottom: 0;
  }
}

.businesspartner-item {
  border-radius: 20rpx;
  width: 216rpx;
  height: 88rpx;
  flex-shrink: 0;
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
#win-the-customer {
  background: linear-gradient(to bottom, #ffffff 30%, #3351e2 70%);
  padding: 0 24rpx;
}
#winthecustomer {
  margin-top: 88rpx;
}
.winthecustomer {
  // margin-top: 60rpx;
}
.winthecustomer-head {
  display: flex;
}
.winthecustomer-head1 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
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
  color: #000000;
  font-weight: bold;
  font-size: 40rpx;
}
.winthecustomer-title1 {
  color: #d6d4d4;
  font-size: 28rpx;
}
.winthecustomer-line {
  // border-top-left-radius: 20rpx;
  // border-top-right-radius: 20rpx;
  padding: 24rpx 0 0rpx 0;
  width: 100%;
  text-align: center;
}
.winthecustomer-line-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  padding: 28rpx 28rpx;
  border-bottom-left-radius: 20rpx;
  border-bottom-right-radius: 20rpx;
}
.winthecustomer-line-bottom1 {
  display: flex;
  background: #3552e3;
  align-items: center;
  width: 164rpx;
  height: 56rpx;
  border-radius: 100rpx;
  justify-content: center;
}
.winthecustomer-title3 {
  font-size: 24rpx;
  color: #ffffff;
}
.winthecustomer-title2 {
  color: #000000;
  font-size: 32rpx;
  font-weight: bold;
}
.winthecustomer-line image {
  width: 698rpx;
  height: 380rpx;
  border-top-left-radius: 20rpx;
  border-top-right-radius: 20rpx;
}
.winthecustomer-content {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20rpx;
  // border-top-left-radius: 20rpx;
  // border-top-right-radius: 20rpx;
  margin-top: -60rpx;
  padding: 0 0rpx 50rpx 0rpx;
}
.winthecustomer-content1 {
  width: calc(49% - 10rpx);
  background: #f2f6ff;
  margin-top: 38rpx;
  border-radius: 20rpx;
}
.winthecustomer-content1 image {
  width: 100%;
  height: 350rpx;
  border-top-left-radius: 20rpx;
  border-top-right-radius: 20rpx;
}
.winthecustomer-content2 {
  width: 100%;
  padding: 20rpx 0;
  // background: #f2f6ff;

  text-align: center;
  border-bottom-left-radius: 20rpx;
  border-bottom-right-radius: 20rpx;
  display: flex;
  justify-content: space-between;
}
.winthecustomer-content2-1 {
  color: #000000;
  font-size: 28rpx;
  margin-left: 24rpx;
}
.winthecustomer-content2-2 {
  width: 112rpx;
  height: 44rpx;
  background: #3552e3;
  border-radius: 100rpx;
  color: #ffffff;
  font-size: 20rpx;
  line-height: 44rpx;
  text-align: center;
  margin-right: 24rpx;
}
.headContent {
  display: flex;
  align-items: center;
  justify-content: center;
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

/* 媒体容器样式 */
.media-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.banner-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.media-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  cursor: pointer;
}

.play-icon {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.play-icon image {
  width: 100%;
  height: 100%;
}

.preview-icon {
  position: absolute;
  top: 20rpx;
  right: 20rpx;
  width: 40rpx;
  height: 40rpx;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.icon-text {
  font-size: 20rpx;
  color: white;
}

/* 全屏预览样式 */

.preview-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 1000;
}

/* 视频全屏时可调整z-index，防止被原生全屏遮挡 */
.preview-modal.video-fullscreen {
  z-index: 9998;
}
.preview-content {
  width: 100%;
  height: 100%;
  position: relative;
}
.preview-video {
  width: 100%;
  height: 100%;
}
.preview-image {
  width: 100%;
  height: 100%;
}
.arrows {
  position: fixed;
  top: 50%;
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.leftarrows image {
  width: 100rpx;
  height: 100rpx;
}
.rightarrows image {
  width: 100rpx;
  height: 100rpx;
}

/* 客服按钮样式 */
.customer-service-btn {
  position: fixed;
  right: 0;
  bottom: 200rpx;
  width: 160rpx;
  height: 160rpx;
  z-index: 999;
  cursor: pointer;
}

.customer-service-btn image {
  width: 160rpx;
  height: 160rpx;
}

/**合作商家 */
.businesspartnernew {
  background: #ffffff;
  margin-top: -20rpx;
  border-top-right-radius: 52rpx;
  border-top-left-radius: 52rpx;
  padding: 46rpx 26rpx;
}
.businesspartnernew-content {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-top: 24rpx;
}
.businesspartnernew-item {
  width: 224rpx;
  height: 340rpx;
  border-radius: 20rpx;
}
.businesspartnernew-image {
  width: 100%;
  height: 1440rpx;
}
.businesspartnernew-image image {
  width: 100%;
  height: 100%;
}
.viewmore {
  display: flex;
  justify-content: center;
  background: #f3f5fb;
  border-radius: 8rpx;
  width: 100%;
  height: 72rpx;
  color: #313131;
  font-size: 30rpx;
  line-height: 72rpx;
  margin: 28rpx 0 60rpx 0;
}
</style>
