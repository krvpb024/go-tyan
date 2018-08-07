import Vue from 'vue'
import Router from 'vue-router'
import modeSelect from './views/modeSelect.vue'
import gtop from './views/gtop.vue'
import hisk from './views/hisk.vue'
import about from './views/about.vue'
import chart from './views/chart.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'modeSelect',
      component: modeSelect
    },
    {
      path: '/gtop/:gType',
      name: 'gtopMode',
      component: gtop
    },
    {
      path: '/ptog/:gType',
      name: 'ptogMode',
      component: gtop
    },
    {
      path: '/hisk/:gType',
      name: 'hiskMode',
      component: hisk
    },
    {
      path: '/about',
      name: 'about',
      component: about
    },
    {
      path: '/chart',
      name: 'chart',
      component: chart
    }
  ]
})
