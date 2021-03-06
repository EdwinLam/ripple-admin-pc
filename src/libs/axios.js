import axios from 'axios'
import { SUCCESS, TOKEN_TIME_OUT } from '@/constants/ResponseCode'
import { TokenUtil } from '@/utils'
import BaseException from '@/exception/BaseException'
import UI from '@/libs/UI'
import store from '@/store'

class HttpRequest {
  constructor (baseUrl = baseURL) {
    this.baseUrl = baseUrl
  }
  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        //
      }
    }
    return config
  }
  interceptors (instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      const token = TokenUtil.getToken()
      if (token) { config.headers['accessToken'] = token }
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(async res => {
      const { code, message } = res.data
      if (code === TOKEN_TIME_OUT) {
        await store.dispatch('handleLogOut')
        window.location.href = '/login'
      } else if (code !== SUCCESS) {
        UI.warningMsg({ message })
        throw new BaseException({ code, message })
      }
      return res.data
    }, error => {
      return Promise.reject(error)
    })
  }
  request (options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
export default HttpRequest
