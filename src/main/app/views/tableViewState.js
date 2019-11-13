import { Machine, assign } from 'xstate'
// import { mutateByData, checkDataIs } from '../../../helpers/state.js'
import { gojuon } from '../../../helpers/gojuon.js'

const machine = Machine({
  id: 'table',
  type: 'parallel',
  context: {
    gojuon,
    groupName: null,
    // row and column start from 1 because of aria attribute
    row: null,
    column: null,
  },
  states: {
    table: {
      type: 'parallel',
      on: {
        UPDATE_CURSOR: [
          {
            cond: 'isNotMove',
            actions: 'clearCursor',
            target: 'drawingBoard.hide',
          },
          {
            actions: 'updateCursor',
            target: 'drawingBoard.show',
          },
        ],
        CLEAR_CURSOR: {
          actions: 'clearCursor',
          target: 'drawingBoard.hide',
        },
        CURSOR_TO_PREVIOUS: {
          actions: 'cursorToPrevious',
        },
        CURSOR_TO_NEXT: {
          actions: 'cursorToNext',
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
            hide: {
              initial: 'cover',
              on: {
                PEEK_HIRAGANA: '.peek',
                COVER_HIRAGANA: '.cover',
              },
              states: {
                cover: {},
                peek: {},
              },
            },
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
            hide: {
              initial: 'cover',
              on: {
                PEEK_KATAKANA: '.peek',
                COVER_KATAKANA: '.cover',
              },
              states: {
                cover: {},
                peek: {},
              },
            },
          },
        },
      },
    },
    drawingBoard: {
      initial: 'hide',
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
    isNotMove (context, {
      data: {
        groupName,
        row,
        column,
      } = {},
    }) {
      return context.groupName == groupName &&
      context.row == row &&
      context.column == column
    },
  },
  actions: {
    clearCursor: assign({
      groupName: null,
      row: null,
      column: null,
    }),
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
    cursorToPrevious: assign(function mutateCursorToPrevious ({
      gojuon,
      groupName,
      row,
      column,
    }) {
      // beware of context row and column start from 1 when look up in gojuon array
      const target = gojuon[groupName][row - 1][column - 2]
      const previousRow = gojuon[groupName][row - 2]

      if (target) {
        return {
          column: column - 1,
        }
      } else if (previousRow) {
        return {
          row: row - 1,
          column: previousRow.length,
        }
      }
      return {
        row: 1,
        column: 1,
      }
    }),
    cursorToNext: assign(function mutateCursorToNext ({
      gojuon,
      groupName,
      row,
      column,
    }) {
      // beware of context row and column start from 1 when look up in gojuon array
      const target = gojuon[groupName][row - 1][column]
      const nextRow = gojuon[groupName][row]

      if (target) {
        return {
          column: column + 1,
        }
      } else if (nextRow) {
        return {
          row: row + 1,
          column: 1,
        }
      }
      return {
        row: gojuon[groupName].length,
        column: gojuon[groupName][row - 1].length,
      }
    }),
  },
})

export {
  machine,
}
