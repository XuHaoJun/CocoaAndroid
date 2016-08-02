import Immutable from 'immutable'
import { CREATE_BRICK, DELETE_BRICK, ADD_CHILD, REMOVE_CHILD } from '../actions/omino'

function childIds (state, action) {
  switch (action.type) {
    case ADD_CHILD:
      return state.push(action.childId)
    case REMOVE_CHILD:
      return state.filter(id => id !== action.childId)
  }
}

function brick (state, action) {
  switch (action.type) {
    case CREATE_BRICK:
      return Immutable.Map({
        id: action.id,
        childIds: Immutable.List()
      })
    case ADD_CHILD:
    case REMOVE_CHILD:
      return state.set('childIds', childIds(state.get('childIds'), action))
    default:
      return state
  }
}

function getAllDescendantIds (state, id) {
  return state.get(id).get('childIds').reduce((acc, childId) => (
  [ ...acc, childId, ...getAllDescendantIds(state, childId) ]
  ), [])
}

function deleteMany (state, ids) {
  return ids.reduce((acc, id) => acc.delete(id), state)
}

export default function(state = Immutable.Map() , action) {
  const { id } = action
  if (typeof id === 'undefined') {
    return state
  }

  if (action.type === DELETE_BRICK) {
    const descendantIds = getAllDescendantIds(state, id)
    return deleteMany(state, [ id, ...descendantIds ])
  }

  return state.set(id, brick(state.get(id), action))
}
