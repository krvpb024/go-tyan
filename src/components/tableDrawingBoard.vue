<template>
  <div ref="modal" class="modal">
    <slot name="title"></slot>

    <button class="block-button" @click="closeDrawingBoard" ref="autoFocusButton">
      關閉
    </button>

    <button class="block-button" @click="clearCavnas">
      清除
    </button>

    <div>
      <button @click="cursorToPrevious" aria-label="往上一個儲存格">
        ←
      </button>
      <button @click="cursorToNext" aria-label="往下一個儲存格">
        →
      </button>
    </div>

    <button
      id="hiragana" class="block-button" :class="{ 'control-hidden': hiraganaDisplay }"
      @mousedown="peek(true, $event)" @touchstart="peek(true, $event)" @keydown="peek(true, $event)"
      @mouseup="peek(false, $event)" @touchend="peek(false, $event)" @keyup="peek(false, $event)"
    >
      偷看平假名
    </button>

    <button
      id="katakana" class="block-button" :class="{ 'control-hidden': katakanaDisplay }"
      @mousedown="peek(true, $event)" @touchstart="peek(true, $event)" @keydown="peek(true, $event)"
      @mouseup="peek(false, $event)" @touchend="peek(false, $event)" @keyup="peek(false, $event)"
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
import { ref, onMounted, onUpdated } from '@vue/composition-api'
import { useModalNavigation } from '@/utils/useModalNavigation.js'

export default {
  name: 'tableDrawingBoard',
  props: {
    hiraganaDisplay: {
      type: Boolean,
      default: true,
    },
    katakanaDisplay: {
      type: Boolean,
      default: true,
    },
    width: {
      type: Number,
      default: 200,
    },
    height: {
      type: Number,
      default: 200,
    },
    groupName: {
      type: String,
      default: null,
    },
    row: {
      type: Number,
      default: null,
    },
    column: {
      type: Number,
      default: null,
    },
  },
  setup (props, context) {
    const autoFocusButton = ref(null)
    const modal = ref(null)
    const clearNavigation = ref(null)

    const canvas = ref(null)
    const ctx = ref(null)
    const lastX = ref(0)
    const lastY = ref(0)

    const canDraw = ref(false)
    const keypressed = ref(false)

    onMounted(function tableDrawingBoardOnMounted () {
      const modalButtons = modal.value.querySelectorAll('button:not(.control-hidden)')
      const { removeListener } = useModalNavigation(modalButtons)
      clearNavigation.value = removeListener

      ctx.value = canvas.value.getContext('2d')
      ctx.value.lineWidth = 15
      ctx.value.lineJoin = 'round'
      ctx.value.lineCap = 'round'
    })

    onUpdated(function tableDrawingBoardOnUpdated () {
      clearNavigation.value()

      const modalButtons = modal.value.querySelectorAll('button:not(.control-hidden)')
      useModalNavigation(modalButtons)
    })

    return {
      autoFocusButton,
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
      clearCavnas,
      peek,
      closeDrawingBoard,
      cursorToPrevious,
      cursorToNext,
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

    function clearCavnas () {
      ctx.value.clearRect(0, 0, props.width, props.height)
    }

    function getMousePosition (clientX, clientY) {
      const { left, top } = canvas.value.getBoundingClientRect()
      const x = clientX - left
      const y = clientY - top
      return [x, y]
    }

    function peek (isPeek, { type: DOMEventType, code, currentTarget }) {
      if (
        ['mousedown', 'touchstart', 'mouseup', 'touchend'].includes(DOMEventType) ||
      (['keydown', 'keyup'].includes(DOMEventType) && code == 'Space')
      ) {
        if (DOMEventType == 'keydown' && keypressed.value == true) return

        switch (DOMEventType) {
          case 'keydown':
            keypressed.value = true
            break
          case 'keyup':
            keypressed.value = false
            break
          default:
        }

        context.emit(
          'peek',
          `${(isPeek ? 'peek' : 'cover').toUpperCase()}_${currentTarget.id.toUpperCase()}`
        )
      }
    }

    function closeDrawingBoard (host, event) {
      clearCavnas()
      context.emit('closeboard')
    }

    function cursorToPrevious (host) {
      clearCavnas()
      context.emit('cursortoprevious')
    }

    function cursorToNext (host) {
      clearCavnas()
      context.emit('cursortonext')
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
