import fetch from './fetch'

export default class AuthUtil {

  login ({phone, password}) {
    return fetch({
      url: '/api/account/login',
      method: 'post',
      data:{
        phone,
        password
      }
    })
  }

  save ({phone, password}) {
    return fetch({
      url: '/api/account/save',
      method: 'post',
      data:{
        phone,
        password
      }
    })
  }

   logout () {
    return fetch({
      url: '/auth/logout',
      method: 'post'
    })
  }

   getUserInfo () {
    return fetch({
      url: '/api/user/getUserInfo',
      method: 'get',
    })
  }

}