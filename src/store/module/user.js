import { login, logout, getUserInfo } from '@/api/user'
import { setToken, getToken, toTreeData } from '@/libs/util'
import iView from 'iview'

export default {
  state: {
    userInfo: {},
    token: getToken(),
    access: [],
    permissionsTree: []
  },
  mutations: {
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo
      state.access = userInfo['permissions'].map(item => item.name)
      state.permissionsTree = toTreeData(userInfo['permissions'], 'id', 'parentId')
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
      const res = await login({ username, password })
      commit('setToken', res.result.token)
      iView.Message.success(res.message)
    },
    // 退出登录
    async handleLogOut ({ state, commit }) {
      await logout(state.token)
      commit('setUserInfo', {})
      commit('setToken', '')
    },
    async initData ({ state, commit }) {
      // 获取用户数据
      const res = await getUserInfo()
      console.log(res)
      commit('setUserInfo', res.result)
    }
  }
}
