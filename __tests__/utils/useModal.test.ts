import { beforeEach, describe, expect, test as it } from 'bun:test';

const state = <T>(value: T): T => value;

Object.assign(globalThis, { $state: state });

const { modalHost, useModal } = await import('%/useModal.svelte.ts');

const createChild = (): Parameters<typeof useModal>[0]['child'] =>
  (() => null) as unknown as Parameters<typeof useModal>[0]['child'];

beforeEach(() => {
  modalHost.current = null;
});

describe('useModal', () => {
  it('opens a modal and registers it with the host', () => {
    const child = createChild();
    const modal = useModal({ child });

    expect(modal.isOpen).toBe(false);
    expect(modal.child).toBe(child);
    expect(modalHost.current).toBe(null);

    modal.open();

    expect(modal.isOpen).toBe(true);
    expect(modalHost.current).toBe(modal);
  });

  it('closes a modal and clears its host entry', () => {
    const modal = useModal({ child: createChild() });
    modal.open();

    modal.close();

    expect(modal.isOpen).toBe(false);
    expect(modalHost.current).toBe(null);
  });

  it('does not clear a newer modal when an older modal closes', () => {
    const first = useModal({ child: createChild() });
    const second = useModal({ child: createChild() });
    first.open();
    second.open();

    first.close();

    expect(first.isOpen).toBe(false);
    expect(second.isOpen).toBe(true);
    expect(modalHost.current).toBe(second);
  });
});
