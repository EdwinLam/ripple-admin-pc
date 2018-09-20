import { getBreadCrumbList, setTagNavListInLocalstorage, getMenuByRouter, getTagNavListFromLocalstorage, getHomeRoute, routeHasExist } from '@/libs/util'
import routers from '@/router/routers'
import iView from 'iview'
import { UserApi } from '@/api'
import TokenUtil from '@/utils/TokenUtil'
export default {
  state: {
    userInfo: {},
    token: TokenUtil.getToken(),
    access: [],
    breadCrumbList: [],
    tagNavList: [],
    homeRoute: getHomeRoute(routers),
    local: ''
  },
  getters: {
    menuList: (state) => getMenuByRouter(routers, state.access)
  },
  mutations: {
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo
      if (userInfo['permissions']) {
        state.access = userInfo['permissions'].map(item => item.name)
      } else {
        state.access = []
        state.permissionsTree = []
      }
    },
    setToken (state, token) {
      state.token = token
      TokenUtil.setToken(token)
    },
    setBreadCrumb (state, routeMetched) {
      state.breadCrumbList = getBreadCrumbList(routeMetched, state.homeRoute)
    },
    setTagNavList (state, list) {
      if (list) {
        state.tagNavList = [...list]
        setTagNavListInLocalstorage([...list])
      } else state.tagNavList = getTagNavListFromLocalstorage()
    },
    addTag (state, { route, type = 'unshift' }) {
      if (!routeHasExist(state.tagNavList, route)) {
        if (type === 'push') state.tagNavList.push(route)
        else {
          if (route.name === 'home') state.tagNavList.unshift(route)
          else state.tagNavList.splice(1, 0, route)
        }
        setTagNavListInLocalstorage([...state.tagNavList])
      }
    },
    setLocal (state, lang) {
      state.local = lang
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
    /* 退出登录 */
    async handleLogOut ({ state, commit }) {
      // await logout(state.token)
      commit('setUserInfo', {})
      commit('setToken', '')
    },
    /* 初始化用户数据 */
    async initUserData ({ state, commit }) {
      // 获取用户数据
      const res = await UserApi.getUserInfo()
      commit('setUserInfo', res.result)
    }
  }
}
