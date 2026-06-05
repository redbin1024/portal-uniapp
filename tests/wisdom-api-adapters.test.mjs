import test from 'node:test';
import assert from 'node:assert/strict';
import {
  normalizeWisdomTypeRows,
  mapWisdomTypeToCard,
  normalizeWisdomTypeDetail,
  isPrimaryWisdomType,
  findWisdomTypeByName,
  findWisdomTypeById,
} from '../src/pages/wisdom/apiAdapters.mjs';

test('normalizeWisdomTypeRows supports nested data.rows response and sorts by sort asc', () => {
  const rows = normalizeWisdomTypeRows({
    code: 200,
    data: {
      rows: [
        { id: 2, name: '深度客户教育', sort: 3 },
        { id: 1, name: '精准客源获取', sort: 1 },
        { id: 3, name: '高效成交转化', sort: 2 },
      ],
    },
  });

  assert.deepEqual(rows, [
    { id: 1, name: '精准客源获取', sort: 1 },
    { id: 3, name: '高效成交转化', sort: 2 },
    { id: 2, name: '深度客户教育', sort: 3 },
  ]);
});

test('mapWisdomTypeToCard maps type detail fields to card fields', () => {
  const card = mapWisdomTypeToCard({
    id: 7,
    name: '高效成交转化',
    description: '直播转化・活动爆破・签单增长',
    image: 'https://example.com/demo.png',
  });

  assert.deepEqual(card, {
    id: 7,
    theme: 'blue',
    typeName: '高效成交转化',
    title: '高效成交转化',
    subtitle: '直播转化・活动爆破・签单增长',
    previewImage: 'https://example.com/demo.png',
  });
});

test('normalizeWisdomTypeDetail supports direct data object response', () => {
  const detail = normalizeWisdomTypeDetail({
    code: 200,
    data: {
      id: 3,
      name: '产后护理',
      description: '专业的产后护理知识和技巧',
      image: 'https://example.com/1.jpg',
    },
  });

  assert.equal(detail.id, 3);
  assert.equal(detail.name, '产后护理');
  assert.equal(detail.description, '专业的产后护理知识和技巧');
  assert.equal(detail.image, 'https://example.com/1.jpg');
});

test('isPrimaryWisdomType checks the first type by sort', () => {
  const rows = [
    { id: 5, name: '深度客户教育', sort: 2 },
    { id: 9, name: '精准客源获取', sort: 1 },
  ];

  assert.equal(isPrimaryWisdomType(rows, '精准客源获取'), true);
  assert.equal(isPrimaryWisdomType(rows, '深度客户教育'), false);
});

test('findWisdomTypeByName finds type by name', () => {
  const rows = [
    { id: 5, name: '深度客户教育', sort: 2 },
    { id: 9, name: '精准客源获取', sort: 1 },
  ];

  assert.deepEqual(findWisdomTypeByName(rows, '深度客户教育'), {
    id: 5,
    name: '深度客户教育',
    sort: 2,
  });
  assert.equal(findWisdomTypeByName(rows, '不存在'), null);
});

test('findWisdomTypeById finds type by id', () => {
  const rows = [
    { id: 5, name: '深度客户教育', sort: 2 },
    { id: 9, name: '精准客源获取', sort: 1 },
  ];

  assert.deepEqual(findWisdomTypeById(rows, 9), {
    id: 9,
    name: '精准客源获取',
    sort: 1,
  });
  assert.equal(findWisdomTypeById(rows, 0), null);
});
