import fetch from './fetch'

export default class MallTypeApi {
  static findAll () {
    return fetch({
      url: '/api/mall/type/findAll',
      method: 'get'
    })
  }
  static findBaseType () {
    return fetch({
      url: '/api/mall/type/findBaseType',
      method: 'get'
    })
  }
  static destroy (id) {
    return fetch({
      url: '/api/mall/type/'+id,
      method: 'delete'
    })
  }
  static save ({typeId,typeName,idLink}) {
    return fetch({
      url: '/api/mall/type/save',
      method: 'post',
      data:{
        typeId,typeName,idLink
      }
    })
  }
  static update (id,{typeId,typeName}) {
    let data = {typeId,typeName}
    return fetch({
      url: '/api/account/'+id,
      method: 'post',
      data
    })
  }
}