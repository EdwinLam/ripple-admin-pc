import fetch from './fetch'

export default class MallTypeApi {
  static queryPage ({pageNo,pageSize,typeId}) {
    return fetch({
      url: '/api/mall/attribute/queryPage',
      method: 'get',
      params:{pageNo,pageSize,typeId}
    })
  }
}