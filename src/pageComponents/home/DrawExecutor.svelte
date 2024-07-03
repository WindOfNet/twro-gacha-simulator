<script lang="ts">
  import type { Gacha, GachaItem } from '$lib';

  export let selectedGacha: Gacha;
  export let keepDrawingItem: GachaItem | null;
  export let drawInterval: number;
  export let isDrawing: boolean;
  export let onDrawClick: (size: number) => void;
  export let reset: () => void;

  const drawButtons = [1, 10, 50, 100];

  let drawingSize: number | null = null;

  $: drawButtonLabel = (size: number) =>
    size === 1 ? '抽' : isDrawing && drawingSize === size ? '停止' : `抽 ${size}`;
</script>

<div class="max-w-sm flex flex-col gap-2">
  <div class="flex gap-2 whitespace-nowrap">
    {#each drawButtons as size}
      <div class="w-full">
        <button
          class="btn btn-primary w-full"
          disabled={(isDrawing && drawingSize !== size) || (size !== 1 && keepDrawingItem !== null)}
          on:click={() => {
            drawingSize = size;
            onDrawClick(size);
          }}
        >
          {drawButtonLabel(size)}
        </button>
      </div>
    {/each}
    <div class="w-full">
      <button class="btn btn-warning w-full" on:click={reset}>清除紀錄</button>
    </div>
  </div>
  {#if selectedGacha}
    <div>
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
</div>
