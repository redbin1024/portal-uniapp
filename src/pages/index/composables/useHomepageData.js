import { ref, computed } from 'vue';
import { 
  getEnterpriseList, 
  getcaseList, 
  getCompanyNewsList, 
  getServiceList, 
  getProductIntroList 
} from '@/api/activity';

/**
 * 首页数据管理 Composable
 * 统一管理首页所有数据获取和状态
 */
export function useHomepageData() {
  // 企业信息
  const enterpriseList = ref({});
  
  // 案例列表
  const caseDataList = ref([]);
  
  // 公司动态列表
  const companyNewsList = ref([]);
  
  // 服务信息列表
  const serviceList = ref({});
  const serviceLists = ref([]);
  
  // 产品介绍列表
  const productIntroList = ref([]);

  /**
   * 业务系统/管理系统拆分逻辑
   */
  const isManagementService = (item) => {
    const name = item?.serviceName || '';
    return /管理|CRM/i.test(name);
  };

  // 业务系统列表
  const businessSystemList = computed(() =>
    serviceLists.value.filter((it) => !isManagementService(it))
  );

  // 管理系统列表
  const managementSystemList = computed(() =>
    serviceLists.value.filter((it) => isManagementService(it))
  );

  /**
   * 获取企业列表数据
   */
  const fetchEnterpriseList = async () => {
    try {
      const response = await getEnterpriseList({
        pageSize: 10,
        pageNum: 1,
      });
      
      if (response?.rows?.length > 0) {
        enterpriseList.value = response.rows[0];
        uni.setStorageSync('videoEnabled', response.rows[0].videoEnabled);
      }
    } catch (error) {
      console.error('获取企业列表失败:', error);
      uni.showToast({
        title: '获取企业列表失败',
        icon: 'none',
      });
    }
  };

  /**
   * 查询商家案例列表
   */
  const fetchCaseList = async () => {
    try {
      const response = await getcaseList({
        pageSize: 9,
        pageNum: 1,
      });
      
      if (response?.rows?.length > 0) {
        caseDataList.value = response.rows;
      }
    } catch (error) {
      console.error('获取案例列表失败:', error);
      uni.showToast({
        title: '获取案例列表失败',
        icon: 'none',
      });
    }
  };

  /**
   * 查询公司动态列表
   */
  const fetchCompanyNewsList = async () => {
    try {
      const response = await getCompanyNewsList({
        pageSize: 10,
        pageNum: 1,
        type: 0,
      });
      
      if (response?.rows?.length > 0) {
        companyNewsList.value = response.rows;
      }
    } catch (error) {
      console.error('获取公司动态列表失败:', error);
      uni.showToast({
        title: '获取公司动态列表失败',
        icon: 'none',
      });
    }
  };

  /**
   * 查询服务信息列表
   */
  const fetchServiceList = async () => {
    try {
      const response = await getServiceList({
        pageSize: 5,
        pageNum: 1,
      });
      
      if (response?.rows?.length > 0) {
        serviceList.value = response.rows[0];
        serviceLists.value = response.rows.slice(1);
      }
    } catch (error) {
      console.error('获取服务列表失败:', error);
      uni.showToast({
        title: '获取服务列表失败',
        icon: 'none',
      });
    }
  };

  /**
   * 查询产品介绍列表
   */
  const fetchProductIntroList = async () => {
    try {
      const response = await getProductIntroList({
        pageSize: 10,
        pageNum: 1,
      });
      
      if (response?.rows?.length > 0) {
        productIntroList.value = response.rows;
      }
    } catch (error) {
      console.error('获取产品介绍列表失败:', error);
      uni.showToast({
        title: '获取产品介绍列表失败',
        icon: 'none',
      });
    }
  };

  /**
   * 初始化所有数据
   */
  const initAllData = async () => {
    await Promise.all([
      fetchEnterpriseList(),
      fetchProductIntroList(),
      fetchServiceList(),
      fetchCompanyNewsList(),
      fetchCaseList(),
    ]);
  };

  return {
    // 数据
    enterpriseList,
    caseDataList,
    companyNewsList,
    serviceList,
    serviceLists,
    productIntroList,
    businessSystemList,
    managementSystemList,
    
    // 方法
    fetchEnterpriseList,
    fetchCaseList,
    fetchCompanyNewsList,
    fetchServiceList,
    fetchProductIntroList,
    initAllData,
  };
}

// Made with Bob
