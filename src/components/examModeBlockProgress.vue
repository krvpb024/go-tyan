<template>
  <div class="exam-mode-block-progress">
    <div
      class="exam-mode-block-progress__bar-container"
      role="progressbar"
      :aria-valuenow="value"
      aria-valuemin="0"
      :aria-valuemax="max"
      aria-live="polite"
    >
      <div
        class="exam-mode-block-bar-container__value-bar"
        ref="valueBarElement"
      ></div>
    </div>

    <p class="exam-mode-block-bar-container__status" aria-hidden="true">
      {{ value }} / {{ max }}
    </p>
  </div>
</template>

<script>
import { gsap } from 'gsap'
import { ref, watch } from '@vue/composition-api'

export default {
  props: {
    service: {
      type: Object,
      required: true,
    },
    current: {
      type: Object,
      required: true,
    },
    value: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 1,
    },
  },
  setup (props) {
    // element
    const valueBarElement = ref(null)

    // effect
    watch(
      () => props.value,
      function valueWatcher (value) {
        gsap.to(valueBarElement.value, {
          width: `${(props.value / props.max) * 100}%`,
          duration:
            value == 0 // if start a new exam cursor will be 0, won't need transition for that
              ? 0
              : 0.3,
        })
      },
      { lazy: true }
    )

    return {
      // element
      valueBarElement,
    }
  },
}
</script>

<style scoped>
.exam-mode-block-progress__bar-container {
  height: 22px;
  border-radius: 4px;
  box-shadow: 1px 2px 9px 0 rgba(0, 0, 0, 0.16);
  border: solid 2px var(--text-color);
  background-color: #fff;
}

.exam-mode-block-bar-container__value-bar {
  width: 0;
  height: 100%;
  background-color: #ffe65a;
  box-shadow: inset 8px -6px 0 #ffc400;
  border-radius: 4px;
}

.exam-mode-block-bar-container__status {
  font-size: 1.25rem;
  font-weight: bold;
  margin: 5px;
  text-align: center;
}
</style>
