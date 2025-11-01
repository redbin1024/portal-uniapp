<template>
  <scroll-view
    class="main"
    scroll-y="true"
    enable-back-to-top="true"
    @scroll="onScroll"
  >
    <!-- <VearCarousel
      :img-list="imgList"
      url-key="url"
      :show-title="true"
      @selected="selectedBanner"
      @video-play="onVideoPlay"
      @video-pause="onVideoPause"
      @video-ended="onVideoEnded"
      @video-error="onVideoError"
      @fullscreen-change="onFullscreenChange"
      @pause-all-videos="onPauseAllVideos"
    /> -->
    <view class="dynamic">
      <view class="dynamic-title2">
        <view class="dynamic-title">最近动态</view>
        <view class="dynamic-title1">RECENT UPDATES</view>
      </view>
      <!-- 动态内容区域 -->
      <view class="dynamic-content">
        <view
          class="dynamic-item"
          v-for="(item, index) in companyNewsList"
          :key="index"
          :class="{
            'dynamic-item-visible': visibleDynamicItems.includes(index),
          }"
          @click="navigateToRecentDetails(item)"
        >
          <!-- 左边内容 -->
          <view
            class="dynamic-left"
            :class="{
              'animate-fade-in-left': visibleDynamicItems.includes(index),
            }"
          >
            <view class="dynamic-date">{{ formatDate(item.createTime) }}</view>
            <view class="dynamic-text1">{{ item.newsTitle }}</view>
            <view class="dynamic-text">{{ item.newsContent }}</view>
          </view>

          <!-- 中间步骤条 -->
          <view class="dynamic-center">
            <view
              class="step-dot"
              :class="{ 'animate-dot': visibleDynamicItems.includes(index) }"
            ></view>
            <view
              class="step-line"
              v-if="index < companyNewsList.length - 1"
              :id="'step-line-' + index"
            ></view>
          </view>

          <!-- 右边图片 -->
          <view
            class="dynamic-right"
            :class="{
              'animate-fade-in-right': visibleDynamicItems.includes(index),
            }"
          >
            <image
              class="dynamic-image"
              :src="item.newsImages[0] + '?image_process=format,webp'"
              mode="aspectFill"
            ></image>
          </view>
        </view>
      </view>
      <!-- 查看更多按钮 -->
      <!-- <view
        class="view-more-btn"
        :class="{ 'view-more-animate': showDynamicViewMoreBtn }"
        v-show="showDynamicViewMoreBtn"
        @click="goToRecentUpdates"
      >
        <text class="view-more-text">查看更多</text>
        <text class="arrow-right">→</text>
      </view> -->
      <view
        class="view-more-btn"
        :class="{ 'view-more-animate': showDynamicViewMoreBtn }"
        v-show="showDynamicViewMoreBtn"
        @click="goToRecentUpdates"
      >
        <view>查看更多</view>
        <view>></view>
      </view>
    </view>

    <view class="container">
      <!-- <view class="container-title">成功案例</view> -->
      <view class="dynamic-title2" style="margin-bottom: 60rpx">
        <view class="dynamic-title">商家案例</view>
        <view class="dynamic-title1">MERCHANT CASE</view>
      </view>
      <view
        class="list-item"
        v-for="(item, index) in successCaseList"
        :key="index"
        :class="{ 'list-item-animate': visibleListItems[index] }"
        :style="{ backgroundColor: getBackgroundColor(index) }"
        @click="navigateToDetail(item)"
      >
        <view class="image-container">
          <image
            class="item-image"
            :src="item.caseImages[0] + '?image_process=format,webp'"
            mode="aspectFit"
          ></image>
        </view>
        <view class="content-container">
          <view class="title">{{ item.customerName }}</view>
          <view class="description">{{ item.caseValue }}</view>
        </view>
      </view>
      <!-- 查看更多按钮 -->
      <!-- <view
        class="view-more-btn"
        :class="{ 'view-more-animate': showCaseViewMoreBtn }"
        v-show="showCaseViewMoreBtn"
        @click="goToCooperationcase"
      >
        <text class="view-more-text">查看更多</text>
        <text class="arrow-right">→</text>
      </view> -->
      <view
        class="view-more-btn"
        :class="{ 'view-more-animate': showCaseViewMoreBtn }"
        v-show="showCaseViewMoreBtn"
        @click="goToCooperationcase"
      >
        <view>查看更多</view>
        <view>></view>
      </view>
    </view>
    <view class="content-container">
      <view class="content-img">
        <rich-text
          class="activity"
          :nodes="richText"
          type="text"
          @itemclick="onRichTextItemClick"
        ></rich-text>
      </view>
      <view class="btn">
        <button
          show-message-card="true"
          open-type="contact"
          bindcontact="handleContact"
          style="
            background: #2f6cf4;
            color: #fff;
            font-size: 32rpx;
            width: 90vw;
            height: 88rpx;
            text-align: center;
            line-height: 85rpx;
            border-radius: 20rpx;
          "
        >
          联系我们
        </button>
      </view>
    </view>
  </scroll-view>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from "vue";
