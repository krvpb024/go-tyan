import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

const table = () => import(/* webpackChunkName: "table" */ './views/Table.vue')
const exam = () => import(/* webpackChunkName: "exam" */ './views/Exam.vue')
const examMode = () => import(/* webpackChunkName: "examMode" */ './views/ExamMode.vue')

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
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
      path: '/exam',
      name: 'exam',
      component: exam,
    },
    {
      path: '/exam/hiragana_to_romanization',
      name: 'hiraganaToRomanization',
      component: examMode,
    },
    {
      path: '/exam/katakana_to_romanization',
      name: 'katakanaToRomanization',
      component: examMode,
    },
    {
      path: '/exam/romanization_to_hiragana',
      name: 'romanizationToHiragana',
      component: examMode,
    },
    {
      path: '/exam/romanization_to_katakana',
      name: 'romanizationToKatakana',
      component: examMode,
    },
    {
      path: '/exam/hiragana_to_katakana',
      name: 'hiraganaToKatakana',
      component: examMode,
    },
    {
      path: '/exam/katakana_to_hiragana',
      name: 'katakanaToHiragana',
      component: examMode,
    },
  ],
})
