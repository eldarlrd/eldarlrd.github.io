<script lang="ts">
  import { onMount } from 'svelte';
  import '/tailwind.config.css';
  import '@fontsource-variable/handjet';
  import Header from '@/feats/Header/Header.svelte';
  import 'pixelarticons/fonts/pixelart-icons-font.css';
  import { useTooltip } from '%/useTooltip.ts';

  onMount(useTooltip);
</script>

<div class="mx-auto max-w-3xl">
  <Header />
</div>