import { onPageScroll, onLoad, onShow } from "@dcloudio/uni-app";
// import hbxwRotateCarousel from "@/uni_modules/hbxw-rotate-carousel/components/hbxw-rotate-carousel/hbxw-rotate-carousel.vue";
// import BlurSwiper from "@/components/blur-swiper/blur-swiper.vue";
import {
  getcaseList,
  getCompanyNewsList,
  getsuccessCaseList,
  getServiceList,
} from "@/api/activity.js";
import VearCarousel from "@/components/vear-carousel/vear-carousel.vue";

// 响应式数据
const richText = ref(""); // 富文本内容
const visibleDynamicItems = ref([]); // 用于控制动态内容项的动画
const visibleListItems = ref([]); // 用于控制list-item的动画
const scrollTimer = ref(null); // 滚动节流定时器
const observer = ref(null); // 观察器引用
const showDynamicViewMoreBtn = ref(false); // 控制动态内容查看更多按钮显示
const showCaseViewMoreBtn = ref(false); // 控制案例查看更多按钮显示
const caseList = ref([]);
const imgList = ref([]);
const companyNewsList = ref([]);
const successCaseList = ref([]);
const slideshowData = reactive([
  {
    image:
      "http://cdn.xiaodingdang1.com/2025/09/15/cbbd7e2aa0cd4016b59a3f31dbe46cb2.png",
    title: "专业团队服务",
    description: "为您提供专业的技术解决方案",
  },
  {
    image:
      "http://cdn.xiaodingdang1.com/2025/09/15/d177663900974c55bd7b9d093b77c379.png",
    title: "创新技术应用",
    description: "运用最新技术为客户创造价值",
  },
  {
    image:
      "http://cdn.xiaodingdang1.com/2025/09/15/b2eb116026c54ead93ac75a6d1c01607.png",
    title: "优质服务保障",
    description: "全程跟踪服务，确保项目成功",
  },
]);

const dynamicData = reactive([
  {
    date: "2024.09.20",
    content:
      "成功完成东方幸福国际母婴会所项目，为客户提供了完整的数字化解决方案，包括小程序开发、后台管理系统等。",
    image:
      "http://cdn.xiaodingdang1.com/2025/09/15/cbbd7e2aa0cd4016b59a3f31dbe46cb2.png",
  },
  {
    date: "2024.09.15",
    content:
      "启动新的电商平台项目，为客户打造全新的线上购物体验，集成支付、物流、客服等多项功能。",
    image:
      "http://cdn.xiaodingdang1.com/2025/09/15/d177663900974c55bd7b9d093b77c379.png",
  },
  {
    date: "2024.09.10",
    content:
      "完成企业官网改版升级，采用响应式设计，提升用户体验和品牌形象展示效果。",
    image:
      "http://cdn.xiaodingdang1.com/2025/09/15/b2eb116026c54ead93ac75a6d1c01607.png",
  },
  {
    date: "2024.09.05",
    content:
      "与多家知名企业达成合作协议，将为其提供定制化的软件开发服务和技术咨询。",
    image:
      "http://cdn.xiaodingdang1.com/2025/09/15/cbbd7e2aa0cd4016b59a3f31dbe46cb2.png",
  },
  {
    date: "2024.08.30",
    content: "团队技术培训完成，全面提升开发能力，为客户提供更优质的技术服务。",
    image:
      "http://cdn.xiaodingdang1.com/2025/09/15/d177663900974c55bd7b9d093b77c379.png",
  },
]);

