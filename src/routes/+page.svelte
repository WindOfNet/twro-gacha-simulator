<script lang="ts">
  import { browser } from '$app/environment';
  import { type Gacha, type GachaDrawResult, type GachaItem } from '$lib';
  import { draw } from '$lib/core';
  import GachaSelector from '$pageComponents/home/GachaSelector.svelte';
  import DrawnInfo from '$pageComponents/home/DrawnInfo.svelte';
  import DrawExecutor from '$pageComponents/home/DrawExecutor.svelte';

  let selectedGacha: Gacha;
  let latestDrawnItem: GachaDrawResult | undefined;
  let gachaDrawHistory: GachaDrawResult[] = [];
  let keepDrawingItem: GachaItem | null = null;
  let drawInterval = (browser && Number(localStorage.getItem('drawInterval'))) || 50;
  let isDrawing = false;

  async function onDrawClick(size: number) {
    if (isDrawing) {
      isDrawing = false;
      return;
    }

    isDrawing = true;
    let count = 0;
    do {
      latestDrawnItem = draw(selectedGacha);
      // 效能考量  不反應陣列
      gachaDrawHistory.push(latestDrawnItem);
      if ((!!keepDrawingItem || size > 1) && drawInterval > 0) {
        // force update for svelte to render
        gachaDrawHistory = gachaDrawHistory;
        await new Promise((resolve) => setTimeout(resolve, drawInterval));
      }
    } while (
      (++count < size || keepDrawingItem !== null) &&
      isDrawing &&
      latestDrawnItem.randomItem !== keepDrawingItem
    );
    // force update for svelte to render
    gachaDrawHistory = gachaDrawHistory;
    isDrawing = false;
  }

  function reset() {
    latestDrawnItem = undefined;
    gachaDrawHistory = [];
    isDrawing = false;
  }

  function onGachaChange() {
    reset();
    keepDrawingItem = null;
  }
</script>

<div class="flex flex-col gap-4">
  <GachaSelector bind:value={selectedGacha} on:change={onGachaChange} />

  <DrawExecutor
    {selectedGacha}
    {isDrawing}
    {onDrawClick}
    {reset}
    bind:keepDrawingItem
    bind:drawInterval
    on:intervalChange={({ detail }) => localStorage.setItem('drawInterval', detail.toString())}
  />

  {#if latestDrawnItem}
    <div class="flex flex-col gap-2">
      <div>第 {gachaDrawHistory.length} 抽</div>
      <div class="bg-white rounded-xl p-1 self-start">
        <div
          class="border border-gray-300 rounded-xl py-2 px-4 bg-white flex gap-2 items-center cursor-default"
        >
          <img src="/unknown.png" alt="unknown" />
          <span class="text-black font-serif font-bold">{latestDrawnItem.randomItem.name}</span>
        </div>
      </div>
      <div>物品機率: {latestDrawnItem.randomItem.rate}%</div>
    </div>
    <div>
      <DrawnInfo gacha={selectedGacha} {gachaDrawHistory} />
    </div>
  {/if}
</div>
