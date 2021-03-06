import Vue from 'vue'
import Vuex from 'vuex'
import user from './module/user'
import role from './module/role'
import app from './module/app'
import department from './module/department'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //
  },
  mutations: {
    //
  },
  actions: {
    //
  },
  modules: {
    user,
    role,
    app,
    department
  }
})
