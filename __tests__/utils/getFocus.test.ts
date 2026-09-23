import { afterEach, beforeEach, describe, expect, test as it } from 'bun:test';

import { getFocus } from '%/getFocus.ts';

class TestElement {
  public focused = false;
  private readonly attributes = new Map<string, string>();

  public focus(): void {
    testDocument.activeElement = this;
    this.focused = true;
  }

  public getAttribute(name: string): string | null {
    return this.attributes.get(name) ?? null;
  }

  public setAttribute(name: string, value: string): void {
    this.attributes.set(name, value);
  }
}

class TestContainer extends TestElement {
  public constructor(private readonly focusableElements: TestElement[]) {
    super();
  }

  public contains(node: TestElement): boolean {
    return node === this || this.focusableElements.includes(node as TestElement);
  }

  public querySelectorAll<T extends Element>(_selector: string): NodeListOf<T> {
    return this.focusableElements as unknown as NodeListOf<T>;
  }
}

const testDocument: { activeElement: TestElement | null } = { activeElement: null };

const asHTMLElement = (element: TestElement): HTMLElement => element as unknown as HTMLElement;

beforeEach(() => {
  Object.assign(globalThis, {
    document: testDocument,
    HTMLElement: TestElement,
    Node: TestElement,
  });
});

afterEach(() => {
  Reflect.deleteProperty(globalThis, 'document');
  Reflect.deleteProperty(globalThis, 'HTMLElement');
  Reflect.deleteProperty(globalThis, 'Node');
  testDocument.activeElement = null;
});

describe('getFocus', () => {
  it('wraps forward tabbing from the last focusable element', () => {
    const first = new TestElement();
    const last = new TestElement();
    const container = new TestContainer([first, last]);
    const preventDefault = (): void => undefined;

    last.focus();

    getFocus({ getContainer: () => asHTMLElement(container), isActive: () => true }).handleKeydown({
      key: 'Tab',
      preventDefault,
      shiftKey: false,
      target: last,
    } as unknown as KeyboardEvent);

    expect(first.focused).toBe(true);
    expect(testDocument.activeElement).toBe(first);
  });

  it('wraps reverse tabbing from the first focusable element', () => {
    const first = new TestElement();
    const last = new TestElement();
    const container = new TestContainer([first, last]);
    let prevented = false;

    first.focus();

    getFocus({ getContainer: () => asHTMLElement(container), isActive: () => true }).handleKeydown({
      key: 'Tab',
      preventDefault: () => {
        prevented = true;
      },
      shiftKey: true,
      target: first,
    } as unknown as KeyboardEvent);

    expect(prevented).toBe(true);
    expect(last.focused).toBe(true);
    expect(testDocument.activeElement).toBe(last);
  });

  it('focuses the container when there are no focusable elements', () => {
    const container = new TestContainer([]);
    let prevented = false;

    getFocus({ getContainer: () => asHTMLElement(container), isActive: () => true }).handleKeydown({
      key: 'Tab',
      preventDefault: () => {
        prevented = true;
      },
      shiftKey: false,
      target: container,
    } as unknown as KeyboardEvent);

    expect(prevented).toBe(true);
    expect(container.focused).toBe(true);
  });

  it('ignores inactive, non-Tab, and outside events', () => {
    const button = new TestElement();
    const outside = new TestElement();
    const container = new TestContainer([button]);
    let prevented = false;
    const controller = getFocus({
      getContainer: () => asHTMLElement(container),
      isActive: () => false,
    });

    button.focus();
    controller.handleKeydown({
      key: 'Tab',
      preventDefault: () => {
        prevented = true;
      },
      target: button,
    } as unknown as KeyboardEvent);

    controller.handleKeydown({
      key: 'Escape',
      preventDefault: () => {
        prevented = true;
      },
      target: button,
    } as unknown as KeyboardEvent);

    const activeController = getFocus({
      getContainer: () => asHTMLElement(container),
      isActive: () => true,
    });
    activeController.handleKeydown({
      key: 'Tab',
      preventDefault: () => {
        prevented = true;
      },
      target: outside,
    } as unknown as KeyboardEvent);

    expect(prevented).toBe(false);
    expect(testDocument.activeElement).toBe(button);
  });

  it('skips elements marked aria-hidden and restores focus after trapping', async () => {
    const previous = new TestElement();
    const hidden = new TestElement();
    const first = new TestElement();
    hidden.setAttribute('aria-hidden', 'true');
    const container = new TestContainer([hidden, first]);
    previous.focus();

    const restoreFocus = getFocus({
      getContainer: () => asHTMLElement(container),
      isActive: () => true,
    }).trap();
    await Promise.resolve();

    expect(testDocument.activeElement).toBe(first);
    expect(hidden.focused).toBe(false);

    restoreFocus();

    expect(testDocument.activeElement).toBe(previous);
  });
});
