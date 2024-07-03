<script lang="ts">
  import gacha from '$gachas';
  export let value = gacha.at(-1)!;
  let open = false;
</script>

<div class="flex gap-2 items-center">
  <div>轉蛋:</div>
  <div>
    <select class="select select-sm select-bordered w-full max-w-xs" bind:value on:change>
      {#each gacha as g}
        <option value={g}>{g.name}</option>
      {/each}
    </select>
  </div>
  <button
    class="block link link-primary label-text-alt cursor-pointer"
    on:click={() => (open = true)}
  >
    轉蛋內容
  </button>

  {#if gacha}
    <dialog class="modal" class:modal-open={open}>
      <div class="modal-box">
        <form method="dialog">
          <button
            class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            on:click={() => (open = false)}
          >
            ✕
          </button>
        </form>

        <div class="flex flex-col gap-4">
          <h3 class="text-lg font-bold">{value.name}</h3>

          <div>
            <h4 class="text-lg font-bold">固定獲得</h4>
            <div class="overflow-x-auto">
              <table class="table table-xs table-pin-rows table-pin-cols">
                <thead>
                  <tr>
                    <th></th>
                    <th>物品名稱</th>
                    <th align="right">數量</th>
                  </tr>
                </thead>
                <tbody>
                  {#each value.fixedItems as item, index}
                    <tr>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td align="right">{item.count}</td>
                    </tr>
                  {/each}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h4 class="text-lg font-bold">轉蛋內容</h4>
            <div class="overflow-x-auto">
              <table class="table table-xs table-pin-rows table-pin-cols">
                <thead>
                  <tr>
                    <th></th>
                    <th>物品名稱</th>
                    <th align="right">數量</th>
                    <th align="right">機率</th>
                  </tr>
                </thead>
                <tbody>
                  {#each value.items as item, index}
                    <tr>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td align="right">{item.count}</td>
                      <td align="right">{item.rate}%</td>
                    </tr>
                  {/each}
                </tbody>
              </table>
              <div class="modal-action">
                <form method="dialog">
                  <button class="btn btn-primary" on:click={() => (open = false)}>Close</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  {/if}
</div>
