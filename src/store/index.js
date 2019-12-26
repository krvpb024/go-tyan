import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    deferredPrompt: null,
  },
  mutations: {
    MUTATE_DEFERRED_PROMPT (state, event) {
      state.deferredPrompt = event
    },
  },
  actions: {
    updateDefferedPrompt ({ commit }) {
      window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent Chrome 67 and earlier from automatically showing the prompt
        e.preventDefault()
        commit('MUTATE_DEFERRED_PROMPT', e)
      })
    },
  },
})

export {
  store,
}
