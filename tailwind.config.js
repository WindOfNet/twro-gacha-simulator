import daisyui from 'daisyui';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['細明體', 'MingLiU', 'serif']
      }
    }
  },
  plugins: [daisyui],
  daisyui: {
    themes: ['light', 'dark']
  }
};