const listData = reactive([
  {
    image:
      "http://cdn.xiaodingdang1.com/2025/09/15/cbbd7e2aa0cd4016b59a3f31dbe46cb2.png",
    title: "东方幸福国际母婴会所",
    description:
      "月子中心一般为生产母亲提供专业产后恢复服务的场所，也称为月子会所，有专业营养师负责给产妇提供月子。",
  },
  {
    image:
      "http://cdn.xiaodingdang1.com/2025/09/15/d177663900974c55bd7b9d093b77c379.png",
    title: "东方幸福国际母婴会所",
    description:
      "月子中心一般为生产母亲提供专业产后恢复服务的场所，也称为月子会所，有专业营养师负责给产妇提供月子。",
  },
  {
    image:
      "http://cdn.xiaodingdang1.com/2025/09/15/b2eb116026c54ead93ac75a6d1c01607.png",
    title: "东方幸福国际母婴会所",
    description:
      "月子中心一般为生产母亲提供专业产后恢复服务的场所，也称为月子会所，有专业营养师负责给产妇提供月子。",
  },
  {
    image:
      "http://cdn.xiaodingdang1.com/2025/09/15/b2eb116026c54ead93ac75a6d1c01607.png",
    title: "东方幸福国际母婴会所",
    description:
      "月子中心一般为生产母亲提供专业产后恢复服务的场所，也称为月子会所，有专业营养师负责给产妇提供月子。",
  },
  {
    image:
      "http://cdn.xiaodingdang1.com/2025/09/15/b2eb116026c54ead93ac75a6d1c01607.png",
    title: "东方幸福国际母婴会所",
    description:
      "月子中心一般为生产母亲提供专业产后恢复服务的场所，也称为月子会所，有专业营养师负责给产妇提供月子。",
  },
  {
    image:
      "http://cdn.xiaodingdang1.com/2025/09/15/b2eb116026c54ead93ac75a6d1c01607.png",
    title: "东方幸福国际母婴会所",
    description:
      "月子中心一般为生产母亲提供专业产后恢复服务的场所，也称为月子会所，有专业营养师负责给产妇提供月子。",
  },
  {
    image:
      "http://cdn.xiaodingdang1.com/2025/09/15/b2eb116026c54ead93ac75a6d1c01607.png",
    title: "东方幸福国际母婴会所",
    description:
      "月子中心一般为生产母亲提供专业产后恢复服务的场所，也称为月子会所，有专业营养师负责给产妇提供月子。",
  },
]);
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
      processContent(response.rows[0].serviceDescription);
    }
  } catch (error) {
    console.error("获取企业列表失败:", error);
    uni.showToast({
      title: "获取企业列表失败",
      icon: "none",
    });
  }
};
// 方法定义
// 添加用于存储富文本中图片的数组
const richTextImages = ref([]);

// 添加图片预览方法
const handleRichTextTap = (event) => {
  // 检查点击的是否是图片
  if (
    event?.target?.tagName === "IMG" ||
    event?.currentTarget?.dataset?.tag === "img"
  ) {
    // 获取图片在富文本中的索引
    let index = 0;

    // 尝试从 dataset 获取索引
    if (event?.target?.dataset?.index !== undefined) {
      index = parseInt(event.target.dataset.index);
    } else if (event?.currentTarget?.dataset?.index !== undefined) {
      index = parseInt(event.currentTarget.dataset.index);
    } else {
      // 如果无法从 dataset 获取索引，则尝试通过 src 匹配
      const src = event?.target?.src || event?.currentTarget?.src;
      if (src) {
        const foundIndex = richTextImages.value.findIndex(
          (imgSrc) => imgSrc === src
        );
        if (foundIndex !== -1) {
          index = foundIndex;
        } else {
          // 尝试解码后匹配
          try {
            const decodedSrc = decodeURIComponent(src);
            const decodedIndex = richTextImages.value.findIndex(
              (imgSrc) => imgSrc === decodedSrc
            );
            if (decodedIndex !== -1) {
              index = decodedIndex;
            }
          } catch (e) {
            console.log("Decode URI failed:", e);
          }
        }
      }
    }

    // 使用 uni.previewImage 预览图片
    if (richTextImages.value.length > 0) {
      uni.previewImage({
        urls: richTextImages.value,
        current: index,
      });
    }
  }
};

