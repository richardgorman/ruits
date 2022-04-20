import { act, renderHook } from '@testing-library/react-hooks';
import { useSwitch } from './use-switch';

describe('use-switch', () => {
  test('should default intialise to false', () => {
    const { result } = renderHook(() => useSwitch());
    const [state] = result.current;

    expect(state).toBe(false);
  });

  test('should correctly intialise to true', () => {
    const { result } = renderHook(() => useSwitch(true));
    const [state] = result.current;

    expect(state).toBe(true);
  });

  test('should correctly switch on', () => {
    const { result } = renderHook(() => useSwitch());
    const [, mutators] = result.current;

    act(() => {
      mutators.on();
    })

    expect(result.current[0]).toBe(true);
  });

  test('should correctly switch off', () => {
    const { result } = renderHook(() => useSwitch(true));
    const [, mutators] = result.current;

    act(() => {
      mutators.off();
    })

    expect(result.current[0]).toBe(false);
  });

  test('should correctly flip the switch', () => {
    const { result } = renderHook(() => useSwitch());
    const [, mutators] = result.current;

    act(() => {
      mutators.flip();
    })

    expect(result.current[0]).toBe(true);
  });

  test('should correctly set the switch', () => {
    const { result } = renderHook(() => useSwitch());
    const [, mutators] = result.current;

    act(() => {
      mutators.set(true);
    })

    expect(result.current[0]).toBe(true);
  });

  test('should memoize the mutators', () => {
    const { rerender, result } = renderHook(() => useSwitch());
    const [, mutators] = result.current;

    rerender();

    const [, mutators2] = result.current;
    expect(mutators).toBe(mutators2);
  });
});