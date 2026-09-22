import { tick } from 'svelte';

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'area[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'iframe',
  'object',
  'embed',
].join(', ');

type GetFocusOptions = {
  getContainer: () => HTMLElement | undefined;
  isActive: () => boolean;
};

type FocusController = {
  handleKeydown: (event: KeyboardEvent) => void;
  trap: () => () => void;
};

const getFocusableElements = (container: HTMLElement): HTMLElement[] =>
  Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    (element) => element.getAttribute('aria-hidden') !== 'true'
  );

export const getFocus = ({ getContainer, isActive }: GetFocusOptions): FocusController => {
  const handleKeydown = (event: KeyboardEvent): void => {
    if (!isActive() || event.key !== 'Tab' || !(event.target instanceof Node)) {
      return;
    }

    const container = getContainer();
    if (!container?.contains(event.target)) return;

    const focusableElements = getFocusableElements(container);

    if (focusableElements.length === 0) {
      event.preventDefault();
      container.focus();
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements.at(-1);

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement?.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement?.focus();
    }
  };

  const trap = (): (() => void) => {
    const previousFocusedElement =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;

    void tick().then(() => {
      if (!isActive()) return;

      const container = getContainer();
      if (!container) return;

      const firstFocusableElement = getFocusableElements(container)[0];
      (firstFocusableElement ?? container)?.focus();
    });

    return (): void => {
      previousFocusedElement?.focus();
    };
  };

  return { handleKeydown, trap };
};
