<script lang="ts">
  import type { Gacha, GachaItem } from '$lib';

  export let selectedGacha: Gacha;
  export let keepDrawingItem: GachaItem | null;
  export let drawInterval: number | null;
  export let isDrawing: boolean;
  export let onDrawClick: (size: number) => void;
  export let reset: () => void;

  const drawButtons = [1, 10, 50, 100, 200, 500, 1000];

  const intervalOptions = [
    { label: '烏龜抽', value: 1000 },
    { label: '正常抽 (500毫秒)', value: 500 },
    { label: '快抽 (100毫秒)', value: 100 },
    { label: '高速抽 (50毫秒)', value: 50 },
    { label: '極限抽 (5毫秒)', value: 5 },
    { label: '只想看結果', value: 0 }
  ];

  let drawingSize: number | null = null;

  $: drawButtonLabel = (size: number) =>
    size === 1 ? '抽' : isDrawing && drawingSize === size ? '停止' : `抽 ${size}`;

  function handleDrawIntervalChange() {
    localStorage.setItem('drawInterval', drawInterval?.toString() ?? '');
  }
</script>

<div class="max-w-sm flex flex-col gap-2">
  <div class="grid grid-cols-4 gap-2">
    {#each drawButtons as size}
      <div>
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
    <div>
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
          <select
            class="select select-bordered select-sm"
            bind:value={drawInterval}
            on:change={handleDrawIntervalChange}
          >
            {#each intervalOptions as option}
              <option value={option.value}>{option.label}</option>
            {/each}
          </select>
        </span>
      </label>
    </div>
  {/if}
</div>
