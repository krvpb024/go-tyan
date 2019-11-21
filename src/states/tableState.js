import { Machine, assign } from 'xstate'
import { gojuon } from '@/states/gojuon.js'

const machine = Machine({
  id: 'table',
  type: 'parallel',
  context: {
    gojuon,
    focusGroupName: null,
    focusRow: null,
    focusColumn: null,
    activeGroupName: null,
    activeRow: null,
    activeColumn: null,
  },
  states: {
    displayPanel: {
      type: 'parallel',
      states: {
        hiragana: {
          initial: 'show',
          on: {
            HIRAGANA_TOGGLE_DISPLAY: [
              {
                cond: 'toggleOn',
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
                cond: 'toggleOn',
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
    table: {
      type: 'parallel',
      states: {
        cellFocus: {
          initial: 'blur',
          on: {
            UPDATE_FOCUS_CURSOR: {
              actions: 'updateFocusCursor',
              target: '.focus',
            },
            BLUR_FOCUS: '.blur',
          },
          states: {
            blur: {
              entry: 'clearFocusCursor',
            },
            focus: {
              on: {
                FOCUS_COUSOR_UP: {
                  actions: 'focusCursorUp',
                },
                FOCUS_COUSOR_DOWN: {
                  actions: 'focusCursorDown',
                },
                FOCUS_COUSOR_RIGHT: {
                  actions: 'focusCursorRight',
                },
                FOCUS_COUSOR_LEFT: {
                  actions: 'focusCursorLeft',
                },
              },
            },
          },
        },
        cellActive: {
          initial: 'idle',
          on: {
            UPDATE_ACTIVE_CURSOR: [
              {
                cond: 'isNotChange',
                target: ['.idle', '#table.drawingBoard.hide'],
              },
              {
                actions: 'updateActiveCursor',
                target: ['.active', '#table.drawingBoard.show'],
              },
            ],
            CLEAR_ACTIVE_CURSOR: {
              target: ['.idle', '#table.drawingBoard.hide', '.idle'],
            },
          },
          states: {
            idle: {
              entry: 'clearActiveCursor',
            },
            active: {
              on: {
                ACTIVE_CURSOR_TO_PREVIOUS: {
                  actions: 'activeCursorToPrevious',
                },
                ACTIVE_CURSOR_TO_NEXT: {
                  actions: 'activeCursorToNext',
                },
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
    toggleOn (context, { data }) {
      return data
    },
    isNotChange (context, {
      data: {
        activeGroupName,
        activeRow,
        activeColumn,
      } = {},
    }) {
      return context.activeGroupName == activeGroupName &&
      context.activeRow == activeRow &&
      context.activeColumn == activeColumn
    },
  },
  actions: {
    updateFocusCursor: assign(function mutateFocusCursor (
      context, {
        data: {
          focusGroupName, focusRow, focusColumn,
        },
      }
    ) {
      return {
        focusGroupName, focusRow, focusColumn,
      }
    }),
    clearFocusCursor: assign({
      focusGroupName: null,
      focusRow: null,
      focusColumn: null,
    }),
    focusCursorUp: assign({
      focusRow ({ gojuon, focusGroupName, focusRow }) {
        const previousRow = focusRow - 1
        return ((gojuon || {})[focusGroupName] || {})[previousRow]
          ? previousRow
          : focusRow
      },
    }),
    focusCursorDown: assign({
      focusRow ({ gojuon, focusGroupName, focusRow }) {
        const NextRow = focusRow + 1
        return ((gojuon || {})[focusGroupName] || {})[NextRow]
          ? NextRow
          : focusRow
      },
    }),
    focusCursorRight: assign(
      function mutateCursorFocusRight ({ gojuon, focusGroupName, focusRow, focusColumn }) {
        const nextColumnIndex = focusColumn + 1
        const targetColumn = (((gojuon || {})[focusGroupName] || {})[focusRow] || {})[nextColumnIndex]
        const nextRowIndex = focusRow + 1
        const nextRow = ((gojuon || {})[focusGroupName] || {})[nextRowIndex]

        if (!targetColumn && nextRow) {
          return {
            focusRow: nextRowIndex,
            focusColumn: 0,
          }
        } else if (!targetColumn && !nextRow) {
          return {
            focusColumn,
          }
        }
        return {
          focusColumn: nextColumnIndex,
        }
      },
    ),
    focusCursorLeft: assign(
      function mutateCursorFocusLeft ({ gojuon, focusGroupName, focusRow, focusColumn }) {
        const previousColumnIndex = focusColumn - 1
        const targetColumn = (((gojuon || {})[focusGroupName] || {})[focusRow] || {})[previousColumnIndex]
        const previousRowIndex = focusRow - 1
        const previousRow = ((gojuon || {})[focusGroupName] || {})[previousRowIndex]

        if (!targetColumn && previousRow) {
          return {
            focusRow: previousRowIndex,
            focusColumn: previousRow.length - 1,
          }
        } else if (!targetColumn && !previousRow) {
          return {
            focusColumn: focusColumn,
          }
        }
        return {
          focusColumn: previousColumnIndex,
        }
      }
    ),
    updateActiveCursor: assign(function mutateActiveCursor (
      context, {
        data: {
          activeGroupName, activeRow, activeColumn,
        },
      }
    ) {
      return {
        activeGroupName, activeRow, activeColumn,
      }
    }),
    clearActiveCursor: assign({
      activeGroupName: null,
      activeRow: null,
      activeColumn: null,
    }),
    activeCursorToPrevious: assign(
      function mutateCursorActivePrevious ({ gojuon, activeGroupName, activeRow, activeColumn }) {
        const previousColumnIndex = activeColumn - 1
        const targetColumn = (((gojuon || {})[activeGroupName] || {})[activeRow] || {})[previousColumnIndex]
        const previousRowIndex = activeRow - 1
        const previousRow = ((gojuon || {})[activeGroupName] || {})[previousRowIndex]

        if (!targetColumn && previousRow) {
          return {
            activeRow: previousRowIndex,
            activeColumn: previousRow.length - 1,
          }
        } else if (!targetColumn && !previousRow) {
          return {
            activeColumn: activeColumn,
          }
        }
        return {
          activeColumn: previousColumnIndex,
        }
      }
    ),
    activeCursorToNext: assign(
      function mutateCursorActiveNext ({ gojuon, activeGroupName, activeRow, activeColumn }) {
        const nextColumnIndex = activeColumn + 1
        const targetColumn = (((gojuon || {})[activeGroupName] || {})[activeRow] || {})[nextColumnIndex]
        const nextRowIndex = activeRow + 1
        const nextRow = ((gojuon || {})[activeGroupName] || {})[nextRowIndex]

        if (!targetColumn && nextRow) {
          return {
            activeRow: nextRowIndex,
            activeColumn: 0,
          }
        } else if (!targetColumn && !nextRow) {
          return {
            activeColumn,
          }
        }
        return {
          activeColumn: nextColumnIndex,
        }
      },
    ),
  },
})

export {
  machine,
}