// 添加处理富文本中图片点击的函数
const onRichTextItemClick = (event) => {
  // 检查点击的是否是图片
  if (event.detail?.src) {
    // 查找点击图片在图片数组中的索引
    const clickedSrc = event.detail.src;
    let index = richTextImages.value.findIndex(
      (imgSrc) => imgSrc === clickedSrc
    );

    // 如果没有找到，尝试解码后再次查找
    if (index === -1) {
      try {
        const decodedSrc = decodeURIComponent(clickedSrc);
        index = richTextImages.value.findIndex(
          (imgSrc) => imgSrc === decodedSrc
        );
      } catch (e) {
        console.log("Decode URI failed:", e);
      }
    }

    // 如果还是没有找到，则使用默认索引0
    if (index === -1) {
      index = 0;
    }

    // 使用 uni.previewImage 预览图片
    if (richTextImages.value.length > 0) {
      uni.previewImage({
        urls: richTextImages.value,
        current: index,
      });
    }
  }
};

// 修改 processContent 方法，在图片标签中添加标识
const processContent = (content) => {
  // 提取图片链接
  const imgSrcRegex = /<img[^>]*src=['"]([^'"]+)['"][^>]*>/gi;
  let match;
  const images = [];

  // 提取所有图片链接
  while ((match = imgSrcRegex.exec(content)) !== null) {
    console.log("提取到的图片链接:", match[1]);
    images.push(match[1]);
  }

  richTextImages.value = images;

  // 处理图片样式并在图片标签中添加标识
  let imgIndex = 0;
  richText.value = content.replace(/<img[^>]*>/gi, function (match) {
    // 移除原有的样式
    match = match.replace(/style=".*"/gi, "").replace(/style='.*'/gi, "");
    // 添加索引标识和样式
    const result = match.replace(
      /<img/gi,
      `<img data-index="${imgIndex}" style="width:100%;height:auto;display:block;"`
    );
    imgIndex++;
    return result;
  });
};

//查询公司动态列表
const fetchsuccessCaseList = async () => {
  try {
    const response = await getsuccessCaseList({
      pageSize: 4,
      pageNum: 1,
    });
    console.log("企业列表数据:", response);
    if (
      response &&
      response.rows &&
      Array.isArray(response.rows) &&
      response.rows.length > 0
    ) {
      successCaseList.value = response.rows;
    }
  } catch (error) {
    console.error("获取企业列表失败:", error);
    uni.showToast({
      title: "获取企业列表失败",
      icon: "none",
    });
  }
};
// 文字截取函数
const truncateText = (text, maxLength) => {
  if (!text) return "";
  return text.length > maxLength ? text.substring(0, maxLength) : text;
};

