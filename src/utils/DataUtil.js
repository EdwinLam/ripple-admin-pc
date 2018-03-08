export default class DataUtil {
  static toTreeData ({sourceData,key,idKey,parentIdKey}) {
    let hash = {}
    let filterSourceData = []
    let list = []
    let origin = ''
    sourceData.forEach((el)=>{
      el.children=[]
      el.title = el[key]
      el.expand =true
      hash[el[idKey]] = el
    })
    sourceData.forEach((el)=>{
      let parentEl = hash[el[parentIdKey]]
      if(parentEl) {
        parentEl.children.push(el)
      }else{
        list.push(el)
      }
    })
    return list
  }

  static toCascaderData ({sourceData,key,idKey,parentIdKey}) {
    sourceData=this.objectMerge({}, sourceData)
    let hash = {}
    let filterSourceData = []
    let list = []
    sourceData.forEach((el)=>{
      hash[el[idKey]] ={label:el[key],value:el[idKey],children:[],typeId:el.typeId}
      filterSourceData.push(hash[el[idKey]] )
    })
    filterSourceData.forEach((el)=>{
      let parentEl = hash[el[parentIdKey]]
      if(parentEl) {
        parentEl.children.push(el)
      }else{
        list.push(el)
      }
    })
    return list
  }

  static objectMerge(target, source) {
    /* Merges two  objects,
     giving the last one precedence */

    if (typeof target !== 'object') {
      target = {}
    }
    if (Array.isArray(source)) {
      return source.slice()
    }
    for (const property in source) {
      if (source.hasOwnProperty(property)) {
        const sourceProperty = source[property]
        if (typeof sourceProperty === 'object') {
          target[property] = this.objectMerge(target[property], sourceProperty)
          continue
        }
        target[property] = sourceProperty
      }
    }
    return target
  }

  static deepClone(source) {
    if (!source && typeof source !== 'object') {
      throw new Error('error arguments', 'shallowClone')
    }
    const targetObj = source.constructor === Array ? [] : {}
    for (const keys in source) {
      if (source.hasOwnProperty(keys)) {
        if (source[keys] && typeof source[keys] === 'object') {
          targetObj[keys] = source[keys].constructor === Array ? [] : {}
          targetObj[keys] = this.deepClone(source[keys])
        } else {
          targetObj[keys] = source[keys]
        }
      }
    }
    return targetObj
  }
}