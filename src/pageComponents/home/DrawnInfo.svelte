<script context="module" lang="ts">
  export enum display {
    hist = 1,
    analysis = 2
  }
</script>

<script lang="ts">
  import { type GachaDrawResult, type Gacha } from '$lib';
  import _ from 'lodash';
  import fe from 'feather-icons';

  export let gacha: Gacha;
  export let gachaDrawHistory: GachaDrawResult[] = [];
  export let displayType: display = display.hist;

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

<div>
  <div class="flex flex-col gap-2">
    <div class="join">
      <button
        class="btn join-item"
        class:btn-primary={displayType === display.hist}
        on:click={() => (displayType = display.hist)}
      >
        <!-- eslint-disable-next-line -->
        {@html fe.icons['list'].toSvg({ class: 'w-5 h-5' })}
        <span>顯示紀錄</span>
      </button>
      <button
        class="btn join-item"
        class:btn-primary={displayType === display.analysis}
        on:click={() => (displayType = display.analysis)}
      >
        <!-- eslint-disable-next-line -->
        {@html fe.icons['activity'].toSvg({ class: 'w-5 h-5' })}
        <span>顯示統計</span>
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
              <td>
                {item.name}
                <span class="text-red-400 ml-2">
                  ({gacha.items.find((x) => x.name === item.name)?.rate}%)
                </span>
              </td>
              <td align="right">{item.count}</td>
              <td align="right">{((item.count / gachaDrawHistory.length) * 100).toFixed(4)}%</td>
            </tr>
          {/each}
        </tbody>
      </table>
    {/if}
  </div>
</div>
