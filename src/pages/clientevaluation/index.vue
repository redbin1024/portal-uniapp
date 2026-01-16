<template>
  <view class="client-evaluation-page">
    <!-- 内容区域 -->
    <view class="content-area">
      <!-- 加载状态 -->
      <view v-if="loading" class="loading-container">
        <text class="loading-text">加载中...</text>
      </view>

      <!-- 瀑布流列表 -->
      <view v-else class="waterfall-container">
        <view class="teamappearance">
          <view class="teamappearance-content">
            <view
              v-for="(team, index) in columnsList"
              :key="index"
              class="teamappearance-item"
              @tap="handleCardClick(team)"
            >
              <view class="teamappearance-item-image">
                <!-- <image
                  :src="
                    Array.isArray(team.newsImages)
                      ? team.newsImages[0]
                      : team.newsImages
                  "
                  v-if="team.newsImages?.[0]"
                  @load="onImageLoad(team.id || team.newsId, 0, index)"
                  @tap.stop="handleMediaClick(team, 'image')"
                ></image> -->
                <image
                  :src="
                    Array.isArray(team.newsImages)
                      ? team.newsImages[0]
                      : team.newsImages
                  "
                  v-if="team.newsImages?.[0]"
                  @load="onImageLoad(team.id || team.newsId, 0, index)"
                ></image>
              </view>
              <view class="teamappearance-item-content">
                <view class="teamappearance-item-content1">{{
                  team.newsTitle
                }}</view>
                <!-- <view class="teamappearance-item-content2">{{
                  team.newsTitle
                }}</view> -->
              </view>
            </view>
          </view>
        </view>
        <!-- 左列 -->
        <view class="listData" v-if="columns.length > 0">
          <view class="listData-title">精选视频</view>
          <view class="waterfall-column">
            <view
              v-for="(item, index) in columns"
              :key="`left-${item.id || item.newsId || index}`"
              class="card-item"
            >
              <view class="image-wrapper">
                <!-- 视频 -->
                <video
                  :id="`video-${item.id || item.newsId}`"
                  :src="item.newsImages[0]"
                  class="main-video"
                  controls
                  preload="metadata"
                  playsinline
                  webkit-playsinline
                  x5-video-player-type="h5"
                  x5-video-player-fullscreen="true"
                  x5-video-orientation="portrait"
                  x5-playsinline="true"
                  x5-video-ignore-metadata="true"
                  object-fit="cover"
                  :show-fullscreen-btn="true"
                  :show-play-btn="true"
                  :show-center-play-btn="true"
                  :enable-play-gesture="true"
                  :poster="item.poster || ''"
                  @loadedmetadata="
                    onVideoLoad(item.id || item.newsId, 0, index)
                  "
                  @error="onVideoError(item.id || item.newsId, 0, index)"
                  @canplay="onVideoCanPlay(item.id || item.newsId, 0, index)"
                  @tap.stop="handleVideoTap"
                  @fullscreenchange="onVideoFullscreenChange"
                  @play="onVideoPlay"
                  @pause="onVideoPause"
                  @ended="onVideoEnded"
                  @click="onVideoClick"
                >
                  <!-- <view class="media-type-indicator">
                  <view class="play-icon">
                    <text class="play-symbol">▶</text>
                  </view>
                </view> -->
                </video>

                <!-- 全屏退出按钮 -->
                <!-- <view
                v-if="
                  currentFullscreenVideoId === `video-${item.id || item.newsId}`
                "
                class="fullscreen-exit-btn"
                @tap.stop="exitFullscreen"
              >
                <text class="exit-icon">✕</text>
              </view> -->

                <!-- 调试信息 - 临时显示 -->
                <view v-if="currentFullscreenVideoId" class="debug-info">
                  <text>全屏ID: {{ currentFullscreenVideoId }}</text>
                  <text>当前ID: video-{{ item.id || item.newsId }}</text>
                </view>
                <!-- 全屏遮罩层，点击可退出全屏 -->
                <view
                  v-if="
                    currentFullscreenVideoId ===
                    `video-${item.id || item.newsId}`
                  "
                  class="fullscreen-overlay"
                  @tap.stop="exitFullscreen"
                >
                </view>
              </view>
              <!-- 标题信息 -->
              <view class="info-bar">
                <text class="card-title">{{
                  item.newsTitle || "暂无标题"
                }}</text>
              </view>
            </view>
          </view>
        </view>
        <!-- <view class="waterfall-column">
          <view
            v-for="(item, index) in columnsList"
            :key="`left-${item.id || item.newsId || index}`"
            class="card-item"
            @tap="handleCardClick(item)"
          >
            <view class="image-wrapper">
              <image
                :src="
                  Array.isArray(item.newsImages)
                    ? item.newsImages[0]
                    : item.newsImages
                "
                class="main-image"
                mode="aspectFit"
                @load="onImageLoad(item.id || item.newsId, 0, index)"
                @tap.stop="handleMediaClick(item, 'image')"
              />
            </view>
            <view class="info-bar">
              <text class="card-title">{{ item.newsTitle || "暂无标题" }}</text>
            </view>
          </view>
        </view> -->
      </view>

      <!-- 加载更多状态 -->
      <view v-if="loadingMore" class="loading-more-container">
        <text class="loading-more-text">加载更多中...</text>
      </view>
    </view>
  </view>
  <BackHome />
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getCompanyNewsList } from "@/api/activity.js";
import {
  onLoad,
  onReady,
  onShow,
  onHide,
  onUnload,
  onReachBottom,
  onPageScroll,
  onShareAppMessage,
  onShareTimeline,
} from "@dcloudio/uni-app";
// 响应式数据
const columns = ref([]);
const columnsList = ref([]);
const loading = ref(false);
const loadingMore = ref(false);
const pageNum = ref(1);
const types = ref("");
// 商家数据
const merchantData = ref([]);

