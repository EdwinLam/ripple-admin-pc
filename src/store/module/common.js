import { UserApi } from '@/api'
import { setToken, toTreeData } from '@/libs/util'
import iView from 'iview'
/*
 * 一些公用数据获取
 */
export default {
  state: {
    roleItems: [], // 角色列表
    department: []// 部门列表
  },
  mutations: {
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo
      if (userInfo['permissions']) {
        state.access = userInfo['permissions'].map(item => item.name)
        state.permissionsTree = toTreeData(userInfo['permissions'], 'id', 'parentId')
      } else {
        state.access = []
        state.permissionsTree = []
      }
    },
    setToken (state, token) {
      state.token = token
      setToken(token)
    }
  },
  actions: {
    /* 登陆处理 */
    async handleLogin ({ commit }, { username, password }) {
      username = username.trim()
      const res = await UserApi.login({ username, password })
      commit('setToken', res.result.token)
      iView.Message.success(res.message)
    },
    // 退出登录
    async handleLogOut ({ state, commit }) {
      // await logout(state.token)
      commit('setUserInfo', {})
      commit('setToken', '')
    },
    async initData ({ state, commit }) {
      // 获取用户数据
      const res = await UserApi.getUserInfo()
      console.log(res)
      commit('setUserInfo', res.result)
    }
  }
}
