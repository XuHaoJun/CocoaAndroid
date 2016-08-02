import uuid from 'node-uuid'

export const CREATE_BRICK = 'CREATE_BRICK'
export const DELETE_BRICK = 'DELETE_BRICK'
export const ADD_CHILD = 'ADD_CHILD'
export const REMOVE_CHILD = 'REMOVE_CHILD'

export function createBrick () {
  return {
    type: CREATE_BRICK,
    id: uuid.v4()
  }
}

export function deleteBrick (id) {
  return {
    type: DELETE_BRICK,
    id: id
  }
}

export function addChild (id, childId) {
  return {
    type: ADD_CHILD,
    id: id,
    childId: childId
  }
}

export function removeChild (id, childId) {
  return {
    type: REMOVE_CHILD,
    id: id,
    childId: childId
  }
}