// 企业动态
const fetchMerchantData = async () => {
  try {
    loading.value = true;
    const response = await getCompanyNewsList({
      pageSize: 6,
      pageNum: 1,
      type: 2,
    });

    // 确保返回的数据是数组格式
    let dataArray = [];
    // 根据不同的数据结构进行处理
    if (response && response.rows && Array.isArray(response.rows)) {
      dataArray = response.rows;
    } else if (response && response.rows && Array.isArray(response.rows)) {
      dataArray = response.rows;
    } else if (response && Array.isArray(response)) {
      dataArray = response;
    } else {
      console.warn("API返回的数据格式不正确:", response);
      dataArray = [];
    }

    columns.value = dataArray;
    // 获取数据后初始化瀑布流
  } catch (error) {
    console.error("获取商家数据失败:", error);
    columns.value = [];
    uni.showToast({
      title: "获取数据失败",
      icon: "none",
    });
  } finally {
    loading.value = false;
  }
};
onReachBottom(() => {
  if (types.value == 1) {
    pageNum.value += 1;
    fetchMerchantData1();
  }
});
// 公众号动态
const fetchMerchantData1 = async () => {
  try {
    // 只有第一页时才显示全局loading，加载更多时使用loadingMore
    if (pageNum.value === 1) {
      loading.value = true;
    } else {
      loadingMore.value = true;
    }

    const response = await getCompanyNewsList({
      pageSize: 20,
      pageNum: pageNum.value,
      type: 3,
    });

    console.log("API响应数据:", response);

    // 确保返回的数据是数组格式
    let dataArray = [];
    // 根据不同的数据结构进行处理
    if (response && response.rows && Array.isArray(response.rows)) {
      dataArray = response.rows;
    } else if (response && response.data && Array.isArray(response.data)) {
      dataArray = response.data;
    } else if (response && Array.isArray(response)) {
      dataArray = response;
    } else {
      console.warn("API返回的数据格式不正确:", response);
      dataArray = [];
    }

    // 处理分页数据
    if (pageNum.value == 1) {
      columnsList.value = dataArray;
    } else {
      columnsList.value = columnsList.value.concat(dataArray);
    }

    // 判断是否还有更多数据
    types.value = dataArray.length >= 10 ? 1 : 2;

    console.log("columnsList数据:", columnsList.value);
  } catch (error) {
    console.error("获取公众号动态数据失败:", error);
    if (pageNum.value === 1) {
      columnsList.value = [];
    }
    uni.showToast({
      title: "获取数据失败",
      icon: "none",
    });
  } finally {
    loading.value = false;
    loadingMore.value = false;
  }
};
// 初始化瀑布流
const initWaterfall = () => {
  // 重置列数据
  columns.value = [[], []];
  columnHeights.value = [0, 0];

  // 确保 merchantData.value 是数组
  if (!Array.isArray(merchantData.value)) {
    console.warn("merchantData.value is not an array:", merchantData.value);
    return;
  }

  // 分配数据到列
  merchantData.value.forEach((item) => {
    // 找到高度最小的列
    const minHeightIndex =
      columnHeights.value[0] <= columnHeights.value[1] ? 0 : 1;
    // 添加到对应列
    columns.value[minHeightIndex].push(item);
    // 模拟高度（实际项目中应该根据图片实际高度计算）
    const estimatedHeight = getEstimatedHeight(item);
    columnHeights.value[minHeightIndex] += estimatedHeight;
  });
};

