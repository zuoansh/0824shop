import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex)

import menu from './modules/menu';
import role from './modules/role';
import manager from './modules/manager';
import {state,mutations,getters} from './mutations.js';
import actions from './actions.js';
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules:{
    menu,
    role,
    manager
  }
})
