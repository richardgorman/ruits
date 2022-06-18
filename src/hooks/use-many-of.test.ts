import { act, renderHook } from '@testing-library/react-hooks'
import { useManyOf } from './use-many-of'

const items = ['apple', 'banana', 'cherry']

describe('use-many-of', () => {
  test('should not have a default value', () => {
    const { result } = renderHook(() => useManyOf({
      items,
    }))

    expect(result.current[0]).toEqual([])
  });

  test('should set a default value', () => {
    const { result } = renderHook(() => useManyOf({
      initialValue: ['apple', 'banana'],
      items,
    }))

    expect(result.current[0]).toEqual(['apple', 'banana'])
  });

  test('should ignore an unknown default value', () => {
    const { result } = renderHook(() => useManyOf({
      initialValue: ['apple', 'date'],
      items,
    }))

    expect(result.current[0]).toEqual(['apple'])
  });

  test('should allow to select a value', () => {
    const { result } = renderHook(() => useManyOf({
      items,
    }))
    const [, manyOf] = result.current

    act(() => {
      manyOf.select('apple')
    })

    expect(result.current[0]).toEqual(['apple'])
  });

  test('should not allow to select an unknown value', () => {
    const { result } = renderHook(() => useManyOf({
      initialValue: ['apple'],
      items,
    }))
    const [, manyOf] = result.current

    act(() => {
      manyOf.select('date')
    })

    expect(result.current[0]).toEqual(['apple'])
  });

  test('should not allow to select an existing value', () => {
    const { result } = renderHook(() => useManyOf({
      initialValue: ['apple', 'banana'],
      items,
    }))
    const [, manyOf] = result.current

    act(() => {
      manyOf.select('banana')
    })

    expect(result.current[0]).toEqual(['apple', 'banana'])
  });

  test('should allow to select all values', () => {
    const { result } = renderHook(() => useManyOf({
      items,
    }))
    const [, manyOf] = result.current

    act(() => {
      manyOf.selectAll()
    })

    expect(result.current[0]).toEqual(items)
  });

  test('should allow to clear the value', () => {
    const { result } = renderHook(() => useManyOf({
      initialValue: ['apple', 'banana'],
      items,
    }))
    const [, manyOf] = result.current

    act(() => {
      manyOf.deselectAll()
    })

    expect(result.current[0]).toEqual([])
  });

  test('should allow to reset to the initial value', () => {
    const { result } = renderHook(() => useManyOf({
      initialValue: ['apple', 'banana'],
      items,
    }))
    const [, manyOf] = result.current

    act(() => {
      manyOf.select('cherry')
    })

    expect(result.current[0]).toEqual(['apple', 'banana', 'cherry'])

    act(() => {
      manyOf.reset()
    })

    expect(result.current[0]).toEqual(['apple', 'banana'])
  });

  test('should allow to flip a value', () => {
    const { result } = renderHook(() => useManyOf({
      initialValue: ['apple', 'banana'],
      items,
    }))
    const [, manyOf] = result.current

    act(() => {
      manyOf.flip('banana');
      manyOf.flip('cherry');
    })

    expect(result.current[0]).toEqual(['apple', 'cherry'])
  });

  test('should not allow to flip an unknown value', () => {
    const { result } = renderHook(() => useManyOf({
      initialValue: ['apple', 'banana'],
      items,
    }))
    const [, manyOf] = result.current

    act(() => {
      manyOf.flip('banana');
      manyOf.flip('date');
    })

    expect(result.current[0]).toEqual(['apple'])
  });
});