//查询公司动态列表
const fetchCompanyNewsList = async () => {
  try {
    const response = await getCompanyNewsList({
      pageSize: 4,
      pageNum: 1,
      type: 1,
    });
    console.log("公司动态数据:", response);

    if (
      response &&
      response.rows &&
      Array.isArray(response.rows) &&
      response.rows.length > 0
    ) {
      // 对数据进行安全处理
      const processedData = response.rows.map((item, index) => {
        console.log(`处理第${index + 1}个动态项:`, item);

        // 安全获取字段值，使用默认值防止undefined
        const newsTitle =
          item.newsTitle || item.title || `动态标题${index + 1}`;
        const newsContent =
          item.newsContent ||
          item.content ||
          item.description ||
          `动态内容${index + 1}`;
        const createTime =
          item.createTime ||
          item.createDate ||
          item.date ||
          new Date().toISOString();

        // 安全处理图片数组
        let newsImages = [];
        if (
          item.newsImages &&
          Array.isArray(item.newsImages) &&
          item.newsImages.length > 0
        ) {
          newsImages = item.newsImages;
        } else if (
          item.images &&
          Array.isArray(item.images) &&
          item.images.length > 0
        ) {
          newsImages = item.images;
        } else if (item.image) {
          newsImages = [item.image];
        } else {
          // 使用默认图片
          newsImages = [
            "http://cdn.xiaodingdang1.com/2025/09/15/cbbd7e2aa0cd4016b59a3f31dbe46cb2.png",
          ];
        }

        return {
          ...item,
          newsTitle: truncateText(newsTitle, 21),
          newsContent: truncateText(newsContent, 24),
          newsImages: newsImages,
          createTime: createTime,
          newsId: item.newsId || item.id || index + 1,
        };
      });

      console.log("处理后的动态数据:", processedData);
      companyNewsList.value = processedData;

      // 确保数据更新后重新检查可见性
      setTimeout(() => {
        checkDynamicItemVisibility();
        showAllDynamicItems();
      }, 100);
    } else {
      console.log("没有获取到动态数据，使用默认数据");
      // 使用默认数据作为后备
      const defaultData = [
        {
          newsId: 1,
          newsTitle: "公司成功完成新项目",
          newsContent: "我们很高兴地宣布，公司成功完成了最新的软件开发项目。",
          createTime: "2024-10-25",
          newsImages: [
            "http://cdn.xiaodingdang1.com/2025/09/15/cbbd7e2aa0cd4016b59a3f31dbe46cb2.png",
          ],
        },
        {
          newsId: 2,
          newsTitle: "技术团队培训完成",
          newsContent: "我们的技术团队完成了新一轮的技能培训，提升了服务质量。",
          createTime: "2024-10-20",
          newsImages: [
            "http://cdn.xiaodingdang1.com/2025/09/15/d177663900974c55bd7b9d093b77c379.png",
          ],
        },
        {
          newsId: 3,
          newsTitle: "客户满意度持续提升",
          newsContent: "通过持续优化服务流程，我们的客户满意度达到了新的高度。",
          createTime: "2024-10-15",
          newsImages: [
            "http://cdn.xiaodingdang1.com/2025/09/15/b2eb116026c54ead93ac75a6d1c01607.png",
          ],
        },
      ];

      companyNewsList.value = defaultData;

      // 显示默认数据后重新检查可见性
      setTimeout(() => {
        showAllDynamicItems();
      }, 100);
    }
  } catch (error) {
    console.error("获取公司动态失败:", error);
    uni.showToast({
      title: "获取动态信息失败",
      icon: "none",
    });

    // 发生错误时也使用默认数据
    const fallbackData = [
      {
        newsId: 1,
        newsTitle: "欢迎了解我们的服务",
        newsContent: "我们致力于为客户提供最优质的技术解决方案。",
        createTime: "2024-10-30",
        newsImages: [
          "http://cdn.xiaodingdang1.com/2025/09/15/cbbd7e2aa0cd4016b59a3f31dbe46cb2.png",
        ],
      },
    ];

    companyNewsList.value = fallbackData;

    // 显示备用数据后重新检查可见性
    setTimeout(() => {
      showAllDynamicItems();
    }, 100);
  }
};
//查询商家案例列表
const fetchcaseList = async () => {
  try {
    const response = await getcaseList({
      pageSize: 10,
      pageNum: 1,
    });
    console.log("案例列表数据:", response);
    if (response && response.rows) {
      let data = response.rows;
      let slideshowData = [];
      data.forEach((res, index) => {
        // 检查是否有视频，如果有则添加视频类型的数据
        if (res.caseImages && res.caseImages.length > 0) {
          slideshowData.push({
            type: "video",
            url: res.caseImages[0],
            src: res.caseImages[0],
            poster:
              res.caseImages && res.caseImages[0] ? res.caseImages[0] : "",
            title: res.caseName || "",
            description: res.caseDescription || "",
            id: res.id || index,
            autoplay: false,
            loop: false,
            muted: true, // 默认静音自动播放
            controls: true,
            showFullscreenBtn: true,
            caseTitle: res.caseTitle,
          });
        } else if (res.caseImages && res.caseImages.length > 0) {
          // 如果没有视频，则使用图片
          slideshowData.push({
            type: "image",
            url: res.caseImages[0],
            src: res.caseImages[0],
            title: res.caseName || "",
            description: res.caseDescription || "",
            id: res.id || index,
            caseTitle: res.caseTitle,
          });
        }
      });
      console.log("案例轮播数据:", slideshowData);
      caseList.value = slideshowData;
      // 将案例数据传递给 carousel 组件
      imgList.value = slideshowData;
    }
  } catch (error) {
    console.error("获取案例列表失败:", error);
    uni.showToast({
      title: "获取案例列表失败",
      icon: "none",
    });
  }
};
/**
 * 跳转到最近动态详情页面并传递item数据
 */
const navigateToRecentDetails = (item) => {
  uni.navigateTo({
    url: "/pages/recentdetails/index?newsId=" + item.newsId,
  });
};

// 跳转到最近动态页面
const goToRecentUpdates = () => {
  uni.navigateTo({
    url: "/pages/recentUpdatesnew/index",
  });
};

const goToCooperationcase = () => {
  uni.navigateTo({
    url: "/pages/case/index",
  });
};

// 添加小程序分享给好友功能
const onShareAppMessage = (res) => {
  return {
    title: "合作商家",
    path: "/pages/secondary/winthecustomer/index",
    imageUrl: "", // 可以设置默认分享封面图
  };
};

