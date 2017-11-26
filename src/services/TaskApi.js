import { API_ENDPOINT } from '../config'
import RestApi from './RestApi'

class TaskApi extends RestApi {
  constructor(){
    super(API_ENDPOINT, 'tasks')
  }
}


export default TaskApi