import fetch from './fetch'

export default class UserApi {
  static findUserByAccountId (accountId) {
    return fetch({
      url: '/api/user/findUserByAccountId',
      method: 'get',
      params:{
        accountId
      }
    })
  }
  static unBindUser (id) {
    return fetch({
      url: '/api/user/unBindUser',
      method: 'get',
      params:{
        id
      }
    })
  }
}