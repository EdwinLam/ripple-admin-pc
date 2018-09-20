import { UserApi } from '@/api'
export default {
  state: {
    userItems: [],
    total: 0
  },
  mutations: {
    setUserItems (state, items) {
      state.userItems = items
    },
    setTotal (state, total) {
      state.total = total
    }
  },
  actions: {
    /* 添加用户 */
    async addUser ({ commit }, userData) {
      await UserApi.add(userData)
    },
    /* 按条件查询用户 */
    async queryUser ({ commit, state }, searchCondition) {
      const res = await UserApi.getByCondition(searchCondition)
      commit('setUserItems', res.result.content)
      commit('setTotal', res.result.totalElements)
    }
  }
}
