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
      path: '/exam',
      name: 'exam',
      component: exam,
    },
  ],
})

// children: [
//   {
//     path: 'settings',
//     name: 'settings',
//     component: examRange,
//   },
//   {
//     path: 'hiragana_to_romanization',
//     name: 'hiraganaToRomanization',
//   },
//   {
//     path: 'katakana_to_romanization',
//     name: 'katakanaToRomanization',
//   },
//   {
//     path: 'romanization_to_hiragana',
//     name: 'romanizationToHiragana',
//   },
//   {
//     path: 'romanization_to_katakana',
//     name: 'romanizationToKatakana',
//   },
//   {
//     path: 'hiragana_to_katakana',
//     name: 'hiraganaToKatakana',
//   },
//   {
//     path: 'katakana_to_hiragana',
//     name: 'katakanaToHiragana',
//   },
// ],
