import axios from '@/libs/api.request'
import qs from 'qs'

export default class UserApi {
  static login ({ username, password }) {
    const data = {
      username,
      password
    }
    return axios.request({
      url: 'login',
      data: qs.stringify(data),
      method: 'post'
    })
  }

  static getUserInfo () {
    return axios.request({
      url: 'user/info',
      method: 'get'
    })
  }

  static getByCondition () {
    return axios.request({
      url: 'user/getByCondition',
      method: 'get'
    })
  }

  static adminEdit () {
    return axios.request({
      data: qs.stringify(data),
      url: 'user/admin/edit',
      method: 'post'
    })
  }

  static add (data) {
    return axios.request({
      data: qs.stringify(data),
      url: 'user/admin/add',
      method: 'post'
    })
  }
}
