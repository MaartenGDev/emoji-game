import Request from '../helpers/Request'

class GroupApi {
  static endPoint = 'http://emoji-api.dev'

  static all () {
    return new Promise((res, rej) => {
      Request.getJson(`${GroupApi.endPoint}/api/v1/groups`)
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
      Request.postJson(`${GroupApi.endPoint}/api/v1/groups`, group)
        .then(response => res(response.data))
        .catch(err => rej(err))
    })
  }

  static update (group) {
    return new Promise((res, rej) => {
      Request.patchJson(`${GroupApi.endPoint}/api/v1/groups/${group.id}`, group)
        .then(response => res(response.data))
        .catch(err => rej(err))
    })
  }

  static destroy (group) {
    return new Promise((res, rej) => {
      Request.destroyJson(`${GroupApi.endPoint}/api/v1/groups/${group.id}`)
        .then(response => res(response.data))
        .catch(err => rej(err))
    })
  }
}

export default GroupApi