<script lang="ts">
  import { onMount } from 'svelte';
  import '/tailwind.config.css';
  import '@fontsource-variable/handjet';
  import Header from '@/feats/Header/Header.svelte';
  import 'pixelarticons/fonts/pixelart-icons-font.css';
  import { useTooltip } from '%/useTooltip.ts';

  onMount(useTooltip);
</script>

<Header />

<style lang="css">
  :global(.tippy-box[data-theme~='violet']) {
    font-family: var(--font-handjet);
    font-size: 0.875em;
    color: var(--color-slate-100);
    background: var(--color-violet-900);
    border-radius: unset;

    & .tippy-content {
      padding: 0.25em 0.5em;
      letter-spacing: 0.05em;
    }

    & .tippy-arrow {
      color: var(--color-violet-900);
    }
  }
</style>
