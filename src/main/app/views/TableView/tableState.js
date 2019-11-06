import { Machine, assign } from 'xstate'
import { gojuon } from './../../../../helpers/gojuon.js'
import { machine as canvasMachine } from './canvasState'

const machine = Machine({
  id: 'table',
  type: 'parallel',
  context: {
    gojuon,
    groupName: null,
    row: null,
    column: null,
    word: null,
    answer: null,
  },
  states: {
    table: {
      on: {
        UPDATE_CURSOR: {
          actions: [
            'updateCursor',
            'updateWord',
          ],
          target: 'canvas.show',
        },
        CLEAR_ANSWER: {
          actions: 'clearAnswer',
        },
      },
    },
    canvas: {
      initial: 'hide',
      states: {
        show: {
          invoke: {
            src: canvasMachine,
            onDone: 'hide',
          },
        },
        hide: {},
      },
    },
    answer: {
      initial: 'idle',
      states: {
        idle: {},
        check: {
          on: {
            '': [
              {
                target: '#table.result.correct',
                cond: 'isCorrectAnswer',
              },
              {
                target: '#table.result.wrong',
                cond: 'isWrongAnswer',
              },
              {
                target: '#table.result.pending',
              },
            ],
          },
        },
      },
    },
    result: {
      initial: 'idle',
      states: {
        idle: {},
        correct: {
          on: {
            '': '#table.answer.idle',
          },
        },
        wrong: {
          on: {
            '': '#table.answer.idle',
          },
        },
        pending: {
          on: {
            RECOGNIZE_FINISH: '#table.answer.check',
          },
        },
      },
    },
  },
}, {
  actions: {
    updateCursor: assign(function mutateCursor (context, {
      data: {
        groupName,
        row,
        column,
      },
    }) {
      return {
        groupName,
        row,
        column,
      }
    }),
    updateWord: assign(function mutateWord ({
      gojuon,
      groupName,
      row,
      column,
    }) {
      return {
        word: ((gojuon[groupName] || {})[row] || {})[column],
      }
    }),
    clearAnswer: assign({ answer: null }),
  },
})

export {
  machine,
}
