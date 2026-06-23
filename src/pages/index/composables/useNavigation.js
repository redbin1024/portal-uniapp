/**
 * 导航功能 Composable
 * 统一管理页面跳转逻辑
 */
export function useNavigation() {
  /**
   * 跳转到线上获客页面
   */
  const goToWinTheCustomer = () => {
    uni.switchTab({
      url: '/pages/winthecustomer/index',
    });
  };

  /**
   * 跳转到系统服务页面
   */
  const goToSystem = () => {
    uni.switchTab({
      url: '/pages/system/index',
    });
  };

  /**
   * 跳转到客户详情页面
   */
  const goToCustomerDetail = (serviceId) => {
    if (!serviceId) return;
    
    uni.navigateTo({
      url: `/pages/customer/index?serviceId=${serviceId}`,
    });
  };

  /**
   * 跳转到问题列表页面
   */
  const goToIssueList = () => {
    uni.navigateTo({
      url: '/pages/issueList/index',
    });
  };

  /**
   * 跳转到问题详情页面
   */
  const goToIssueDetail = (item) => {
    if (!item) return;

    if (item.introType === 2) {
      // 视频类型
      uni.navigateTo({
        url: `/pages/videoplay/index?url=${item.videoUrl}&visitContent=${item.title}`,
      });
    } else {
      // 其他类型
      uni.navigateTo({
        url: `/pages/issueDetails/index?introId=${item.introId}`,
      });
    }
  };

  /**
   * 查看更多案例
   */
  const viewMoreCases = () => {
    uni.switchTab({
      url: '/pages/winthecustomer/index',
    });
  };

  /**
   * 跳转到公司动态详情
   */
  const goToCompanyNewsDetail = (item) => {
    if (!item) return;
    
    uni.navigateTo({
      url: `/pages/firmdynamicdetails/index?item=${encodeURIComponent(JSON.stringify(item))}`,
    });
  };

  /**
   * 跳转到精准流量详情页面
   */
  const goToTrafficDetails = () => {
    uni.navigateTo({
      url: '/pages/trafficDetails/index',
    });
  };

  return {
    goToWinTheCustomer,
    goToSystem,
    goToCustomerDetail,
    goToIssueList,
    goToIssueDetail,
    viewMoreCases,
    goToCompanyNewsDetail,
    goToTrafficDetails,
  };
}

// Made with Bob