// 添加小程序分享到朋友圈功能
const onShareTimeline = () => {
  return {
    title: "合作商家",
    query: "",
    imageUrl: "", // 可以设置默认分享封面图
  };
};

// scroll-view 滚动事件处理
const onScroll = (e) => {
  // 滚动时检查list-item可见性
  checkListItemVisibility();
  // 滚动时检查dynamic-item可见性
  checkDynamicItemVisibility();
};

// 检查list-item是否在视窗内的函数
const checkListItemVisibility = () => {
  const query = uni.createSelectorQuery();
  query
    .selectAll(".list-item")
    .boundingClientRect((rects) => {
      if (rects && rects.length > 0) {
        rects.forEach((rect, index) => {
          uni.getSystemInfo({
            success: (res) => {
              const windowHeight = res.windowHeight;
              // 当元素进入视窗时触发动画，提前触发点让动画更自然
              if (rect.top < windowHeight * 0.85 && rect.bottom > 0) {
                // 为每个list-item元素添加动画效果
                setTimeout(() => {
                  if (!visibleListItems.value[index]) {
                    visibleListItems.value[index] = true;
                  }
                  // 检查是否所有案例项都已显示
                  const visibleCount =
                    visibleListItems.value.filter(Boolean).length;
                  if (visibleCount === successCaseList.value.length) {
                    setTimeout(() => {
                      showCaseViewMoreBtn.value = true;
                    }, 500); // 延迟500ms显示按钮，让动画更自然
                  }
                }, index * 150); // 每个元素间隔150ms，让动画更流畅
              }
            },
          });
        });
      }
    })
    .exec();
};

// 检查dynamic-item是否在视窗内的函数
const checkDynamicItemVisibility = () => {
  const query = uni.createSelectorQuery();
  query
    .selectAll(".dynamic-item")
    .boundingClientRect((rects) => {
      if (rects && rects.length > 0) {
        rects.forEach((rect, index) => {
          setTimeout(() => {
            if (!visibleDynamicItems.value.includes(index)) {
              visibleDynamicItems.value.push(index);
            }
            // 当所有动态内容项都显示完成后，显示查看更多按钮
            if (
              visibleDynamicItems.value.length === companyNewsList.value.length
            ) {
              setTimeout(() => {
                showDynamicViewMoreBtn.value = true;
              }, 200); // 延迟500ms显示按钮，让动画更自然
            }
          }, index * 50); // 每个元素间隔200ms，让动画更流畅
        });
      }
    })
    .exec();
};

// 直接显示所有动态内容项的函数
const showAllDynamicItems = () => {
  // 页面加载时直接显示所有动态项
  companyNewsList.value.forEach((_, index) => {
    setTimeout(() => {
      if (!visibleDynamicItems.value.includes(index)) {
        visibleDynamicItems.value.push(index);
      }

      // 当所有动态内容项都显示完成后，显示查看更多按钮
      if (visibleDynamicItems.value.length === companyNewsList.value.length) {
        setTimeout(() => {
          showDynamicViewMoreBtn.value = true;
        }, 500); // 延迟500ms显示按钮，让动画更自然
      }
    }, index * 200); // 每个元素间隔200ms，让动画更流畅
  });
};

const navigateToDetail = (item) => {
  uni.navigateTo({
    url:
      "/pages/casedetails/index?item=" +
      encodeURIComponent(JSON.stringify(item)),
  });
};

const getBackgroundColor = (index) => {
  const colors = ["#FFEFEB", "#DFF1FF", "#EDF1FF", "#DAF9FF"];
  return colors[index % 4];
};

// 轮播图点击事件
const onSlideshowClick = (event) => {
  console.log("轮播图点击:", event);
  // 可以在这里添加点击后的逻辑，比如跳转到详情页
};

// 轮播图切换事件
const onSlideshowChange = (event) => {
  console.log("轮播图切换:", event);
  // 可以在这里添加切换后的逻辑，比如更新当前索引
};

// 生命周期钩子
onMounted(() => {
  // 初始化时检查list-item可见性
  // 直接显示所有动态内容项，不依赖滚动检测
  setTimeout(() => {
    showAllDynamicItems(); // 直接显示所有动态项，立即触发动画
    checkListItemVisibility();
  }, 100); // 延迟100ms，确保页面元素已渲染完成
  fetchcaseList(); // 暂时注释掉，因为当前页面主要显示服务信息
  fetchCompanyNewsList();
  fetchsuccessCaseList();
  fetchServiceList();
});

