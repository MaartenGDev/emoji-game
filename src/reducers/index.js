import { combineReducers } from 'redux'
import tasks from './tasks'
import groups from './groups'

const rootReducer = combineReducers({
  tasks,
  groups
})

export default rootReducer