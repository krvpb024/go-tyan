import { Machine, assign, send } from 'xstate'
import { mutateByData, checkDataIs } from '../../../helpers/state.js'

const gojuon = [
  ['あ', 'ア', 'a'], ['い', 'イ', 'i'], ['う', 'ウ', 'u'], ['え', 'エ', 'e'], ['お', 'オ', 'o'],
  ['か', 'カ', 'ka'], ['き', 'キ', 'ki'], ['く', 'ク', 'ku'], ['け', 'ケ', 'ke'], ['こ', 'コ', 'ko'],
  ['さ', 'サ', 'sa'], ['し', 'シ', 'shi'], ['す', 'ス', 'su'], ['せ', 'セ', 'se'], ['そ', 'ソ', 'so'],
  ['た', 'タ', 'ta'], ['ち', 'チ', 'chi'], ['つ', 'ツ', 'tsu'], ['て', 'テ', 'te'], ['と', 'ト', 'to'],
  ['な', 'ナ', 'na'], ['に', 'ニ', 'ni'], ['ぬ', 'ヌ', 'nu'], ['ね', 'ネ', 'ne'], ['の', 'ノ', 'no'],
  ['は', 'ハ', 'ha'], ['ひ', 'ヒ', 'hi'], ['ふ', 'フ', 'fu'], ['へ', 'ヘ', 'he'], ['ほ', 'ホ', 'ho'],
  ['ま', 'マ', 'ma'], ['み', 'ミ', 'mi'], ['む', 'ム', 'mu'], ['め', 'メ', 'me'], ['も', 'モ', 'mo'],
  ['や', 'ヤ', 'ya'], ['ゆ', 'ユ', 'yu'], ['よ', 'ヨ', 'yo'],
  ['ら', 'ラ', 'ra'], ['り', 'リ', 'ri'], ['る', 'ル', 'ru'], ['れ', 'レ', 're'], ['ろ', 'ロ', 'ro'],
  ['わ', 'ワ', 'wa'], ['を', 'ヲ', 'wo'],
  ['ん', 'ン', 'n'],

  ['が', 'ガ', 'ga'], ['ぎ', 'ギ', 'gi'], ['ぐ', 'グ', 'gu'], ['げ', 'ゲ', 'ge'], ['ご', 'ゴ', 'go'],
  ['ざ', 'ザ', 'za'], ['じ', 'ジ', 'zi'], ['ず', 'ズ', 'zu'], ['ぜ', 'ゼ', 'ze'], ['ぞ', 'ｿﾞ', 'zo'],
  ['だ', 'ダ', 'da'], ['ぢ', 'ヂ', 'di'], ['づ', 'ヅ', 'du'], ['で', 'デ', 'de'], ['ど', 'ド', 'do'],
  ['ば', 'バ', 'ba'], ['び', 'ビ', 'bi'], ['ぶ', 'ブ', 'bu'], ['べ', 'ベ', 'be'], ['ぼ', 'ボ', 'bo'],
  ['ぱ', 'パ', 'pa'], ['ぴ', 'ピ', 'pi'], ['ぷ', 'プ', 'pu'], ['ぺ', 'ペ', 'pe'], ['ぽ', 'ポ', 'po'],

  ['きゃ', 'キャ', 'kya'], ['きゅ', 'キュ', 'kyu'], ['きょ', 'キョ', 'kyo'],
  ['しゃ', 'シャ', 'sha'], ['しゅ', 'シュ', 'shu'], ['しょ', 'ショ', 'sho'],
  ['ちゃ', 'チャ', 'cha'], ['ちゅ', 'チュ', 'chu'], ['ちょ', 'チョ', 'cho'],
  ['にゃ', 'ニャ', 'nya'], ['にゅ', 'ニュ', 'nyu'], ['にょ', 'ニョ', 'nyo'],
  ['ひゃ', 'ヒャ', 'hya'], ['ひゅ', 'ヒュ', 'hyu'], ['ひょ', 'ヒョ', 'hyo'],
  ['みゃ', 'ミャ', 'mya'], ['みゅ', 'ミュ', 'myu'], ['みょ', 'ミョ', 'myo'],
  ['りゃ', 'リャ', 'rya'], ['りゅ', 'リュ', 'ryu'], ['りょ', 'リョ', 'ryo'],
  ['ぎゃ', 'ギャ', 'gya'], ['ぎゅ', 'ギュ', 'gyu'], ['ぎょ', 'ギョ', 'gyo'],
  ['じゃ', 'ジャ', 'ja'], ['じゅ', 'ジュ', 'ju'], ['じょ', 'ジョ', 'jo'],
  ['びゃ', 'ビャ', 'bya'], ['びゅ', 'ビュ', 'byu'], ['びょ', 'ビョ', 'byo'],
  ['ぴゃ', 'ピャ', 'pya'], ['ぴゅ', 'ピュ', 'pyu'], ['ぴょ', 'ピョ', 'pyo'],
]

