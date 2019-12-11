import { Machine, assign } from 'xstate'
import { gojuon } from '@/states/gojuon.js'

const machine = Machine({
  id: 'examRangeView',
  initial: 'pageUnounted',
  context: {
    gojuon,
    selectedGojuon: [],
    submittedGojuon: [],
    examRange: [],
  },
  on: {
    SHOW_EXAM_RANGE_MODAL: {
      target: 'examRangeModal.showAnimation',
    },
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
            target: 'examRangeModal.showAnimation',
          },
          {
            target: 'idle',
          },
        ],
      },
    },
    idle: {},
    examRangeModal: {
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
            HIDE_EXAM_RANGE_MODAL: [
              {
                cond: 'examRangeIsEmpty',
                target: '.error',
              },
              {
                actions: 'undoMutateSelectedGojuon',
                target: 'hideAnimation',
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
                target: 'hideAnimation',
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
        hideAnimation: {
          on: {
            HIDE_EXAM_RANGE_MODAL_ANIMATION_END: 'hide',
          },
        },
        hide: {},
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
  },
  actions: {
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
      window.localStorage.setItem('submittedGojuon', JSON.stringify(selectedGojuon))

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
