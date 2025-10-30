"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
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
    const richTextImages = common_vendor.ref([]);
    const onRichTextItemClick = (event) => {
      var _a;
      if ((_a = event.detail) == null ? void 0 : _a.src) {
        const clickedSrc = event.detail.src;
        let index = richTextImages.value.findIndex(
          (imgSrc) => imgSrc === clickedSrc
        );
        if (index === -1) {
          try {
            const decodedSrc = decodeURIComponent(clickedSrc);
            index = richTextImages.value.findIndex(
              (imgSrc) => imgSrc === decodedSrc
            );
          } catch (e) {
            console.log("Decode URI failed:", e);
          }
        }
        if (index === -1) {
          index = 0;
        }
        if (richTextImages.value.length > 0) {
          common_vendor.index.previewImage({
            urls: richTextImages.value,
            current: index
          });
        }
      }
    };
    const processContent = (content) => {
      const imgSrcRegex = /<img[^>]*src=['"]([^'"]+)['"][^>]*>/gi;
      let match;
      const images = [];
      while ((match = imgSrcRegex.exec(content)) !== null) {
        console.log("提取到的图片链接:", match[1]);
        images.push(match[1]);
      }
      richTextImages.value = images;
      let imgIndex = 0;
      richText.value = content.replace(/<img[^>]*>/gi, function(match2) {
        match2 = match2.replace(/style=".*"/gi, "").replace(/style='.*'/gi, "");
        const result = match2.replace(
          /<img/gi,
          `<img data-index="${imgIndex}" style="width:100%;height:auto;display:block;"`
        );
        imgIndex++;
        return result;
      });
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
    const truncateText = (text, maxLength) => {
      if (!text)
        return "";
      return text.length > maxLength ? text.substring(0, maxLength) : text;
    };
    const fetchCompanyNewsList = () => __async(this, null, function* () {
      try {
        const response = yield api_activity.getCompanyNewsList({
          pageSize: 4,
          pageNum: 1,
          type: 1
        });
        console.log("公司动态数据:", response);
        if (response && response.rows && Array.isArray(response.rows) && response.rows.length > 0) {
          const processedData = response.rows.map((item, index) => {
            console.log(`处理第${index + 1}个动态项:`, item);
            const newsTitle = item.newsTitle || item.title || `动态标题${index + 1}`;
            const newsContent = item.newsContent || item.content || item.description || `动态内容${index + 1}`;
            const createTime = item.createTime || item.createDate || item.date || (/* @__PURE__ */ new Date()).toISOString();
            let newsImages = [];
            if (item.newsImages && Array.isArray(item.newsImages) && item.newsImages.length > 0) {
              newsImages = item.newsImages;
            } else if (item.images && Array.isArray(item.images) && item.images.length > 0) {
              newsImages = item.images;
            } else if (item.image) {
              newsImages = [item.image];
            } else {
              newsImages = [
                "http://cdn.xiaodingdang1.com/2025/09/15/cbbd7e2aa0cd4016b59a3f31dbe46cb2.png"
              ];
            }
            return __spreadProps(__spreadValues({}, item), {
              newsTitle: truncateText(newsTitle, 21),
              newsContent: truncateText(newsContent, 24),
              newsImages,
              createTime,
              newsId: item.newsId || item.id || index + 1
            });
          });
          console.log("处理后的动态数据:", processedData);
          companyNewsList.value = processedData;
          setTimeout(() => {
            checkDynamicItemVisibility();
            showAllDynamicItems();
          }, 100);
        } else {
          console.log("没有获取到动态数据，使用默认数据");
          const defaultData = [
            {
              newsId: 1,
              newsTitle: "公司成功完成新项目",
              newsContent: "我们很高兴地宣布，公司成功完成了最新的软件开发项目。",
              createTime: "2024-10-25",
              newsImages: [
                "http://cdn.xiaodingdang1.com/2025/09/15/cbbd7e2aa0cd4016b59a3f31dbe46cb2.png"
              ]
            },
            {
              newsId: 2,
              newsTitle: "技术团队培训完成",
              newsContent: "我们的技术团队完成了新一轮的技能培训，提升了服务质量。",
              createTime: "2024-10-20",
              newsImages: [
                "http://cdn.xiaodingdang1.com/2025/09/15/d177663900974c55bd7b9d093b77c379.png"
              ]
            },
            {
              newsId: 3,
              newsTitle: "客户满意度持续提升",
              newsContent: "通过持续优化服务流程，我们的客户满意度达到了新的高度。",
              createTime: "2024-10-15",
              newsImages: [
                "http://cdn.xiaodingdang1.com/2025/09/15/b2eb116026c54ead93ac75a6d1c01607.png"
              ]
            }
          ];
          companyNewsList.value = defaultData;
          setTimeout(() => {
            showAllDynamicItems();
          }, 100);
        }
      } catch (error) {
        console.error("获取公司动态失败:", error);
        common_vendor.index.showToast({
          title: "获取动态信息失败",
          icon: "none"
        });
        const fallbackData = [
          {
            newsId: 1,
            newsTitle: "欢迎了解我们的服务",
            newsContent: "我们致力于为客户提供最优质的技术解决方案。",
            createTime: "2024-10-30",
            newsImages: [
              "http://cdn.xiaodingdang1.com/2025/09/15/cbbd7e2aa0cd4016b59a3f31dbe46cb2.png"
            ]
          }
        ];
        companyNewsList.value = fallbackData;
        setTimeout(() => {
          showAllDynamicItems();
        }, 100);
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
        url: "/pages/recentdetails/index?newsId=" + item.newsId
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
            setTimeout(() => {
              if (!visibleDynamicItems.value.includes(index)) {
                visibleDynamicItems.value.push(index);
              }
              if (visibleDynamicItems.value.length === companyNewsList.value.length) {
                setTimeout(() => {
                  showDynamicViewMoreBtn.value = true;
                }, 200);
              }
            }, index * 50);
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
        showAllDynamicItems();
        checkListItemVisibility();
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
            h: item.newsImages[0] + "?image_process=format,webp",
            i: visibleDynamicItems.value.includes(index) ? 1 : "",
            j: index,
            k: visibleDynamicItems.value.includes(index) ? 1 : "",
            l: common_vendor.o(($event) => navigateToRecentDetails(item), index)
          });
        }),
        b: showDynamicViewMoreBtn.value ? 1 : "",
        c: showDynamicViewMoreBtn.value,
        d: common_vendor.o(goToRecentUpdates),
        e: common_vendor.f(successCaseList.value, (item, index, i0) => {
          return {
            a: item.caseImages[0] + "?image_process=format,webp",
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
        j: common_vendor.o(onRichTextItemClick),
        k: common_vendor.o(onScroll)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d3baa155"]]);
_sfc_main.__runtimeHooks = 7;
wx.createPage(MiniProgramPage);
