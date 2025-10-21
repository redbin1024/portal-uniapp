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
const common_vendor = require("../../../common/vendor.js");
const api_activity = require("../../../api/activity.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const richText = common_vendor.ref("");
    const visibleDynamicItems = common_vendor.ref([]);
    const visibleListItems = common_vendor.ref([]);
    const scrollTimer = common_vendor.ref(null);
    const observer = common_vendor.ref(null);
    const showDynamicViewMoreBtn = common_vendor.ref(false);
    const showCaseViewMoreBtn = common_vendor.ref(false);
    const caseList = common_vendor.ref([]);
    const imgList = common_vendor.ref([]);
    const companyNewsList = common_vendor.ref([]);
    const successCaseList = common_vendor.ref([]);
    common_vendor.reactive([
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
      }
    ]);
    common_vendor.reactive([
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
    ]);
    common_vendor.reactive([
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
    ]);
    const fetchServiceList = () => __async(this, null, function* () {
      try {
        const response = yield api_activity.getServiceList({
          pageSize: 5,
          pageNum: 1
        });
        console.log("企业列表数据:", response);
        if (response && response.rows && Array.isArray(response.rows) && response.rows.length > 0) {
          processContent(response.rows[0].serviceDescription);
        }
      } catch (error) {
        console.error("获取企业列表失败:", error);
        common_vendor.index.showToast({
          title: "获取企业列表失败",
          icon: "none"
        });
      }
    });
    const processContent = (content) => {
      richText.value = content.replace(/<img[^>]*>/gi, function(match, capture) {
        return match.replace(/style=".*"/gi, "").replace(/style='.*'/gi, "");
      }).replace(/\<img/gi, '<img style="width:100%;height:auto;display:block;"');
    };
    const fetchsuccessCaseList = () => __async(this, null, function* () {
      try {
        const response = yield api_activity.getsuccessCaseList({
          pageSize: 4,
          pageNum: 1
        });
        console.log("企业列表数据:", response);
        if (response && response.rows && Array.isArray(response.rows) && response.rows.length > 0) {
          successCaseList.value = response.rows;
        }
      } catch (error) {
        console.error("获取企业列表失败:", error);
        common_vendor.index.showToast({
          title: "获取企业列表失败",
          icon: "none"
        });
      }
    });
    const fetchCompanyNewsList = () => __async(this, null, function* () {
      try {
        const response = yield api_activity.getCompanyNewsList({
          pageSize: 4,
          pageNum: 1,
          type: 1
        });
        console.log("企业列表数据:", response);
        if (response && response.rows && Array.isArray(response.rows) && response.rows.length > 0) {
          companyNewsList.value = response.rows;
        }
      } catch (error) {
        console.error("获取企业列表失败:", error);
        common_vendor.index.showToast({
          title: "获取企业列表失败",
          icon: "none"
        });
      }
    });
    const fetchcaseList = () => __async(this, null, function* () {
      try {
        const response = yield api_activity.getcaseList({
          pageSize: 10,
          pageNum: 1
        });
        console.log("案例列表数据:", response);
        if (response && response.rows) {
          let data = response.rows;
          let slideshowData = [];
          data.forEach((res, index) => {
            if (res.caseImages && res.caseImages.length > 0) {
              slideshowData.push({
                type: "video",
                url: res.caseImages[0],
                src: res.caseImages[0],
                poster: res.caseImages && res.caseImages[0] ? res.caseImages[0] : "",
                title: res.caseName || "",
                description: res.caseDescription || "",
                id: res.id || index,
                autoplay: false,
                loop: false,
                muted: true,
                // 默认静音自动播放
                controls: true,
                showFullscreenBtn: true,
                caseTitle: res.caseTitle
              });
            } else if (res.caseImages && res.caseImages.length > 0) {
              slideshowData.push({
                type: "image",
                url: res.caseImages[0],
                src: res.caseImages[0],
                title: res.caseName || "",
                description: res.caseDescription || "",
                id: res.id || index,
                caseTitle: res.caseTitle
              });
            }
          });
          console.log("案例轮播数据:", slideshowData);
          caseList.value = slideshowData;
          imgList.value = slideshowData;
        }
      } catch (error) {
        console.error("获取案例列表失败:", error);
        common_vendor.index.showToast({
          title: "获取案例列表失败",
          icon: "none"
        });
      }
    });
    const navigateToRecentDetails = (item) => {
      common_vendor.index.navigateTo({
        url: "/pages/recentdetails/index?item=" + encodeURIComponent(JSON.stringify(item))
      });
    };
    const goToRecentUpdates = () => {
      common_vendor.index.navigateTo({
        url: "/pages/recentUpdatesnew/index"
      });
    };
    const goToCooperationcase = () => {
      common_vendor.index.navigateTo({
        url: "/pages/case/index"
      });
    };
    const onScroll = (e) => {
      checkListItemVisibility();
      checkDynamicItemVisibility();
    };
    const checkListItemVisibility = () => {
      const query = common_vendor.index.createSelectorQuery();
      query.selectAll(".list-item").boundingClientRect((rects) => {
        if (rects && rects.length > 0) {
          rects.forEach((rect, index) => {
            common_vendor.index.getSystemInfo({
              success: (res) => {
                const windowHeight = res.windowHeight;
                if (rect.top < windowHeight * 0.85 && rect.bottom > 0) {
                  setTimeout(() => {
                    if (!visibleListItems.value[index]) {
                      visibleListItems.value[index] = true;
                    }
                    const visibleCount = visibleListItems.value.filter(Boolean).length;
                    if (visibleCount === successCaseList.value.length) {
                      setTimeout(() => {
                        showCaseViewMoreBtn.value = true;
                      }, 500);
                    }
                  }, index * 150);
                }
              }
            });
          });
        }
      }).exec();
    };
    const checkDynamicItemVisibility = () => {
      const query = common_vendor.index.createSelectorQuery();
      query.selectAll(".dynamic-item").boundingClientRect((rects) => {
        if (rects && rects.length > 0) {
          rects.forEach((rect, index) => {
            common_vendor.index.getSystemInfo({
              success: (res) => {
                const windowHeight = res.windowHeight;
                if (rect.top < windowHeight * 0.85 && rect.bottom > 0) {
                  setTimeout(() => {
                    if (!visibleDynamicItems.value.includes(index)) {
                      visibleDynamicItems.value.push(index);
                    }
                    if (visibleDynamicItems.value.length === companyNewsList.value.length) {
                      setTimeout(() => {
                        showDynamicViewMoreBtn.value = true;
                      }, 500);
                    }
                  }, index * 200);
                }
              }
            });
          });
        }
      }).exec();
    };
    const showAllDynamicItems = () => {
      companyNewsList.value.forEach((_, index) => {
        setTimeout(() => {
          if (!visibleDynamicItems.value.includes(index)) {
            visibleDynamicItems.value.push(index);
          }
          if (visibleDynamicItems.value.length === companyNewsList.value.length) {
            setTimeout(() => {
              showDynamicViewMoreBtn.value = true;
            }, 500);
          }
        }, index * 200);
      });
    };
    const navigateToDetail = (item) => {
      common_vendor.index.navigateTo({
        url: "/pages/casedetails/index?item=" + encodeURIComponent(JSON.stringify(item))
      });
    };
    const getBackgroundColor = (index) => {
      const colors = ["#FFEFEB", "#DFF1FF", "#EDF1FF", "#DAF9FF"];
      return colors[index % 4];
    };
    common_vendor.onMounted(() => {
      setTimeout(() => {
        checkListItemVisibility();
        showAllDynamicItems();
      }, 100);
      fetchcaseList();
      fetchCompanyNewsList();
      fetchsuccessCaseList();
      fetchServiceList();
    });
    common_vendor.onBeforeUnmount(() => {
      if (observer.value) {
        observer.value.disconnect();
      }
      if (scrollTimer.value) {
        clearTimeout(scrollTimer.value);
      }
    });
    const formatDate = (dateStr) => {
      if (!dateStr)
        return "";
      return dateStr.split(" ")[0];
    };
    common_vendor.onLoad(() => {
    });
    common_vendor.onShow(() => {
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(companyNewsList.value, (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(formatDate(item.createTime)),
            b: common_vendor.t(item.newsTitle),
            c: common_vendor.t(item.newsContent),
            d: visibleDynamicItems.value.includes(index) ? 1 : "",
            e: visibleDynamicItems.value.includes(index) ? 1 : "",
            f: index < companyNewsList.value.length - 1
          }, index < companyNewsList.value.length - 1 ? {
            g: "step-line-" + index
          } : {}, {
            h: item.newsImages[0],
            i: visibleDynamicItems.value.includes(index) ? 1 : "",
            j: index,
            k: common_vendor.o(($event) => navigateToRecentDetails(item), index)
          });
        }),
        b: showDynamicViewMoreBtn.value ? 1 : "",
        c: showDynamicViewMoreBtn.value,
        d: common_vendor.o(goToRecentUpdates),
        e: common_vendor.f(successCaseList.value, (item, index, i0) => {
          return {
            a: item.caseImages[0],
            b: common_vendor.t(item.customerName),
            c: common_vendor.t(item.caseValue),
            d: index,
            e: visibleListItems.value[index] ? 1 : "",
            f: getBackgroundColor(index),
            g: common_vendor.o(($event) => navigateToDetail(item), index)
          };
        }),
        f: showCaseViewMoreBtn.value ? 1 : "",
        g: showCaseViewMoreBtn.value,
        h: common_vendor.o(goToCooperationcase),
        i: richText.value,
        j: common_vendor.o(onScroll)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d3baa155"]]);
_sfc_main.__runtimeHooks = 1;
wx.createPage(MiniProgramPage);
