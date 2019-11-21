import { Machine, assign, send } from 'xstate'
import { mutateByDataValue } from '@/utils/machineFactory.js'
// import { gojuon } from '@/states/gojuon.js'

const machine = Machine({
  id: 'examView',
  type: 'parallel',
  context: {
    selectedGojuon: [],
    examRange: [],
    cards: [],
    cursor: 0,
    enhancementCards: [],
    enhancementCursor: 0,
  },
  states: {
    exam: {
      initial: 'generateExam',
      states: {
        generateExam: {
          on: {
            '': [
              {
                cond: 'noExamRange',
                target: 'setExamRange',
              },
              {
                actions: 'generateExam',
                target: 'normalExam',
              },
            ],
          },
        },
        setExamRange: {
          initial: 'idle',
          on: {
            UPDATE_SELECTED_GOJUON: {
              actions: 'updateSelectedGojuon',
            },
            SET_EXAM_RANGE: [
              {
                cond: 'selectedGojuonIsEmpty',
                target: '.error',
              },
              {
                actions: 'setExamRange',
                target: 'generateExam',
              },
            ],
          },
          states: {
            idle: {},
            error: {
              meta: {
                message: '測驗範圍不能爲空',
              },
            },
          },
        },
        normalExam: {
          initial: 'idle',
          states: {
            idle: {
              on: {
                SHOW_ANSWER: 'answerShowed',
              },
            },
            answerShowed: {
              on: {
                NEXT_CARD: [
                  {
                    cond: 'noMoreCards',
                    actions: send('CLEAR_CANVAS'),
                    target: '#examView.exam.enhancementExam',
                  },
                  {
                    cond: 'addToEnhancement',
                    actions: ['addCardsToEnhancement', 'nextCard', send('CLEAR_CANVAS')],
                    target: 'idle',
                  },
                  {
                    actions: ['nextCard', send('CLEAR_CANVAS')],
                    target: 'idle',
                  },
                ],
              },
            },
          },
        },
        enhancementExam: {
          initial: 'idle',
          states: {
            idle: {
              on: {
                SHOW_ANSWER: 'answerShowed',
              },
            },
            answerShowed: {
              on: {
                NEXT_CARD: [
                  {
                    cond: 'noMoreEnhancementCards',
                    actions: send('CLEAR_CANVAS'),
                    target: '#examView.exam.examFinishModal',
                  },
                  {
                    actions: ['nextEnhancementCard', send('CLEAR_CANVAS')],
                    target: 'idle',
                  },
                ],
              },
            },
          },
        },
        examFinishModal: {
          on: {
            BACK_TO_HOME: {},
          },
        },
      },
    },
    drawingBoard: {
      initial: 'hide',
      states: {
        hide: {
          on: {
            SHOW_DRAWING_BOARD: 'show',
          },
        },
        show: {
          initial: 'idle',
          on: {
            HIDE_DRAWING_BOARD: 'hide',
          },
          states: {
            idle: {
              on: {
                CLEAR_CANVAS: 'clearCanvas',
              },
            },
            clearCanvas: {
              on: {
                CANVAS_CLEAR_FINISHED: 'idle',
              },
            },
          },
        },
      },
    },
  },
}, {
  guards: {
    noExamRange ({ examRange }) {
      return examRange.length == 0
    },
    noMoreCards ({ cards, cursor }) {
      return cursor == cards.length - 1
    },
    addToEnhancement (context, { addToEnhancement }) {
      return Boolean(addToEnhancement)
    },
    noMoreEnhancementCards ({ enhancementCards, enhancementCursor }) {
      return enhancementCursor == enhancementCards.length - 1
    },
  },
  actions: {
    generateExam: assign(function mutateCards ({ examRange }) {
      return {
        cards: shuffle(examRange),
      }
    }),
    updateSelectedGojuon: assign(mutateByDataValue('selectedGojuon')),
    setExamRange: assign(function mutateExamRange ({ selectedGojuon }) {
      return {
        examRange: [...selectedGojuon],
      }
    }),
    addCardsToEnhancement: assign(function addCardsToEnhancement ({ enhancementCards, cards, cursor }) {
      return {
        enhancementCards: [...enhancementCards, cards[cursor]],
      }
    }),
    nextCard: assign(function cursorToNext ({ cursor }) {
      return {
        cursor: cursor + 1,
      }
    }),
    nextEnhancementCard: assign(function enhancementCursorToNext ({ enhancementCursor }) {
      return {
        enhancementCursor: enhancementCursor + 1,
      }
    }),
  },
})

export {
  machine,
}

function shuffle (array) {
  const resultArray = [...array]
  let m = resultArray.length
  let t
  let i

  while (m) {
    i = Math.floor(Math.random() * m--)

    t = resultArray[m]
    resultArray[m] = resultArray[i]
    resultArray[i] = t
  }

  return resultArray
}
