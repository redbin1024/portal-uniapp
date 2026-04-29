<template>
  <view class="content-container">
    <view class="content-img">
      <mp-html :content="richText" @imgtap="previewImage"></mp-html>
    </view>
    <view class="btn">
      <button
        show-message-card="true"
        open-type="contact"
        bindcontact="handleContact"
        style="
          background: #2f6cf4;
          color: #fff;
          width: 600rpx;
          height: 80rpx;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 40rpx;
          font-size: 32rpx;
        "
      >
        联系我们
      </button>
    </view>
  </view>
</template>

<script setup>
import mpHtml from 'uni-app-mp-html/components/mp-html/mp-html.vue';
import { ref, onMounted } from 'vue';
import { getServiceList } from '@/api/activity.js';

const richText = ref('');
const richTextImages = ref([]);

const processContent = (content) => {
  // 提取图片链接
  const imgSrcRegex = /<img[^>]*src=['"]([^'"]+)['"][^>]*>/gi;
  let match;
  const images = [];
  while ((match = imgSrcRegex.exec(content)) !== null) {
    images.push(match[1]);
  }
  richTextImages.value = images;

  // 为图片添加点击事件属性，以便在 rich-text 组件中处理
  content = content.replace(
    /<img([^>]*)>/g,
    '<img$1 style="cursor: pointer;" data-clickable="true">',
  );
  richText.value = content;
};

// 修改 handleRichTextTap 为更通用的图片预览
const handleRichTextTap = (event) => {
  // 判断点击的元素是否是图片
  if (
    event.target.dataset &&
    (event.target.dataset.tag === 'img' || event.target.tagName === 'IMG')
  ) {
    // 获取点击图片的 src
    const src = event.target.dataset.src || event.target.src;
    // 查找图片在图片数组中的索引
    let index = richTextImages.value.indexOf(src);
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

const previewImage = (index, src) => {
  if (richTextImages.value.length > 0) {
    uni.previewImage({
      urls: richTextImages.value,
      current: index,
    });
  }
};

const onRichTextItemClick = (event) => {
  // 检查点击的是否是图片
  if (event.detail?.src) {
    // 查找点击图片在图片数组中的索引
    let index = richTextImages.value.indexOf(event.detail.src);
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

const handleContact = () => {};

const fetchServiceList = async () => {
  try {
    const response = await getServiceList({
      pageSize: 5,
      pageNum: 1,
    });
    if (response && Array.isArray(response.rows) && response.rows.length > 0) {
      processContent(response.rows[0].serviceDescription);
    }
  } catch (error) {
    console.error('获取企业列表失败:', error);
  }
};

onMounted(() => {
  fetchServiceList();
});
</script>

<style scoped>
.content-container {
  width: 100%;
}

.content-img {
  width: 750rpx;
  min-height: 100vh;
}

.content-img image {
  width: 100%;
}

.btn {
  background: #2f6cf4;
  color: #fff;
  font-size: 32rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80rpx;
  margin-top: 20rpx;
}
</style>