// 估算卡片高度
const getEstimatedHeight = (item) => {
  // 根据不同的内容类型返回不同的估算高度
  // 实际项目中应该根据图片加载后的实际高度
  const baseHeight = 200;
  const randomHeight = Math.random() * 150 + 100;
  return baseHeight + randomHeight;
};

// 判断是否为视频文件
const isVideo = (newsImages) => {
  if (!newsImages) return false;

  // 如果是数组，取第一个元素
  const url = Array.isArray(newsImages) ? newsImages[0] : newsImages;

  if (!url || typeof url !== "string") return false;

  const videoExtensions = [
    ".mp4",
    ".avi",
    ".mov",
    ".wmv",
    ".flv",
    ".webm",
    ".m4v",
  ];
  const lowerUrl = url.toLowerCase();
  return videoExtensions.some((ext) => lowerUrl.includes(ext));
};

// 图片加载完成
const onImageLoad = (itemId, columnIndex, itemIndex) => {
  // 图片加载完成后可以获取实际高度并重新计算布局
  console.log("Image loaded:", itemId);
};

// 视频加载完成
const onVideoLoad = (itemId, columnIndex, itemIndex) => {
  // 视频元数据加载完成后可以获取实际高度并重新计算布局
  console.log("Video loaded:", itemId);
};

// 视频播放错误处理
const onVideoError = (itemId, columnIndex, itemIndex) => {
  console.error("Video error:", itemId);
  // 可以在这里添加错误处理逻辑，比如显示错误提示或使用备用视频
  uni.showToast({
    title: "视频加载失败",
    icon: "none",
    duration: 2000,
  });
};

// 视频可以播放时的处理
const onVideoCanPlay = (itemId, columnIndex, itemIndex) => {
  console.log("Video can play:", itemId);
  // 视频准备就绪，可以开始播放
};

