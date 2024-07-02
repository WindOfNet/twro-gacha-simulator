<script lang="ts">
  import { type GachaDrawResult } from '$lib';
  import _ from 'lodash';
  import fe from 'feather-icons';

  enum display {
    hist = 1,
    analysis = 2
  }

  export let gachaDrawHistory: GachaDrawResult[] = [];
  export let displayType = display.hist;

  let r1: HTMLInputElement;
  let r2: HTMLInputElement;

  $: over5000 = gachaDrawHistory.length > 5000;
  $: analysisData = _.chain(gachaDrawHistory)
    .groupBy('randomItem.name')
    .entries()
    .map(([name, data]) => ({
      name,
      count: data.length
    }))
    .orderBy('count', 'desc')
    .value();
</script>

<div class="flex flex-col gap-2">
  <input
    bind:this={r1}
    class="hidden"
    type="radio"
    name="type"
    value={display.hist}
    bind:group={displayType}
  />
  <input
    bind:this={r2}
    class="hidden"
    type="radio"
    name="type"
    value={display.analysis}
    bind:group={displayType}
  />

  <div class="join">
    <button
      class="btn join-item"
      class:btn-primary={displayType === display.hist}
      on:click={() => r1.click()}
    >
      {@html fe.icons['list'].toSvg({ class: 'w-5 h-5' })}
      顯示紀錄
    </button>
    <button
      class="btn join-item"
      class:btn-primary={displayType === display.analysis}
      on:click={() => r2.click()}
    >
      {@html fe.icons['activity'].toSvg({ class: 'w-5 h-5' })}
      顯示統計
    </button>
  </div>

  {#if displayType === display.hist}
    {#if over5000}
      <span class="label-text">p.s. 僅顯示最後 5000 次紀錄</span>
    {/if}
    <table class="table table-xs table-pin-rows table-pin-cols max-w-sm">
      <thead>
        <th></th>
        <th></th>
        <th></th>
      </thead>
      <tbody>
        {#if over5000}
          <tr><td>...</td></tr>
          <tr><td>...</td></tr>
        {/if}
        {#each over5000 ? gachaDrawHistory.slice(-5000) : gachaDrawHistory as historyEntry, index}
          <tr>
            <td>{index + 1 + (over5000 ? gachaDrawHistory.length - 5000 : 0)}</td>
            <td>{historyEntry.randomItem.name}</td>
            <td>{historyEntry.randomItem.rate}%</td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}

  {#if displayType === display.analysis}
    <table class="table table-xs table-pin-rows table-pin-cols max-w-sm">
      <thead>
        <th>物品名稱</th>
        <th align="right">抽中次數</th>
        <th align="right">機率</th>
      </thead>
      <tbody>
        {#each analysisData as item}
          <tr>
            <td>{item.name}</td>
            <td align="right">{item.count}</td>
            <td align="right">{((item.count / gachaDrawHistory.length) * 100).toFixed(4)}%</td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
</div>
