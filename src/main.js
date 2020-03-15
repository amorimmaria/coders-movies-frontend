import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './config/router'
import store from './store/store'
import Vuelidate from 'vuelidate'

Vue.config.productionTip = false

Vue.use(Vuelidate)

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App),
}).$mount('#app')
