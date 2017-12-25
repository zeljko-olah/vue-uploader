// IMPORT VUE
import Vue from 'vue'

// IMPORT VUEX
import Vuex from 'vuex'

// IMPORT MODULES
import upload from './upload'
import table from './table'
import notifications from './notifications'
import shared from './shared'

// USE VUEX PLUGIN
Vue.use(Vuex)

//  EXPORT STORE
export const store = new Vuex.Store({
  // modules
  modules: {
    upload,
    table,
    notifications,
    shared
  }
})
