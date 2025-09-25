"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const buttonsVisible = common_vendor.ref(false);
    const titleVisible = common_vendor.ref(false);
    const headContentVisible = common_vendor.ref({});
    const content1Visible = common_vendor.ref([]);
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
    });
    common_vendor.ref([]);
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
                if (rect.top < windowHeight * 1 && rect.bottom > 0) {
                  setTimeout(() => {
                    if (!content1Visible.value[index]) {
                      content1Visible.value[index] = true;
                    }
                  }, index * 200);
                }
              }
            });
          });
        }
      }).exec();
    };
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
    const teamList = common_vendor.ref([
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
    const certificateList = common_vendor.ref([
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
    const businessPartnerList = common_vendor.ref([
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
    const currentIndex = common_vendor.ref(0);
    const showHeaderBg = common_vendor.ref(false);
    const onSwiperChange = (e) => {
      currentIndex.value = e.detail.current;
    };
    const goToSlide = (index) => {
      currentIndex.value = index;
    };
    const onBannerClick = (item, index) => {
      console.log("Banner clicked:", item, index);
    };
    const handleContactClick = () => {
      console.log("Contact clicked");
    };
    common_vendor.onPageScroll((e) => {
      showHeaderBg.value = e.scrollTop > 50;
      checkTitleVisibility();
      checkHeadContentVisibility();
      checkContent1Visibility();
      checkImageVisibility();
    });
    return (_ctx, _cache) => {
      return {
        a: showHeaderBg.value ? 1 : "",
        b: common_vendor.f(bannerList.value, (item, index, i0) => {
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
        c: common_vendor.o(onSwiperChange),
        d: common_vendor.f(bannerList.value, (item, index, i0) => {
          return {
            a: index,
            b: currentIndex.value === index ? 1 : "",
            c: common_vendor.o(($event) => goToSlide(index), index)
          };
        }),
        e: buttonsVisible.value ? 1 : "",
        f: buttonsVisible.value ? 1 : "",
        g: common_vendor.o(handleContactClick),
        h: buttonsVisible.value ? 1 : "",
        i: buttonsVisible.value ? 1 : "",
        j: common_vendor.o(handleContactClick),
        k: buttonsVisible.value ? 1 : "",
        l: buttonsVisible.value ? 1 : "",
        m: common_vendor.o(handleContactClick),
        n: titleVisible.value ? 1 : "",
        o: titleVisible.value ? 1 : "",
        p: common_vendor.f([1, 2, 3, 4, 5, 6], (item, index, i0) => {
          return {
            a: index,
            b: content1Visible.value[index] ? 1 : ""
          };
        }),
        q: headContentVisible.value[0] ? 1 : "",
        r: common_vendor.f(teamList.value, (team, index, i0) => {
          return {
            a: team.image,
            b: common_vendor.t(team.content),
            c: index
          };
        }),
        s: headContentVisible.value[1] ? 1 : "",
        t: common_vendor.f(certificateList.value, (certificate, index, i0) => {
          return {
            a: certificate.image,
            b: index
          };
        }),
        v: headContentVisible.value[2] ? 1 : "",
        w: common_vendor.f(businessPartnerList.value, (partner, index, i0) => {
          return {
            a: partner.image,
            b: index
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-46fe8b1b"]]);
_sfc_main.__runtimeHooks = 1;
wx.createPage(MiniProgramPage);
