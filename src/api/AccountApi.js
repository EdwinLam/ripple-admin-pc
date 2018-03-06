import fetch from './fetch'

export default class AccountApi {
  static getAccount () {
    return fetch({
      url: '/api/account/getAccount',
      method: 'get'
    })
  }
}