import type { Component } from 'svelte';

type ModalChild = Component<{ onClose: () => void }>;

type ModalOptions = {
  child: ModalChild;
};

type ModalController = {
  readonly isOpen: boolean;
  readonly child: ModalChild;
  open: () => void;
  close: () => void;
};

export const modalHost = $state<{ current: ModalController | null }>({ current: null });

export const useModal = ({ child }: ModalOptions): ModalController => {
  let isOpen = $state(false);

  const controller: ModalController = {
    child,
    close: (): void => {
      isOpen = false;

      if (modalHost.current === controller) modalHost.current = null;
    },
    get isOpen(): boolean {
      return isOpen;
    },
    open: (): void => {
      isOpen = true;
      modalHost.current = controller;
    },
  };

  return controller;
};
