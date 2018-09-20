import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import iView from 'iview'
import { AuthUtil } from '@/utils'
import { LOGIN_PAGE_NAME } from '@/constants/common'
Vue.use(Router)
const router = new Router({
  routes,
  mode: 'history'
})
let isInit = true

router.beforeEach(async (to, from, next) => {
  iView.LoadingBar.start()
  // 初始化数据
  if (isInit && to.name !== LOGIN_PAGE_NAME) {
    await AuthUtil.initData()
    isInit = false
  }
  // 跳转地址处理
  next(AuthUtil.findMyWay({ to, from }))
})

router.afterEach(to => {
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})

export default router
