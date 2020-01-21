import Vue from 'vue'
import smoothscroll from 'smoothscroll-polyfill'
import VueCompositionApi from '@vue/composition-api'
import { store } from '@/store/index.js'
import runtime from 'serviceworker-webpack-plugin/lib/runtime'
import 'normalize.css'
import App from './App.vue'
import router from './router'

router.afterEach(function sendGtagsPageTrack (to) {
  window.gtag('config', 'UA-156576262-1', {
    'page_title': to.name,
    'page_path': to.path,
  })
})

Vue.use(VueCompositionApi)
Vue.config.productionTip = false

smoothscroll.polyfill()
if ('serviceWorker' in navigator) {
  runtime.register().then(function (registration) {
    console.log('ServiceWorker registration successful with scope: ', registration.scope)
  }).catch(function (err) {
    console.log('ServiceWorker registration failed: ', err)
  })
}

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
