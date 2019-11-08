import { Machine } from 'xstate'
import { gojuon } from '../../../../../helpers/gojuon.js'

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
})

export {
  machine,
}
