import Vue from 'vue'
import Router from 'vue-router'
import modeSelect from './views/modeSelect.vue'
import gtop from './views/gtop.vue'
import ptog from './views/ptog.vue'
import hisk from './views/hisk.vue'

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
      component: ptog
    },
    {
      path: '/hisk/:gType',
      name: 'hiskMode',
      component: hisk
    }
  ]
})
