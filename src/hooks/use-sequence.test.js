import { act, renderHook } from '@testing-library/react-hooks';
import { test } from 'vitest';
import { resourceLimits } from 'worker_threads';
import { useSequence } from './use-sequence';

const items = ['apple', 'banana', 'cherry'];

describe('use-sequence', () => {
  test('should correctly intialise', () => {
    const { result } = renderHook(() => useSequence({
      initialValue: 'apple',
      items,
    }));
    const [state] = result.current;

    expect(state).toEqual({
      direction: 0,
      index: 0,
      value: 'apple',
    });
  });

  test('should allow go next', () => {
    const { result } = renderHook(() => useSequence({
      initialValue: 'apple',
      items,
    }));

    result.current[1].next();
    result.current[1].next();

    expect(result.current[0]).toEqual({
      direction: 1,
      index: 2,
      value: 'cherry',
    });
  });

  test('should not allow go next when exceeding boundary', () => {
    const { result } = renderHook(() => useSequence({
      initialValue: 'cherry',
      items,
    }));
    const [, sequence] = result.current;

    act(() => {
      sequence.next();
    });

    expect(result.current[0]).toEqual({
      direction: 0,
      index: 2,
      value: 'cherry',
    });
  });

  test('should allow looping to beginning', () => {
    const { result } = renderHook(() => useSequence({
      initialValue: 'cherry',
      items,
      loop: true,
    }));
    const [, sequence] = result.current;

    act(() => {
      sequence.next();
    });

    expect(result.current[0]).toEqual({
      direction: 1,
      index: 0,
      value: 'apple',
    });
  });

  test('should allow go prev', () => {
    const { result } = renderHook(() => useSequence({
      initialValue: 'cherry',
      items,
    }));

    result.current[1].prev();
    result.current[1].prev();

    expect(result.current[0]).toEqual({
      direction: -1,
      index: 0,
      value: 'apple',
    });
  });

  test('should not allow go prev when wil exceed boundary', () => {
    const { result } = renderHook(() => useSequence({
      initialValue: 'apple',
      items,
    }));
    const [, sequence] = result.current;

    act(() => {
      sequence.prev();
    });

    expect(result.current[0]).toEqual({
      direction: 0,
      index: 0,
      value: 'apple',
    });
  });

  test('should allow looping to the end', () => {
    const { result } = renderHook(() => useSequence({
      initialValue: 'apple',
      items,
      loop: true,
    }));
    const [, sequence] = result.current;

    act(() => {
      sequence.prev();
    });

    expect(result.current[0]).toEqual({
      direction: -1,
      index: 2,
      value: 'cherry',
    });
  });

  test('should allow skipping forwards', () => {
    const { result } = renderHook(() => useSequence({
      initialValue: 'apple',
      items,
    }));
    const [, sequence] = result.current;

    act(() => {
      sequence.goTo('cherry');
    });

    expect(result.current[0]).toEqual({
      direction: 1,
      index: 2,
      value: 'cherry',
    });
  });

  test('should allow skipping backwards', () => {
    const { result } = renderHook(() => useSequence({
      initialValue: 'cherry',
      items,
    }));
    const [, sequence] = result.current;

    act(() => {
      sequence.goTo('apple');
    });

    expect(result.current[0]).toEqual({
      direction: -1,
      index: 0,
      value: 'apple',
    });
  });

  test('should not allow skipping to unknown item', () => {
    const { result } = renderHook(() => useSequence({
      initialValue: 'apple',
      items,
    }));
    const [, sequence] = result.current;

    act(() => {
      sequence.goTo('date');
    });

    expect(result.current[0]).toEqual({
      direction: 0,
      index: 0,
      value: 'apple',
    });
  });

  test('should correctly reset', () => {
    const { result } = renderHook(() => useSequence({
      initialValue: 'apple',
      items,
    }));

    result.current[1].next();
    result.current[1].next();
    result.current[1].reset();

    expect(result.current[0]).toEqual({
      direction: -1,
      index: 0,
      value: 'apple',
    });
  })
});