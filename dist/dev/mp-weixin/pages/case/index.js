"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "CaseDetails",
  data() {
    return {
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
      ],
      animatedItems: []
    };
  },
  mounted() {
    this.initAnimation();
  },
  onPageScroll(e) {
    this.handleScroll(e);
  },
  methods: {
    navigateToDetail() {
      common_vendor.index.navigateTo({
        url: "/pages/casedetails/index"
      });
    },
    getBackgroundColor(index) {
      const colors = ["#FFEFEB", "#DFF1FF", "#EDF1FF", "#DAF9FF"];
      return colors[index % 4];
    },
    // 初始化动画 - 页面进入时的弹出效果
    initAnimation() {
      this.$nextTick(() => {
        setTimeout(() => {
          this.listData.forEach((_, index) => {
            setTimeout(() => {
              this.$set(this.animatedItems, index, true);
            }, index * 150);
          });
        }, 200);
      });
    },
    // 处理滚动事件
    handleScroll(e) {
      e.scrollTop;
      common_vendor.index.createSelectorQuery().in(this).selectAll(".list-item").boundingClientRect((rects) => {
        if (rects) {
          rects.forEach((rect, index) => {
            if (rect.top < common_vendor.index.getSystemInfoSync().windowHeight * 0.8 && rect.bottom > 0) {
              if (!this.animatedItems[index]) {
                this.$set(this.animatedItems, index, true);
              }
            }
          });
        }
      }).exec();
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.listData, (item, index, i0) => {
      return {
        a: item.image,
        b: common_vendor.t(item.title),
        c: common_vendor.t(item.description),
        d: $data.animatedItems[index] ? 1 : "",
        e: index,
        f: $options.getBackgroundColor(index),
        g: common_vendor.o(($event) => $options.navigateToDetail(item), index)
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-2786c006"]]);
_sfc_main.__runtimeHooks = 1;
wx.createPage(MiniProgramPage);
