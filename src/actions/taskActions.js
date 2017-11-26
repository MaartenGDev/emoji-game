import { LOAD_TASKS, ADD_TASK, UPDATE_TASK, DESTROY_TASK } from './taskTypes'
import TaskApi from '../services/TaskApi'

const taskApi = new TaskApi()

export const createTaskSuccess = task => ({
  type: ADD_TASK,
  task
})

export const updateTaskSuccess = task => ({
  type: UPDATE_TASK,
  task
})

export const destroyTaskSuccess = task => ({
  type: DESTROY_TASK,
  task
})
export const loadTasksSuccess = tasks => ({
  type: LOAD_TASKS,
  tasks
})

export const loadTasks = () => {
  return async dispatch => {
    return taskApi.all()
      .then(tasks => dispatch(loadTasksSuccess(tasks)))
  }
}

export const updateTask = task => {
  return async dispatch => {
    return taskApi.createOrUpdate(task)
      .then(savedTask => {
        const providedTaskWithPossibleNewId = {...task, id: (savedTask !== undefined ? savedTask.id : task.id )}

        task.id === undefined
          ? dispatch(createTaskSuccess(providedTaskWithPossibleNewId))
          : dispatch(updateTaskSuccess(providedTaskWithPossibleNewId))
      })
  }
}

export const destroyTask = task => {
  return async dispatch => {
    return taskApi.destroy(task)
      .then(res => dispatch(destroyTaskSuccess(task)))
  }
}