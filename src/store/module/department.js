import { DepartmentApi } from '@/api'
import Vue from 'vue'

/* 记录id与节点对应的关系 */
let tmpDepartmentMap = {}
/* 记录是否已经获取子节点 */
let departmentMap = {}

/* 初始化部门节点 */
const initDepartment = (item) => {
  if (item.isParent) {
    item.loading = false
    item.children = []
  }
  item.expand = false
}

/* 根据id获取部门 */
const getDepartmentById = async (id) => {
  let curDepartment = tmpDepartmentMap[id]
  if (!curDepartment) {
    const res = DepartmentApi.get(id)
    initDepartment(res.data)
    curDepartment = res.data
  }
  return curDepartment
}

/* 根据id获取子部门 */
const getChildrenDepartmentById = async (parentId, childrenDepartment) => {
  const res = await DepartmentApi.getByParentId(parentId)
  res.data.forEach((el, index) => {
    if (childrenDepartment && childrenDepartment.id === el.id) {
      res.data[index] = childrenDepartment
    }
    initDepartment(el)
  })
  return res.data
}
/*
 * 部门相关
 */
export default {
  state: {
    departmentTree: [] // 部门树
  },
  mutations: {
    /* 刷新树 */
    refreshTree (state) {
      const tmp = state.departmentTree
      state.departmentTree = []
      state.departmentTree = tmp
    },
    /* 根据id删除部门 */
    delDepartmentByIds (state, ids) {
      ids.forEach(id => {
        const curDepartment = tmpDepartmentMap[id]
        const parentDepartment = tmpDepartmentMap[curDepartment.parentId]
        if (parseInt(curDepartment.parentId) === 0) {
          state.departmentTree.forEach((el, index) => {
            if (el.id === id) { state.departmentTree.splice(index, 1) }
          })
        } else if (parentDepartment) {
          parentDepartment.children.forEach((el, index) => {
            if (el.id === id) {
              parentDepartment.children.splice(index, 1)
            }
          })
          if (parentDepartment.children && !parentDepartment.children.length) {
            Vue.set(parentDepartment, 'isParent', null)
            Vue.set(parentDepartment, 'loading', null)
            Vue.set(parentDepartment, 'expand', null)
            Vue.set(parentDepartment, 'children', null)
          }
        }
      })
    },
    /* 增加部门 */
    addDepartment (state, department) {
      initDepartment(department)
      const parentDepartment = tmpDepartmentMap[department.parentId]
      if (parseInt(department.parentId) === 0) { state.departmentTree.push(department) } else if (parentDepartment) {
        Vue.set(parentDepartment, 'isParent', true)
        Vue.set(parentDepartment, 'loading', false)
        if (!parentDepartment.children) { Vue.set(parentDepartment, 'children', []) }
        Vue.set(parentDepartment, 'expand', true)
        parentDepartment.children.push(department)
      }
      tmpDepartmentMap[department.id] = department
    }
  },

  actions: {
    /* 根据id删除部门 */
    async delByIds ({ state, commit, dispatch }, ids) {
      await DepartmentApi.delByIds(ids.join(','))
      commit('delDepartmentByIds', ids)
    },
    /* 增加部门 */
    async addDepartment ({ dispatch, commit }, data) {
      const res = await DepartmentApi.add(data)
      commit('addDepartment', res.data)
    },
    /* 根据父节点获取部门列表 */
    async initDepartmentByParentId ({ state, commit }, parentId) {
      // 复原所有父节点
      const restoreParentDepartment = async (parentId, childrenDepartment) => {
        if (!departmentMap[parentId]) { // 没有展开过的节点
          const childrenDepartments = await getChildrenDepartmentById(parentId, childrenDepartment)
          // 如果是父节点则直接添加
          if (parentId === 0) { // 如果父节点则将获取的数组直接加到树数组
            state.departmentTree.push(...childrenDepartments)
            state.departmentTree.forEach(el => {
              tmpDepartmentMap[el.id] = el
            })
            departmentMap[parentId] = true
          } else {
            let curDepartment = await getDepartmentById(parentId)
            curDepartment.children = childrenDepartments
            curDepartment.children.forEach(el => {
              tmpDepartmentMap[el.id] = el
            })
            await restoreParentDepartment(parseInt(curDepartment.parentId), curDepartment)
          }
        }
      }
      await restoreParentDepartment(parentId)
      if (tmpDepartmentMap[parentId]) {
        tmpDepartmentMap[parentId].expand = true
      }
      commit('refreshTree')
    }
  }
}
