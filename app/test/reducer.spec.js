import expect from 'expect'
import expectImmutable from 'expect-immutable'
import deepFreeze from 'deep-freeze'
import reducer from '../reducers/omino'
import Immutable from 'immutable'
import { createBrick, deleteBrick, addChild, removeChild } from '../actions/omino'

expect.extend(expectImmutable)

describe('reducer', () => {
  it('should provide the initial state', () => {
    expect(reducer(undefined, {})).toEqualImmutable(Immutable.Map())
  })

  it('should handle CREATE_NODE action', () => {
    const stateBefore = Immutable.Map()
    const action = createBrick()
    const stateAfter = Immutable.fromJS({
      [action.id]: {
        id: action.id,
        childIds: []
      }
    })

    deepFreeze(stateBefore)
    deepFreeze(action)

    expect(reducer(stateBefore, action)).toEqualImmutable(stateAfter)
  })

  it('should handle DELETE_BRICK action', () => {
    const stateBefore = Immutable.fromJS({
      'node_0': {
        id: 'node_0',
        childIds: [ 'node_1' ]
      },
      'node_1': {
        id: 'node_1',
        childIds: []
      },
      'node_2': {
        id: 'node_2',
        childIds: [ 'node_3', 'node_4' ]
      },
      'node_3': {
        id: 'node_3',
        childIds: []
      },
      'node_4': {
        id: 'node_4',
        childIds: []
      }
    })
    const action = deleteBrick('node_2')
    const stateAfter = Immutable.fromJS({
      'node_0': {
        id: 'node_0',
        childIds: [ 'node_1' ]
      },
      'node_1': {
        id: 'node_1',
        childIds: []
      }
    })

    deepFreeze(stateBefore)
    deepFreeze(action)

    expect(reducer(stateBefore, action)).toEqualImmutable(stateAfter)
  })

  it('should handle ADD_CHILD action', () => {
    const stateBefore = Immutable.fromJS({
      'node_0': {
        id: 'node_0',
        counter: 0,
        childIds: []
      },
      'node_1': {
        id: 'node_1',
        counter: 0,
        childIds: []
      }
    })
    const action = addChild('node_0', 'node_1')
    const stateAfter = Immutable.fromJS({
      'node_0': {
        id: 'node_0',
        counter: 0,
        childIds: [ 'node_1' ]
      },
      'node_1': {
        id: 'node_1',
        counter: 0,
        childIds: []
      }
    })

    deepFreeze(stateBefore)
    deepFreeze(action)

    expect(reducer(stateBefore, action)).toEqualImmutable(stateAfter)
  })

  it('should handle REMOVE_CHILD action', () => {
    const stateBefore = Immutable.fromJS({
      'node_0': {
        id: 'node_0',
        counter: 0,
        childIds: [ 'node_1' ]
      },
      'node_1': {
        id: 'node_1',
        counter: 0,
        childIds: []
      }
    })
    const action = removeChild('node_0', 'node_1')
    const stateAfter = Immutable.fromJS({
      'node_0': {
        id: 'node_0',
        counter: 0,
        childIds: []
      },
      'node_1': {
        id: 'node_1',
        counter: 0,
        childIds: []
      }
    })

    deepFreeze(stateBefore)
    deepFreeze(action)

    expect(reducer(stateBefore, action)).toEqualImmutable(stateAfter)
  })
})
