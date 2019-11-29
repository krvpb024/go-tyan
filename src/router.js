import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

const table = () => import(/* webpackChunkName: "table" */ './views/Table.vue')
const exam = () => import(/* webpackChunkName: "exam" */ './views/Exam.vue')

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/table',
      name: 'table',
      component: table,
    },
    {
      path: '/exam/hiragana_to_romanization',
      name: 'hiraganaToRomanization',
      component: exam,
    },
    {
      path: '/exam/katakana_to_romanization',
      name: 'katakanaToRomanization',
      component: exam,
    },
    {
      path: '/exam/romanization_to_hiragana',
      name: 'romanizationToHiragana',
      component: exam,
    },
    {
      path: '/exam/romanization_to_katakana',
      name: 'romanizationToKatakana',
      component: exam,
    },
    {
      path: '/exam/hiragana_to_katakana',
      name: 'hiraganaToKatakana',
      component: exam,
    },
    {
      path: '/exam/katakana_to_hiragana',
      name: 'katakanaToHiragana',
      component: exam,
    },
  ],
})
