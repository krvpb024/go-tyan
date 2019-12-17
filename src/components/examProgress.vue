<template>
  <div class="ep-container">
    <div class="ep-container__value-bar" ref="valueBarElement"></div>
  </div>
</template>

<script>
import { gsap } from 'gsap'
import { ref, watch } from '@vue/composition-api'

export default {
  props: {
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
    const valueBarElement = ref(null)
    watch(
      () => props.value,
      function valueWatcher () {
        gsap.to(valueBarElement.value, {
          width: `${props.value / props.max * 100}%`,
        })
      },
      { lazy: true }
    )

    return {
      valueBarElement,
    }
  },
}
</script>

<style scoped>
.ep-container {
  height: 22px;
  border-radius: 4px;
  box-shadow: 1px 2px 9px 0 rgba(0, 0, 0, 0.16);
  border: solid 2px var(--text-color);
  background-color: #fff;
}

.ep-container__value-bar {
  width: 0;
  height: 100%;
  background-color: #ffe65a;
  box-shadow: inset 8px -6px 0 #ffc400;
  border-radius: 4px;
}
</style>
