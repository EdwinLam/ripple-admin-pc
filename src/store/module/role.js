import { RoleApi } from '@/api'
/*
 * 角色相关
 */
export default {
  state: {
    roleItems: [], // 角色列表
    allRolesItems: []
  },
  mutations: {
    initAllRoles (state, items) {
      state.allRolesItems = items
    }
  },
  actions: {
    /* 登陆处理 */
    async initAllRoles ({ state, commit }) {
      // 获取角色列表
      const res = await RoleApi.getAllList()
      commit('initAllRoles', res.data)
    }
  }
}
