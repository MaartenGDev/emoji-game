import Request from '../helpers/Request'

class RestApi {
  constructor (endpoint, resource) {
    this.endpoint = endpoint;
    this.resource = resource;
  }

  all () {
    return new Promise((res, rej) => {
      console.log(`${this.endpoint}/${this.resource}`)
      Request.getJson(`${this.endpoint}/${this.resource}`)
        .then(response => {
          localStorage.setItem(`${this.resource}ApiCache`, JSON.stringify(response.data))
          res(response.data)
        })
        .catch(x => res(JSON.parse(localStorage.getItem(`${this.resource}ApiCache`))))
    })
  }

  createOrUpdate (resource) {
    if (resource.id === undefined) return this.store(resource)

    return this.update(resource)
  }

  store (resource) {
    return new Promise((res, rej) => {
      Request.postJson(`${this.endpoint}/${this.resource}`, resource)
        .then(response => res(response.data))
        .catch(err => rej(err))
    })
  }

  update (resource) {
    return new Promise((res, rej) => {
      Request.patchJson(`${this.endpoint}/${this.resource}/${resource.id}`, resource)
        .then(response => res(response.data))
        .catch(err => rej(err))
    })
  }

  destroy (resource) {
    return new Promise((res, rej) => {
      Request.destroyJson(`${this.endpoint}/${this.resource}/${resource.id}`)
        .then(response => res(response.data))
        .catch(err => rej(err))
    })
  }
}

export default RestApi