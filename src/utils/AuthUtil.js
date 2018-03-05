import Cookies from 'js-cookie'
import  {JWT_KEY } from './Constants'

export default class AuthUtil {
  static getToken() {
    return Cookies.get(JWT_KEY)
  }
  static setToken(token) {
    return Cookies.set(JWT_KEY, token)
  }
  static removeToken() {
    return Cookies.remove(JWT_KEY)
  }
}