// 处理视频全屏播放
const handleVideoFullscreenPlay = (item) => {
  console.log("处理视频全屏播放:", item);

  // 创建视频ID，基于item的唯一标识
  const videoId = `video-${item.id || item.newsId}`;

  try {
    // 创建视频上下文
    const videoContext = uni.createVideoContext(videoId);

    if (videoContext) {
      console.log("视频上下文创建成功，准备全屏播放");
      // 立即设置全屏状态，确保按钮显示
      currentFullscreenVideoContext.value = videoContext;
      currentFullscreenVideoId.value = videoId;
      console.log("设置全屏视频ID:", currentFullscreenVideoId.value);

      // 请求全屏播放
      videoContext.requestFullScreen({
        direction: 0, // 0: 正常竖向, 90: 屏幕逆时针90度, -90: 屏幕顺时针90度
        success: () => {
          console.log("视频全屏成功，开始自动播放");
          // 确保全屏状态已设置
          currentFullscreenVideoId.value = videoId;
          // 全屏成功后自动播放视频
          setTimeout(() => {
            videoContext.play();
          }, 300); // 延迟300ms确保全屏动画完成
        },
        fail: (err) => {
          console.error("视频全屏失败:", err);
          // 如果全屏失败，尝试直接播放
          videoContext.play();
          uni.showToast({
            title: "全屏失败，直接播放",
            icon: "none",
            duration: 2000,
          });
          // 清理状态
          currentFullscreenVideoContext.value = null;
          currentFullscreenVideoId.value = null;
        },
      });
    } else {
      console.error("无法创建视频上下文，videoId:", videoId);
      uni.showToast({
        title: "视频播放失败",
        icon: "none",
        duration: 2000,
      });
    }
  } catch (error) {
    console.error("视频播放异常:", error);
    uni.showToast({
      title: "视频播放异常",
      icon: "none",
      duration: 2000,
    });
  }
};

// 视频播放事件处理
const onVideoPlay = (e) => {
  console.log("视频开始播放:", e);
  // 可以在这里添加播放统计或其他逻辑
};

// 视频暂停事件处理
const onVideoPause = (e) => {
  console.log("视频暂停播放:", e);
  // 可以在这里添加暂停统计或其他逻辑
};

// 当前全屏视频的上下文
const currentFullscreenVideoContext = ref(null);
const currentFullscreenVideoId = ref(null);

// 视频全屏状态变化处理
const onVideoFullscreenChange = (e) => {
  console.log("视频全屏状态变化:", e);

  // 更准确的全屏状态检测
  const isEnteringFullscreen = !!(
    e &&
    e.detail &&
    (e.detail.fullScreen === true || e.detail.fullscreen === true)
  );

  if (isEnteringFullscreen) {
    console.log("进入全屏模式");
    // 确保设置了全屏视频ID
    if (!currentFullscreenVideoId.value && e.target && e.target.id) {
      currentFullscreenVideoId.value = e.target.id;
      console.log("设置全屏视频ID:", currentFullscreenVideoId.value);
    }
    // 进入全屏时自动播放
    if (currentFullscreenVideoContext.value) {
      setTimeout(() => {
        currentFullscreenVideoContext.value.play();
      }, 300);
    }
  } else {
    console.log("退出全屏模式");
    // 退出全屏时暂停视频并清理状态
    if (currentFullscreenVideoContext.value) {
      currentFullscreenVideoContext.value.pause();
    }
    // 强制清理全屏状态
    setTimeout(() => {
      currentFullscreenVideoContext.value = null;
      currentFullscreenVideoId.value = null;
    }, 100);
  }
};

// 退出全屏的方法
const exitFullscreen = () => {
  console.log("尝试退出全屏...");

  if (currentFullscreenVideoContext.value) {
    // 不暂停视频，让用户决定是否继续播放
    // currentFullscreenVideoContext.value.pause();

    // 尝试退出全屏
    currentFullscreenVideoContext.value.exitFullScreen({
      success: () => {
        console.log("成功退出全屏");
        // 清理状态
        currentFullscreenVideoContext.value = null;
        currentFullscreenVideoId.value = null;
      },
      fail: (err) => {
        console.error("退出全屏失败:", err);
        // 即使退出失败也要清理状态
        currentFullscreenVideoContext.value = null;
        currentFullscreenVideoId.value = null;

        // 尝试强制退出全屏的备用方案
        forceExitFullscreen();
      },
    });
  } else {
    // 如果没有视频上下文，尝试强制退出
    forceExitFullscreen();
  }
};

