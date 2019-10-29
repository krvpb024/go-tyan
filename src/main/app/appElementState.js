import { Machine } from 'xstate'
import { checkDataIs } from '../../helpers/state.js'

const machine = Machine({
  id: 'appElement',
  initial: 'idle',
  states: {
    idle: {
      initial: 'home',
      on: {
        UPDATE_VIEW: [
          {
            target: '.home',
            cond: 'isHome',
          },
          {
            target: '.table',
            cond: 'isTable',
          },
          {
            target: '.exam',
            cond: 'isExam',
          },
        ],
      },
      states: {
        home: {},
        table: {},
        exam: {},
      },
    },
  },
},
{
  guards: {
    isHome: checkDataIs('home'),
    isTable: checkDataIs('table'),
    isExam: checkDataIs('exam'),
  },
})

export { machine }
