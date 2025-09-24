"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "RecentUpdates",
  data() {
    return {
      updateList: [
        {
          date: "2024-01-15",
          title: "月子中心一般为生产母亲",
          description: "月子中心一般为生产母亲提供专业产后恢复（即坐月子）服务的场所，也称为月子会所",
          image: "http://cdn.xiaodingdang1.com/2025/09/24/0f0d79a3bc9c4bb999418531047e1af4.jpg"
        },
        {
          date: "2024-01-10",
          title: "月子中心一般为生产母亲",
          description: "月子中心一般为生产母亲提供专业产后恢复（即坐月子）服务的场所，也称为月子会所",
          image: "http://cdn.xiaodingdang1.com/2025/09/24/0f0d79a3bc9c4bb999418531047e1af4.jpg"
        },
        {
          date: "2024-01-05",
          title: "月子中心一般为生产母亲",
          description: "月子中心一般为生产母亲提供专业产后恢复（即坐月子）服务的场所，也称为月子会所",
          image: "http://cdn.xiaodingdang1.com/2025/09/24/0f0d79a3bc9c4bb999418531047e1af4.jpg"
        }
      ]
    };
  },
  methods: {
    next() {
      common_vendor.index.navigateTo({
        url: "/pages/recentdetails/index"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.updateList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.date),
        b: common_vendor.t(item.title),
        c: common_vendor.t(item.description),
        d: item.image,
        e: index,
        f: common_vendor.o((...args) => $options.next && $options.next(...args), index)
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-9b5f4591"]]);
wx.createPage(MiniProgramPage);
