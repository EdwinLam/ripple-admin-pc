import axios from '@/libs/api.request'

export default class RoleApi {
  static getAllList () {
    return axios.request({
      url: 'role/getAllList',
      method: 'get'
    })
  }
}
