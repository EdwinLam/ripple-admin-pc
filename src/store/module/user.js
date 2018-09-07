import { login, logout, getUserInfo } from '@/api/user'
import { setToken, getToken, isSucRes } from '@/libs/util'
import iView from 'iview'

export default {
  state: {
    userInfo: {},
    userName: '',
    userId: '',
    avatorImgPath: '',
    token: getToken(),
    access: ''
  },
  mutations: {
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo
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
      if (isSucRes(res)) {

      } else {
        iView.Message.warning(res.message)
      }
    },
    // 退出登录
    async handleLogOut ({ state, commit }) {
      const res = await logout(state.token)
      commit('setUserInfo', {})
      commit('setToken', '')
    },
    // 获取用户相关信息
    async getUserInfo ({ state, commit }) {
      const res = await getUserInfo()
      commit('setUserInfo', res.result)
    }
  }
}
