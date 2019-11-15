<template>
  <div class="root">
    <h1>手寫板</h1>

    <button class="block-button" @click="clearCavnas">
      清除
    </button>

    <button class="block-button" @click="closeDrawingBoard">
      關閉
    </button>

    <div>
      <button @click="cursorToPrevious">
        ←
      </button>
      <button @click="cursorToNext">
        →
      </button>
    </div>

    <button
      v-show="!hiraganaDisplay" id="hiragana" class="block-button"
      @mousedown="peek(true, $event)" @touchstart="peek(true, $event)" @keypress="peek(true, $event)"
      @mouseup="peek(false, $event)" @touchend="peek(false, $event)" @keyup="peek(false, $event)"
    >
      偷看平假名
    </button>

    <button
      v-show="!katakanaDisplay" id="katakana" class="block-button"
      @mousedown="peek(true, $event)" @touchstart="peek(true, $event)" @keypress="peek(true, $event)"
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
import { ref, onMounted } from '@vue/composition-api'

export default {
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
  },
  setup (props, context) {
    const canvas = ref(null)
    const ctx = ref(null)
    const lastX = ref(0)
    const lastY = ref(0)
    const canDraw = ref(false)
    const keypressed = ref(false)

    onMounted(function tableDrawingBoardOnMounted (params) {
      ctx.value = canvas.value.getContext('2d')
      ctx.value.lineWidth = 15
      ctx.value.lineJoin = 'round'
      ctx.value.lineCap = 'round'
    })

    return {
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
      (['keypress', 'keyup'].includes(DOMEventType) && code == 'Space')
      ) {
        if (DOMEventType == 'keypress' && keypressed.value == true) return

        switch (DOMEventType) {
          case 'keypress':
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
.root {
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

canvas {
  border: #fff 1px solid;
}
</style>
