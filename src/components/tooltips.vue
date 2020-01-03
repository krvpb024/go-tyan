<template>
  <div
    class="tooltips"
    :aria-hidden="(!show).toString()"
    aria-live="assertive"
    role="alert"
    ref="tooltipsElement"
    @click="$emit('click')"
  >
    <p class="tooltips__text">
      <slot></slot>
    </p>

    <div
      class="tooltips__angle"
      :style="{
        ...anglePosition,
        transform: `translate(${angleTransformX}, ${angleTransformY}) rotate(45deg)`,
      }"
    ></div>
  </div>
</template>

<script>
import { ref, watch, onMounted } from '@vue/composition-api'
import { gsap } from 'gsap'

export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    service: {
      type: Object,
      required: true,
    },
    current: {
      type: Object,
      required: true,
    },
    anglePosition: {
      type: Object,
      default: () => ({ left: 0, top: 0 }),
    },
    angleTransformX: {
      type: String,
      default: '0',
    },
    angleTransformY: {
      type: String,
      default: '0',
    },
  },
  setup (props) {
    // element
    const tooltipsElement = ref(null)

    // data
    const tooltipsShowTimeLine = ref(null)

    // effect
    watch(
      () => props.show,
      function showWatcher (value) {
        if (value) {
          tooltipsShowTimeLine.value.play()
        } else {
          tooltipsShowTimeLine.value.reverse()
        }
      },
      { lazy: true }
    )

    onMounted(function tooltipsOnMounted () {
      tooltipsShowTimeLine.value = gsap.timeline({ paused: true })
        .set(tooltipsElement.value, { display: 'block' })
        .fromTo(tooltipsElement.value, {
          opacity: 0,
        }, {
          opacity: 1,
          duration: 0.3,
        })
    })

    return {
      tooltipsElement,
    }
  },
}
</script>

<style scoped>
.tooltips {
  position: relative;
  background-color: var(--main-color);
  border-radius: 8px;
  width: auto;
  white-space: nowrap;
  align-items: center;
  justify-content: center;
  padding: 27px 16px;
  opacity: 0;
  display: none;
}

.tooltips__angle {
  position: absolute;
  content: "";
  display: block;
  width: 10px;
  height: 10px;
  background-color: var(--main-color);
  transition: inherit;
}

.tooltips__text {
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  width: 100%;
  white-space: wrap;
}
</style>
