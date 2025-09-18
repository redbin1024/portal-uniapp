"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const bannerList = common_vendor.ref([
      {
        image: "http://cdn.xiaodingdang1.com/2025/09/17/3e714aab0c1044f3a6d9ad78dc856e63.png",
        title: "专业团队",
        desc: "拥有多年行业经验的专业团队"
      },
      {
        image: "http://cdn.xiaodingdang1.com/2025/09/17/dff756b4214e4fdb94a2a803a38a16fa.png",
        title: "优质服务",
        desc: "为客户提供一站式解决方案"
      },
      {
        image: "http://cdn.xiaodingdang1.com/2025/09/12/bcf4ff23413847129727a6a265fd2b34.png",
        title: "创新技术",
        desc: "运用最新技术为客户创造价值"
      }
    ]);
    const currentIndex = common_vendor.ref(0);
    const roomList = common_vendor.ref([
      {
        projectName: "张三 - 技术总监",
        displayPhotos: [
          "http://cdn.xiaodingdang1.com/2025/09/17/3e714aab0c1044f3a6d9ad78dc856e63.png"
        ],
        tag: ["Vue.js", "Node.js", "架构设计"],
        prices: "面议"
      },
      {
        projectName: "李四 - 产品经理",
        displayPhotos: [
          "http://cdn.xiaodingdang1.com/2025/09/17/3e714aab0c1044f3a6d9ad78dc856e63.png"
        ],
        tag: ["产品规划", "用户体验", "项目管理"],
        prices: "面议"
      },
      {
        projectName: "王五 - UI设计师",
        displayPhotos: [
          "http://cdn.xiaodingdang1.com/2025/09/17/3e714aab0c1044f3a6d9ad78dc856e63.png"
        ],
        tag: ["UI设计", "交互设计", "Figma"],
        prices: "面议"
      },
      {
        projectName: "赵六 - 前端工程师",
        displayPhotos: [
          "http://cdn.xiaodingdang1.com/2025/09/17/3e714aab0c1044f3a6d9ad78dc856e63.png"
        ],
        tag: ["React", "TypeScript", "移动端"],
        prices: "面议"
      }
    ]);
    const topStyle = common_vendor.ref("top-style");
    const onSwiperChange = (e) => {
      currentIndex.value = e.detail.current;
    };
    const onBannerClick = (item, index) => {
      console.log("点击了轮播图:", item, index);
    };
    const goToSlide = (index) => {
      currentIndex.value = index;
    };
    const handleContactClick = () => {
      console.log("点击了联系我们");
      common_vendor.index.showToast({
        title: "联系功能开发中",
        icon: "none"
      });
    };
    const postpartumNext = (item) => {
      console.log("点击了团队成员:", item);
      common_vendor.index.showToast({
        title: `查看${item.projectName}详情`,
        icon: "none"
      });
    };
    common_vendor.onMounted(() => {
      console.log("页面加载完成");
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(bannerList.value, (item, index, i0) => {
          return common_vendor.e({
            a: item.image,
            b: common_vendor.o(($event) => onBannerClick(item, index), index),
            c: item.title || item.desc
          }, item.title || item.desc ? common_vendor.e({
            d: item.title
          }, item.title ? {
            e: common_vendor.t(item.title)
          } : {}, {
            f: item.desc
          }, item.desc ? {
            g: common_vendor.t(item.desc)
          } : {}) : {}, {
            h: index
          });
        }),
        b: common_vendor.o(onSwiperChange),
        c: common_vendor.f(bannerList.value, (item, index, i0) => {
          return {
            a: index,
            b: currentIndex.value === index ? 1 : "",
            c: common_vendor.o(($event) => goToSlide(index), index)
          };
        }),
        d: common_vendor.o(handleContactClick),
        e: common_vendor.o(handleContactClick),
        f: common_vendor.o(handleContactClick),
        g: common_vendor.f(roomList.value, (item, index, i0) => {
          return {
            a: item.displayPhotos[0],
            b: common_vendor.t(item.projectName),
            c: common_vendor.f(item.tag, (tag, tagIndex, i1) => {
              return {
                a: common_vendor.t(tag),
                b: tagIndex
              };
            }),
            d: common_vendor.t(item.prices),
            e: index,
            f: common_vendor.o(($event) => postpartumNext(item), index)
          };
        }),
        h: common_vendor.n(topStyle.value)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-83a5a03c"]]);
wx.createPage(MiniProgramPage);
