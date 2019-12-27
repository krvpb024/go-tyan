import { Machine, assign } from 'xstate'
import { gojuon } from '@/states/gojuon.js'

const machine = Machine({
  id: 'examRangeView',
  initial: 'idle',
  context: {
    gojuon,
    selectedGojuon: [],
    submittedGojuon: [],
    examRange: [],
    navTarget: '',
  },
  states: {
    idle: {
      on: {
        NAV_TO_EXAM_MODE: {
          target: 'checkIfExamRangeExist',
          actions: 'updateNavTarget',
        },
        SHOW_EXAM_RANGE_MODAL: 'examRangeModal.showAnimation',
      },
    },
    checkIfExamRangeExist: {
      on: {
        '': [
          {
            cond: 'noExamRange',
            target: 'examRangeModal.showAnimation',
          },
          {
            target: 'navToExamMode',
          },
        ],
      },
    },
    examRangeModal: {
      id: 'examRangeModal',
      initial: 'hide',
      states: {
        showAnimation: {
          on: {
            SHOW_EXAM_RANGE_MODAL_ANIMATION_END: 'show',
          },
        },
        show: {
          initial: 'idle',
          on: {
            HIDE_EXAM_RANGE_MODAL: {
              actions: ['clearNavTarget', 'undoMutateSelectedGojuon'],
              target: 'hideAnimation',
            },
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
                target: 'hideAnimation',
              },
            ],
          },
          states: {
            idle: {},
            error: {
              initial: 'showTooltipsAnimation',
              meta: {
                message: '請至少選擇一項',
              },
              states: {
                showTooltipsAnimation: {
                  on: {
                    SHOW_TOOLTIPS_ANIMATION_END: 'showTooltips',
                  },
                },
                showTooltips: {
                  on: {
                    HIDE_TOOLTIPS: 'hideTooltipsAnimation',
                  },
                },
                hideTooltipsAnimation: {
                  on: {
                    HIDE_TOOLTIPS_ANIMATION_END: '#examRangeModal.show.idle',
                  },
                },
              },
            },
          },
        },
        hideAnimation: {
          on: {
            HIDE_EXAM_RANGE_MODAL_ANIMATION_END: 'hide',
          },
        },
        hide: {
          on: {
            '': [
              {
                cond: 'hasNavTarget',
                target: '#examRangeView.navToExamMode',
              },
              {
                target: '#examRangeView.idle',
              },
            ],
          },
        },
      },
    },
    navToExamMode: {
      type: 'final',
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
    hasNavTarget ({ navTarget }) {
      return Boolean(navTarget)
    },
  },
  actions: {
    updateNavTarget: assign(function mutateNavTarget (context, { data: navTarget }) {
      return {
        navTarget,
      }
    }),
    clearNavTarget: assign({ navTarget: '' }),
    undoMutateSelectedGojuon: assign(function undoMutateSelectedGojuon ({ submittedGojuon }) {
      return {
        selectedGojuon: submittedGojuon,
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
      return {
        submittedGojuon: selectedGojuon,
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
  },
})

export {
  machine,
}
