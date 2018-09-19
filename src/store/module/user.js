import { UserApi } from '@/api'
import { setToken, getToken, toTreeData } from '@/libs/util'
import iView from 'iview'

export default {
  state: {
    userInfo: {},
    token: getToken(),
    access: [],
    permissionsTree: [],
    isFinishInit: false
  },
  mutations: {
    initUserInfo (state, userInfo) {
      state.userInfo = userInfo
      if (userInfo['permissions']) {
        state.access = userInfo['permissions'].map(item => item.name)
        state.permissionsTree = toTreeData(userInfo['permissions'], 'id', 'parentId')
      } else {
        state.access = []
        state.permissionsTree = []
      }
    },
    initToken (state, token) {
      state.token = token
      setToken(token)
    },
    finishUserInit (state) {
      state.isInit = true
    }
  },
  actions: {
    /* 登陆处理 */
    async handleLogin ({ commit }, { username, password }) {
      username = username.trim()
      const res = await UserApi.login({ username, password })
      commit('initToken', res.result.token)
      iView.Message.success(res.message)
    },
    /* 退出登录 */
    async handleLogOut ({ state, commit }) {
      // await logout(state.token)
      commit('initUserInfo', {})
      commit('initToken', '')
    },
    /* 初始化用户数据 */
    async initUserData ({ state, commit }) {
      if (state.isFinishInit) return
      // 获取用户数据
      const res = await UserApi.getUserInfo()
      commit('initUserInfo', res.result)
      commit('finishUserInit')
    }
  }
}
