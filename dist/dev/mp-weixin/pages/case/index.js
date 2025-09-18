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
      ]
    };
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
        d: index,
        e: $options.getBackgroundColor(index),
        f: common_vendor.o(($event) => $options.navigateToDetail(item), index)
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-2786c006"]]);
wx.createPage(MiniProgramPage);
