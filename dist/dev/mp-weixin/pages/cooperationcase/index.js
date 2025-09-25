"use strict";
const common_vendor = require("../../common/vendor.js");
const hbxwRotateCarousel = () => "../../uni_modules/hbxw-rotate-carousel/components/hbxw-rotate-carousel/hbxw-rotate-carousel.js";
const BlurSwiper = () => "../../components/blur-swiper/blur-swiper.js";
const _sfc_main = {
  name: "CaseDetails",
  components: {
    "hbxw-rotate-carousel": hbxwRotateCarousel,
    "blur-swiper": BlurSwiper
  },
  data() {
    return {
      visibleItems: [],
      // 用于控制哪些列表项显示动画
      visibleDynamicItems: [],
      // 用于控制动态内容项的动画
      scrollTimer: null,
      // 滚动节流定时器
      slideshowData: [
        {
          image: "http://cdn.xiaodingdang1.com/2025/09/15/cbbd7e2aa0cd4016b59a3f31dbe46cb2.png",
          title: "专业团队服务",
          description: "为您提供专业的技术解决方案"
        },
        {
          image: "http://cdn.xiaodingdang1.com/2025/09/15/d177663900974c55bd7b9d093b77c379.png",
          title: "创新技术应用",
          description: "运用最新技术为客户创造价值"
        },
        {
          image: "http://cdn.xiaodingdang1.com/2025/09/15/b2eb116026c54ead93ac75a6d1c01607.png",
          title: "优质服务保障",
          description: "全程跟踪服务，确保项目成功"
        },
        {
          image: "http://cdn.xiaodingdang1.com/2025/09/15/b2eb116026c54ead93ac75a6d1c01607.png",
          title: "优质服务保障",
          description: "全程跟踪服务，确保项目成功"
        },
        {
          image: "http://cdn.xiaodingdang1.com/2025/09/15/b2eb116026c54ead93ac75a6d1c01607.png",
          title: "优质服务保障",
          description: "全程跟踪服务，确保项目成功"
        },
        {
          image: "http://cdn.xiaodingdang1.com/2025/09/15/b2eb116026c54ead93ac75a6d1c01607.png",
          title: "优质服务保障",
          description: "全程跟踪服务，确保项目成功"
        },
        {
          image: "http://cdn.xiaodingdang1.com/2025/09/15/b2eb116026c54ead93ac75a6d1c01607.png",
          title: "优质服务保障",
          description: "全程跟踪服务，确保项目成功"
        }
      ],
      dynamicData: [
        {
          date: "2024.09.20",
          content: "成功完成东方幸福国际母婴会所项目，为客户提供了完整的数字化解决方案，包括小程序开发、后台管理系统等。",
          image: "http://cdn.xiaodingdang1.com/2025/09/15/cbbd7e2aa0cd4016b59a3f31dbe46cb2.png"
        },
        {
          date: "2024.09.15",
          content: "启动新的电商平台项目，为客户打造全新的线上购物体验，集成支付、物流、客服等多项功能。",
          image: "http://cdn.xiaodingdang1.com/2025/09/15/d177663900974c55bd7b9d093b77c379.png"
        },
        {
          date: "2024.09.10",
          content: "完成企业官网改版升级，采用响应式设计，提升用户体验和品牌形象展示效果。",
          image: "http://cdn.xiaodingdang1.com/2025/09/15/b2eb116026c54ead93ac75a6d1c01607.png"
        },
        {
          date: "2024.09.05",
          content: "与多家知名企业达成合作协议，将为其提供定制化的软件开发服务和技术咨询。",
          image: "http://cdn.xiaodingdang1.com/2025/09/15/cbbd7e2aa0cd4016b59a3f31dbe46cb2.png"
        },
        {
          date: "2024.08.30",
          content: "团队技术培训完成，全面提升开发能力，为客户提供更优质的技术服务。",
          image: "http://cdn.xiaodingdang1.com/2025/09/15/d177663900974c55bd7b9d093b77c379.png"
        }
      ],
      listData: [
        {
          image: "http://cdn.xiaodingdang1.com/2025/09/15/cbbd7e2aa0cd4016b59a3f31dbe46cb2.png",
          title: "东方幸福国际母婴会所",
          description: "月子中心一般为生产母亲提供专业产后恢复服务的场所，也称为月子会所，有专业营养师负责给产妇提供月子。"
        },
        {
          image: "http://cdn.xiaodingdang1.com/2025/09/15/d177663900974c55bd7b9d093b77c379.png",
          title: "东方幸福国际母婴会所",
          description: "月子中心一般为生产母亲提供专业产后恢复服务的场所，也称为月子会所，有专业营养师负责给产妇提供月子。"
        },
        {
          image: "http://cdn.xiaodingdang1.com/2025/09/15/b2eb116026c54ead93ac75a6d1c01607.png",
          title: "东方幸福国际母婴会所",
          description: "月子中心一般为生产母亲提供专业产后恢复服务的场所，也称为月子会所，有专业营养师负责给产妇提供月子。"
        },
        {
          image: "http://cdn.xiaodingdang1.com/2025/09/15/b2eb116026c54ead93ac75a6d1c01607.png",
          title: "东方幸福国际母婴会所",
          description: "月子中心一般为生产母亲提供专业产后恢复服务的场所，也称为月子会所，有专业营养师负责给产妇提供月子。"
        },
        {
          image: "http://cdn.xiaodingdang1.com/2025/09/15/b2eb116026c54ead93ac75a6d1c01607.png",
          title: "东方幸福国际母婴会所",
          description: "月子中心一般为生产母亲提供专业产后恢复服务的场所，也称为月子会所，有专业营养师负责给产妇提供月子。"
        },
        {
          image: "http://cdn.xiaodingdang1.com/2025/09/15/b2eb116026c54ead93ac75a6d1c01607.png",
          title: "东方幸福国际母婴会所",
          description: "月子中心一般为生产母亲提供专业产后恢复服务的场所，也称为月子会所，有专业营养师负责给产妇提供月子。"
        },
        {
          image: "http://cdn.xiaodingdang1.com/2025/09/15/b2eb116026c54ead93ac75a6d1c01607.png",
          title: "东方幸福国际母婴会所",
          description: "月子中心一般为生产母亲提供专业产后恢复服务的场所，也称为月子会所，有专业营养师负责给产妇提供月子。"
        }
      ]
    };
  },
  mounted() {
    this.initScrollAnimation();
  },
  onLoad() {
    this.initScrollAnimation();
  },
  onShow() {
    this.initScrollAnimation();
  },
  methods: {
    // 跳转到最近动态页面
    goToRecentUpdates() {
      common_vendor.index.navigateTo({
        url: "/pages/recentUpdates/index"
      });
    },
    goToCooperationcase() {
      common_vendor.index.navigateTo({
        url: "/pages/case/index"
      });
    },
    // scroll-view 滚动事件处理
    onScroll(e) {
      this.handleScroll();
    },
    // 初始化滚动动画
    initScrollAnimation() {
      this.$nextTick(() => {
        setTimeout(() => {
          this.handleScroll();
        }, 100);
      });
    },
    // 处理滚动事件（添加节流优化）
    handleScroll() {
      if (this.scrollTimer) {
        clearTimeout(this.scrollTimer);
      }
      this.scrollTimer = setTimeout(() => {
        try {
          const systemInfo = common_vendor.index.getSystemInfoSync();
          const windowHeight = systemInfo.windowHeight;
          common_vendor.index.createSelectorQuery().in(this).selectAll(".list-item").boundingClientRect((rects) => {
            if (rects && rects.length > 0) {
              rects.forEach((rect, index) => {
                if (rect.top < windowHeight - 50 && rect.top > -rect.height) {
                  if (!this.visibleItems.includes(index)) {
                    setTimeout(() => {
                      if (!this.visibleItems.includes(index)) {
                        this.visibleItems.push(index);
                        console.log("触发列表项动画:", index);
                      }
                    }, index * 80);
                  }
                }
              });
            }
          }).exec();
          common_vendor.index.createSelectorQuery().in(this).selectAll(".dynamic-item").boundingClientRect((rects) => {
            if (rects && rects.length > 0) {
              rects.forEach((rect, index) => {
                if (rect.top < windowHeight - 50 && rect.top > -rect.height) {
                  if (!this.visibleDynamicItems.includes(index)) {
                    setTimeout(() => {
                      if (!this.visibleDynamicItems.includes(index)) {
                        this.visibleDynamicItems.push(index);
                        console.log("触发动态项动画:", index);
                      }
                    }, index * 120);
                  }
                }
              });
            }
          }).exec();
        } catch (error) {
          console.error("滚动动画处理错误:", error);
        }
      }, 16);
    },
    navigateToDetail() {
      common_vendor.index.navigateTo({
        url: "/pages/casedetails/index"
      });
    },
    getBackgroundColor(index) {
      const colors = ["#FFEFEB", "#DFF1FF", "#EDF1FF", "#DAF9FF"];
      return colors[index % 4];
    },
    // 轮播图点击事件
    onSlideshowClick(event) {
      console.log("轮播图点击:", event);
    },
    // 轮播图切换事件
    onSlideshowChange(event) {
      console.log("轮播图切换:", event);
    }
  },
  // 页面销毁时清理监听器和定时器
  beforeDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
    if (this.scrollTimer) {
      clearTimeout(this.scrollTimer);
    }
  }
};
if (!Array) {
  const _easycom_blur_swiper2 = common_vendor.resolveComponent("blur-swiper");
  _easycom_blur_swiper2();
}
const _easycom_blur_swiper = () => "../../components/blur-swiper/blur-swiper.js";
if (!Math) {
  _easycom_blur_swiper();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($options.onSlideshowChange),
    b: common_vendor.o($options.onSlideshowClick),
    c: common_vendor.p({
      list: $data.slideshowData,
      height: "800rpx",
      autoplay: true,
      interval: 4e3,
      showIndicator: true,
      gap: 50
    }),
    d: common_vendor.f($data.dynamicData, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.date),
        b: common_vendor.t(item.date),
        c: common_vendor.t(item.content),
        d: $data.visibleDynamicItems.includes(index) ? 1 : "",
        e: $data.visibleDynamicItems.includes(index) ? 1 : "",
        f: index < $data.dynamicData.length - 1
      }, index < $data.dynamicData.length - 1 ? {
        g: "step-line-" + index
      } : {}, {
        h: item.image,
        i: $data.visibleDynamicItems.includes(index) ? 1 : "",
        j: index
      });
    }),
    e: common_vendor.o((...args) => $options.goToRecentUpdates && $options.goToRecentUpdates(...args)),
    f: common_vendor.f($data.listData, (item, index, i0) => {
      return {
        a: item.image,
        b: common_vendor.t(item.title),
        c: common_vendor.t(item.description),
        d: index,
        e: $data.visibleItems.includes(index) ? 1 : "",
        f: $options.getBackgroundColor(index),
        g: common_vendor.o(($event) => $options.navigateToDetail(item), index)
      };
    }),
    g: common_vendor.o((...args) => $options.goToCooperationcase && $options.goToCooperationcase(...args)),
    h: common_vendor.o((...args) => $options.onScroll && $options.onScroll(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-fc420d75"]]);
_sfc_main.__runtimeHooks = 1;
wx.createPage(MiniProgramPage);
