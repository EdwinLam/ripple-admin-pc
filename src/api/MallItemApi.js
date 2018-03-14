import fetch from './fetch'

export default class MallTypeApi {
  static queryPage ({pageNo,pageSize,typeId}) {
    return fetch({
      url: '/api/mall/attribute/queryPage',
      method: 'get',
      params:{pageNo,pageSize,typeId}
    })
  }
  static save ({attributeName,typeId}) {
    return fetch({
      url: '/api/mall/attribute/save',
      method: 'post',
      data:{attributeName,typeId}
    })
  }
  static update ({attributeName,typeId,id}) {
    return fetch({
      url: '/api/mall/attribute/'+id,
      method: 'post',
      data:{attributeName,typeId}
    })
  }
  static destroy (id) {
    return fetch({
      url: '/api/mall/attribute/'+id,
      method: 'delete'
    })
  }
}