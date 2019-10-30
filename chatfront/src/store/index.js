import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import choosenState from './modules/menu'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    choosenState,
    user
  },
  getters
})
