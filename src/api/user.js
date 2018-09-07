import axios from '@/libs/api.request'
import qs from 'qs'

export const login = ({ username, password }) => {
  const data = {
    username,
    password
  }
  return axios.request({
    url: 'login',
    data: qs.stringify(data),
    method: 'post'
  })
}

export const getUserInfo = () => {
  return axios.request({
    url: 'user/getUserInfo',
    method: 'get'
  })
}

export const logout = (token) => {
  return axios.request({
    url: 'logout',
    method: 'post'
  })
}
