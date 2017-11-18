import * as types from '../actions/groupTypes'

const groups = (state = [], action) => {
  switch (action.type) {
    case types.ADD_GROUP:
      return [...state,
        Object.assign({}, action.group)
      ]
    case types.UPDATE_GROUP:
      return [...state.filter(group => group.id !== action.group.id), action.group]
    case types.DESTROY_GROUP:
      return [...state.filter(group => group.id !== action.group.id)]
    case types.LOAD_GROUPS: {
      return [...action.groups];
    }
    default:
      return state
  }
}

export default groups