// 强制退出全屏的备用方案
const forceExitFullscreen = () => {
  console.log("尝试强制退出全屏...");

  // 方案1: 使用document.exitFullscreen
  if (typeof document !== "undefined") {
    if (document.exitFullscreen) {
      document.exitFullscreen().catch((err) => {
        console.log("document.exitFullscreen失败:", err);
      });
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }

  // 方案2: 尝试通过所有可能的视频元素退出全屏
  if (typeof document !== "undefined" && document.querySelectorAll) {
    const videoElements = document.querySelectorAll("video");
    videoElements.forEach((video) => {
      if (video.webkitExitFullscreen) {
        video.webkitExitFullscreen();
      } else if (video.mozCancelFullScreen) {
        video.mozCancelFullScreen();
      } else if (video.msExitFullscreen) {
        video.msExitFullscreen();
      }
    });
  }

  // 清理状态
  setTimeout(() => {
    currentFullscreenVideoContext.value = null;
    currentFullscreenVideoId.value = null;
  }, 500);
};

// 视频点击事件处理
const onVideoClick = (e) => {
  console.log("视频被点击:", e);
  // 阻止事件冒泡
  e.stopPropagation();

  // 如果当前处于全屏状态，点击视频可以退出全屏
  if (currentFullscreenVideoContext.value) {
    console.log("检测到全屏状态，准备退出全屏");
    exitFullscreen();
  }
};

// 添加双击退出全屏功能
let clickTimer = null;
let clickCount = 0;

const handleVideoTap = (e) => {
  console.log("视频被轻触:", e);
  e.stopPropagation();

  // 获取当前视频的item信息
  const videoElement = e.currentTarget;
  const videoId = videoElement.id;

  // 从columns或columnsList中找到对应的item
  let currentItem = null;
  [...columns.value, ...columnsList.value].forEach((item) => {
    if (`video-${item.id || item.newsId}` === videoId) {
      currentItem = item;
    }
  });

  if (!currentItem) {
    console.error("未找到对应的视频项目");
    return;
  }

  clickCount++;

  if (clickCount === 1) {
    clickTimer = setTimeout(() => {
      // 单击处理
      if (currentFullscreenVideoContext.value) {
        console.log("单击视频，退出全屏");
        exitFullscreen();
      } else {
        console.log("单击视频，进入全屏");
        // 立即设置全屏状态用于测试
        currentFullscreenVideoId.value = videoId;
        console.log("测试：直接设置全屏ID为:", videoId);
        handleVideoFullscreenPlay(currentItem);
      }
      clickCount = 0;
    }, 300);
  } else if (clickCount === 2) {
    // 双击处理
    clearTimeout(clickTimer);
    if (currentFullscreenVideoContext.value) {
      console.log("双击视频，退出全屏");
      exitFullscreen();
    } else {
      console.log("双击视频，进入全屏");
      // 立即设置全屏状态用于测试
      currentFullscreenVideoId.value = videoId;
      console.log("测试：直接设置全屏ID为:", videoId);
      handleVideoFullscreenPlay(currentItem);
    }
    clickCount = 0;
  }
};

// 视频播放结束事件处理
const onVideoEnded = (e) => {
  console.log("视频播放结束:", e);
  // 视频播放结束时自动退出全屏
  if (currentFullscreenVideoContext.value) {
    exitFullscreen();
  }
};

// 处理媒体点击（图片或视频）
const handleMediaClick = (item, mediaType) => {
  console.log("Media clicked:", mediaType, item);

  if (mediaType === "video") {
    // 视频点击处理 - 全屏预览自动播放
    handleVideoFullscreenPlay(item);
  } else if (mediaType === "image") {
    // 处理图片点击 - 预览大图
    let imageUrls = [];
    let currentUrl = "";

    // 处理不同的图片数据格式
    if (Array.isArray(item.newsImages)) {
      imageUrls = item.newsImages.filter(
        (url) => url && typeof url === "string"
      );
      currentUrl = imageUrls[0] || "";
    } else if (item.newsImages && typeof item.newsImages === "string") {
      imageUrls = [item.newsImages];
      currentUrl = item.newsImages;
    }

    // 如果有图片URL，则预览图片
    if (imageUrls.length > 0 && currentUrl) {
      uni.previewImage({
        urls: imageUrls,
        current: currentUrl,
        success: () => {
          console.log("图片预览成功");
        },
        fail: (err) => {
          console.error("图片预览失败:", err);
          uni.showToast({
            title: "图片预览失败",
            icon: "none",
            duration: 2000,
          });
        },
      });
    } else {
      uni.showToast({
        title: "暂无图片可预览",
        icon: "none",
        duration: 2000,
      });
    }
  }
};

// 处理卡片点击
const handleCardClick = (item) => {
  console.log("Card clicked:", item);
  // 根据实际需求跳转到对应的详情页面
  // 例如跳转到动态详情页面
  const itemStr = JSON.stringify(item);
  uni.navigateTo({
    url: "/pages/dynamicdetails/index?item=" + encodeURIComponent(itemStr),
  });
};

// 处理键盘事件（用于退出全屏）
const handleKeyDown = (e) => {
  // ESC键、空格键、回车键都可以退出全屏
  if (
    currentFullscreenVideoContext.value &&
    (e.keyCode === 27 || e.keyCode === 32 || e.keyCode === 13)
  ) {
    e.preventDefault();
    exitFullscreen();
  }
};

// 处理触摸事件（移动端退出全屏）
const handleTouchStart = (e) => {
  if (currentFullscreenVideoContext.value) {
    // 记录触摸开始时间，用于区分点击和滑动
    touchStartTime.value = Date.now();
  }
};

const handleTouchEnd = (e) => {
  if (currentFullscreenVideoContext.value && touchStartTime.value) {
    const touchDuration = Date.now() - touchStartTime.value;
    // 如果是短时间触摸（点击），则退出全屏
    if (touchDuration < 300) {
      exitFullscreen();
    }
    touchStartTime.value = null;
  }
};

const touchStartTime = ref(null);

// 组件挂载时获取数据
onMounted(() => {
  fetchMerchantData();
  fetchMerchantData1();

  // 添加键盘事件监听
  if (typeof document !== "undefined") {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchend", handleTouchEnd);

    // 添加全屏状态变化监听
    document.addEventListener(
      "fullscreenchange",
      handleDocumentFullscreenChange
    );
    document.addEventListener(
      "webkitfullscreenchange",
      handleDocumentFullscreenChange
    );
    document.addEventListener(
      "mozfullscreenchange",
      handleDocumentFullscreenChange
    );
    document.addEventListener(
      "MSFullscreenChange",
      handleDocumentFullscreenChange
    );
  }
});

// 文档全屏状态变化处理
const handleDocumentFullscreenChange = () => {
  const isFullscreen = !!(
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullScreenElement ||
    document.msFullscreenElement
  );

  console.log("文档全屏状态变化:", isFullscreen);

  if (!isFullscreen && currentFullscreenVideoContext.value) {
    console.log("检测到退出全屏，清理视频状态");
    // 如果退出了全屏但还有视频上下文，清理状态
    if (currentFullscreenVideoContext.value) {
      currentFullscreenVideoContext.value.pause();
    }
    currentFullscreenVideoContext.value = null;
    currentFullscreenVideoId.value = null;
  }
};

// 组件卸载时清理
onUnload(() => {
  // 移除事件监听
  if (typeof document !== "undefined") {
    document.removeEventListener("keydown", handleKeyDown);
    document.removeEventListener("touchstart", handleTouchStart);
    document.removeEventListener("touchend", handleTouchEnd);

    // 移除全屏状态变化监听
    document.removeEventListener(
      "fullscreenchange",
      handleDocumentFullscreenChange
    );
    document.removeEventListener(
      "webkitfullscreenchange",
      handleDocumentFullscreenChange
    );
    document.removeEventListener(
      "mozfullscreenchange",
      handleDocumentFullscreenChange
    );
    document.removeEventListener(
      "MSFullscreenChange",
      handleDocumentFullscreenChange
    );
  }

  // 清理全屏状态
  if (currentFullscreenVideoContext.value) {
    // 先尝试退出全屏
    currentFullscreenVideoContext.value.exitFullScreen({
      success: () => {
        console.log("页面卸载时成功退出全屏");
      },
      fail: (err) => {
        console.error("页面卸载时退出全屏失败:", err);
        // 即使失败也尝试强制退出
        forceExitFullscreen();
      },
    });
    currentFullscreenVideoContext.value = null;
    currentFullscreenVideoId.value = null;
  }
});
</script>

<style lang="scss" scoped>
.client-evaluation-page {
  min-height: 100vh;
  background-color: #f0f0f0;
  padding-bottom: 20rpx;
}

// 固定头部区域
.fixed-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 40rpx 32rpx 30rpx;
  background-color: #f7f7f7;

  .header-content {
    display: flex;
    align-items: center;
    margin-bottom: 12rpx;
  }

  .main-title {
    font-size: 36rpx;
    font-weight: bold;
    color: #333333;
    margin-right: 16rpx;
  }

  .chat-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .chat-bubble {
    width: 60rpx;
    height: 44rpx;
    background: linear-gradient(135deg, #cde2ff 0%, #eaf2ff 100%);
    border-radius: 22rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6rpx;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      bottom: -4rpx;
      left: 10rpx;
      width: 0;
      height: 0;
      border-left: 8rpx solid transparent;
      border-right: 8rpx solid transparent;
      border-top: 8rpx solid #eaf2ff;
      transform: rotate(-30deg);
    }

    .dot {
      width: 6rpx;
      height: 6rpx;
      background-color: #7ba7e7;
      border-radius: 50%;
    }
  }

  .sub-title {
    font-size: 28rpx;
    color: #999999;
    margin-left: 4rpx;
  }
}

