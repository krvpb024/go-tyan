import Vue from 'vue'
import smoothscroll from 'smoothscroll-polyfill'
import 'normalize.css'
import App from './App.vue'
import router from './router'
import VueCompositionApi from '@vue/composition-api'

smoothscroll.polyfill()
Vue.use(VueCompositionApi)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
