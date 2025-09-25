"use strict";
const common_vendor = require("../../common/vendor.js");
const BlurSwiper = () => "../../components/blur-swiper/blur-swiper.js";
const _sfc_main = {
  name: "About",
  components: {
    "blur-swiper": BlurSwiper
  },
  data() {
    return {
      activeTab: 0,
      // 默认选中第一个
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
      ]
    };
  },
  methods: {
    switchTab(index) {
      this.activeTab = index;
    },
    next() {
      common_vendor.index.navigateTo({
        url: "/pages/customer/index"
      });
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
  return common_vendor.e({
    a: $data.activeTab === 0 ? "http://cdn.xiaodingdang1.com/2025/09/25/7c516c90b157468c8edbbaf68cb83934.png" : "http://cdn.xiaodingdang1.com/2025/09/25/edccf81f026f4b6f9e840aa44464722e.png",
    b: $data.activeTab === 0 ? 1 : "",
    c: common_vendor.o(($event) => $options.switchTab(0)),
    d: $data.activeTab === 1 ? "http://cdn.xiaodingdang1.com/2025/09/25/250cd94c9cf64e5cb0c0dec53715acdc.png" : "http://cdn.xiaodingdang1.com/2025/09/25/ee13d09dee5d4323b111d0f6f2af4705.png",
    e: $data.activeTab === 1 ? 1 : "",
    f: common_vendor.o(($event) => $options.switchTab(1)),
    g: $data.activeTab == 0
  }, $data.activeTab == 0 ? {
    h: common_vendor.o(_ctx.onSlideshowChange),
    i: common_vendor.o(_ctx.onSlideshowClick),
    j: common_vendor.p({
      list: $data.slideshowData,
      height: "800rpx",
      autoplay: true,
      interval: 4e3,
      showIndicator: true,
      gap: 50
    })
  } : {}, {
    k: $data.activeTab == 1
  }, $data.activeTab == 1 ? {
    l: common_vendor.f([1, 2, 3, 4, 5], (item, index, i0) => {
      return {
        a: index,
        b: common_vendor.o(($event) => $options.next(), index)
      };
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e4863047"]]);
wx.createPage(MiniProgramPage);
