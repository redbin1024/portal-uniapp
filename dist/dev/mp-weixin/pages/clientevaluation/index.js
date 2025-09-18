"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "ClientEvaluation",
  data() {
    return {
      // 瀑布流列数据
      columns: [[], []],
      // 列高度记录
      columnHeights: [0, 0],
      // 商家数据
      merchantData: [
        {
          id: 1,
          image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=400&h=500&fit=crop",
          overlayText: "月子中心上班Vlog",
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop",
          merchantName: "东方幸福国际母婴会所",
          height: 0
        },
        {
          id: 2,
          image: "https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?w=400&h=300&fit=crop",
          overlayText: "",
          avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop",
          merchantName: "长沙艾丽斯月子中心",
          height: 0
        },
        {
          id: 3,
          image: "https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=400&h=450&fit=crop",
          overlayText: "产后恢复日记",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop",
          merchantName: "悦享月子会所",
          height: 0
        },
        {
          id: 4,
          image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=350&fit=crop",
          overlayText: "",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop",
          merchantName: "贝康母婴护理中心",
          height: 0
        },
        {
          id: 5,
          image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=480&fit=crop",
          overlayText: "新生儿护理分享",
          avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop",
          merchantName: "馨月汇月子中心",
          height: 0
        },
        {
          id: 6,
          image: "https://images.unsplash.com/photo-1489710437720-ebb67ec84dd2?w=400&h=320&fit=crop",
          overlayText: "",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop",
          merchantName: "爱帝宫月子中心",
          height: 0
        },
        {
          id: 7,
          image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=420&fit=crop",
          overlayText: "月子餐食谱推荐",
          avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=50&h=50&fit=crop",
          merchantName: "圣贝拉母婴护理",
          height: 0
        },
        {
          id: 8,
          image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=380&fit=crop",
          overlayText: "",
          avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=50&h=50&fit=crop",
          merchantName: "优艾贝月子会所",
          height: 0
        }
      ]
    };
  },
  mounted() {
    this.initWaterfall();
  },
  methods: {
    // 初始化瀑布流
    initWaterfall() {
      this.columns = [[], []];
      this.columnHeights = [0, 0];
      this.merchantData.forEach((item) => {
        const minHeightIndex = this.columnHeights[0] <= this.columnHeights[1] ? 0 : 1;
        this.columns[minHeightIndex].push(item);
        const estimatedHeight = this.getEstimatedHeight(item);
        this.columnHeights[minHeightIndex] += estimatedHeight;
      });
    },
    // 估算卡片高度
    getEstimatedHeight(item) {
      const baseHeight = 200;
      const randomHeight = Math.random() * 150 + 100;
      return baseHeight + randomHeight;
    },
    // 图片加载完成
    onImageLoad(itemId, columnIndex, itemIndex) {
      console.log("Image loaded:", itemId);
    },
    // 处理卡片点击
    handleCardClick(item) {
      console.log("Card clicked:", item);
      common_vendor.index.showToast({
        title: item.merchantName,
        icon: "none"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.columns, (column, columnIndex, i0) => {
      return {
        a: common_vendor.f(column, (item, index, i1) => {
          return common_vendor.e({
            a: item.image,
            b: common_vendor.o(($event) => $options.onImageLoad(item.id, columnIndex, index), item.id),
            c: item.overlayText
          }, item.overlayText ? {
            d: common_vendor.t(item.overlayText)
          } : {}, {
            e: item.avatar,
            f: common_vendor.t(item.merchantName),
            g: item.id,
            h: common_vendor.o(($event) => $options.handleCardClick(item), item.id)
          });
        }),
        b: columnIndex
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-dbba45b8"]]);
wx.createPage(MiniProgramPage);
