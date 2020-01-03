import { Machine } from 'xstate'

const machine = Machine({
  id: 'home',
  initial: 'idle',
  states: {
    idle: {
      initial: 'tooltipsHide',
      states: {
        tooltipsShow: {
          after: {
            10000: 'tooltipsHide',
          },
          on: {
            TOOLTIPS_HIDE: 'tooltipsHide',
          },
        },
        tooltipsHide: {
          on: {
            TOOLTIPS_SHOW: 'tooltipsShow',
          },
        },
      },
    },
  },
})

export {
  machine,
}
