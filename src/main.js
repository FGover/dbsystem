import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import axios from './utils/axios'
import router from './router'
import store from './store'
import './assets/css/global.css'

Vue.config.productionTip = false

Vue.prototype.axios = axios

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
