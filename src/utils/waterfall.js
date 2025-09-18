/**
 * 瀑布流工具函数
 */

/**
 * 计算瀑布流布局
 * @param {Array} items - 数据项数组
 * @param {Number} columnCount - 列数
 * @param {Number} gap - 间距
 * @param {Function} getItemHeight - 获取项目高度的函数
 * @returns {Object} 布局信息
 */
export function calculateWaterfallLayout(items, columnCount = 2, gap = 8, getItemHeight) {
  const columns = Array.from({ length: columnCount }, () => [])
  const columnHeights = Array(columnCount).fill(0)
  const positions = new Map()

  items.forEach((item, index) => {
    // 找到最短的列
    const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights))
    
    // 计算项目高度
    const itemHeight = getItemHeight ? getItemHeight(item, index) : estimateItemHeight(item)
    const top = columnHeights[shortestColumnIndex]
    
    // 创建位置信息
    const position = {
      id: item.id || index,
      column: shortestColumnIndex,
      top,
      height: itemHeight,
      bottom: top + itemHeight,
      item
    }
    
    // 添加到对应列
    columns[shortestColumnIndex].push(position)
    positions.set(item.id || index, position)
    
    // 更新列高度
    columnHeights[shortestColumnIndex] += itemHeight + gap
  })

  return {
    columns,
    positions,
    totalHeight: Math.max(...columnHeights),
    columnHeights
  }
}

/**
 * 估算项目高度
 * @param {Object} item - 数据项
 * @returns {Number} 估算高度
 */
export function estimateItemHeight(item) {
  const baseImageHeight = 200
  const titleHeight = Math.ceil((item.title || '').length / 12) * 22
  const descHeight = item.description ? Math.ceil(item.description.length / 15) * 18 : 0
  const footerHeight = 44
  const padding = 24
  
  return baseImageHeight + titleHeight + descHeight + footerHeight + padding
}

/**
 * 获取可见项目
 * @param {Map} positions - 位置信息映射
 * @param {Number} scrollTop - 滚动位置
 * @param {Number} viewportHeight - 视口高度
 * @param {Number} buffer - 缓冲区大小
 * @returns {Array} 可见项目列表
 */
export function getVisibleItems(positions, scrollTop, viewportHeight, buffer = 200) {
  const visibleStart = Math.max(0, scrollTop - buffer)
  const visibleEnd = scrollTop + viewportHeight + buffer
  
  const visibleItems = []
  
  positions.forEach((position) => {
    if (position.bottom >= visibleStart && position.top <= visibleEnd) {
      visibleItems.push({
        ...position,
        visible: true
      })
    }
  })
  
  return visibleItems
}

/**
 * 格式化数量显示
 * @param {Number} count - 数量
 * @returns {String} 格式化后的字符串
 */
export function formatCount(count) {
  if (count >= 100000000) {
    return (count / 100000000).toFixed(1) + '亿'
  } else if (count >= 10000) {
    return (count / 10000).toFixed(1) + 'w'
  } else if (count >= 1000) {
    return (count / 1000).toFixed(1) + 'k'
  }
  return count.toString()
}

/**
 * 防抖函数
 * @param {Function} func - 要防抖的函数
 * @param {Number} wait - 等待时间
 * @returns {Function} 防抖后的函数
 */
export function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/**
 * 节流函数
 * @param {Function} func - 要节流的函数
 * @param {Number} limit - 时间限制
 * @returns {Function} 节流后的函数
 */
