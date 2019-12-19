<template>
  <div class="tooltips-container" ref="tooltipsElement">
    <span class="text">
      <slot></slot>
    </span>

    <div
      class="tooltips-container__angle"
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
    showAnimationState: {
      type: String,
      required: true,
    },
    hideState: {
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
    const tooltipsElement = ref(null)

    const tooltipsElementAnimationTimeline = ref(null)
    const tooltipsTimeout = ref(null)

    watch(
      () => props.current.matches(props.showAnimationState),
      function startShowTooltipsAnimation (value) {
        if (value) {
          clearTimeout(tooltipsTimeout.value)
          showTooltips().then(function animationEnd () {
            props.service.send('SHOW_TOOLTIPS_ANIMATION_END')
          })
        }
      },
      { lazy: true }
    )

    watch(
      () => props.current.matches(props.hideState),
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
        if (value) {
          hideTooltips().then(function animationEnd () {
            props.service.send('HIDE_TOOLTIPS_ANIMATION_END')
          })
        }
      },
      { lazy: true }
    )

    return {
      tooltipsElement,
    }

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

    function hideTooltips () {
      return tooltipsElementAnimationTimeline.value.reverse()
    }
  },
}
</script>

<style scoped>
.tooltips-container {
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

.tooltips-container__angle {
  position: absolute;
  content: "";
  display: block;
  width: 10px;
  height: 10px;
  background-color: var(--main-color);
}

.text {
  text-align: center;
}
</style>
