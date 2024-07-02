<script lang="ts">
  import { type Gacha, type GachaDrawResult, type GachaItem } from '$lib';
  import { draw } from '$lib/core';
  import GachaSelector from '$lib/GachaSelector.svelte';
  import GachaDetailDialog from '$lib/GachaDetailDialog.svelte';
  import GachaDrawHistory from '$lib/GachaDrawHistory.svelte';

  let selectedGacha: Gacha;
  let openRateModal = false;
  let latestDrawnItem: GachaDrawResult | undefined;
  let gachaDrawHistory: GachaDrawResult[] = [];
  let keepDrawingItem: GachaItem | null = null;
  let drawInterval = 50;
  let isDrawing = false;

  async function executeDraw() {
    isDrawing = true;
    do {
      latestDrawnItem = draw(selectedGacha);
      // 效能考量  不反應陣列
      gachaDrawHistory.push(latestDrawnItem);
      if (drawInterval > 0) {
        // force update for svelte to render
        gachaDrawHistory = gachaDrawHistory;
        await new Promise((resolve) => setTimeout(resolve, drawInterval));
      }
    } while (
      keepDrawingItem !== null &&
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
  <div class="flex gap-2 items-center">
    <div>轉蛋:</div>
    <div>
      <GachaSelector bind:value={selectedGacha} on:change={onGachaChange} />
    </div>
    <div class="label self-end">
      <span />
      <button
        class="block link link-primary label-text-alt cursor-pointer"
        on:click={() => (openRateModal = true)}
      >
        轉蛋內容
      </button>
      <GachaDetailDialog bind:open={openRateModal} gacha={selectedGacha} />
    </div>
  </div>

  <div class="max-w-sm">
    <div class="flex gap-4">
      <div class="w-full">
        <button class="btn btn-primary w-full" on:click={executeDraw}>抽</button>
      </div>
      <div class="w-full">
        <button class="btn btn-warning w-full" on:click={reset}>清除紀錄</button>
      </div>
    </div>
    {#if selectedGacha}
      <div class="form-control">
        <label class="label cursor-pointer justify-normal gap-4">
          <span class="space-x-2 whitespace-nowrap">
            <span class="label-text">持續到抽中</span>
            <select class="select select-bordered select-sm" bind:value={keepDrawingItem}>
              <option value={null}>不設定</option>
              {#each selectedGacha.items as gachaItem}
                <option value={gachaItem}>{gachaItem.name}</option>
              {/each}
            </select>
          </span>
        </label>
      </div>
      {#if keepDrawingItem}
        <div class="form-control">
          <label class="label cursor-pointer justify-normal gap-4">
            <span class="space-x-2 whitespace-nowrap">
              <span class="label-text">每抽間隔</span>
              <input
                type="number"
                inputmode="numeric"
                min="0"
                class="input input-sm input-bordered text-right w-32"
                bind:value={drawInterval}
              />
              <span class="label-text">毫秒</span>
            </span>
          </label>
        </div>
      {/if}
    {/if}
  </div>

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
      <GachaDrawHistory {gachaDrawHistory} />
    </div>
  {/if}
</div>
