<script lang="ts">
  import gacha from '../gachas';

  export let value = gacha.at(-1);
</script>

<select class="select select-bordered w-full max-w-xs" bind:value on:change>
  {#each gacha as g}
    <option value={g}>{g.name}</option>
  {/each}
</select>
