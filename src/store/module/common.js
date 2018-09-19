import { RoleApi } from '@/api'
/*
 * 一些公用数据获取
 */
export default {
  state: {
    roleItems: [], // 角色列表
    department: [], // 部门列表
    isFinishInit: false // 初始化完成标记
  },
  mutations: {
    initRoles (state, roleItems) {
      state.roleItems = roleItems
    },
    finishCommonData (state) {
      state.isFinishInit = true
    }
  },
  actions: {
    /* 登陆处理 */
    async initCommonData ({ state, commit }) {
      if (state.isFinishInit) return
      // 获取角色列表
      const res = await RoleApi.getAllList()
      commit('initRoles', res.result)
      // 标记初始化完成
      commit('finishCommonData')
    }
  }
}