export function throttle(func, limit) {
  let inThrottle
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

/**
 * 生成随机颜色
 * @returns {String} 十六进制颜色值
 */
export function getRandomColor() {
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
    '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
    '#F8C471', '#82E0AA', '#F1948A', '#85C1E9', '#D7BDE2'
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}

/**
 * 生成模拟数据
 * @param {Number} count - 数据数量
 * @param {Number} startId - 起始ID
 * @returns {Array} 模拟数据数组
 */
export function generateMockData(count = 10, startId = 1) {
  const categories = ['设计', '开发', '咨询', '维护', '营销']
  const authors = ['张设计师', '李开发', '王顾问', '赵工程师', '孙经理', '周总监']
  const titles = [
    '这个设计真的太棒了，完全超出了我的预期',
    '开发团队非常专业，代码质量很高',
    '咨询服务很到位，给了很多有价值的建议',
    '维护响应很及时，技术支持很棒',
    '营销策略很有效，转化率提升明显',
    '用户体验设计很棒，界面简洁美观',
    '技术实现很稳定，性能优化做得很好',
    '项目管理很规范，进度控制得很好',
    '创意很新颖，品牌形象提升很大',
    '数据分析很详细，洞察很深入'
  ]
  
  const descriptions = [
    '整个合作过程非常愉快，团队专业度很高，沟通顺畅，最终效果完全达到了预期目标。',
    '从需求分析到最终交付，每个环节都很专业，特别是在细节处理上非常用心。',
    '不仅完成了基本需求，还提供了很多优化建议，帮助我们提升了整体效果。',
    '响应速度很快，遇到问题能够及时解决，服务态度也很好。',
    '性价比很高，质量超出预期，后续还会继续合作。',
    null, // 有些项目可能没有描述
    '团队很有创意，提供的方案很有新意，执行力也很强。',
    '技术实力很强，能够解决复杂的技术难题，值得信赖。'
  ]

  return Array.from({ length: count }, (_, index) => {
    const id = startId + index
    const randomHeight = 300 + Math.floor(Math.random() * 200)
    
    return {
      id,
      title: titles[Math.floor(Math.random() * titles.length)],
      description: descriptions[Math.floor(Math.random() * descriptions.length)],
      image: `https://picsum.photos/300/${randomHeight}?random=${id}`,
      avatar: `https://picsum.photos/100/100?random=${id + 1000}`,
      author: authors[Math.floor(Math.random() * authors.length)],
      likes: Math.floor(Math.random() * 5000) + 100,
      comments: Math.floor(Math.random() * 500) + 10,
      shares: Math.floor(Math.random() * 100) + 5,
      category: categories[Math.floor(Math.random() * categories.length)],
      isLiked: Math.random() > 0.7,
      isVideo: Math.random() > 0.8,
      createTime: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
      tags: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () => 
        categories[Math.floor(Math.random() * categories.length)]
      )
    }
  })
}

/**
 * 图片预加载
 * @param {String} src - 图片地址
 * @returns {Promise} 加载Promise
 */
export function preloadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

/**
 * 批量预加载图片
 * @param {Array} urls - 图片地址数组
 * @param {Function} onProgress - 进度回调
 * @returns {Promise} 加载Promise
 */
export function preloadImages(urls, onProgress) {
  let loaded = 0
  const total = urls.length
  
  const promises = urls.map(url => 
    preloadImage(url)
      .then(img => {
        loaded++
        onProgress && onProgress(loaded, total)
        return img
      })
      .catch(err => {
        loaded++
        onProgress && onProgress(loaded, total)
        return null
      })
  )
  
  return Promise.all(promises)
}

/**
 * 获取图片实际尺寸
 * @param {String} src - 图片地址
 * @returns {Promise} 尺寸信息
 */
export function getImageSize(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight,
        aspectRatio: img.naturalWidth / img.naturalHeight
      })
    }
    img.onerror = reject
    img.src = src
  })
}

/**
 * 计算响应式列数
 * @param {Number} containerWidth - 容器宽度
 * @param {Number} minColumnWidth - 最小列宽
 * @param {Number} maxColumns - 最大列数
 * @returns {Number} 计算出的列数
 */
export function calculateResponsiveColumns(containerWidth, minColumnWidth = 200, maxColumns = 4) {
  const columns = Math.floor(containerWidth / minColumnWidth)
  return Math.min(Math.max(columns, 1), maxColumns)
}