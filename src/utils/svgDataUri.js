/**
 * 生成可复用的 SVG data URI，便于在多端以 <image> 的方式使用。
 * 注意：xmlns 必须为 "http://www.w3.org/2000/svg"。
 */
export const encodeSvg = (svgString = '') => {
  const optimized = svgString
    .replace(/\s{2,}/g, ' ')
    .replace(/[\r\n]+/g, ' ')
    .trim();
  return `data:image/svg+xml;utf8,${encodeURIComponent(optimized)}`;
};

/** 箭头（向右） */
export const createArrowRightIcon = (color = '#406CFF') =>
  encodeSvg(
    `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 5L17 12L9 19" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
  );

/** 箭头（向左） */
export const createArrowLeftIcon = (color = '#333333') =>
  encodeSvg(
    `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 5L7 12L15 19" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
  );

/** 关闭（X） */
export const createCloseIcon = (color = '#333333') =>
  encodeSvg(
    `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 6L18 18" stroke="${color}" stroke-width="2" stroke-linecap="round"/>
      <path d="M18 6L6 18" stroke="${color}" stroke-width="2" stroke-linecap="round"/>
    </svg>`,
  );

/** 向下箭头 */
export const createArrowDownIcon = (color = '#7F8593') =>
  encodeSvg(
    `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M6.42145 8.83372C6.23388 9.05543 5.76612 9.05543 5.57853 8.83372L1.06626 3.50024C0.878306 3.27805 1.11258 3 1.48773 3L10.5123 3C10.8874 3 11.1217 3.27805 10.9337 3.50024L6.42145 8.83372Z" fill="${color}"/>
    </svg>`,
  );

export default {
  encodeSvg,
  createArrowRightIcon,
  createArrowLeftIcon,
  createCloseIcon,
  createArrowDownIcon,
};
