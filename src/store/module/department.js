import axios from '@/libs/api.request'

/*
 * 部门相关
 */
export default {
  state: {
    departmentTree: [], // 部门树
    departmentMap: {}
  },
  mutations: {
    initAllRoles (state, items) {
      state.allRolesItems = items
    }
  },
  actions: {
    /* 根据父节点获取部门列表 */
    async initDepartmentByParentId ({ state, commit }, parentId) {
      // 复原所有父节点
      const restoreParentDepartment = async (parentId, childrenDepartment) => {
        if (!state.departmentMap[parentId]) {
          // 如果是父节点则直接添加
          const childrenRes = await axios.request({
            url: 'department/getByParentId/' + parentId,
            method: 'get'
          })
          if (parentId === '0') { // 如果父节点则将获取的数组直接加到树数组
            childrenRes.data.forEach((el, index) => {
              if (state.departmentMap[el.id]) {
                childrenRes.data[index] = state.departmentMap[el.id]
              }
            })
            state.departmentTree.push(...childrenRes.data)
            state.departmentMap[parentId] = state.departmentTree
          } else {
            const res = await axios.request({
              url: 'department/get/' + parentId,
              method: 'get'
            })
            let curDepartment = res.data
            curDepartment.children = childrenRes.data
            curDepartment.children.forEach((el, index) => {
              if (el.id === childrenDepartment.id) {
                curDepartment.children[index] = childrenDepartment
              }
            })
            state.departmentMap[parentId] = curDepartment
            await restoreParentDepartment(curDepartment.parentId, curDepartment)
          }
        }
      }
      await restoreParentDepartment(parentId, [])
    }
  }
}
