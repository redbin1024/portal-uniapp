const WISDOM_CARD_THEMES = ['blue', 'purple', 'orange'];

const isObject = (value) => value && typeof value === 'object' && !Array.isArray(value);
const getSortValue = (item) => {
  const sortValue = Number(item?.sort);
  return Number.isFinite(sortValue) ? sortValue : Number.MAX_SAFE_INTEGER;
};
const sortWisdomTypes = (rows) =>
  (Array.isArray(rows) ? rows : []).slice().sort((left, right) => getSortValue(left) - getSortValue(right));

export function normalizeWisdomTypeRows(res) {
  if (!res) return [];
  if (Array.isArray(res)) return sortWisdomTypes(res);
  if (Array.isArray(res.rows)) return sortWisdomTypes(res.rows);
  if (Array.isArray(res.list)) return sortWisdomTypes(res.list);
  if (Array.isArray(res.records)) return sortWisdomTypes(res.records);

  const data = res.data;
  if (Array.isArray(data)) return sortWisdomTypes(data);
  if (!isObject(data)) return [];

  const rows = Array.isArray(data.rows)
    ? data.rows
    : Array.isArray(data.list)
      ? data.list
      : Array.isArray(data.records)
        ? data.records
        : Array.isArray(data.data)
          ? data.data
          : [];

  return sortWisdomTypes(rows);
}

export function normalizeWisdomTypeDetail(res) {
  if (!res) return null;
  if (isObject(res.data)) return res.data;
  if (isObject(res)) return res;
  return null;
}

export function mapWisdomTypeToCard(item, index = 0) {
  const theme = WISDOM_CARD_THEMES[index % WISDOM_CARD_THEMES.length];
  const typeName = item?.name || '月子智慧服务';

  return {
    id: Number(item?.id) || index + 1,
    theme,
    typeName,
    title: typeName,
    subtitle: item?.description || '',
    previewImage: item?.image || '',
  };
}

export function findWisdomTypeByName(typeList, typeName) {
  const rows = Array.isArray(typeList) ? typeList : [];
  const normalizedTypeName = String(typeName || '').trim();
  if (!normalizedTypeName) return null;

  return rows.find((item) => String(item?.name || '').trim() === normalizedTypeName) || null;
}

export function findWisdomTypeById(typeList, typeId) {
  const rows = Array.isArray(typeList) ? typeList : [];
  const normalizedTypeId = Number(typeId);
  if (!normalizedTypeId) return null;

  return rows.find((item) => Number(item?.id) === normalizedTypeId) || null;
}

export function isPrimaryWisdomType(typeList, typeName) {
  const rows = Array.isArray(typeList) ? typeList : [];
  if (!rows.length) return false;

  const firstType = sortWisdomTypes(rows)[0];

  return String(firstType?.name || '').trim() === String(typeName || '').trim();
}
