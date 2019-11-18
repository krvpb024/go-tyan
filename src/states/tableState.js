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
