import fetch from './fetch'

export default class AccountApi {
  static getAccount () {
    return fetch({
      url: '/api/account/getAccount',
      method: 'get'
    })
  }
  static queryPage ({phone,pageNo,pageSize}) {
    let params = {
      phone,pageNo,pageSize
    }
    if(!phone||phone==''){
      delete params.phone
    }
    return fetch({
      url: '/api/account/queryPage',
      method: 'get',
      params
    })
  }
  static destroy (id) {
    return fetch({
      url: '/api/account/'+id,
      method: 'delete'
    })
  }
  static save ({phone,email}) {
    return fetch({
      url: '/api/account/save',
      method: 'post',
      data:{
        phone,email
      }
    })
  }
  static update (id,{phone,email}) {
    let data = {}
    if(phone)data.phone=phone
    if(email)data.email=email
    return fetch({
      url: '/api/account/'+id,
      method: 'post',
      data
    })
  }
}