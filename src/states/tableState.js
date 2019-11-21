import { Machine, assign } from 'xstate'
import { gojuon } from '@/states/gojuon.js'

const mutateCursorFocusLeft = mutateCursorPrevious('focus')
const mutateCursorFocusRight = mutateCursorNext('focus')

const mutateCursorActivePrevious = mutateCursorPrevious('active')
const mutateCursorActiveNext = mutateCursorNext('active')

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
    focusCursorRight: assign(mutateCursorFocusRight),
    focusCursorLeft: assign(mutateCursorFocusLeft),
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
    activeCursorToPrevious: assign(mutateCursorActivePrevious),
    activeCursorToNext: assign(mutateCursorActiveNext),
  },
})

export {
  machine,
}

function mutateCursorPrevious (type) {
  return function mutateCursorTypePrevious (context) {
    const { gojuon } = context
    const groupName = context[`${type}GroupName`]
    const row = context[`${type}Row`]
    const column = context[`${type}Column`]

    const previousColumnIndex = column - 1
    const targetColumn = (((gojuon || {})[groupName] || {})[row] || {})[previousColumnIndex]
    const previousRowIndex = row - 1
    const previousRow = ((gojuon || {})[groupName] || {})[previousRowIndex]

    if (!targetColumn && previousRow) {
      return {
        [`${type}Row`]: previousRowIndex,
        [`${type}Column`]: previousRow.length - 1,
      }
    } else if (!targetColumn && !previousRow) {
      return {
        [`${type}Column`]: column,
      }
    }
    return {
      [`${type}Column`]: previousColumnIndex,
    }
  }
}

function mutateCursorNext (type) {
  return function mutateCursorTypeNext (context) {
    const { gojuon } = context
    const groupName = context[`${type}GroupName`]
    const row = context[`${type}Row`]
    const column = context[`${type}Column`]

    const nextColumnIndex = column + 1
    const targetColumn = (((gojuon || {})[groupName] || {})[row] || {})[nextColumnIndex]
    const nextRowIndex = row + 1
    const nextRow = ((gojuon || {})[groupName] || {})[nextRowIndex]

    if (!targetColumn && nextRow) {
      return {
        [`${type}Row`]: nextRowIndex,
        [`${type}Column`]: 0,
      }
    } else if (!targetColumn && !nextRow) {
      return {
        [`${type}Column`]: column,
      }
    }
    return {
      [`${type}Column`]: nextColumnIndex,
    }
  }
}
