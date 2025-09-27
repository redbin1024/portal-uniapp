import { get } from '@/utils/request.js'

/**
 * 获取活动详情
 * @param {string} activityId 活动ID
 * @returns {Promise} 返回活动详情数据
 */
export function getActivityDetail(activityId) {
  return get('mp/club/activity_detail', {
    activityId
  })
}
/**
 * 获取活动详情
 * @param {string} activityId 活动ID
 * @param {Object} params 分页参数
 * @param {number} params.pageSize 每页数量
 * @param {number} params.pageNum 页码
 * @returns {Promise} 返回活动详情数据
 */
export function getFeedPostPage(params = {}) {
  return get('mp/feed_post/get_feed_post_page', {
    ...params
  })
}
/**
 * 
 * @param {查询企业基础信息列表}   
 * @returns 
 */
export function getEnterpriseList(params = {}) {
  return get('/mp/tk/enterprise/list', {
    ...params
  })
}

/**
 * 
 * @param {查询服务信息列表}   
 * @returns 
 */
export function getServiceList(params = {}) {
  return get('/mp/tk/service/list', {
    ...params
  })
}

/**
 * 
 * @param {查询公司动态列表}   
 * @returns 
 */
export function getCompanyNewsList(params = {}) {
  return get('/mp/tk/companyNews/list', {
    ...params
  })
}


/**
 * 
 * @param {查询商家案例列表}   
 * @returns 
 */
export function getcaseList(params = {}) {
  return get('/mp/tk/case/list', {
    ...params
  })
}

/**
 * 
 * @param {查询商家案例列表}   
 * @returns 
 */
export function getsuccessCaseList(params = {}) {
  return get('/mp/tk/successCase/list', {
    ...params
  })
}