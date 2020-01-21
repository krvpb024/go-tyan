<template>
  <canvas
    class="white-board"
    ref="whiteBoardElement"
    @mousedown="startDrawing"
    @touchstart.prevent="startDrawing"
    @mousemove="drawLine"
    @touchmove.prevent="drawLine"
    @mouseup="stopDrawing"
    @touchend.prevent="stopDrawing"
  ></canvas>
</template>

<script>
import { ref, watch, onMounted } from '@vue/composition-api'

export default {
  props: {
    init: {
      type: Boolean,
      default: false,
    },
    clear: {
      type: Boolean,
      default: false,
    },
    canDraw: {
      type: Boolean,
      default: true,
    },
    lock: {
      type: Boolean,
      default: false,
    },
  },
  setup (props, context) {
    // element
    const whiteBoardElement = ref(null)
    // data
    const ctx = ref(null)
    const lastX = ref(0)
    const lastY = ref(0)

    const writeAnswer = ref(false)

    const canDraw = ref(false)

    // effect
    watch(
      () => props.init,
      function initWatcher (value) {
        if (!value) return
        resizeCanvas()
      }
    )

    watch(
      () => props.clear,
      function clearWatcher (value) {
        if (!value) return
        writeAnswer.value = false

        ctx.value.clearRect(
          0,
          0,
          whiteBoardElement.value.width,
          whiteBoardElement.value.height
        )
        context.emit('clearFinish')
      }
    )

    watch(
      writeAnswer,
      function hasWrittenAnswer (value, previous) {
        if (value && !previous) {
          window.gtag('event', 'write_answer', {
            'event_category': 'drawing_board',
            'event_label': context.root.$route.name == 'table'
              ? 'table'
              : 'exam_mode',
          })
        }
      }
    )

    onMounted(function whiteBoardOnMounted () {
      resizeCanvas()
    })

    return {
      // element
      whiteBoardElement,
      // data
      // methods
      startDrawing,
      drawLine,
      stopDrawing,
    }

    function startDrawing ({ type, clientX, clientY, target, touches }) {
      if (props.lock) return

      if (!writeAnswer.value) writeAnswer.value = true

      canDraw.value = true
      const resultClientX = type == 'touchstart' ? touches[0].clientX : clientX
      const resultClientY = type == 'touchstart' ? touches[0].clientY : clientY
      const [x, y] = getMousePosition(resultClientX, resultClientY)
      lastX.value = x
      lastY.value = y

      ctx.value.beginPath()
      ctx.value.moveTo(x, y)
      ctx.value.lineTo(x, y)
      ctx.value.stroke()
    }

    function drawLine ({ type, clientX, clientY, touches }) {
      if (!canDraw.value) return
      const resultClientX = type == 'touchmove' ? touches[0].clientX : clientX
      const resultClientY = type == 'touchmove' ? touches[0].clientY : clientY
      const [x, y] = getMousePosition(resultClientX, resultClientY)

      ctx.value.beginPath()
      ctx.value.moveTo(lastX.value, lastY.value)
      ctx.value.lineTo(x, y)
      ctx.value.stroke()

      lastX.value = x
      lastY.value = y
    }

    function stopDrawing () {
      canDraw.value = false
    }

    // function
    function getMousePosition (clientX, clientY) {
      const { left, top } = whiteBoardElement.value.getBoundingClientRect()
      const x = clientX - left
      const y = clientY - top
      return [x, y]
    }

    function resizeCanvas () {
      // this api will round floating points, it will cause canvas keep growing
      whiteBoardElement.value.width =
        whiteBoardElement.value.parentElement.clientWidth - 1
      whiteBoardElement.value.height =
        whiteBoardElement.value.parentElement.clientHeight - 1
      ctx.value = whiteBoardElement.value.getContext('2d')
      ctx.value.lineWidth = 5
      ctx.value.strokeStyle = '#707070'
      ctx.value.lineJoin = 'round'
      ctx.value.lineCap = 'round'
      context.emit('initFinish')
    }
  },
}
</script>

<style scoped>
.white-board {
  margin: 0;
  padding: 0;
  border: solid var(--focus-border-width) transparent;
}
</style>
