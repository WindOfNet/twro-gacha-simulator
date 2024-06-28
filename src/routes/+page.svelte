<script lang="ts">
  import { type Gacha, type GachaDrawResult, type GachaItem } from '$lib';
  import { drawItem } from '$lib/core';
  import GachaSelector from '$lib/GachaSelector.svelte';
  import GachaDetailDialog from '$lib/GachaDetailDialog.svelte';
  import GachaDrawHistory from '$lib/GachaDrawHistory.svelte';

  let selectedGacha: Gacha;
  let openRateModal = false;
  let latestDrawnItem: GachaDrawResult | undefined;
  let gachaDrawHistory: GachaDrawResult[] = [];
  let keepDrawing = false;
  let keepDrawingItem: GachaItem;

  async function draw() {
    // prevent reactivity from updating the array
    const tmp = [...gachaDrawHistory];
    do {
      latestDrawnItem = drawItem(selectedGacha);
      tmp.push(latestDrawnItem);
    } while (keepDrawing && latestDrawnItem.randomItem !== keepDrawingItem);
    gachaDrawHistory = [...tmp];
  }

  function reset() {
    latestDrawnItem = undefined;
    gachaDrawHistory = [];
  }

  function onGachaChange() {
    reset();
    keepDrawingItem = selectedGacha.items[0];
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
        <button class="btn btn-primary w-full" on:click={draw}>抽</button>
      </div>
      <div class="w-full">
        <button class="btn btn-warning w-full" on:click={reset}>清除紀錄</button>
      </div>
    </div>
    {#if selectedGacha}
      <div class="form-control">
        <label class="label cursor-pointer justify-normal gap-4">
          <input type="checkbox" class="checkbox checkbox-sm" bind:checked={keepDrawing} />
          <span class="space-x-2">
            <span class="label-text">抽到</span>
            <select
              class="select select-bordered select-sm"
              disabled={!keepDrawing}
              bind:value={keepDrawingItem}
            >
              {#each selectedGacha.items as gachaItem}
                <option value={gachaItem}>{gachaItem.name}</option>
              {/each}
            </select>
            <span class="label-text">為止</span>
          </span>
        </label>
      </div>
    {/if}
  </div>

  {#if latestDrawnItem}
    <div class="flex gap-2 items-center">
      <div>第 {gachaDrawHistory.length} 抽:</div>
      <div>{latestDrawnItem.randomItem.name} / {latestDrawnItem.randomItem.rate}%</div>
    </div>
    <div>
      <GachaDrawHistory {gachaDrawHistory} />
    </div>
  {/if}
</div>
