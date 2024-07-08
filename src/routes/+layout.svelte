<script lang="ts">
  import '../app.css';
  import fe from 'feather-icons';
  import { themeChange } from 'theme-change';
  import { onMount } from 'svelte';

  let theme: 'light' | 'dark';

  onMount(async () => {
    themeChange(false);
    theme = (localStorage.getItem('theme') as 'light' | 'dark') ?? 'dark';
  });
</script>

<div class="navbar">
  <div class="navbar-start">
    <a class="btn btn-ghost normal-case text-xl" href="/">twro 轉蛋模擬器</a>
  </div>
  <div class="navbar-end mr-5 flex gap-4">
    <label class="swap swap-rotate">
      <input
        type="checkbox"
        data-toggle-theme="dark,light"
        data-act-class="ACTIVECLASS"
        checked={theme === 'light'}
      />
      <!-- eslint-disable-next-line -->
      {@html fe.icons['sun'].toSvg({ class: 'swap-on' })}
      <!-- eslint-disable-next-line -->
      {@html fe.icons['moon'].toSvg({ class: 'swap-off' })}
    </label>
    <a href="https://github.com/WindOfNet/twro-gacha-simulator">
      <!-- eslint-disable-next-line -->
      {@html fe.icons['github'].toSvg()}
    </a>
  </div>
</div>

<div class="p-8 container mx-auto">
  <slot />
</div>
