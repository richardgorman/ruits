import { act, renderHook } from '@testing-library/react-hooks';
import { useToggle } from './use-toggle';

describe('use-toggle', () => {
  test('should default intialise to false', () => {
    const { result } = renderHook(() => useToggle());
    const [state] = result.current;

    expect(state).toBe(false);
  });

  test('should correctly intialise to true', () => {
    const { result } = renderHook(() => useToggle(true));
    const [state] = result.current;

    expect(state).toBe(true);
  });

  test('should correctly toggle on', () => {
    const { result } = renderHook(() => useToggle());
    const [, mutators] = result.current;

    act(() => {
      mutators.on();
    })

    expect(result.current[0]).toBe(true);
  });

  test('should correctly toggle off', () => {
    const { result } = renderHook(() => useToggle(true));
    const [, mutators] = result.current;

    act(() => {
      mutators.off();
    })

    expect(result.current[0]).toBe(false);
  });

  test('should correctly flip the toggle', () => {
    const { result } = renderHook(() => useToggle());
    const [, mutators] = result.current;

    act(() => {
      mutators.flip();
    })

    expect(result.current[0]).toBe(true);
  });

  test('should correctly set the toggle', () => {
    const { result } = renderHook(() => useToggle());
    const [, mutators] = result.current;

    act(() => {
      mutators.set(true);
    })

    expect(result.current[0]).toBe(true);
  });

  test('should memoize the mutators', () => {
    const { rerender, result } = renderHook(() => useToggle());
    const [, mutators] = result.current;

    rerender();

    const [, mutators2] = result.current;
    expect(mutators).toBe(mutators2);
  });
});