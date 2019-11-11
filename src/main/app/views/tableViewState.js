import { Machine, assign } from 'xstate'
// import { mutateByData, checkDataIs } from '../../../helpers/state.js'
import { gojuon } from '../../../helpers/gojuon.js'

const machine = Machine({
  id: 'table',
  type: 'parallel',
  context: {
    gojuon,
    groupName: null,
    row: null,
    column: null,
  },
  states: {
    table: {
      type: 'parallel',
      on: {
        UPDATE_CURSOR: {
          actions: 'updateCursor',
        },
      },
      states: {
        hiragana: {
          initial: 'show',
          on: {
            HIRAGANA_TOGGLE_DISPLAY: [
              {
                cond: 'isShow',
                target: '.show',
              },
              {
                target: '.hide',
              },
            ],
          },
          states: {
            show: {},
            hide: {},
          },
        },
        katakana: {
          initial: 'show',
          on: {
            KATAKANA_TOGGLE_DISPLAY: [
              {
                cond: 'isShow',
                target: '.show',
              },
              {
                target: '.hide',
              },
            ],
          },
          states: {
            show: {},
            hide: {},
          },
        },
      },
    },
    drawingBoard: {
      initial: 'hide',
      on: {
        DRAWING_BOARD_TOGGLE_DISPLAY: [
          {
            cond: 'isShow',
            target: '.show',
          },
          {
            target: '.hide',
          },
        ],
      },
      states: {
        show: {},
        hide: {},
      },
    },
  },
}, {
  guards: {
    isShow (context, { data }) {
      return data
    },
  },
  actions: {
    updateCursor: assign(function mutateCursorContext (context, {
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
  },
})

export {
  machine,
}
