import { Machine, assign, send } from 'xstate'

const machine = Machine({
  id: 'examMode',
  initial: 'pageUnounted',
  context: {
    examRange: [],
    cards: [],
    cursor: 0,
    enhancementCards: [],
    enhancementCursor: 0,
  },
  states: {
    pageUnounted: {
      on: {
        PAGE_MOUNTED: 'checkIfExamRangeExist',
      },
    },
    checkIfExamRangeExist: {
      on: {
        '': [
          {
            cond: 'noExamRange',
            target: 'navigateToExamView',
          },
          {
            target: 'generateExam',
          },
        ],
      },
    },
    navigateToExamView: {
      type: 'final',
    },
    generateExam: {
      on: {
        '': {
          actions: 'generateExam',
          target: 'idle',
        },
      },
    },
    idle: {
      type: 'parallel',
      states: {
        exam: {
          id: 'exam',
          initial: 'normalExam',
          states: {
            normalExam: {
              initial: 'idle',
              states: {
                idle: {
                  on: {
                    SHOW_ANSWER: 'answerShowed',
                  },
                },
                answerShowed: {
                  initial: 'idle',
                  states: {
                    idle: {
                      on: {
                        CARD_MOVE: 'moved',
                        NEXT_CARD: [
                          {
                            cond: 'addToEnhancement',
                            actions: ['addCardsToEnhancement', 'nextCard', send('CLEAR_CANVAS')],
                            target: 'cardSwipeLeftAnimation',
                          },
                          {
                            actions: ['nextCard', send('CLEAR_CANVAS')],
                            target: 'cardSwipeRightAnimation',
                          },
                        ],
                      },
                    },
                    moved: {
                      on: {
                        CARD_BACK_TO_POSITION: 'cardBackToPositionAnimation',
                        NEXT_CARD: [
                          {
                            cond: 'addToEnhancement',
                            actions: ['addCardsToEnhancement', 'nextCard', send('CLEAR_CANVAS')],
                            target: 'cardSwipeLeftAnimation',
                          },
                          {
                            actions: ['nextCard', send('CLEAR_CANVAS')],
                            target: 'cardSwipeRightAnimation',
                          },
                        ],
                      },
                    },
                    cardBackToPositionAnimation: {
                      on: {
                        CARD_BACK_TO_POSITION_ANIMATION_END: 'idle',
                      },
                    },
                    cardSwipeRightAnimation: {
                      on: {
                        CARD_SWIPE_ANIMATION_END: [
                          {
                            cond: 'noMoreCards',
                            target: '#exam.changeExamModeAnimation',
                          },
                          {
                            target: '#exam.normalExam.idle',
                          },
                        ],
                      },
                    },
                    cardSwipeLeftAnimation: {
                      on: {
                        CARD_SWIPE_ANIMATION_END: [
                          {
                            cond: 'noMoreCards',
                            target: '#exam.changeExamModeAnimation',
                          },
                          {
                            target: '#exam.normalExam.idle',
                          },
                        ],
                      },
                    },
                  },
                },
              },
            },
            changeExamModeAnimation: {
              on: {
                CHANGE_EXAM_MODE_ANIMATION_END: 'enhancementExam',
              },
            },
            enhancementExam: {
              initial: 'idle',
              on: {
                '': {
                  cond: 'noEnhancementCards',
                  target: '#exam.examFinish',
                },
              },
              states: {
                idle: {
                  on: {
                    SHOW_ANSWER: 'answerShowed',
                  },
                },
                answerShowed: {
                  initial: 'idle',
                  states: {
                    idle: {
                      on: {
                        CARD_MOVE: 'moved',
                        NEXT_CARD: [
                          {
                            cond: 'addToEnhancement',
                            target: 'cardShakeAnimation',
                          },
                          {
                            actions: ['nextEnhancementCard', send('CLEAR_CANVAS')],
                            target: 'cardSwipeRightAnimation',
                          },
                        ],
                      },
                    },
                    moved: {
                      on: {
                        CARD_BACK_TO_POSITION: 'cardBackToPositionAnimation',
                        CARD_SHAKE: 'cardShakeAnimation',
                        NEXT_CARD: [
                          {
                            cond: 'addToEnhancement',
                            target: 'cardShakeAnimation',
                          },
                          {
                            actions: ['nextEnhancementCard', send('CLEAR_CANVAS')],
                            target: 'cardSwipeRightAnimation',
                          },
                        ],
                      },
                    },
                    cardBackToPositionAnimation: {
                      on: {
                        CARD_BACK_TO_POSITION_ANIMATION_END: 'idle',
                      },
                    },
                    cardShakeAnimation: {
                      on: {
                        CARD_SHAKE_ANIMATION_END: 'idle',
                      },
                    },
                    cardSwipeRightAnimation: {
                      on: {
                        CARD_SWIPE_ANIMATION_END: [
                          {
                            cond: 'noMoreEnhancementCards',
                            target: '#exam.examFinish',
                          },
                          {
                            target: '#exam.enhancementExam.idle',
                          },
                        ],
                      },
                    },
                    cardSwipeLeftAnimation: {
                      on: {
                        CARD_SWIPE_ANIMATION_END: [
                          {
                            cond: 'noMoreEnhancementCards',
                            target: '#exam.examFinish',
                          },
                          {
                            target: '#exam.enhancementExam.idle',
                          },
                        ],
                      },
                    },
                  },
                },
              },
            },
            examFinish: {
              on: {
                TAKE_EXAM_AGAIN: 'normalExam',
              },
            },
          },
        },
        infoModal: {
          initial: 'hide',
          states: {
            showInfoModalAnimation: {
              on: {
                SHOW_INFO_MODAL_ANIMATION_END: 'show',
              },
            },
            show: {
              on: {
                HIDE_INFO_MODAL: 'hideInfoModalAnimation',
              },
            },
            hideInfoModalAnimation: {
              on: {
                HIDE_INFO_MODAL_ANIMATION_END: 'hide',
              },
            },
            hide: {
              on: {
                SHOW_INFO_MODAL: 'showInfoModalAnimation',
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
                  target: 'show',
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
              on: {
                OPEN_DRAWING_BOARD: 'openDrawingBoardAnimation',
              },
            },
          },
        },
      },
    },
  },
}, {
  guards: {
    addToEnhancement (context, { addToEnhancement }) {
      return Boolean(addToEnhancement)
    },
    noExamRange ({ examRange }) {
      return examRange.length == 0
    },
    noMoreCards ({ cards, cursor }) {
      return cursor == cards.length
    },
    noEnhancementCards ({ enhancementCards }) {
      return enhancementCards.length == 0
    },
    noMoreEnhancementCards ({ enhancementCards, enhancementCursor }) {
      return enhancementCursor == enhancementCards.length
    },
  },
  actions: {
    generateExam: assign(function mutateCards ({ examRange }) {
      return {
        cards: shuffle(examRange),
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
    nextEnhancementCard: assign(function cursorToNext ({ enhancementCursor }) {
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
