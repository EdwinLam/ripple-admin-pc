import AuthUtil from '@/utils/AuthUtil'
import AuthApi from '@/api/AuthApi'
import {router} from '@/router/index';
import iView from 'iview';

const state={
    userInfo:{},
    loginState:'offLine'
}
const actions = {
  async login({commit},{phone,password}){
    const res = await AuthApi.login({phone,password})
    if(res.success){
      router.push({
        name: 'home_index'
      })
      AuthUtil.setToken(res.data.token)
      iView.Message.success(res.message)
    }else{
      AuthUtil.removeToken()
      iView.Message.error(res.message)
    }
  }
}
const mutations={
  loginSuccess(state,userInfo){
    state.userInfo = userInfo
    state.loginState = 'onLine'
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
const user ={
  state,
  actions,
  mutations
}
export default user