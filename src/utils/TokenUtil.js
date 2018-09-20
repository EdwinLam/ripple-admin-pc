import Cookies from 'js-cookie'
import { TOKEN_KEY } from '@/constants/common'
import config from '@/config'
export default class TokenUtil {
  /* 设置token */
  static setToken (token) {
    Cookies.set(TOKEN_KEY, token, { expires: config.cookieExpires || 1 })
  }
  /* 获取token */
  static getToken () {
    const token = Cookies.get(TOKEN_KEY)
    if (token) return token
    else return false
  }
}
