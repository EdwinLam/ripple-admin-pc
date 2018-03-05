import fetch from './fetch'

export default class AuthApi {
  static login ({phone, password}) {
    return fetch({
      url: '/open/auth/login',
      method: 'post',
      data:{
        phone,
        password
      }
    })
  }
}