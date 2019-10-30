import { Machine, assign, send } from 'xstate'
import { mutateByData, checkDataIs } from '../../../helpers/state.js'
import { gojuon } from '../../../helpers/gojuon.js'

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
