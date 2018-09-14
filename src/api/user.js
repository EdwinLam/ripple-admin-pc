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
    url: 'user/info',
    method: 'get'
  })
}

export const getByCondition = () => {
  return axios.request({
    url: 'user/getByCondition',
    method: 'get'
  })
}

export const adminEdit = (data) => {
  return axios.request({
    data: qs.stringify(data),
    url: 'user/admin/edit',
    method: 'post'
  })
}

export const logout = (token) => {
  return axios.request({
    url: 'logout',
    method: 'post'
  })
}
