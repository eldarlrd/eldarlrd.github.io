import { beforeEach, describe, expect, test as it, mock } from 'bun:test';

type TooltipReference = {
  getAttribute: (name: string) => string | null;
  removeAttribute: (name: string) => void;
};

type TooltipInstance = {
  reference: TooltipReference;
  setContent: (content: string) => void;
};

type TooltipOptions = {
  content: (reference: TooltipReference) => string;
  delay: [number, number];
  onTrigger: (instance: TooltipInstance) => void;
  target: string;
  theme: string;
  touch: ['hold', number];
};

const TOOLTIP_SHOW_DELAY = 500;
const TOOLTIP_HIDE_DELAY = 150;
const noop = (): void => undefined;

const destroy = mock(noop);
const delegate = mock((_element: object, options: TooltipOptions) => ({ destroy, options }));

mock.module('tippy.js', () => ({ delegate }));

const { useTooltip } = await import('%/useTooltip.ts');

const body = {};

beforeEach(() => {
  Object.assign(globalThis, { document: { body } });
  delegate.mockClear();
  destroy.mockClear();
});

describe('useTooltip', () => {
  it('delegates title tooltips with the configured behavior', () => {
    const cleanup = useTooltip();
    const options = delegate.mock.calls[0]?.[1];

    expect(delegate).toHaveBeenCalledWith(body, expect.any(Object));
    expect(options).toMatchObject({
      delay: [TOOLTIP_SHOW_DELAY, TOOLTIP_HIDE_DELAY],
      target: '[title]',
      theme: 'violet',
      touch: ['hold', TOOLTIP_HIDE_DELAY],
    });
    expect(cleanup).toBeFunction();

    cleanup();

    expect(destroy).toHaveBeenCalledTimes(1);
  });

  it('moves a title into Tippy content when triggered', () => {
    useTooltip();
    const options = delegate.mock.calls[0]?.[1];
    const reference: TooltipReference = {
      getAttribute: mock((name: string) => (name === 'title' ? 'Tooltip text' : null)),
      removeAttribute: mock(noop),
    };
    const instance: TooltipInstance = {
      reference,
      setContent: mock(noop),
    };

    expect(options?.content(reference)).toBe('Tooltip text');
    options?.onTrigger(instance);

    expect(instance.setContent).toHaveBeenCalledWith('Tooltip text');
    expect(reference.removeAttribute).toHaveBeenCalledWith('title');
  });
});
