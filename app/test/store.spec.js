import expect from 'expect'
import { createStore } from 'redux'

describe('store', () => {
  it('should handle redux counter example', () => {
    function counter (state = 0 , action) {
      switch (action.type) {
        case 'INCREMENT':
          return state + 1
        case 'DECREMENT':
          return state - 1
        default:
          return state
      }
    }

    let store = createStore(counter)

    store.dispatch({ type: 'INCREMENT' })
    store.dispatch({ type: 'INCREMENT' })
    store.dispatch({ type: 'DECREMENT' })
    expect(store.getState()).toEqual(1)
  })
})
