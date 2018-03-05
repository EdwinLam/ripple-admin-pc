import fetch from './fetch'
import BaseApi from './BaseApi'

export default class UserApi extends BaseApi{

  constructor () {
    super('user')
  }

  isExistPhone({phone}) {
    return fetch({
      url: '/api/user/isExistPhone',
      method: 'get',
      params: { phone }
    })
  }

  add({nickname,password,phone}) {
    const data = {
      nickname,
      password,
      phone
    }
    return fetch({
      url: '/api/user/create',
      method: 'post',
      data
    })
  }

  updateById({id,nickname}) {
    const data={nickname}
    return fetch({
      url: '/api/user/'+id,
      method: 'post',
      data
    })
  }

}