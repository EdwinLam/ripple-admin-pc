import store from '@/store'
import { LOGIN_PAGE_NAME } from '@/constants/common'
import { TokenUtil } from '@/utils'
export default class AuthUtil {
  /* 初始化数据 */
  static async initData () {
    // 初始化所有角色数据
    await store.dispatch('initAllRoles')
    // 初始化用户权限数据
    await store.dispatch('initUserData')
  }
  /* 获取真正的跳转地址 */
  static findMyWay ({ to }) {
    const token = TokenUtil.getToken()
    if (!token && to.name !== LOGIN_PAGE_NAME) {
      // 未登录且要跳转的页面不是登录页
      return { name: LOGIN_PAGE_NAME }
    } else if (!token && to.name === LOGIN_PAGE_NAME) {
      // 未登陆且要跳转的页面是登录页
      return {}
    } else if (token && to.name === LOGIN_PAGE_NAME) {
      // 已登录且要跳转的页面是登录页
      return { name: 'home' }
    } else {
      if (this.checkPermission(to)) { return {} } else { return { replace: true, name: 'error_401' } }
    }
  }
  /* 判断用户是否有指定权限 */
  static checkPermission (to) {
    if (!to.meta || !to.meta.access) { return true }
    const name = to.name
    console.log(store.state.app.access.some(el => {
      return el.name === name
    }))
    return store.state.app.access.some(el => {
      return el.name === name
    })
  }
}
