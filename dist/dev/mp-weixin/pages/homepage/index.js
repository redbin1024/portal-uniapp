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
const api_activity = require("../../api/activity.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const buttonsVisible = common_vendor.ref(false);
    const titleVisible = common_vendor.ref(false);
    const headContentVisible = common_vendor.ref({});
    const content1Visible = common_vendor.ref([]);
    const fetchCompanyNewsList = () => __async(this, null, function* () {
      try {
        const response = yield api_activity.getCompanyNewsList({
          pageSize: 10,
          pageNum: 1,
          type: 0
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
    const fetchServiceList = () => __async(this, null, function* () {
      try {
        const response = yield api_activity.getServiceList({
          pageSize: 10,
          pageNum: 1
        });
        console.log("企业列表数据:", response);
        if (response && response.rows && Array.isArray(response.rows) && response.rows.length > 0) {
          serviceList.value = response.rows[0];
          serviceLists.value = response.rows.slice(1);
        }
      } catch (error) {
        console.error("获取企业列表失败:", error);
        common_vendor.index.showToast({
          title: "获取企业列表失败",
          icon: "none"
        });
      }
    });
    const fetchEnterpriseList = () => __async(this, null, function* () {
      try {
        const response = yield api_activity.getEnterpriseList({
          pageSize: 10,
          pageNum: 1
        });
        console.log("企业列表数据:", response);
        if (response && response.rows && Array.isArray(response.rows) && response.rows.length > 0) {
          enterpriseList.value = response.rows[0];
        }
      } catch (error) {
        console.error("获取企业列表失败:", error);
        common_vendor.index.showToast({
          title: "获取企业列表失败",
          icon: "none"
        });
      }
    });
    common_vendor.onMounted(() => {
      setTimeout(() => {
        buttonsVisible.value = true;
      }, 400);
      setTimeout(() => {
        checkTitleVisibility();
        checkHeadContentVisibility();
        checkContent1Visibility();
        checkImageVisibility();
      }, 100);
      fetchEnterpriseList();
      fetchServiceList();
      fetchCompanyNewsList();
    });
    const imagePopVisible = common_vendor.ref([]);
    const checkTitleVisibility = () => {
      if (titleVisible.value) {
        return;
      }
      const query = common_vendor.index.createSelectorQuery();
      query.selectAll(".winthecustomer-title").boundingClientRect((rects) => {
        if (rects && rects.length > 0) {
          rects.forEach((rect, index) => {
            common_vendor.index.getSystemInfo({
              success: (res) => {
                const windowHeight = res.windowHeight;
                if (rect.top < windowHeight * 0.85 && rect.bottom > 0 && !titleVisible.value) {
                  setTimeout(() => {
                    titleVisible.value = true;
                  }, index * 300);
                }
              }
            });
          });
        }
      }).exec();
    };
    const checkHeadContentVisibility = () => {
      const query = common_vendor.index.createSelectorQuery();
      query.selectAll(".headContent").boundingClientRect((rects) => {
        if (rects && rects.length > 0) {
          rects.forEach((rect, index) => {
            common_vendor.index.getSystemInfo({
              success: (res) => {
                const windowHeight = res.windowHeight;
                if (rect.top < windowHeight * 0.8 && rect.bottom > 0) {
                  setTimeout(() => {
                    headContentVisible.value[index] = true;
                  }, index * 300);
                }
              }
            });
          });
        }
      }).exec();
    };
    const checkContent1Visibility = () => {
      const query = common_vendor.index.createSelectorQuery();
      query.selectAll(".winthecustomer-content1").boundingClientRect((rects) => {
        if (rects && rects.length > 0) {
          rects.forEach((rect, index) => {
            common_vendor.index.getSystemInfo({
              success: (res) => {
                const windowHeight = res.windowHeight;
                if (rect.top < windowHeight * 0.85 && rect.bottom > 0) {
                  setTimeout(() => {
                    if (!content1Visible.value[index]) {
                      content1Visible.value[index] = true;
                    }
                  }, index * 150);
                }
              }
            });
          });
        }
      }).exec();
    };
    const checkImageVisibility = () => {
      const query = common_vendor.index.createSelectorQuery();
      query.selectAll(".certificate-item, .businesspartner-item, .teamappearance-item").boundingClientRect((rects) => {
        if (rects && rects.length > 0) {
          rects.forEach((rect, index) => {
            common_vendor.index.getSystemInfo({
              success: (res) => {
                const windowHeight = res.windowHeight;
                if (rect.top < windowHeight * 0.9 && rect.bottom > 0) {
                  setTimeout(() => {
                    if (!imagePopVisible.value[index]) {
                      imagePopVisible.value[index] = true;
                    }
                  }, index * 100);
                }
              }
            });
          });
        }
      }).exec();
    };
    common_vendor.ref([
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
    common_vendor.ref([
      {
        image: "http://cdn.xiaodingdang1.com/2025/09/17/e7c6eb7643134423ab31c7726397b807.png",
        title: "销售部",
        content: '拥有超过10年的建筑经验，包括担任奥地利"蓝天组"建筑事务所的首席设计师(奥地利的Coophimmelblau)和Hernan Diaz Alonso在洛杉矶的Xefirotarch。2008年得南加州建筑学院建筑学硕士学位。'
      },
      {
        image: "http://cdn.xiaodingdang1.com/2025/09/17/3e714aab0c1044f3a6d9ad78dc856e63.png",
        title: "技术部",
        content: "专业的技术团队，拥有丰富的软件开发经验，致力于为客户提供最优质的技术解决方案。团队成员均具备扎实的技术功底和创新思维。"
      },
      {
        image: "http://cdn.xiaodingdang1.com/2025/09/17/dff756b4214e4fdb94a2a803a38a16fa.png",
        title: "运营部",
        content: "负责公司日常运营管理，拥有丰富的项目管理经验。致力于优化业务流程，提升工作效率，确保项目顺利进行。"
      },
      {
        image: "http://cdn.xiaodingdang1.com/2025/09/12/bcf4ff23413847129727a6a265fd2b34.png",
        title: "市场部",
        content: "专业的市场推广团队，深谙市场营销策略，具备敏锐的市场洞察力，为公司业务拓展提供强有力的支持。"
      }
    ]);
    common_vendor.ref([
      {
        image: "http://cdn.xiaodingdang1.com/2025/09/18/fd0961babb634f3b9fefb2f9ad8c0855.png",
        name: "优秀企业证书"
      },
      {
        image: "http://cdn.xiaodingdang1.com/2025/09/18/fd0961babb634f3b9fefb2f9ad8c0855.png",
        name: "技术创新奖"
      },
      {
        image: "http://cdn.xiaodingdang1.com/2025/09/18/fd0961babb634f3b9fefb2f9ad8c0855.png",
        name: "服务质量奖"
      },
      {
        image: "http://cdn.xiaodingdang1.com/2025/09/18/fd0961babb634f3b9fefb2f9ad8c0855.png",
        name: "行业领先奖"
      },
      {
        image: "http://cdn.xiaodingdang1.com/2025/09/18/fd0961babb634f3b9fefb2f9ad8c0855.png",
        name: "客户满意奖"
      }
    ]);
    common_vendor.ref([
      {
        image: "http://cdn.xiaodingdang1.com/2025/09/18/cc70bc251d644d78866a0ad1e0ba546c.png",
        name: "合作伙伴1"
      },
      {
        image: "http://cdn.xiaodingdang1.com/2025/09/18/cc70bc251d644d78866a0ad1e0ba546c.png",
        name: "合作伙伴2"
      },
      {
        image: "http://cdn.xiaodingdang1.com/2025/09/18/cc70bc251d644d78866a0ad1e0ba546c.png",
        name: "合作伙伴3"
      },
      {
        image: "http://cdn.xiaodingdang1.com/2025/09/18/cc70bc251d644d78866a0ad1e0ba546c.png",
        name: "合作伙伴4"
      },
      {
        image: "http://cdn.xiaodingdang1.com/2025/09/18/cc70bc251d644d78866a0ad1e0ba546c.png",
        name: "合作伙伴5"
      },
      {
        image: "http://cdn.xiaodingdang1.com/2025/09/18/cc70bc251d644d78866a0ad1e0ba546c.png",
        name: "合作伙伴5"
      },
      {
        image: "http://cdn.xiaodingdang1.com/2025/09/18/cc70bc251d644d78866a0ad1e0ba546c.png",
        name: "合作伙伴5"
      },
      {
        image: "http://cdn.xiaodingdang1.com/2025/09/18/cc70bc251d644d78866a0ad1e0ba546c.png",
        name: "合作伙伴5"
      }
    ]);
    const enterpriseList = common_vendor.ref([]);
    const serviceList = common_vendor.ref([]);
    const serviceLists = common_vendor.ref([]);
    const companyNewsList = common_vendor.ref([]);
    const currentIndex = common_vendor.ref(0);
    const showHeaderBg = common_vendor.ref(false);
    const onSwiperChange = (e) => {
      currentIndex.value = e.detail.current;
    };
    const showPreview = common_vendor.ref(false);
    const previewMedia = common_vendor.ref({
      src: "",
      type: "image",
      // 'image' 或 'video'
      index: 0
    });
    const isVideo = (url) => {
      if (!url)
        return false;
      const videoExtensions = [
        ".mp4",
        ".webm",
        ".ogg",
        ".mov",
        ".avi",
        ".wmv",
        ".flv",
        ".mkv"
      ];
      const urlLower = url.toLowerCase();
      return videoExtensions.some((ext) => urlLower.includes(ext));
    };
    const getVideoPoster = (videoUrl) => {
      return videoUrl.replace(
        /\.(mp4|webm|ogg|mov|avi|wmv|flv|mkv)$/i,
        "_poster.jpg"
      );
    };
    const onMediaClick = (item, index, type) => {
      console.log("Media clicked:", item, index, type);
      previewMedia.value = {
        src: item,
        type,
        index
      };
      showPreview.value = true;
    };
    const closePreview = () => {
      showPreview.value = false;
    };
    const prevMedia = () => {
      const currentIndex2 = previewMedia.value.index;
      const newIndex = currentIndex2 > 0 ? currentIndex2 - 1 : enterpriseList.value.bannerImages.length - 1;
      const newSrc = enterpriseList.value.bannerImages[newIndex];
      previewMedia.value = {
        src: newSrc,
        type: isVideo(newSrc) ? "video" : "image",
        index: newIndex
      };
    };
    const nextMedia = () => {
      const currentIndex2 = previewMedia.value.index;
      const newIndex = currentIndex2 < enterpriseList.value.bannerImages.length - 1 ? currentIndex2 + 1 : 0;
      const newSrc = enterpriseList.value.bannerImages[newIndex];
      previewMedia.value = {
        src: newSrc,
        type: isVideo(newSrc) ? "video" : "image",
        index: newIndex
      };
    };
    const handleContactClick = () => {
      console.log("Contact clicked");
    };
    const getFirstRowCertificates = (certificates) => {
      if (!certificates || !Array.isArray(certificates))
        return [];
      return certificates.filter((_, index) => index % 2 === 0);
    };
    const getSecondRowCertificates = (certificates) => {
      if (!certificates || !Array.isArray(certificates))
        return [];
      return certificates.filter((_, index) => index % 2 === 1);
    };
    const getFirstRowPartners = (partners) => {
      if (!partners || !Array.isArray(partners))
        return [];
      return partners.filter((_, index) => index % 2 === 0);
    };
    const getSecondRowPartners = (partners) => {
      if (!partners || !Array.isArray(partners))
        return [];
      return partners.filter((_, index) => index % 2 === 1);
    };
    common_vendor.onPageScroll((e) => {
      showHeaderBg.value = e.scrollTop > 50;
      checkTitleVisibility();
      checkHeadContentVisibility();
      checkContent1Visibility();
      checkImageVisibility();
    });
    return (_ctx, _cache) => {
      var _a, _b, _c, _d, _e, _f;
      return common_vendor.e({
        a: common_vendor.t(enterpriseList.value.enterpriseName),
        b: showHeaderBg.value ? 1 : "",
        c: common_vendor.f(enterpriseList.value.bannerImages, (item, index, i0) => {
          return common_vendor.e({
            a: isVideo(item)
          }, isVideo(item) ? {
            b: item,
            c: getVideoPoster(item),
            d: common_vendor.o(($event) => onMediaClick(item, index, "video"), index),
            e: common_vendor.o(($event) => onMediaClick(item, index, "video"), index)
          } : {
            f: item,
            g: common_vendor.o(($event) => onMediaClick(item, index, "image"), index)
          }, {
            h: index
          });
        }),
        d: common_vendor.o(onSwiperChange),
        e: common_vendor.t(enterpriseList.value.enterpriseName),
        f: common_vendor.t(enterpriseList.value.enterpriseDescription),
        g: buttonsVisible.value ? 1 : "",
        h: buttonsVisible.value ? 1 : "",
        i: common_vendor.o(handleContactClick),
        j: buttonsVisible.value ? 1 : "",
        k: buttonsVisible.value ? 1 : "",
        l: common_vendor.o(handleContactClick),
        m: buttonsVisible.value ? 1 : "",
        n: buttonsVisible.value ? 1 : "",
        o: common_vendor.o(handleContactClick),
        p: titleVisible.value ? 1 : "",
        q: (_b = (_a = serviceList.value) == null ? void 0 : _a.serviceImage) == null ? void 0 : _b[0]
      }, ((_d = (_c = serviceList.value) == null ? void 0 : _c.serviceImage) == null ? void 0 : _d[0]) ? {
        r: (_f = (_e = serviceList.value) == null ? void 0 : _e.serviceImage) == null ? void 0 : _f[0]
      } : {}, {
        s: titleVisible.value ? 1 : "",
        t: common_vendor.f(serviceLists.value, (item, index, i0) => {
          return {
            a: item.serviceImage,
            b: common_vendor.t(item.serviceName),
            c: index,
            d: content1Visible.value[index] ? 1 : ""
          };
        }),
        v: headContentVisible.value[0] ? 1 : "",
        w: common_vendor.f(companyNewsList.value, (team, index, i0) => {
          var _a2, _b2, _c2;
          return common_vendor.e({
            a: (_a2 = team.newsImages) == null ? void 0 : _a2[0]
          }, ((_b2 = team.newsImages) == null ? void 0 : _b2[0]) ? {
            b: (_c2 = team.newsImages) == null ? void 0 : _c2[0]
          } : {}, {
            c: common_vendor.t(team.newsTitle),
            d: index
          });
        }),
        x: headContentVisible.value[1] ? 1 : "",
        y: common_vendor.f(getFirstRowCertificates(enterpriseList.value.honorCertificates), (certificate, index, i0) => {
          return {
            a: certificate,
            b: "row1-" + index
          };
        }),
        z: getSecondRowCertificates(enterpriseList.value.honorCertificates).length > 0
      }, getSecondRowCertificates(enterpriseList.value.honorCertificates).length > 0 ? {
        A: common_vendor.f(getSecondRowCertificates(enterpriseList.value.honorCertificates), (certificate, index, i0) => {
          return {
            a: certificate,
            b: "row2-" + index
          };
        })
      } : {}, {
        B: headContentVisible.value[2] ? 1 : "",
        C: common_vendor.f(getFirstRowPartners(enterpriseList.value.cooperationMerchants), (partner, index, i0) => {
          return {
            a: partner,
            b: "row1-" + index
          };
        }),
        D: getSecondRowPartners(enterpriseList.value.cooperationMerchants).length > 0
      }, getSecondRowPartners(enterpriseList.value.cooperationMerchants).length > 0 ? {
        E: common_vendor.f(getSecondRowPartners(enterpriseList.value.cooperationMerchants), (partner, index, i0) => {
          return {
            a: partner,
            b: "row2-" + index
          };
        })
      } : {}, {
        F: showPreview.value
      }, showPreview.value ? common_vendor.e({
        G: common_vendor.o(closePreview),
        H: enterpriseList.value.bannerImages && enterpriseList.value.bannerImages.length > 1
      }, enterpriseList.value.bannerImages && enterpriseList.value.bannerImages.length > 1 ? {
        I: common_vendor.o(prevMedia)
      } : {}, {
        J: enterpriseList.value.bannerImages && enterpriseList.value.bannerImages.length > 1
      }, enterpriseList.value.bannerImages && enterpriseList.value.bannerImages.length > 1 ? {
        K: common_vendor.o(nextMedia)
      } : {}, {
        L: previewMedia.value.type === "video"
      }, previewMedia.value.type === "video" ? {
        M: previewMedia.value.src,
        N: getVideoPoster(previewMedia.value.src)
      } : {
        O: previewMedia.value.src
      }, {
        P: common_vendor.t(previewMedia.value.index + 1),
        Q: common_vendor.t(enterpriseList.value.bannerImages ? enterpriseList.value.bannerImages.length : 0),
        R: common_vendor.o(() => {
        }),
        S: common_vendor.o(closePreview)
      }) : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-46fe8b1b"]]);
_sfc_main.__runtimeHooks = 1;
wx.createPage(MiniProgramPage);
