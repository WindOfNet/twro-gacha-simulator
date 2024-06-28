import type { Gacha, GachaDrawResult } from '$lib';

export function drawItem(gacha: Gacha): GachaDrawResult {
  let totalRate = 0;
  const items = gacha.items;
  items.forEach((item) => (totalRate += item.rate));

  let random = Math.random() * totalRate;
  for (const item of items) {
    random -= item.rate;
    if (random < 0) {
      return {
        gacha,
        fixedItems: gacha.fixedItems,
        randomItem: item
      };
    }
  }

  throw new Error('Should never reach here');
}
