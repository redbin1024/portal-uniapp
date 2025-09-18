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
