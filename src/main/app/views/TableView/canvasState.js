import { Machine, assign, sendParent } from 'xstate'
import { mutateByData } from './../../../../helpers/state.js'

const machine = Machine({
  id: 'canvas',
  type: 'parallel',
  context: {
    canvasImage: null,
    answer: null,
  },
  states: {
    draw: {
      initial: 'idle',
      states: {
        idle: {
          exit: ['clearPreviousAnswer'],
          on: {
            START_DRAWING: 'drawing',
          },
        },
        drawing: {
          on: {
            FINISH_DRAWING: {
              actions: 'updateCanvasImage',
              target: ['idle', '#canvas.recognize.recognizing'],
            },
          },
        },
      },
    },
    recognize: {
      initial: 'idle',
      states: {
        idle: {},
        recognizing: {
          invoke: {
            src: 'tesseractRecognize',
            onDone: {
              actions: ['updateAnswer', 'sendAnswerToParent'],
              target: 'idle',
            },
          },
        },
      },
    },
  },
}, {
  actions: {
    clearPreviousAnswer: sendParent('CLEAR_ANSWER'),
    updateCanvasImage: assign(mutateByData('canvasImage')),
    updateAnswer: assign(mutateByData('answer')),
    sendAnswerToParent: sendParent(function sendAnswerToParent ({ answer: data }) {
      return {
        type: 'RECOGNIZE_FINISH',
        data,
      }
    }),
  },
})

export {
  machine,
}
