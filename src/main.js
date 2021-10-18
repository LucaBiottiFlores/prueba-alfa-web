import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Swal from 'sweetalert2'

import firebase from 'firebase'
import { firebaseConfig } from '../firebase-config'
firebase.initializeApp(firebaseConfig)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  Swal,
  render: (h) => h(App)
}).$mount('#app')