const toggleState = {
  initial: 'show',
  states: {
    show: {},
    hide: {},
  },
}

const displayGuards = [
  {
    target: '.show',
    cond: 'isShow',
  },
  {
    target: '.hide',
  },
]

const resetTargets = [
  '#tableView.drawingPanel.show.canvas.idle',
  '#tableView.drawingPanel.show.recognition.idle',
  '#tableView.drawingPanel.show.checkAnswer.idle',
  '#tableView.drawingPanel.show.result.idle',
]

const machine = Machine({
  id: 'tableView',
  type: 'parallel',
  context: {
    gojuon,
    recognizedResult: '',
    answer: '',
    gojuonId: null,
  },
  states: {
    settingPanel: {
      type: 'parallel',
      states: {
        display: {
          on: {
            UPDATE_SETTING_PANEL_DISPLAY: [
              ...displayGuards,
            ],
          },
          ...toggleState,
        },
        hiragana: {
          on: {
            UPDATE_HIRAGANA_DISPLAY: [
              ...displayGuards,
            ],
          },
          ...toggleState,
        },
        katakana: {
          on: {
            UPDATE_KATAKANA_DISPLAY: [
              ...displayGuards,
            ],
          },
          ...toggleState,
        },
        autoSwitch: {
          initial: 'off',
          on: {
            UPDATE_AUTO_SWITCH: [
              {
                target: '.on',
                cond: 'isOn',
              },
              {
                target: '.off',
              },
            ],
          },
          states: {
            on: {
              on: {
                AUTO_SWITCH: {
                  actions: 'autoSwitch',
                  target: [
                    ...resetTargets,
                  ],
                },
              },
            },
            off: {},
          },
        },
      },
    },
    drawingPanel: {
      initial: 'hide',
      on: {
        UPDATE_GOJUON_ID: {
          actions: 'updateGojuonId',
          target: [
            ...resetTargets,
          ],
        },
      },
      states: {
        show: {
          type: 'parallel',
          states: {
            canvas: {
              initial: 'idle',
              on: {
                SUBMIT_ANSWER: {
                  target: 'checkAnswer.checking',
                  actions: 'updateAnswer',
                },
              },
              states: {
                idle: {
                  on: {
                    START_DRAWING: 'drawing',
                  },
                },
                drawing: {
                  on: {
                    FINISH_DRAWING: {
                      target: ['idle', '#tableView.drawingPanel.show.recognition.recognizing'],
                    },
                  },
                },
              },
            },
            recognition: {
              initial: 'idle',
              states: {
                idle: {},
                recognizing: {
                  invoke: {
                    id: 'recognize',
                    src: 'recognize',
                    onDone: {
                      target: [
                        'idle',
                        '#tableView.drawingPanel.show.checkAnswer.checking',
                      ],
                      actions: 'updateRecognizedResult',
                    },
                  },
                },
              },
            },
            checkAnswer: {
              initial: 'idle',
              states: {
                idle: {},
                checking: {
                  on: {
                    '': [
                      {
                        target: ['idle', '#tableView.drawingPanel.show.result.idle'],
                        cond: 'notSubmitAnswer',
                      },
                      {
                        target: ['idle', '#tableView.drawingPanel.show.result.correct'],
                        cond: 'isCorrectAnswer',
                      },
                      {
                        target: ['idle', '#tableView.drawingPanel.show.result.wrong'],
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
                    '': {
                      actions: send('AUTO_SWITCH'),
                    },
                  },
                },
                wrong: {},
              },
            },
          },
        },
        hide: {},
      },
    },
  },
}, {
  guards: {
    isShow: checkDataIs(true),
    isOn: checkDataIs(true),
    notSubmitAnswer ({ answer }) {
      return answer == null
    },
    isCorrectAnswer ({ gojuon, gojuonId, answer }) {
      return gojuon[gojuonId] === answer
    },
  },
  actions: {
    updateGojuonId: assign(mutateByData('gojuonId')),
    autoSwitch: assign(function incrementGojuonId ({ gojuonId }) {
      return {
        gojuonId: gojuonId === 104
          ? 0
          : gojuonId + 1,
      }
    }),
    updateRecognizedResult: assign(mutateByData('recognizedResult')),
    updateAnswer: assign(mutateByData('answer')),
  },
})

export {
  machine,
}
