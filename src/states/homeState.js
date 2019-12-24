import { Machine } from 'xstate'

const machine = Machine({
  id: 'home',
  initial: 'idle',
  states: {
    idle: {
      on: {
        SHOW_TOOLTIPS: 'tooltips.showTooltipsAnimation',
      },
    },
    tooltips: {
      initial: 'showTooltipsAnimation',
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
            HIDE_TOOLTIPS_ANIMATION_END: '#home.idle',
          },
        },
      },
    },
  },
})

export {
  machine,
}
