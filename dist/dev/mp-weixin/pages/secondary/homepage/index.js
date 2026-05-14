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
const utils_basePoint = require("../../../utils/basePoint.js");
if (!Math) {
  (AnimateOnView + CompanyHistory + BusinessPartner + TrafficBanner + BusinessSystem + ProblemList + HonorCertificate + MediaPreview + CustomerServiceBtn)();
}
const CompanyHistory = () => "./components/CompanyHistory.js";
const BusinessPartner = () => "./components/BusinessPartner.js";
const TrafficBanner = () => "./components/TrafficBanner.js";
const BusinessSystem = () => "./components/BusinessSystem.js";
const ProblemList = () => "./components/ProblemList.js";
const HonorCertificate = () => "./components/HonorCertificate.js";
const CustomerServiceBtn = () => "../../../components/CustomerServiceBtn/CustomerServiceBtn.js";
const MediaPreview = () => "../../../components/MediaPreview/MediaPreview.js";
const AnimateOnView = () => "../../../components/AnimateOnView/AnimateOnView.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    common_vendor.ref(false);
    const caseDataList = common_vendor.ref([]);
    const viewmore = () => {
      common_vendor.index.navigateTo({
        url: "/pages/secondary/businesspartner/index"
      });
    };
    const goToIssueList = () => {
      common_vendor.index.navigateTo({
        url: "/pages/secondary/issueList/index"
      });
    };
    const caseList = () => __async(this, null, function* () {
      try {
        const response = yield api_activity.getcaseList({
          pageSize: 9,
          pageNum: 1
        });
        console.log("企业列表数据:", response);
        if (response && response.rows && Array.isArray(response.rows) && response.rows.length > 0) {
          caseDataList.value = response.rows;
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
    const nextDetile = (item) => {
      try {
        common_vendor.index.switchTab({
          url: "/pages/secondary/winthecustomer/index"
        });
      } catch (error) {
        console.error("序列化参数失败:", error);
        common_vendor.index.showToast({
          title: "参数传递失败",
          icon: "none"
        });
      }
    };
    const fetchServiceList = () => __async(this, null, function* () {
      try {
        const response = yield api_activity.getServiceList({
          pageSize: 5,
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
    const productIntroList = common_vendor.ref([]);
    const fetchProductIntroList = () => __async(this, null, function* () {
      try {
        const response = yield api_activity.getProductIntroList({
          pageSize: 10,
          pageNum: 1
        });
        console.log("产品介绍列表数据:", response);
        if (response && response.rows && Array.isArray(response.rows) && response.rows.length > 0) {
          productIntroList.value = response.rows;
        }
      } catch (error) {
        console.error("获取产品介绍列表失败:", error);
        common_vendor.index.showToast({
          title: "获取产品介绍列表失败",
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
          common_vendor.index.setStorageSync("videoEnabled", response.rows[0].videoEnabled);
        }
      } catch (error) {
        console.error("获取企业列表失败:", error);
        common_vendor.index.showToast({
          title: "获取企业列表失败",
          icon: "none"
        });
      }
    });
    const goToIndex = (item) => {
      if (item.introType == 2) {
        common_vendor.index.navigateTo({
          url: "/pages/secondary/index/index?url=" + item.videoUrl + "&visitContent=" + item.title
        });
      } else {
        common_vendor.index.navigateTo({
          url: "/pages/secondary/issueDetails/index?introId=" + item.introId
        });
      }
    };
    common_vendor.onMounted(() => {
      fetchEnterpriseList();
      fetchProductIntroList();
      fetchServiceList();
      fetchCompanyNewsList();
      caseList();
    });
    common_vendor.onShow(() => __async(this, null, function* () {
      yield utils_basePoint.basePoint.trackingStart({
        visitModule: "首页",
        visitContent: "首页"
      });
    }));
    common_vendor.onHide(() => __async(this, null, function* () {
      let trackingId = common_vendor.index.getStorageSync("trackingId");
      if (trackingId) {
        yield utils_basePoint.basePoint.trackingEnd({
          id: trackingId
        });
      }
    }));
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
    const isManagementService = (item) => {
      const name = (item == null ? void 0 : item.serviceName) || "";
      return /管理|CRM/i.test(name);
    };
    const businessSystemList = common_vendor.computed(
      () => serviceLists.value.filter((it) => !isManagementService(it))
    );
    const managementSystemList = common_vendor.computed(
      () => serviceLists.value.filter((it) => isManagementService(it))
    );
    const companyNewsList = common_vendor.ref([]);
    common_vendor.ref(0);
    common_vendor.ref(false);
    common_vendor.ref([
      {
        title: "服务笔记",
        desc: "客户总是要打开怎么教你如何用系统一次性解决"
      },
      {
        title: "宝妈站台",
        desc: "销售如何做到10分钟完成客户信任，快速签单"
      },
      {
        title: "宝妈站台",
        desc: "遇到客户在网上诋毁，会所该如何自救"
      },
      {
        title: "宝宝请帖",
        desc: "如何0成本做品牌曝光？如何0成本做线上获客"
      },
      {
        title: "AI智能销售",
        desc: "每个月到手的资源流失率超过80%，如何用系统完美解决"
      },
      {
        title: "客户轨迹",
        desc: "如何快速找到客户真实需求进行针对性营销 快速拿下订单"
      }
    ]);
    common_vendor.ref([
      "http://cdn.xiaodingdang1.com/2026/01/07/329586497cb141d69864b7ffe44c01e2.png",
      "http://cdn.xiaodingdang1.com/2026/01/07/3c68ffd0fa574800b29257226f5d92cf.png",
      "http://cdn.xiaodingdang1.com/2026/01/07/3500dffbb8d24fa1970e0e1c33a9fcd4.png",
      "http://cdn.xiaodingdang1.com/2026/01/07/a4859ef57e154df784dde7f35a99a3a8.png",
      "http://cdn.xiaodingdang1.com/2026/01/07/eb5b036256d842e199c48424b5bda131.png",
      "http://cdn.xiaodingdang1.com/2026/01/07/303e3c6ea6b34406bf1024b2cb0e9a70.png"
    ]);
    common_vendor.ref([
      "http://cdn.xiaodingdang1.com/2026/01/08/9d67dbc7bde141f1a0d1b0f65a8e86d4.png",
      "http://cdn.xiaodingdang1.com/2026/01/08/9d67dbc7bde141f1a0d1b0f65a8e86d4.png",
      "http://cdn.xiaodingdang1.com/2026/01/08/9d67dbc7bde141f1a0d1b0f65a8e86d4.png",
      "http://cdn.xiaodingdang1.com/2026/01/08/9d67dbc7bde141f1a0d1b0f65a8e86d4.png",
      "http://cdn.xiaodingdang1.com/2026/01/08/9d67dbc7bde141f1a0d1b0f65a8e86d4.png",
      "http://cdn.xiaodingdang1.com/2026/01/08/9d67dbc7bde141f1a0d1b0f65a8e86d4.png"
    ]);
    common_vendor.ref(0);
    common_vendor.ref(1);
    common_vendor.ref(0);
    common_vendor.ref(-1);
    common_vendor.ref(0);
    common_vendor.ref(0);
    common_vendor.ref(0);
    common_vendor.ref(0);
    common_vendor.ref(false);
    const showPreview = common_vendor.ref(false);
    const isVideoFullscreen = common_vendor.ref(false);
    const previewMedia = common_vendor.ref({
      src: "",
      type: "image",
      // 'image' 或 'video'
      index: 0
    });
    const next = (item) => {
      try {
        common_vendor.index.navigateTo({
          url: "/pages/customer/index?serviceId=" + item.serviceId
        });
      } catch (error) {
        console.error("序列化参数失败:", error);
        common_vendor.index.showToast({
          title: "参数传递失败",
          icon: "none"
        });
      }
    };
    const handleCustomerServiceClick = () => {
      console.log("Customer service clicked");
    };
    common_vendor.onPageScroll((e) => {
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(enterpriseList.value.enterpriseName || "天天拓客"),
        b: common_vendor.t(enterpriseList.value.enterpriseIntroOne || "天天拓客是一家集网络运营、母婴行业软件开发、互联网服务于一体的网络科技公司。4年专注母婴行业，为月子中心提供全案运营、长期陪跑服务，解决月子中心经营难题的实战派团队。"),
        c: common_vendor.t(enterpriseList.value.enterpriseIntroTwo || "“宝妈小叮当”是公司系统品牌，致力于通过“天天拓客”的服务体系与“宝妈小叮当”的系统工具，双轮驱动助力月子中心满房盈利。"),
        d: common_vendor.p({
          animation: "fade-up",
          duration: 1200
        }),
        e: common_vendor.p({
          animation: "flip-up",
          delay: 80,
          duration: 1100
        }),
        f: enterpriseList.value.videoEnabled
      }, enterpriseList.value.videoEnabled ? {
        g: common_vendor.o(viewmore),
        h: common_vendor.p({
          list: caseDataList.value
        })
      } : {}, {
        i: common_vendor.p({
          animation: "bounce-in",
          duration: 1200
        }),
        j: enterpriseList.value.videoEnabled && enterpriseList.value.bannerImages && enterpriseList.value.bannerImages[0]
      }, enterpriseList.value.videoEnabled && enterpriseList.value.bannerImages && enterpriseList.value.bannerImages[0] ? {
        k: enterpriseList.value.bannerImages[0] + "?image_process=format,webp"
      } : {}, {
        l: common_vendor.p({
          animation: "zoom-in",
          duration: 1100
        }),
        m: common_vendor.o(nextDetile),
        n: common_vendor.p({
          animation: "slide-right",
          duration: 1100
        }),
        o: common_vendor.o(next),
        p: common_vendor.p({
          title: "宝妈小叮当",
          subtitle: "业务系统",
          list: businessSystemList.value
        }),
        q: common_vendor.p({
          animation: "flip-up",
          duration: 1100
        }),
        r: common_vendor.o(next),
        s: common_vendor.p({
          title: "宝妈小叮当",
          subtitle: "管理系统",
          list: managementSystemList.value
        }),
        t: common_vendor.p({
          animation: "slide-left",
          duration: 1100
        }),
        v: productIntroList.value.length > 0
      }, productIntroList.value.length > 0 ? {
        w: common_vendor.o(goToIndex),
        x: common_vendor.o(goToIssueList),
        y: common_vendor.p({
          list: productIntroList.value,
          limit: 4
        })
      } : {}, {
        z: common_vendor.p({
          animation: "bounce-in",
          duration: 1200
        }),
        A: enterpriseList.value.honorCertificates && enterpriseList.value.honorCertificates.length
      }, enterpriseList.value.honorCertificates && enterpriseList.value.honorCertificates.length ? {
        B: common_vendor.p({
          list: enterpriseList.value.honorCertificates,
          duration: 30
        })
      } : {}, {
        C: common_vendor.p({
          animation: "zoom-in",
          duration: 1100
        }),
        D: common_vendor.t(enterpriseList.value.enterpriseAddress),
        E: `url(${enterpriseList.value.enterpriseLogo}?image_process=format,webp)`,
        F: common_vendor.o(($event) => isVideoFullscreen.value = $event),
        G: common_vendor.o(($event) => showPreview.value = $event),
        H: common_vendor.p({
          media: previewMedia.value,
          visible: showPreview.value
        }),
        I: common_vendor.o(handleCustomerServiceClick),
        J: common_vendor.p({
          bottom: 160
        }),
        K: showPreview.value ? 1 : ""
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-24abe20b"]]);
_sfc_main.__runtimeHooks = 7;
wx.createPage(MiniProgramPage);
