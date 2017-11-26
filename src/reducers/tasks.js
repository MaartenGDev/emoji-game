import * as types from '../actions/taskTypes'

const tasks = (state = [], action) => {
  switch (action.type) {
    case types.ADD_TASK:
      return [...state, {...action.task}]
    case types.UPDATE_TASK:
      return [...state.filter(task => task.id !== action.task.id), action.task]
    case types.DESTROY_TASK:
      return [...state.filter(task => task.id !== action.task.id)]
    case types.LOAD_TASKS: {
      return [...action.tasks];
    }
    default:
      return state
  }
}

export default tasks