// 内容区域
.content-area {
}

// 加载状态
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 100rpx 0;
  .loading-text {
    font-size: 28rpx;
    color: #999999;
  }
}

// 加载更多状态
.loading-more-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40rpx 0;
  .loading-more-text {
    font-size: 24rpx;
    color: #999999;
  }
}
.listData {
  background: #ffffff;
  margin-top: 32rpx;
  .listData-title {
    font-size: 32rpx;
    font-weight: bold;
    color: #000000;
    padding-top: 42rpx;
    padding-left: 21rpx;
  }
}
// 瀑布流容器
.waterfall-container {
  .waterfall-column {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding-top: 32rpx;
    padding: 20rpx 0;
  }
}

// 卡片样式
.card-item {
  background-color: #ffffff;
  border-radius: 24rpx;
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  margin-bottom: 20rpx;
  width: 46%;
  margin-left: 3%;
  &:active {
    transform: scale(0.98);
    box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
  }

  .image-wrapper {
    position: relative;
    width: 100%;
    overflow: hidden;
    .main-image {
      width: 340rpx;
      height: 224rpx;
      display: block;
      border-radius: 20rpx;
    }

    .main-video {
      width: 100%;
      height: 600rpx; // 视频高度设置为600rpx
      display: block;
      background-color: #000;
      object-fit: contain;
      -webkit-object-fit: contain;
      max-width: 100%;
      max-height: 100%;
      overflow: hidden;
      -webkit-transform: translateZ(0);
      transform: translateZ(0);
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
      border-radius: 20rpx;
      cursor: pointer;
      transition: transform 0.2s ease, box-shadow 0.2s ease;

      &:hover {
        transform: scale(1.02);
        box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.15);
      }

      &:active {
        transform: scale(0.98);
      }

      // 全屏状态优化
      &[data-fullscreen="true"] {
        width: 100vw !important;
        height: 100vh !important;
        border-radius: 0 !important;
        object-fit: contain !important;
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        z-index: 9999 !important;
        background-color: #000 !important;
      }
    }

    .media-type-indicator {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 10;
      pointer-events: none;
    }

    .play-icon {
      width: 80rpx;
      height: 80rpx;
      background: rgba(0, 0, 0, 0.6);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      backdrop-filter: blur(10rpx);
      border: 2rpx solid rgba(255, 255, 255, 0.3);
    }

    .play-symbol {
      color: #ffffff;
      font-size: 32rpx;
      margin-left: 4rpx; /* 微调播放符号位置 */
    }

    .overlay-text {
      position: absolute;
      bottom: 20rpx;
      left: 20rpx;
      right: 20rpx;
      color: #ffffff;
      font-size: 32rpx;
      font-weight: bold;
      text-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.3);
      padding: 16rpx 20rpx;
      background: linear-gradient(
        90deg,
        rgba(0, 0, 0, 0.4) 0%,
        rgba(0, 0, 0, 0.2) 100%
      );
      border-radius: 12rpx;
      backdrop-filter: blur(10rpx);
    }
  }

  .info-bar {
    display: flex;
    align-items: center;
    padding: 20rpx;

    .card-title {
      width: 330rpx; // 设置标题宽度为330rpx
      height: 60rpx; // 设置标题高度为60rpx
      font-size: 26rpx;
      color: #333333;
      line-height: 60rpx; // 设置行高等于高度，实现垂直居中
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .avatar {
      width: 48rpx;
      height: 48rpx;
      border-radius: 50%;
      margin-right: 16rpx;
      border: 2rpx solid #f0f0f0;
    }

    .merchant-name {
      flex: 1;
      font-size: 26rpx;
      color: #666666;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}

// 全屏退出按钮
.fullscreen-exit-btn {
  position: fixed;
  top: 60rpx;
  right: 60rpx;
  width: 100rpx;
  height: 100rpx;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99999;
  backdrop-filter: blur(15rpx);
  border: 3rpx solid rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.3);
  &:hover {
    background: rgba(255, 255, 255, 1);
    transform: scale(1.1);
    box-shadow: 0 6rpx 25rpx rgba(0, 0, 0, 0.4);
  }

  &:active {
    transform: scale(0.95);
  }

  .exit-icon {
    color: #333333;
    font-size: 40rpx;
    font-weight: bold;
    line-height: 1;
  }
}

// 全屏遮罩层样式
.fullscreen-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.01);
  z-index: 9999;
  cursor: pointer;
}

