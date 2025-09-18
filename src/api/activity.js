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

