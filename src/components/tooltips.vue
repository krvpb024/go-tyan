<template>
  <div
    v-if="current.matches(showState)"
    class="tooltips"
    aria-live="assertive"
    role="alert"
    ref="tooltipsElement"
  >
    <p class="tooltips__text">
      <slot></slot>
    </p>

    <div
      class="tooltips__angle"
      :style="{
        ...anglePosition,
        transform: `translate(${angleTransformX}, ${angleTransformY}) rotate(45deg)`
      }"
    ></div>
  </div>
</template>

<script>
import { ref, watch } from '@vue/composition-api'
import { gsap } from 'gsap'

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
    showState: {
      type: String,
      required: true,
    },
    showAnimationState: {
      type: String,
      required: true,
    },
    idleState: {
      type: String,
      required: true,
    },
    hideAnimationState: {
      type: String,
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
    const tooltipsElementAnimationTimeline = ref(null)
    const tooltipsTimeout = ref(null)

    watch(
      () => props.current.matches(props.showAnimationState),
      function startShowTooltipsAnimation (value) {
        if (!value) return

        clearTimeout(tooltipsTimeout.value)
        showTooltips().then(function animationEnd () {
          props.service.send('SHOW_TOOLTIPS_ANIMATION_END')
        })

        function showTooltips () {
          gsap.set(tooltipsElement.value, { clearProps: 'all' })

          tooltipsElementAnimationTimeline.value = gsap.timeline({ paused: true })
          return tooltipsElementAnimationTimeline.value
            .to(tooltipsElement.value, {
              display: 'flex',
              duration: 0,
            })
            .to(tooltipsElement.value, {
              opacity: 1,
              duration: 0.3,
            })
            .play()
        }
      },
      { lazy: true }
    )

    watch(
      () => props.current.matches(props.idleState),
      function startHideTooltipsAnimation (value) {
        tooltipsTimeout.value = setTimeout(function closeTooltipsTimeout () {
          props.service.send('HIDE_TOOLTIPS')
        }, 1500)
      },
      { lazy: true }
    )

    watch(
      () => props.current.matches(props.hideAnimationState),
      function startHideTooltipsAnimation (value) {
        if (!value) return

        tooltipsElementAnimationTimeline.value.reverse()
          .then(function animationEnd () {
            props.service.send('HIDE_TOOLTIPS_ANIMATION_END')
          })
      },
      { lazy: true }
    )

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
  display: none;
  align-items: center;
  justify-content: center;
  padding: 27px 16px;
  opacity: 0;
}

.tooltips__angle {
  position: absolute;
  content: "";
  display: block;
  width: 10px;
  height: 10px;
  background-color: var(--main-color);
}

.tooltips__text {
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
}
</style>