// 调试信息样式
.debug-info {
  position: fixed;
  top: 200rpx;
  left: 20rpx;
  background: rgba(255, 255, 255, 0.9);
  padding: 20rpx;
  border-radius: 10rpx;
  z-index: 99999;
  font-size: 24rpx;
  color: #333;

  text {
    display: block;
    margin-bottom: 10rpx;
  }
}

// 响应式适配
@media screen and (min-width: 750px) {
  .waterfall-container {
    max-width: 750px;
    margin: 0 auto;
  }
}
.teamappearance {
  background: #ffffff;
  padding: 19rpx 0 32rpx 32rpx;
}
.teamappearance-content {
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  gap: 20rpx;
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
  width: 528rpx;
  margin-right: 20rpx;
  &:last-child {
    margin-right: 26rpx;
  }
}
.teamappearance-item-content {
  padding: 18rpx 18rpx;
}
.teamappearance-item-content1 {
  color: #000000;
  font-size: 28rpx;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  // margin-top: 24rpx;
}
.teamappearance-item-content2 {
  color: #535353;
  font-size: 26rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: 14rpx;
}
.teamappearance-item-image {
  width: 528rpx;
  height: 260rpx;
}
.teamappearance-item-image image {
  width: 100%;
  height: 100%;
}
</style>
