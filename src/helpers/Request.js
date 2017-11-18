class Request {
  static postJson (uri, data) {
    return Request.jsonRequest('POST', uri, data)
  }

  static patchJson (uri, data) {
    return Request.jsonRequest('PATCH', uri, data)
  }

  static destroyJson (uri, data = {}) {
    return Request.jsonRequest('DELETE', uri, data)
  }

  static getJson (uri) {
    return fetch(uri, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(res => res.json())
  }

  static jsonRequest (method, uri, data) {
    return fetch(uri, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => res.json())
  }
}

export default Request