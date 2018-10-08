import axios from '@/libs/api.request'
import qs from 'qs'

export default class DepartmentApi {
  static getByParentId (parentId) {
    return axios.request({
      url: 'department/getByParentId/' + parentId,
      method: 'get'
    })
  }

  static add (data) {
    return axios.request({
      data: qs.stringify(data),
      url: 'department/add',
      method: 'post'
    })
  }

  static edit (data) {
    return axios.request({
      data: qs.stringify(data),
      url: 'department/edit',
      method: 'post'
    })
  }

  static delByIds (ids) {
    return axios.request({
      url: 'department/delByIds/' + ids,
      method: 'delete'
    })
  }
}
