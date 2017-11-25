import Request from '../helpers/Request'
import {API_ENDPOINT} from '../config'

class GroupApi {
  static all () {
    return new Promise((res, rej) => {
      Request.getJson(`${API_ENDPOINT}/groups`)
        .then(response => {
          localStorage.setItem('GroupApiCache', JSON.stringify(response.data))
          res(response.data)
        })
        .catch(x => res(JSON.parse(localStorage.getItem('GroupApiCache'))))
    })
  }

  static createOrUpdate (group) {
    if (group.id === undefined) return GroupApi.store(group)

    return GroupApi.update(group)
  }

  static store (group) {
    return new Promise((res, rej) => {
      Request.postJson(`${API_ENDPOINT}/groups`, group)
        .then(response => res(response.data))
        .catch(err => rej(err))
    })
  }

  static update (group) {
    return new Promise((res, rej) => {
      Request.patchJson(`${API_ENDPOINT}/groups/${group.id}`, group)
        .then(response => res(response.data))
        .catch(err => rej(err))
    })
  }

  static destroy (group) {
    return new Promise((res, rej) => {
      Request.destroyJson(`${API_ENDPOINT}/groups/${group.id}`)
        .then(response => res(response.data))
        .catch(err => rej(err))
    })
  }
}

export default GroupApi