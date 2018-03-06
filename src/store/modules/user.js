import AuthUtil from '@/utils/AuthUtil'
import AuthApi from '@/api/AuthApi'
import accountApi from '@/api/accountApi'
import { router } from '@/router/index';
import iView from 'iview';

const state = {
  user: {},
  account: {},
  loginState: 'offLine'
}
const actions = {
  async recoverStatus({commit}){
    let isSuccess = false
    if (AuthUtil.getToken() && AuthUtil.getToken() != 'undefined') {
      const res = await accountApi.getAccount()
      commit('loginSuccess', res)
    } else {
      commit('loginFail')
    }
  },
  async login({commit}, {phone, password}){
    const res = await AuthApi.login({phone, password})
    commit(res.success ? 'loginSuccess' : 'loginFail', res)
    if (res.success) {
      router.push({
        name: 'home_index'
      })
    }
    iView.Message.success(res.message)
  }
}
const mutations = {
  loginSuccess(state, {data, message}){
    if (data.token)
      AuthUtil.setToken(data.token)
    state.account = data.account
    state.user = data.user
    state.loginState = 'onLine'

  },
  loginFail(state){
    AuthUtil.removeToken()
    state.account = {}
    state.user = {}
    state.loginState = 'offLine'
    router.push({
      name: 'login'
    })
  },
  logout (state, vm) {
    AuthUtil.removeToken()
    state.loginState = 'offLine'
    // 恢复默认样式
    let themeLink = document.querySelector('link[name="theme"]');
    themeLink.setAttribute('href', '');
    // 清空打开的页面等数据，但是保存主题数据
    let theme = '';
    if (localStorage.theme) {
      theme = localStorage.theme;
    }
    localStorage.clear();
    if (theme) {
      localStorage.theme = theme;
    }
  }

}
const user = {
  state,
  actions,
  mutations
}
export default user