onBeforeUnmount(() => {
  if (observer.value) {
    observer.value.disconnect();
  }
  if (scrollTimer.value) {
    clearTimeout(scrollTimer.value);
  }
});

// 格式化日期，只显示年月日
const formatDate = (dateStr) => {
  if (!dateStr) return "";
  return dateStr.split(" ")[0];
};

// uni-app 生命周期
onLoad(() => {});
onShow(() => {});
</script>

<style scoped>
view,
image,
text {
  box-sizing: border-box;
}

.main {
  background: #ffffff;
  width: 100%;
  max-width: 100vw;
  height: 100vh;
  /* scroll-view 需要固定高度才能滚动 */
}

/**最近动态 */
.dynamic {
  background: #ffffff;
  padding: 30rpx 28rpx;
}

.dynamic-title {
  font-size: 40rpx;
  font-weight: bold;
  color: #000000;
  text-align: center;
}

.dynamic-title1 {
  font-size: 28rpx;
  color: #b1b0b0;
  text-align: center;
}
.dynamic-title2 {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 动态内容样式 */
.dynamic-content {
  margin-top: 40rpx;
}

.dynamic-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 20rpx;
  position: relative;
  min-height: auto;
  width: 100%;
  /* 移除 overflow: hidden，避免影响滚动 */
  box-sizing: border-box;
  cursor: pointer;
  transition: all 0.3s ease;
}

.dynamic-item:hover {
  transform: translateY(-2rpx);
}

.dynamic-item:active {
  transform: translateY(0);
  opacity: 0.8;
}

