<template>
  <view class="main" :class="{ 'no-scroll': showPreview }">
    <view class="businesspartnernew-content">
      <view
        class="businesspartnernew-item"
        v-for="(item, index) in caseDataList"
        :key="index"
      >
        <!-- <video
          :id="'bannerVideo' + index"
          :src="item.caseImages[0]"
          class="banner-video"
          :autoplay="false"
          :muted="false"
          :controls="true"
          :show-center-play-btn="false"
          :show-play-btn="false"
          :show-fullscreen-btn="false"
          @fullscreenchange="onVideoFullscreenChange($event, index)"
          style="border-radius: 20rpx"
          object-fit="cover"
        /> -->

        <view
          @click="nextVideo(item.caseImages[0], item.caseTitle)"
          style="width: 344rpx; height: 458rpx"
        >
          <!-- <image
            :src="item.coverImage + '?image_process=format,webp'"
            style="width: 344rpx; height: 458rpx; border-radius: 20rpx"
          ></image> -->
          <image
            :src="item.coverImage"
            mode="aspectFill"
            style="width: 100%; height: 100%; border-radius: 20rpx"
          ></image>
          <view class="custom-play-button">
            <image
              src="http://cdn.xiaodingdang1.com/2025/10/22/2f504fbb11944ad8834f6c479f233281.png"
              class="play-icon"
            />
          </view>
          <!-- <view
            v-if="videoFullscreenIndex !== index"
            class="custom-play-button"
            @click="playVideo(index)"
          >
            <image
              src="http://cdn.xiaodingdang1.com/2025/10/22/2f504fbb11944ad8834f6c479f233281.png"
              class="play-icon"
            />
          </view> -->
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
        <!-- <view class="arrows">
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
        </view> -->
      </view>
    </view>
  </view>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { getcaseList } from "@/api/activity.js";
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
const caseDataList = ref([]);
const showPreview = ref(false);
const types = ref("");
const pageNum = ref(1);
// 当前全屏播放的视频索引
const videoFullscreenIndex = ref(-1);
// 监听视频全屏状态变化
const onVideoFullscreenChange = (e, index) => {
  console.log("视频全屏状态变化:", e.detail.fullScreen, "索引:", index);
  if (e.detail.fullScreen) {
    // 进入全屏，记录当前视频索引
    videoFullscreenIndex.value = index;
    // 多次延迟强制更新视图，确保按钮显示
    setTimeout(() => {
      videoFullscreenIndex.value = index;
      console.log("第一次更新:", index);
    }, 100);
    setTimeout(() => {
      videoFullscreenIndex.value = index;
      console.log("第二次更新:", index);
    }, 300);
    setTimeout(() => {
      videoFullscreenIndex.value = index;
      console.log("第三次更新:", index);
    }, 500);
  } else {
    // 退出全屏，重置索引
    videoContext.stop();
    videoFullscreenIndex.value = -1;
    console.log("退出全屏");
  }
};
let videoContext = null;

const nextVideo = (url, visitContent) => {
  uni.navigateTo({
    url:
      "/pages/secondary/index/index?url=" +
      url +
      "&visitContent=" +
      visitContent,
  });
}; // 播放视频
const playVideo = (index) => {
  // 暂停所有其他视频
  for (let i = 0; i < caseDataList.value.length; i++) {
    if (i !== index) {
      const otherVideoContext = uni.createVideoContext("bannerVideo" + i);
      otherVideoContext.pause();
    }
  }

  // 播放当前选中的视频并全屏
  videoContext = uni.createVideoContext("bannerVideo" + index);
  videoContext.play(); // 先播放视频

  // 延迟进入全屏，确保视频已经开始播放
  setTimeout(() => {
    videoContext.requestFullScreen({ direction: 0 });
    // 设置当前全屏视频索引
    videoFullscreenIndex.value = index;

    // 再次延迟确保全屏状态已触发
    setTimeout(() => {
      videoFullscreenIndex.value = index;
      console.log("强制设置全屏视频索引:", index);
    }, 200);
  }, 100);
};
const previewMedia = ref({
  src: "",
  type: "image", // 'image' 或 'video'
  index: 0,
});
// 处理预览模态框点击事件
const handlePreviewModalClick = (e) => {
  // 如果视频正在全屏，不关闭预览
  if (isVideoFullscreen.value) {
    console.log("视频全屏中，不关闭预览");
    return;
  }
  closePreview();
};
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
onReachBottom(() => {
  if (types.value == 1) {
    pageNum.value += 1;
    caseList();
  }
});
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
//查询商家案例列表
const caseList = async () => {
  try {
    const response = await getcaseList({
      pageSize: 8,
      pageNum: pageNum.value,
    });
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
      caseDataList.value = dataArray;
    } else {
      caseDataList.value = caseDataList.value.concat(dataArray);
    }
    types.value = dataArray.length >= 8 ? 1 : 2;
  } catch (error) {
    console.error("获取企业列表失败:", error);
    uni.showToast({
      title: "获取企业列表失败",
      icon: "none",
    });
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
onMounted(() => {
  caseList();
});
</script>
<style lang="scss" scoped>
.main {
  padding: 24rpx;
}
.businesspartnernew-content {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-top: 24rpx;
}
.businesspartnernew-item {
  width: 344rpx;
  height: 458rpx;
  border-radius: 20rpx;
  position: relative;
}
.banner-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.banner-video::-webkit-media-controls-play-button {
  width: 24px;
  height: 24px;
}

.banner-video::-webkit-media-controls-panel {
  background-color: rgba(0, 0, 0, 0.2);
}
/* 全屏预览样式 */

.preview-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 999;
}

/* 视频全屏时可调整z-index，防止被原生全屏遮挡 */
.preview-modal.video-fullscreen {
  z-index: 998;
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

/* 自定义播放按钮样式 */
.custom-play-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  border-radius: 50%;
  width: 80rpx;
  height: 80rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
}

.custom-play-button:hover {
  transform: translate(-50%, -50%) scale(1.1);
  background: rgba(255, 255, 255, 1);
}

.custom-play-button .play-icon {
  width: 100%;
  height: 100%;
}
</style>
