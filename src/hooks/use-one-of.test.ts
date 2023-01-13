import { act, renderHook } from '@testing-library/react-hooks'
import { useOneOf } from './use-one-of'

const items = ['apple', 'banana', 'cherry']

describe('use-one-of', () => {
  test('should not have a default value', () => {
    const { result } = renderHook(() =>
      useOneOf({
        items,
      })
    )

    expect(result.current[0]).toBe(undefined)
  })

  test('should have a default value', () => {
    const { result } = renderHook(() =>
      useOneOf({
        initialValue: 'apple',
        items,
      })
    )

    expect(result.current[0]).toBe('apple')
  })

  test('should ignore an unknown default value', () => {
    const { result } = renderHook(() =>
      useOneOf({
        initialValue: 'date',
        items,
      })
    )

    expect(result.current[0]).toBe(undefined)
  })

  test('should set a value', () => {
    const { result } = renderHook(() =>
      useOneOf({
        initialValue: 'apple',
        items,
      })
    )
    const [, oneOf] = result.current

    oneOf.set('banana')

    expect(result.current[0]).toBe('banana')
  })

  test('should set new value when items change', () => {
    const { rerender, result } = renderHook((props) => useOneOf(props), {
      initialProps: {
        initialValue: 'apple',
        items,
      },
    })
    const [, oneOf] = result.current

    rerender({ initialValue: 'apple', items: items.concat('date') })

    oneOf.set('date')

    expect(result.current[0]).toBe('date')
  })

  test('should reset value when items change and state doesn`t match', () => {
    const { rerender, result } = renderHook((props) => useOneOf(props), {
      initialProps: {
        initialValue: 'apple',
        items,
      },
    })

    rerender({ initialValue: 'apple', items: ['date'] })

    expect(result.current[0]).toBe(undefined)
  })

  test('should not set an unknown value', () => {
    const { result } = renderHook(() =>
      useOneOf({
        initialValue: 'apple',
        items,
      })
    )
    const [, oneOf] = result.current

    oneOf.set('date')

    expect(result.current[0]).toBe('apple')
  })

  test('should reset to initial value', () => {
    const { result } = renderHook(() =>
      useOneOf({
        initialValue: 'banana',
        items,
      })
    )
    const [, oneOf] = result.current

    oneOf.set('apple')
    oneOf.reset()

    expect(result.current[0]).toBe('banana')
  })

  test('should clear the value', () => {
    const { result } = renderHook(() =>
      useOneOf({
        initialValue: 'apple',
        items,
      })
    )
    const [, oneOf] = result.current

    oneOf.clear()

    expect(result.current[0]).toBe(undefined)
  })

  test('should correctly call a listener', () => {
    const listener = vi.fn()
    const { result } = renderHook(() =>
      useOneOf({
        initialValue: 'apple',
        items,
        onChange: listener,
      })
    )

    act(() => {
      result.current[1].set('cherry')
    })

    expect(listener).toHaveBeenCalledTimes(1)
    expect(listener).toHaveBeenCalledWith('cherry')
  })
})
