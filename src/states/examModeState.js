import { Machine, assign, send } from 'xstate'

const machine = Machine(
  {
    id: 'examMode',
    initial: 'pageUnounted',
    context: {
      examRange: [],
      cards: [],
      cursor: 0,
      enhancementCards: [],
      enhancementCursor: 0,
      isNotFirstTime: false,
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
              target: 'idle.exam.generateExam',
            },
          ],
        },
      },
      navigateToExamView: {
        type: 'final',
      },
      idle: {
        type: 'parallel',
        states: {
          exam: {
            initial: 'examing',
            states: {
              generateExam: {
                on: {
                  '': {
                    actions: 'generateExam',
                    target: 'examing',
                  },
                },
              },
              examing: {
                id: 'examing',
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
                              CARD_BACK_TO_POSITION:
                                'cardBackToPositionAnimation',
                              NEXT_CARD: [
                                {
                                  cond: 'addToEnhancement',
                                  actions: [
                                    'addCardsToEnhancement',
                                    'nextCard',
                                    send('CLEAR_CANVAS'),
                                  ],
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
                                  cond: 'noMoreCardsWithEnhancementCards',
                                  target: '#examing.changeExamModeAnimation',
                                },
                                {
                                  cond: 'noMoreCards',
                                  target:
                                    '#examMode.idle.exam.examFinish.examFinishAnimation',
                                },
                                {
                                  target: '#examing.normalExam.idle',
                                },
                              ],
                            },
                          },
                          cardSwipeLeftAnimation: {
                            on: {
                              CARD_SWIPE_ANIMATION_END: [
                                {
                                  cond: 'noMoreCards',
                                  target: '#examing.changeExamModeAnimation',
                                },
                                {
                                  target: '#examing.normalExam.idle',
                                },
                              ],
                            },
                          },
                        },
                      },
                    },
                  },
                  changeExamModeAnimation: {
                    exit: ['prepareNewExam'],
                    on: {
                      CHANGE_EXAM_MODE_ANIMATION_END: 'normalExam',
                    },
                  },
                },
              },
              examFinish: {
                initial: 'examFinishAnimation',
                entry: ['updateIsNotFirstTime'],
                states: {
                  examFinishAnimation: {
                    on: {
                      EXAM_FINISH_ANIMATION_END: 'examFinish',
                    },
                  },
                  examFinish: {
                    on: {
                      TAKE_EXAM_AGAIN: 'restartExamAnimation',
                    },
                  },
                  restartExamAnimation: {
                    on: {
                      RESTART_EXAM_ANIMATION_END:
                        '#examMode.idle.exam.generateExam',
                    },
                  },
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
          whiteBoard: {
            id: 'whiteBoard',
            initial: 'drawing',
            states: {
              drawing: {
                on: {
                  CLEAR_CANVAS: 'clear',
                },
              },
              clear: {
                on: {
                  CANVAS_CLEAR_FINISHED: 'drawing',
                },
              },
            },
          },
        },
      },
    },
  },
  {
    guards: {
      isNotFirstTime ({ isNotFirstTime }) {
        return Boolean(isNotFirstTime)
      },
      addToEnhancement (context, { addToEnhancement }) {
        return Boolean(addToEnhancement)
      },
      noExamRange ({ examRange }) {
        return examRange.length == 0
      },
      noMoreCards ({ cards, cursor }) {
        return cursor == cards.length
      },
      noMoreCardsWithEnhancementCards ({ cards, cursor, enhancementCards }) {
        return cursor == cards.length && enhancementCards.length > 0
      },
      noEnhancementCards ({ enhancementCards }) {
        return enhancementCards.length == 0
      },
      noMoreEnhancementCards ({ enhancementCards, enhancementCursor }) {
        return enhancementCursor == enhancementCards.length
      },
    },
    actions: {
      updateIsNotFirstTime: assign(function mutateIsNotFirstTime ({
        isNotFirstTime,
      }) {
        if (isNotFirstTime) return
        return {
          isNotFirstTime: true,
        }
      }),
      generateExam: assign(function mutateCards ({
        examRange,
        cursor,
        enhancementCursor,
        enhancementCards,
      }) {
        return {
          cards: shuffle(examRange),
          cursor: 0,
          enhancementCursor: 0,
          enhancementCards: [],
        }
      }),
      addCardsToEnhancement: assign(function addCardsToEnhancement ({
        enhancementCards,
        cards,
        cursor,
      }) {
        return {
          enhancementCards: [...enhancementCards, cards[cursor]],
        }
      }),
      nextCard: assign(function cursorToNext ({ cursor }) {
        return {
          cursor: cursor + 1,
        }
      }),
      prepareNewExam: assign(function mutateExam ({ enhancementCards }) {
        return {
          cursor: 0,
          cards: enhancementCards,
          enhancementCards: [],
        }
      }),
      nextEnhancementCard: assign(function cursorToNext ({ enhancementCursor }) {
        return {
          enhancementCursor: enhancementCursor + 1,
        }
      }),
    },
  }
)

export { machine }

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
