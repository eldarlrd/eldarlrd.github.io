<script lang="ts">
  import type { Snippet } from 'svelte';

  import { getFocus } from '%/getFocus.ts';

  type ModalProps = {
    children?: Snippet;
    isOpen?: boolean;
    isClosable?: boolean;
    ariaLabel?: string;
    onClose?: () => void;
    onSubmit?: (event: SubmitEvent) => void | Promise<void>;
  };

  let {
    children,
    isOpen = true,
    isClosable = true,
    ariaLabel,
    onClose,
    onSubmit,
  }: ModalProps = $props();

  let dialog = $state<HTMLDivElement>();
  let overlay = $state<HTMLDivElement>();

  const focusTrap = getFocus({
    getContainer: () => dialog,
    isActive: () => isOpen,
  });

  const handleClose = (): void => {
    if (!isClosable) return;

    onClose?.();
  };

  const handleOverlayClick = (event: MouseEvent): void => {
    if (event.target === overlay) handleClose();
  };

  const handleKeydown = (event: KeyboardEvent): void => {
    if (!isOpen) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      handleClose();
      return;
    }

    focusTrap.handleKeydown(event);
  };

  const handleSubmit = (event: SubmitEvent): void => {
    if (!onSubmit) return;

    event.preventDefault();
    void onSubmit(event);
  };

  $effect(() => {
    if (!isOpen) return;

    const previousBodyOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    const restoreFocus = focusTrap.trap();

    return (): void => {
      document.body.style.overflow = previousBodyOverflow;
      restoreFocus();
    };
  });
</script>

<svelte:window onclick={handleOverlayClick} onkeydown={handleKeydown} />

{#if isOpen}
  <div
    class="fixed inset-0 z-20 grid min-h-dvh place-items-center bg-slate-950/75 backdrop-blur-xs"
    role="presentation"
    bind:this={overlay}
  >
    <div
      aria-label={ariaLabel}
      aria-modal="true"
      class="w-full max-w-lg h-3/4 bg-slate-900 p-4 shadow-sharp border-2 shadow-violet-900 border-violet-900"
      onsubmit={handleSubmit}
      role="dialog"
      tabindex="-1"
      bind:this={dialog}
    >
      {@render children?.()}
    </div>
  </div>
{/if}
