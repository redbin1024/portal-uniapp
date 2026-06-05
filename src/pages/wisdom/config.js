export const wisdomCardBgImage = '/static/widsom/card_bg.png';

export const wisdomStepCards = [
  {
    id: 1,
    theme: 'blue',
    title: '精准客源获取',
    subtitle: '客源拓展・客户培育・成交转化',
    previewImage:
      'https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/80635948576/099d/7794/384e/7a286a0b3cade7410099c5b8597c6a1c.png',
  },
  {
    id: 2,
    theme: 'purple',
    title: '深度客户教育',
    subtitle: '官网承接・内容种草・信任建立',
    previewImage:
      'http://cdn.xiaodingdang1.com/2026/01/07/c4032fd2437547538d32d660aba816b9.png',
  },
  {
    id: 3,
    theme: 'orange',
    title: '高效成交转化',
    subtitle: '直播转化・活动爆破・签单增长',
    previewImage:
      'http://cdn.xiaodingdang1.com/2026/01/07/eef8835804c445578657bcd774639c8f.png',
  },
];

export const getWisdomStepCard = (step) => {
  const stepId = Number(step) || 1;
  return wisdomStepCards.find((item) => item.id === stepId) || wisdomStepCards[0];
};

export const formatWisdomImageUrl = (url) => {
  if (!url) return '';
  const imageUrl = String(url);
  if (/image_process=format,webp/i.test(imageUrl)) return imageUrl;
  if (/^(data:|blob:|wxfile:|file:|\/static\/)/i.test(imageUrl)) return imageUrl;

  const hashIndex = imageUrl.indexOf('#');
  const hash = hashIndex >= 0 ? imageUrl.slice(hashIndex) : '';
  const baseUrl = hashIndex >= 0 ? imageUrl.slice(0, hashIndex) : imageUrl;
  const separator = baseUrl.includes('?') ? '&' : '?';

  return `${baseUrl}${separator}image_process=format,webp${hash}`;
};

export const getWisdomTabIcon = (name, itemImage) => {
  if (
    itemImage &&
    itemImage.startsWith('http') &&
    !itemImage.includes('example.com')
  ) {
    return formatWisdomImageUrl(itemImage);
  }

  const cleanName = String(name || '');
  if (cleanName.includes('线上')) return '/static/widsom/01.png';
  if (cleanName.includes('工具')) return '/static/widsom/02.png';
  if (cleanName.includes('官网') || cleanName.includes('门店'))
    return '/static/widsom/03.png';
  if (cleanName.includes('AI') || cleanName.includes('助手'))
    return '/static/widsom/04.png';
  if (cleanName.includes('直播')) return '/static/widsom/05.png';
  if (cleanName.includes('活动')) return '/static/widsom/06.png';
  return '/static/widsom/01.png';
};
