import { Machine } from 'xstate'

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
            cond: 'isHome'
          },
          {
            target: '.table',
            cond: 'isTable'
          },
          {
            target: '.exam',
            cond: 'isExam'
          }
        ]
      },
      states: {
        home: {},
        table: {},
        exam: {}
      }
    }
  }
},
{
  guards: {
    isHome (context, { data }) {
      return data === 'home'
    },
    isTable (context, { data }) {
      return data === 'table'
    },
    isExam (context, { data }) {
      return data === 'exam'
    }
  }
})

export { machine }
