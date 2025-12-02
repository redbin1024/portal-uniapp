import { getTrackingStart, getTrackingEnd } from '@/api/activity.js'

const trackingStart = async (data) => {
  try {
    const response = await getTrackingStart(data)
    if (response.code === 200) {
        uni.setStorageSync('trackingId', response.data)
    }
    return response
  } catch (error) {
    return null
  }
}
const trackingEnd = async (data) => {
  try {
    const response = await getTrackingEnd(data)
    if (response.code === 200) {
        uni.removeStorageSync('trackingId')
    }
    return response
  } catch (error) {
    return null
  }
}
export default {
  trackingStart,
  trackingEnd
}