.dynamic-left {
  width: 45%;
  flex-shrink: 0;
  box-sizing: border-box;
  /* 初始状态：从左侧淡入 */
  transform: translateX(-80rpx);
  opacity: 0;
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* 左侧内容淡入动画 */
.dynamic-left.animate-fade-in-left {
  transform: translateX(0);
  opacity: 1;
}

.dynamic-date {
  font-size: 24rpx;
  color: #2c80ff;
  margin-bottom: 8rpx;
  font-weight: bold;
  transform: translateY(20rpx);
  opacity: 0;
  transition: all 0.6s ease-out 0.3s;
}

.dynamic-text1 {
  color: #3d3d3d;
  font-size: 28rpx;
  font-weight: bold;
  transform: translateY(20rpx);
  opacity: 0;
  transition: transform 0.6s ease-out 0.4s, opacity 0.6s ease-out 0.4s;
  display: -webkit-box;
  display: box;
  -webkit-box-orient: vertical;
  box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
  line-height: 36rpx;
  max-height: 72rpx; /* 精确控制为两行的高度 (28rpx字体大小 + 8rpx行间距) * 2 */
  /* 强制保持两行显示，即使在动画过程中 */
  height: 72rpx;
}

.dynamic-text {
  font-size: 24rpx;
  color: #535353;
  line-height: 1.5;
  transform: translateY(20rpx);
  opacity: 0;
  transition: all 0.6s ease-out 0.5s;
  margin-top: 15rpx;
  /* 添加以下属性使文本显示两行 */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 左侧内容子元素动画 */
.dynamic-left.animate-fade-in-left .dynamic-date,
.dynamic-left.animate-fade-in-left .dynamic-text1,
.dynamic-left.animate-fade-in-left .dynamic-text {
  transform: translateY(0);
  opacity: 1;
}

.dynamic-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* margin: 0 20rpx; */
  position: relative;
  flex: 0 0 auto;
  width: 15%;
}

.step-dot {
  width: 20rpx;
  height: 20rpx;
  border-radius: 45%;
  background-color: #007aff;
  border: 3rpx solid #ffffff;
  box-shadow: 0 0 0 2rpx #007aff;
  z-index: 2;
  position: relative;
  transform: scale(0.5);
  opacity: 0.5;
  transition: all 0.6s ease-out 0.4s; /* 延迟0.4s，让中间点动画在左右内容之后出现 */
}

/* 中间点动画 */
.step-dot.animate-dot {
  transform: scale(1);
  opacity: 1;
  box-shadow: 0 0 0 3rpx #007aff, 0 0 10rpx rgba(0, 122, 255, 0.5);
}

.step-dot.active {
  background-color: #007aff;
  box-shadow: 0 0 0 2rpx #007aff;
}

.step-line {
  width: 2rpx;
  background-color: #e0e0e0;
  position: absolute;
  top: 30rpx;
  left: 50%;
  height: 290rpx;
  z-index: 1;
}

.dynamic-right {
  width: 40%;
  flex-shrink: 0;
  box-sizing: border-box;
  overflow: hidden;
  /* 初始状态：从右侧淡入 */
  transform: translateX(80rpx);
  opacity: 0;
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s; /* 延迟0.2s，让左右动画错开 */
}

/* 右侧内容淡入动画 */
.dynamic-right.animate-fade-in-right {
  transform: translateX(0);
  opacity: 1;
}

.dynamic-image {
  width: 100%;
  max-width: 280rpx;
  height: 200rpx;
  border-radius: 12rpx;
  background-color: #f0f0f0;
  transform: scale(0.8) rotate(5deg);
  opacity: 0;
  transition: all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.3s;
  box-sizing: border-box;
}

/* 右侧图片动画 */
.dynamic-right.animate-fade-in-right .dynamic-image {
  transform: scale(1) rotate(0deg);
  opacity: 1;
}

/**成功案例 */
.container {
  padding: 60rpx 26rpx 20rpx 26rpx;
  background-color: #fff;
}

.container-title {
  font-size: 40rpx;
  font-weight: bold;
  color: #000000;
  margin-bottom: 80rpx;
  text-align: center;
}

.list-item {
  display: flex;
  align-items: flex-start;
  border-radius: 16rpx;
  height: 270rpx;
  padding: 0 24rpx;
  margin-bottom: 62rpx;
  position: relative;
  width: 100%;
  box-sizing: border-box;
  /* 初始状态 - 与winthecustomer-content1相同的动画效果 */
  opacity: 0;
  transform: translateY(20rpx);
  transition: all 0.6s ease-out;
}

.list-item.list-item-animate {
  opacity: 1;
  transform: translateY(0);
}

.image-container {
  flex-shrink: 0;
  margin-right: 24rpx;
  position: relative;
}

.item-image {
  width: 214rpx;
  height: 282rpx;
  border-radius: 20rpx;
  background-color: #f0f0f0;
  border: 3rpx solid #ffffff;
  position: relative;
  top: -30rpx;
}

.content-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.title {
  height: 90rpx;
  line-height: 130rpx;
  font-size: 34rpx;
  font-weight: 600;
  color: #000000;
  margin-bottom: 12rpx;
}

.description {
  font-size: 28rpx;
  color: #7e7f80;
  line-height: 1.5;
  word-break: break-all;
}
/**轮播图样式 */
.slideshow {
  width: 100%;
  height: 800rpx;
  position: relative;
  overflow: hidden;
}

.slideshow-item {
  width: 100%;
  height: 100%;
  position: relative;
}

.slideshow-image {
  width: 100%;
  height: 100%;
}

.slideshow-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 20rpx;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  color: white;
}

.slideshow-title {
  font-size: 36rpx;
  font-weight: bold;
  margin-bottom: 10rpx;
}

.slideshow-desc {
  font-size: 24rpx;
}
/* 查看更多按钮样式 */
.view-more-btn {
  display: flex;
  justify-content: center;
  background: #f3f5fb;
  border-radius: 8rpx;
  width: 100%;
  height: 88rpx;
  color: #313131;
  font-size: 30rpx;
  line-height: 88rpx;
  margin: 0rpx 0 20rpx 0;
  cursor: pointer;
  opacity: 0;
  transform: translateY(20rpx);
  transition: all 0.6s ease-out;
}

/* 当按钮显示时的动画效果 */
.view-more-btn.view-more-animate {
  opacity: 1;
  transform: translateY(0);
}

.view-more-btn:active {
  opacity: 0.7;
}

.view-more-text {
  font-size: 28rpx;
  color: #2c80ff;
  margin-right: 10rpx;
}

.arrow-right {
  font-size: 28rpx;
  color: #2c80ff;
  font-weight: bold;
}
.content-img {
  margin-top: 38rpx;
  width: 750rpx;
}
.content-img image {
  width: 100%;
}
.btn {
  background: #2f6cf4;
  color: #fff;
  font-size: 32rpx;
  width: 90vw;
  height: 88rpx;
  text-align: center;
  line-height: 88rpx;
  border-radius: 20rpx;
  margin: 20rpx 0 20rpx 5vw;
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
