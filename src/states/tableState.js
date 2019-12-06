import { Machine, assign, send } from 'xstate'
import { gojuon } from '@/states/gojuon.js'

const machine = Machine({
  id: 'tableView',
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
          initial: 'focus',
          on: {
            UPDATE_FOCUS_CURSOR: {
              actions: 'updateFocusCursor',
              target: '.switchFocus',
            },
            FOCUS_CURRENT_ACTIVE_CURSOR: {
              actions: 'focusCurrentActiveCursor',
              target: '.switchFocus',
            },
          },
          states: {
            focus: {
              on: {
                FOCUS_COUSOR_UP: {
                  actions: 'focusCursorUp',
                  target: 'switchFocus',
                },
                FOCUS_COUSOR_DOWN: {
                  actions: 'focusCursorDown',
                  target: 'switchFocus',
                },
                FOCUS_COUSOR_RIGHT: {
                  actions: 'focusCursorRight',
                  target: 'switchFocus',
                },
                FOCUS_COUSOR_LEFT: {
                  actions: 'focusCursorLeft',
                  target: 'switchFocus',
                },
              },
            },
            switchFocus: {
              on: {
                SWITCH_FOCUS_FINISHED: 'focus',
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
                target: ['.idle', '#tableView.drawingBoard.clearCanvasBeforeAnimation'],
              },
              {
                actions: 'updateActiveCursor',
                target: '#tableView.drawingBoard.openDrawingBoardAnimation',
              },
            ],
            CLEAR_ACTIVE_CURSOR: {
              actions: 'clearActiveCursor',
              target: '.scrollToActiveCursor',
            },
          },
          states: {
            idle: {},
            active: {
              on: {
                ACTIVE_CURSOR_TO_PREVIOUS: {
                  actions: 'activeCursorToPrevious',
                  target: ['#tableView.drawingBoard.show.clearCanvas', 'scrollToActiveCursor'],
                },
                ACTIVE_CURSOR_TO_NEXT: {
                  actions: 'activeCursorToNext',
                  target: ['#tableView.drawingBoard.show.clearCanvas', 'scrollToActiveCursor'],
                },
              },
            },
            scrollToActiveCursor: {
              on: {
                SWITCH_ACTIVE_FINISHED: 'active',
              },
            },
          },
        },
      },
    },
    drawingBoard: {
      initial: 'hide',
      states: {
        openDrawingBoardAnimation: {
          on: {
            OPEN_DRAWING_BOARD_ANIMATION_END: {
              target: ['show', '#tableView.table.cellActive.scrollToActiveCursor'],
            },
          },
        },
        show: {
          initial: 'idle',
          on: {
            HIDE_DRAWING_BOARD: 'clearCanvasBeforeAnimation',
          },
          states: {
            idle: {
              on: {
                CLEAR_CANVAS: 'clearCanvas',
              },
            },
            clearCanvas: {
              on: {
                CANVAS_CLREAR_FINISHED: 'idle',
              },
            },
          },
        },
        clearCanvasBeforeAnimation: {
          on: {
            CANVAS_CLREAR_FINISHED: 'closeDrawingBoardAnimation',
          },
        },
        closeDrawingBoardAnimation: {
          on: {
            CLOSE_DRAWING_BOARD_ANIMATION_END: 'hide',
          },
        },
        hide: {
          initial: 'idle',
          entry: [send('FOCUS_CURRENT_ACTIVE_CURSOR'), send('CLEAR_ACTIVE_CURSOR')],
          states: {
            idle: {
              on: {
                SHOW_TOOLTIPS: 'showTooltipsAnimation',
              },
            },
            showTooltipsAnimation: {
              on: {
                SHOW_TOOLTIPS_ANIMATION_END: 'tooltips',
              },
            },
            tooltips: {
              on: {
                HIDE_TOOLTIPS: 'hideTooltipsAnimation',
              },
            },
            hideTooltipsAnimation: {
              on: {
                HIDE_TOOLTIPS_ANIMATION_END: 'idle',
              },
            },
          },
        },
      },
    },
  },
}, {
  guards: {
    toggleOn (context, { data }) {
      return Boolean(data)
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
    updateFocusCursor: assign(function mutateFocusCursor (context, {
      data: {
        focusGroupName, focusRow, focusColumn,
      },
    }) {
      return {
        focusGroupName, focusRow, focusColumn,
      }
    }),
    clearFocusCursor: assign({
      focusGroupName: null,
      focusRow: null,
      focusColumn: null,
    }),
    focusCurrentActiveCursor: assign(function focusCurrentActiveCursor ({
      activeGroupName,
      activeRow,
      activeColumn,
    }) {
      return {
        focusGroupName: activeGroupName,
        focusRow: activeRow,
        focusColumn: activeColumn,
      }
    }),
    focusCursorUp: assign(getTargetRowByAdd(-1)),
    focusCursorDown: assign(getTargetRowByAdd(1)),
    focusCursorRight: assign(mutateCursorNext('focus')),
    focusCursorLeft: assign(mutateCursorPrevious('focus')),
    updateActiveCursor: assign(function mutateActiveCursor (context, {
      data: {
        activeGroupName, activeRow, activeColumn,
      },
    }) {
      return {
        activeGroupName, activeRow, activeColumn,
      }
    }),
    clearActiveCursor: assign({
      activeGroupName: null,
      activeRow: null,
      activeColumn: null,
    }),
    activeCursorToPrevious: assign(mutateCursorPrevious('active')),
    activeCursorToNext: assign(mutateCursorNext('active')),
  },
})

export {
  machine,
}

function getTargetRowByAdd (addBy) {
  return function targetRowExistOrIdentity ({ gojuon, focusGroupName, focusRow }) {
    const previousRow = focusRow + addBy
    const result = ((gojuon || {})[focusGroupName] || {})[previousRow]
      ? previousRow
      : focusRow
    return {
      focusRow: result,
    }
  }
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
