<script lang="ts">
  import { onMount } from 'svelte';

  import Aside from '@/feats/Aside/Aside.svelte';
  import Main from '@/feats/Main/Main.svelte';
  import '/tailwind.config.css';
  import '@fontsource-variable/handjet';
  import Modal from '@/components/Modal.svelte';
  import Header from '@/feats/Header/Header.svelte';
  import 'pixelarticons/fonts/pixelart-icons-font.css';
  import { modalHost } from '%/useModal.svelte.ts';
  import { useTooltip } from '%/useTooltip.ts';

  let activeModal = $derived(modalHost.current);

  onMount(useTooltip);
</script>

<div class="bg-slate-900 p-4 mx-auto min-h-dvh space-y-4 max-w-3xl">
  <Header />

  <div class="grid sm:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-4">
    <Main />
    <Aside />
  </div>

  {#if activeModal}
    <Modal isOpen={activeModal.isOpen} onClose={activeModal.close}>
      <activeModal.child onClose={activeModal.close} />
    </Modal>
  {/if}
</div>
