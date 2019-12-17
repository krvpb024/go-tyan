<template>
  <div class="tooltips-container" ref="tooltipsElement">
    <span class="text">
      <slot></slot>
    </span>
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
  },
  setup (props) {
    const tooltipsElement = ref(null)

    const tooltipsElementAnimationTimeline = ref(null)

    watch(
      () => props.current.matches('drawingBoard.hide.showTooltipsAnimation'),
      function startShowTooltipsAnimation (value) {
        if (value) {
          showTooltips().then(function animationEnd () {
            props.service.send('SHOW_TOOLTIPS_ANIMATION_END')
          })
        }
      },
      { lazy: true }
    )

    watch(
      () => props.current.matches('drawingBoard.hide.tooltips'),
      function startHideTooltipsAnimation (value) {
        setTimeout(function closeTooltipsTimeout () {
          props.service.send('HIDE_TOOLTIPS')
        }, 1000)
      },
      { lazy: true }
    )

    watch(
      () => props.current.matches('drawingBoard.hide.hideTooltipsAnimation'),
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

.tooltips-container::after {
  position: absolute;
  content: "";
  display: block;
  width: 10px;
  height: 10px;
  background-color: var(--main-color);
  transform: translate(20px, 50%) rotate(45deg);
  bottom: 0;
  left: 0;
}

.text {
  text-align: center;
}
</style>
