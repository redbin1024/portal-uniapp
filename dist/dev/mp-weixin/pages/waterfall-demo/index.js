"use strict";
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "WaterfallDemo",
  data() {
    return {
      loading: false,
      columns: [[], [], []],
      // 三列瀑布流
      items: [],
      page: 1,
      pageSize: 20
    };
  },
  onLoad() {
    this.loadData();
  },
  onReachBottom() {
    this.loadMore();
  },
  methods: {
    // 加载数据
    loadData() {
      return __async(this, null, function* () {
        this.loading = true;
        try {
          const newItems = this.generateMockData();
          this.items = [...this.items, ...newItems];
          this.distributeItems();
        } catch (error) {
          console.error("加载数据失败:", error);
          common_vendor.index.showToast({
            title: "加载失败",
            icon: "none"
          });
        } finally {
          this.loading = false;
        }
      });
    },
    // 加载更多
    loadMore() {
      if (this.loading)
        return;
      this.page++;
      this.loadData();
    },
    // 生成模拟数据
    generateMockData() {
      const mockData = [];
      for (let i = 0; i < this.pageSize; i++) {
        const id = (this.page - 1) * this.pageSize + i + 1;
        mockData.push({
          id,
          title: `项目案例 ${id}`,
          description: `这是第 ${id} 个项目的详细描述，展示了我们团队的专业能力和创新思维。`,
          image: `https://picsum.photos/300/${200 + Math.floor(Math.random() * 200)}?random=${id}`,
          height: 200 + Math.floor(Math.random() * 200)
          // 随机高度
        });
      }
      return mockData;
    },
    // 分配项目到不同列
    distributeItems() {
      this.columns = [[], [], []];
      this.items.forEach((item) => {
        const shortestColumnIndex = this.getShortestColumnIndex();
        this.columns[shortestColumnIndex].push(item);
      });
    },
    // 获取最短列的索引
    getShortestColumnIndex() {
      let shortestIndex = 0;
      let shortestHeight = this.getColumnHeight(0);
      for (let i = 1; i < this.columns.length; i++) {
        const height = this.getColumnHeight(i);
        if (height < shortestHeight) {
          shortestHeight = height;
          shortestIndex = i;
        }
      }
      return shortestIndex;
    },
    // 计算列的总高度
    getColumnHeight(columnIndex) {
      return this.columns[columnIndex].reduce(
        (total, item) => total + item.height + 20,
        0
      );
    },
    // 图片加载完成
    onImageLoad() {
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($data.columns, (column, columnIndex, i0) => {
      return {
        a: common_vendor.f(column, (item, k1, i1) => {
          return {
            a: item.image,
            b: common_vendor.o((...args) => $options.onImageLoad && $options.onImageLoad(...args), item.id),
            c: common_vendor.t(item.title),
            d: common_vendor.t(item.description),
            e: item.id,
            f: item.height + "px"
          };
        }),
        b: columnIndex
      };
    }),
    b: $data.loading
  }, $data.loading ? {} : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-336331b8"]]);
wx.createPage(MiniProgramPage);
