// *** IMPORTS ***

// import vue
import Vue from 'vue'

// import vuetify package
import Vuetify from 'vuetify'
// this will be inline css styles injected by webpack
import 'vuetify/dist/vuetify.css'

// import vuex store
import { store } from './store'

// import main App Component
import App from './App'

// import firebase database
import { initializeApp } from 'firebase'

// import filters
import formatSize from './filters/formatSize'
import formatDate from './filters/formatDate'
import allowedNameLength from './filters/allowedNameLength'

// import Scroll Behaviour
import VueScrollTo from 'vue-scrollto'

// *** DEFINE EVENT BUS ***
const eventBus = new Vue()
Object.defineProperty(Vue.prototype, '$bus', { get () { return eventBus } })

// *** PLUGINS ***

// use vuetify plugin package
Vue.use(Vuetify)

// smoth scrool package for vue
Vue.use(VueScrollTo)

Vue.use(VueScrollTo, {
  container: 'body',
  duration: 500,
  easing: 'ease',
  offset: 0,
  cancelable: true,
  onDone: false,
  onCancel: false,
  x: false,
  y: true
})

// *** REGISTER FILTERS ****

Vue.filter('formatSize', formatSize)
Vue.filter('formatDate', formatDate)
Vue.filter('allowedNameLength', allowedNameLength)

// disable Vue production tips
Vue.config.productionTip = false

/* eslint-disable no-new */

// initialize main Vue instance
new Vue({
  el: '#app',
  store,
  render: h => h(App),
  created () {
    // INITIALIZE FIREBASE PROJECT
    initializeApp({
      apiKey: 'AIzaSyCYFxP8LoqH46OQD46byPTTFy_mytErEbw',
      authDomain: 'vue-uploader.firebaseapp.com',
      databaseURL: 'https://vue-uploader.firebaseio.com',
      projectId: 'vue-uploader'
      // storageBucket: 'vue-uploader.appspot.com',
      // messagingSenderId: '632395123225'
    })
    // LOAD FILES FROM FIREBASE
    this.$store.dispatch('table/loadItems')
  }
})
