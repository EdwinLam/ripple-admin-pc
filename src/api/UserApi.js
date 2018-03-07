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
      method: 'post',
      data:{
        id
      }
    })
  }
  static bindUser ({accountId,id}) {
    return fetch({
      url: '/api/user/bindUser',
      method: 'post',
      data:{
        accountId,id
      }
    })
  }
  static findBindUserPage ({ phone,pageNo,pageSize}) {
    let params = {
      phone,pageNo,pageSize
    }
    if(!phone||phone==''){
      delete params.phone
    }
    return fetch({
      url: '/api/user/findBindUserPage',
      method: 'get',
      params
    })
  }


}