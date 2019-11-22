<template>
  <div ref="modal" class="modal">
    <slot name="title"></slot>

    <button class="block-button" @click="service.send('HIDE_DRAWING_BOARD')" ref="autoFoucusButton">
      關閉
    </button>

    <button class="block-button" @click="service.send('CLEAR_CANVAS')">
      清除
    </button>

    <div>
      <button @click="service.send('ACTIVE_CURSOR_TO_PREVIOUS')" aria-label="往上一個儲存格">
        ←
      </button>
      <button @click="service.send('ACTIVE_CURSOR_TO_NEXT')" aria-label="往下一個儲存格">
        →
      </button>
    </div>

    <button
      class="block-button" :class="{ 'control-hidden': current.matches('displayPanel.hiragana.show') }"
      @mousedown="service.send('PEEK_HIRAGANA')" @touchstart="service.send('PEEK_HIRAGANA')" @keydown.space="service.send('PEEK_HIRAGANA')"
      @mouseup="service.send('COVER_HIRAGANA')" @touchend="service.send('COVER_HIRAGANA')" @keyup.space="service.send('COVER_HIRAGANA')"
    >
      偷看平假名
    </button>

    <button
      class="block-button" :class="{ 'control-hidden': current.matches('displayPanel.katakana.show') }"
      @mousedown="service.send('PEEK_KATAKANA')" @touchstart="service.send('PEEK_KATAKANA')" @keydown.space="service.send('PEEK_KATAKANA')"
      @mouseup="service.send('COVER_KATAKANA')" @touchend="service.send('COVER_KATAKANA')" @keyup.space="service.send('COVER_KATAKANA')"
    >
      偷看片假名
    </button>

    <canvas
      ref="canvas"
      :width="width" :height="height"
      @mousedown="startDrawing" @touchstart="startDrawing"
      @mouseup="stopDrawing" @touchend="stopDrawing"
      @mousemove="drawLine" @touchmove="drawLine"
    ></canvas>
  </div>
</template>

<script>
import { ref, watch, onMounted, onUpdated } from '@vue/composition-api'
import { useModalNavigation } from '@/utils/useModalNavigation.js'

export default {
  name: 'tableDrawingBoard',
  props: {
    service: {
      type: Object,
      required: true,
    },
    current: {
      type: Object,
      required: true,
    },
    width: {
      type: Number,
      default: 200,
    },
    height: {
      type: Number,
      default: 200,
    },
    activeGroupName: {
      type: String,
      default: null,
    },
    activeRow: {
      type: Number,
      default: null,
    },
    activeColumn: {
      type: Number,
      default: null,
    },
  },
  setup (props, context) {
    const autoFoucusButton = ref(null)
    const modal = ref(null)

    const canvas = ref(null)
    const ctx = ref(null)
    const lastX = ref(0)
    const lastY = ref(0)

    const canDraw = ref(false)
    const keypressed = ref(false)

    const modalButtons = ref(null)

    useModalNavigation(modalButtons, props.current)

    watch(
      () => props.current.matches('drawingBoard.show.clearCanvas'),
      function clearCanvas (value) {
        if (value) {
          ctx.value.clearRect(0, 0, props.width, props.height)
          props.service.send('CANVAS_CLREAR_FINISHED')
        }
      }
    )

    watch(
      () => props.current.matches('drawingBoard.show'),
      function focusModalFirstButton (value) {
        if (value) {
          autoFoucusButton.value && autoFoucusButton.value.focus()
        }
      }
    )

    onMounted(function tableDrawingBoardOnMounted () {
      modalButtons.value = modal.value.querySelectorAll('button:not(.control-hidden)')
      ctx.value = canvas.value.getContext('2d')
      ctx.value.lineWidth = 15
      ctx.value.lineJoin = 'round'
      ctx.value.lineCap = 'round'
    })

    onUpdated(function tableDrawingBoardOUpdate () {
      modalButtons.value = modal.value.querySelectorAll('button:not(.control-hidden)')
    })

    return {
      autoFoucusButton,
      modal,
      canvas,
      ctx,
      lastX,
      lastY,
      keypressed,
      // methods
      startDrawing,
      drawLine,
      stopDrawing,
    }

    function startDrawing ({ clientX, clientY, target }) {
      canDraw.value = true
      const [x, y] = getMousePosition(clientX, clientY)
      lastX.value = x
      lastY.value = y
    }

    function drawLine ({ clientX, clientY }) {
      if (!canDraw.value) return
      const [x, y] = getMousePosition(clientX, clientY)

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

    function getMousePosition (clientX, clientY) {
      const { left, top } = canvas.value.getBoundingClientRect()
      const x = clientX - left
      const y = clientY - top
      return [x, y]
    }
  },
}
</script>

<style scoped>
.modal {
  background-color: #f99;
  position: sticky;
  bottom: 0;
}

button:focus {
  border: 2px black solid;
}

.block-button {
  display: block;
}

.control-hidden {
  display: none;
}

canvas {
  border: #fff 1px solid;
}
</style>
