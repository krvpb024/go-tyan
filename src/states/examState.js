import { Machine, assign, send } from 'xstate'
// import { mutateByDataValue } from '@/utils/machineFactory.js'
import { gojuon } from '@/states/gojuon.js'

const machine = Machine({
  id: 'examView',
  type: 'parallel',
  context: {
    gojuon,
    selectedGojuon: [],
    submittedGojuon: [],
    examRange: [],
    cards: [],
    cursor: 0,
    enhancementCards: [],
    enhancementCursor: 0,
  },
  states: {
    exam: {
      initial: 'initializeExam',
      on: {
        SHOW_EXAM_RANGE_MODAL: '.settingExamRange',
      },
      states: {
        initializeExam: {
          entry: ['setContextToInitial', 'getInitialDataFromLocalStorage'],
          on: {
            '': [
              {
                cond: 'noExamRange',
                target: 'settingExamRange',
              },
              {
                target: 'normalExam',
              },
            ],
          },
        },
        settingExamRange: {
          initial: 'idle',
          on: {
            HIDE_EXAM_RANGE_MODAL: [
              {
                cond: 'examRangeIsEmpty',
                target: '.error',
              },
              {
                actions: 'undoMutateSelectedGojuon',
                target: 'initializeExam',
              },
            ],
            UPDATE_SELECTED_GOJUON: {
              actions: 'updateSelectedGojuon',
            },
            SET_EXAM_RANGE: [
              {
                cond: 'selectedGojuonIsEmpty',
                target: '.error',
              },
              {
                actions: ['updateSubmittedGojuon', 'setExamRange'],
                target: 'initializeExam',
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
          entry: ['generateExam'],
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
    examRangeIsEmpty ({ examRange }) {
      return !(examRange.length > 0)
    },
    selectedGojuonIsEmpty ({ selectedGojuon }) {
      return !(selectedGojuon.length > 0)
    },
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
    setContextToInitial: assign({
      cursor: 0,
      enhancementCards: [],
      enhancementCursor: 0,
    }),
    getInitialDataFromLocalStorage: assign(function mutateInitailDataByLocalStorage ({ examRange, submittedGojuon, selectedGojuon }) {
      const localExamRange = JSON.parse(window.localStorage.getItem('examRange'))
      const localSubmittedGojuon = JSON.parse(window.localStorage.getItem('submittedGojuon'))

      return {
        examRange: localExamRange || examRange,
        submittedGojuon: localSubmittedGojuon || submittedGojuon,
        selectedGojuon: localSubmittedGojuon || selectedGojuon,
      }
    }),
    generateExam: assign(function mutateCards ({ examRange }) {
      return {
        cards: shuffle(examRange),
      }
    }),
    updateSelectedGojuon: assign(function mutateSelectedGojuon ({ selectedGojuon }, {
      data: {
        checked,
        target,
      },
    }) {
      if (checked) {
        return {
          selectedGojuon: Array.from(new Set([...selectedGojuon, target])),
        }
      }
      return {
        selectedGojuon: selectedGojuon.filter(function removeTarget (gojuon) {
          return gojuon != target
        }),
      }
    }),
    updateSubmittedGojuon: assign(function mutateSubmittedGojuon ({ selectedGojuon }) {
      window.localStorage.setItem('submittedGojuon', JSON.stringify(selectedGojuon))

      return {
        submittedGojuon: selectedGojuon,
      }
    }),
    undoMutateSelectedGojuon: assign(function undoMutateSelectedGojuon ({ submittedGojuon }) {
      return {
        selectedGojuon: submittedGojuon,
      }
    }),
    setExamRange: assign(function mutateExamRange ({ submittedGojuon }) {
      const result = submittedGojuon
        .map(function turnStringNameToRowArray (stringName) {
          const [groupName, rowIndex] = stringName.split('-')
          return gojuon[groupName][rowIndex]
        })
        .reduce(function flatArray (acc, row) {
          return [...acc, ...row]
        }, [])
        .filter(function removeEmpty (gojuon) {
          return gojuon != 'empty'
        })

      window.localStorage.setItem('examRange', JSON.stringify(result))

      return {
        examRange: [...result],
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
