import { Machine, assign } from 'xstate'

const seion = [
  [['あ', 'ア', 'a'], ['い', 'イ', 'i'], ['う', 'ウ', 'u'], ['え', 'エ', 'e'], ['お', 'オ', 'o']],
  [['か', 'カ', 'ka'], ['き', 'キ', 'ki'], ['く', 'ク', 'ku'], ['け', 'ケ', 'ke'], ['こ', 'コ', 'ko']],
  [['さ', 'サ', 'sa'], ['し', 'シ', 'shi'], ['す', 'ス', 'su'], ['せ', 'セ', 'se'], ['そ', 'ソ', 'so']],
  [['た', 'タ', 'ta'], ['ち', 'チ', 'chi'], ['つ', 'ツ', 'tsu'], ['て', 'テ', 'te'], ['と', 'ト', 'to']],
  [['な', 'ナ', 'na'], ['に', 'ニ', 'ni'], ['ぬ', 'ヌ', 'nu'], ['ね', 'ネ', 'ne'], ['の', 'ノ', 'no']],
  [['は', 'ハ', 'ha'], ['ひ', 'ヒ', 'hi'], ['ふ', 'フ', 'fu'], ['へ', 'ヘ', 'he'], ['ほ', 'ホ', 'ho']],
  [['ま', 'マ', 'ma'], ['み', 'ミ', 'mi'], ['む', 'ム', 'mu'], ['め', 'メ', 'me'], ['も', 'モ', 'mo']],
  [['や', 'ヤ', 'ya'], 'empty', ['ゆ', 'ユ', 'yu'], 'empty', ['よ', 'ヨ', 'yo']],
  [['ら', 'ラ', 'ra'], ['り', 'リ', 'ri'], ['る', 'ル', 'ru'], ['れ', 'レ', 're'], ['ろ', 'ロ', 'ro']],
  [['わ', 'ワ', 'wa'], 'empty', 'empty', 'empty', ['を', 'ヲ', 'wo']],
  [['ん', 'ン', 'n'], 'empty', 'empty', 'empty', 'empty'],
]

const dakion = [
  [['が', 'ガ', 'ga'], ['ぎ', 'ギ', 'gi'], ['ぐ', 'グ', 'gu'], ['げ', 'ゲ', 'ge'], ['ご', 'ゴ', 'go']],
  [['ざ', 'ザ', 'za'], ['じ', 'ジ', 'zi'], ['ず', 'ズ', 'zu'], ['ぜ', 'ゼ', 'ze'], ['ぞ', 'ｿﾞ', 'zo']],
  [['だ', 'ダ', 'da'], ['ぢ', 'ヂ', 'di'], ['づ', 'ヅ', 'du'], ['で', 'デ', 'de'], ['ど', 'ド', 'do']],
  [['ば', 'バ', 'ba'], ['び', 'ビ', 'bi'], ['ぶ', 'ブ', 'bu'], ['べ', 'ベ', 'be'], ['ぼ', 'ボ', 'bo']],
  [['ぱ', 'パ', 'pa'], ['ぴ', 'ピ', 'pi'], ['ぷ', 'プ', 'pu'], ['ぺ', 'ペ', 'pe'], ['ぽ', 'ポ', 'po']],
]

const handakuon = [
  [['ぱ', 'パ', 'pa'], ['ぴ', 'ピ', 'pi'], ['ぷ', 'プ', 'pu'], ['ぺ', 'ペ', 'pe'], ['ぽ', 'ポ', 'po']],
]

const yoon = [
  [['きゃ', 'キャ', 'kya'], 'empty', ['きゅ', 'キュ', 'kyu'], 'empty', ['きょ', 'キョ', 'kyo']],
  [['しゃ', 'シャ', 'sha'], 'empty', ['しゅ', 'シュ', 'shu'], 'empty', ['しょ', 'ショ', 'sho']],
  [['ちゃ', 'チャ', 'cha'], 'empty', ['ちゅ', 'チュ', 'chu'], 'empty', ['ちょ', 'チョ', 'cho']],
  [['にゃ', 'ニャ', 'nya'], 'empty', ['にゅ', 'ニュ', 'nyu'], 'empty', ['にょ', 'ニョ', 'nyo']],
  [['ひゃ', 'ヒャ', 'hya'], 'empty', ['ひゅ', 'ヒュ', 'hyu'], 'empty', ['ひょ', 'ヒョ', 'hyo']],
  [['みゃ', 'ミャ', 'mya'], 'empty', ['みゅ', 'ミュ', 'myu'], 'empty', ['みょ', 'ミョ', 'myo']],
  [['りゃ', 'リャ', 'rya'], 'empty', ['りゅ', 'リュ', 'ryu'], 'empty', ['りょ', 'リョ', 'ryo']],
  [['ぎゃ', 'ギャ', 'gya'], 'empty', ['ぎゅ', 'ギュ', 'gyu'], 'empty', ['ぎょ', 'ギョ', 'gyo']],
  [['じゃ', 'ジャ', 'ja'], 'empty', ['じゅ', 'ジュ', 'ju'], 'empty', ['じょ', 'ジョ', 'jo']],
  [['びゃ', 'ビャ', 'bya'], 'empty', ['びゅ', 'ビュ', 'byu'], 'empty', ['びょ', 'ビョ', 'byo']],
  [['ぴゃ', 'ピャ', 'pya'], 'empty', ['ぴゅ', 'ピュ', 'pyu'], 'empty', ['ぴょ', 'ピョ', 'pyo']],
]

const machine = Machine({
  id: 'table',
  type: 'parallel',
  context: {
    gojuon: {
      seion,
      dakion,
      handakuon,
      yoon,
    },
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
