import type { Gacha } from '$lib';
import gacha202401_1 from './2024 1月轉蛋Ⅰ.json';
import gacha202401_2 from './2024 1月轉蛋Ⅱ.json';
import gacha202402_1 from './2024 2月轉蛋Ⅰ.json';
import gacha202402_2 from './2024 2月轉蛋Ⅱ.json';
import gacha202403_1 from './2024 3月轉蛋Ⅰ.json';
import gacha202403_2 from './2024 3月轉蛋Ⅱ.json';
import gacha202403_3 from './2024 3月轉蛋Ⅱ.json';
import gacha202404_1 from './2024 4月轉蛋Ⅰ.json';
import gacha202404_2 from './2024_4月轉蛋Ⅱ.json';
import gacha202405_1 from './2024_5月轉蛋Ⅰ.json';
import gacha202405_2 from './2024 5月轉蛋Ⅱ.json';
import gacha202406_1 from './2024 6月轉蛋Ⅰ.json';
import gacha202406_2 from './2024 6月轉蛋Ⅱ.json';
import gacha202407_1 from './2024 7月轉蛋I.json';
import 柴語錄轉蛋 from './柴語錄轉蛋.json';
import 雪季轉蛋 from './雪季轉蛋.json';
import _2024劍指ROS轉蛋 from './2024劍指ROS轉蛋.json';
import gacha202407_2 from './2024_7月轉蛋Ⅱ.json';
import gacha202408_1 from './2024_8月轉蛋Ⅰ.json';
import gacha202408_2 from './2024_8月轉蛋Ⅱ.json';
import gacha202409_1 from './2024 9月轉蛋Ⅰ.json';
import gacha202409_2 from './2024 9月轉蛋Ⅱ.json';
import gacha202410_1 from './2024 10月轉蛋Ⅰ.json';
import _22周年禮包 from './22週年禮包.json';
import gacha202410_2 from './2024 10月轉蛋Ⅱ.json';
import gacha202411_1 from './2024 11月轉蛋Ⅰ.json';
import gacha202411_2 from './2024 11月轉蛋Ⅱ.json';
import gacha202412_1 from './2024 12月轉蛋Ⅰ.json';
import gacha202412_2 from './2024 12月轉蛋Ⅱ.json';
import gacha202501_1 from './2025 1月轉蛋Ⅰ.json';
import gacha202501_2 from './2025_1月轉蛋Ⅱ.json';
import gacha202502_1 from './2025 2月轉蛋Ⅰ.json';
import gacha202502_2 from './2025 2月轉蛋Ⅱ.json';
import gacha202503_1 from './2025 3月轉蛋Ⅰ.json';
import gacha202503_2 from './2025_3月轉蛋Ⅱ.json';
import gacha202504_1 from './2025_4月轉蛋Ⅰ.json';
import gacha202504_2 from './2025 4月轉蛋Ⅱ.json';
import gacha202505_1 from './2025 5月轉蛋Ⅰ.json';
import gacha202505_2 from './2025 5月轉蛋Ⅱ.json';
import gacha202506_1 from './2025 6月轉蛋I.json';
import gacha202506_2 from './2025_6月轉蛋Ⅱ.json';
import gacha202507_1 from './2025 7月轉蛋Ⅰ.json';
import gacha202507_2 from './2025 7月轉蛋Ⅱ.json';
import _2025ROS勝利轉蛋 from './2025ROS勝利轉蛋.json';
import gacha202508_1 from './2025 8月轉蛋Ⅰ.json';
import gacha202508_2 from './2025 8月轉蛋Ⅱ.json';
import gacha202509_1 from './2025 9月轉蛋Ⅰ.json';
import gacha202509_2 from './2025 9月轉蛋Ⅱ.json';
import gacha202509_3 from './2025_9月轉蛋Ⅲ.json';
import _23週年禮包 from './23週年禮包.json';
import gacha202510_1 from './2025 10月轉蛋Ⅰ.json';
import gacha202511_1 from './2025 11月轉蛋Ⅰ.json';
import gacha202511_2 from './2025 11月轉蛋Ⅱ.json';
import gacha202512_1 from './2025 12月轉蛋Ⅰ.json';
import gacha202512_2 from './2025_12月轉蛋Ⅱ.json';
import gacha202601_1 from './2026_1月轉蛋Ⅰ.json';
import gacha202601_2 from './2026 1月轉蛋Ⅱ.json';
import gacha202601_3 from './2026 1月轉蛋Ⅲ.json';
import gacha202602_1 from './2026_2月轉蛋Ⅰ.json';
import _馬年禮包 from './馬年禮包.json';
import gacha202603_1 from './2026 3月轉蛋Ⅰ.json';
import gacha202603_2 from './2026 3月轉蛋Ⅱ.json';
import gacha202604_1 from './2026 4月轉蛋Ⅰ.json';
import gacha202604_2 from './2026_4月轉蛋Ⅱ.json';

const gachas: Gacha[] = [
  雪季轉蛋,
  gacha202401_1,
  gacha202401_2,
  gacha202402_1,
  gacha202402_2,
  gacha202403_1,
  gacha202403_2,
  gacha202403_3,
  gacha202404_1,
  gacha202404_2,
  gacha202405_1,
  gacha202405_2,
  柴語錄轉蛋,
  gacha202406_1,
  gacha202406_2,
  _2024劍指ROS轉蛋,
  gacha202407_1,
  gacha202407_2,
  gacha202408_1,
  gacha202408_2,
  gacha202409_1,
  gacha202409_2,
  gacha202410_1,
  _22周年禮包,
  gacha202410_2,
  gacha202411_1,
  gacha202411_2,
  gacha202412_1,
  gacha202412_2,
  gacha202501_1,
  gacha202501_2,
  gacha202502_1,
  gacha202502_2,
  gacha202503_1,
  gacha202503_2,
  gacha202504_1,
  gacha202504_2,
  gacha202505_1,
  gacha202505_2,
  gacha202506_1,
  gacha202506_2,
  gacha202507_1,
  gacha202507_2,
  _2025ROS勝利轉蛋,
  gacha202508_1,
  gacha202508_2,
  gacha202509_1,
  gacha202509_2,
  gacha202509_3,
  _23週年禮包,
  gacha202510_1,
  gacha202511_1,
  gacha202511_2,
  gacha202512_1,
  gacha202512_2,
  gacha202601_1,
  gacha202601_2,
  gacha202601_3,
  gacha202602_1,
  _馬年禮包,
  gacha202603_1,
  gacha202603_2,
  gacha202604_1,
  gacha202604_2
];

export default gachas;
