// place files you want to import through the `$lib` alias in this folder.

export interface GachaFixedItem {
  name: string;
  count: number;
}

export interface GachaItem {
  name: string;
  count: number;
  rate: number;
}

export interface Gacha {
  name: string;
  fixedItems: GachaFixedItem[];
  items: GachaItem[];
}

export interface GachaDrawResult {
  gacha: Gacha;
  fixedItems: GachaFixedItem[];
  randomItem: GachaItem;
}
