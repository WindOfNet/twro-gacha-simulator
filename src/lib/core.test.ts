import { draw } from './core';
import { describe, expect, test } from 'vitest';
import gachas from '../gachas';

describe('gachas config', () => {
  // gachas 是一個陣列
  test('gachas is an array', () => {
    expect(gachas).toBeInstanceOf(Array);
  });

  // gachas 中的每個元素都應該是 Gacha 類型
  test('gachas is an array of Gacha', () => {
    gachas.forEach((gacha) => {
      expect(gacha).toHaveProperty('name');
      expect(gacha).toHaveProperty('fixedItems');
      expect(gacha).toHaveProperty('items');
    });
  });

  // gachas 中的每個元素都應該有 name 和 fixedItems 和 items 屬性
  test('gachas have name and fixedItems and items', () => {
    gachas.forEach((gacha) => {
      expect(gacha).toHaveProperty('name');
      expect(gacha).toHaveProperty('fixedItems');
      expect(gacha).toHaveProperty('items');
    });
  });

  // gachas 中的 fixedItems 中的每個元素都應該有 name 和 count 兩個屬性
  // count 應該是一個大於等於 0 的數字
  test('gacha fixedItems have name and count', () => {
    gachas.forEach((gachaItem) => {
      gachaItem.fixedItems.forEach((item) => {
        expect(item).toHaveProperty('name');
        expect(item).toHaveProperty('count');
        expect(item.count).toBeGreaterThanOrEqual(0);
      });
    });
  });

  // gacha items  中的每個元素都應該有 name 和 count 和 rate 兩個屬性
  // count 應該是一個大於等於 0 的數字
  // rate 應該是一個大於等於 0 的數字
  test('gacha items have name and count and rate', () => {
    gachas.forEach((gachaItem) => {
      gachaItem.items.forEach((item) => {
        expect(item).toHaveProperty('name');
        expect(item).toHaveProperty('count');
        expect(item).toHaveProperty('rate');
        expect(item.count).toBeGreaterThanOrEqual(0);
        expect(item.rate).toBeGreaterThanOrEqual(0);
      });
    });
  });

  // gacha items 中的 rate 總和應該是 100
  test('gacha items rate sum is 100', () => {
    gachas.forEach((gachaItem) => {
      let totalRate = 0;
      gachaItem.items.forEach((item) => (totalRate += item.rate));
      expect(totalRate.toFixed(4)).toBe('100.0000');
    });
  });
});

describe('draw', () => {
  gachas.forEach((currentGacha) => {
    const result = draw(currentGacha);

    // result 是一個 GachaDrawResult 類型
    // result.gacha 應該等於 currentGacha
    // result.fixedItems 應該等於 currentGacha.fixedItems
    // result.randomItem 應該是 currentGacha.items 中的一個元素
    test('drawItem', () => {
      expect(result).toHaveProperty('gacha');
      expect(result).toHaveProperty('fixedItems');
      expect(result).toHaveProperty('randomItem');
      expect(result.gacha).toBe(currentGacha);
      expect(result.fixedItems).toBe(currentGacha.fixedItems);
      expect(currentGacha.items).toContain(result.randomItem);
    });
  });
});
