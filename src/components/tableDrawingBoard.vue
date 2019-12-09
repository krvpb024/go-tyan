<template>
  <div
    role="dialog"
    aria-labelledby="table-drawing-board-title"
    aria-modal="true"
    class="container"
    ref="containerElement"
  >
    <div
      ref="modalElement"
      class="modal"
      id="modal"
    >
      <button
        class="title-button"
        ref="drawingBoardTitleElement"
        @click="service.send('SHOW_TOOLTIPS')"
      >
        <table-tooltips
          class="table-tooltips"
          :service="service"
          :current="current"
        >請先點選五十音</table-tooltips>

        <h1 id="table-drawing-board-title">
          手寫板
        </h1>
      </button>

      <div
        class="active-show"
        ref="activeShowElement"
      >

        <div class="first-column">
          <button
            class="tool-button"
            @click="service.send('CLEAR_CANVAS')"
            aria-controls="canvas"
          >
            清除
          </button>

          <button
            class="tool-button"
            :class="{ 'control-hidden': current.matches('displayPanel.hiragana.show') }"
            :aria-controls="`${current.context.activeGroupName}-${current.context.activeRow}-${current.context.activeColumn}`"
            @mousedown="service.send('PEEK_HIRAGANA')"
            @touchstart="service.send('PEEK_HIRAGANA')"
            @keydown.space="service.send('PEEK_HIRAGANA')"
            @mouseup="service.send('COVER_HIRAGANA')"
            @touchend="service.send('COVER_HIRAGANA')"
            @keyup.space="service.send('COVER_HIRAGANA')"
          >
            偷看平假名
          </button>

          <button
            class="tool-button"
            :class="{ 'control-hidden': current.matches('displayPanel.katakana.show') }"
            :aria-controls="
            (current.context.activeGroupName &&
            current.context.activeRow &&
            current.context.activeColumn)
              ? `${current.context.activeGroupName}-${current.context.activeRow}-${current.context.activeColumn}`
              : false
          "
            @mousedown="service.send('PEEK_KATAKANA')"
            @touchstart="service.send('PEEK_KATAKANA')"
            @keydown.space="service.send('PEEK_KATAKANA')"
            @mouseup="service.send('COVER_KATAKANA')"
            @touchend="service.send('COVER_KATAKANA')"
            @keyup.space="service.send('COVER_KATAKANA')"
          >
            偷看片假名
          </button>

          <button
            class="tool-button close-button"
            @click="service.send('HIDE_DRAWING_BOARD')"
            ref="autoFoucusButton"
            aria-controls="modal"
            aria-labelledby="close-icon-title"
          >
            <svg
              aria-labelledby="close-icon-title"
              xmlns="http://www.w3.org/2000/svg"
              width="14.729"
              height="14.727"
              viewBox="0 0 14.729 14.727"
            >
              <title id="close-icon-title">關閉</title>

              <g
                aria-labelledby="close-icon-title"
                id="Group_101"
                data-name="Group 101"
                transform="translate(-.414 -.415)"
              >
                <path
                  aria-labelledby="close-icon-title"
                  id="Union_10"
                  d="M-11781.959-9448.151l-5.657-5.657-5.656 5.657a1 1 0 0 1-1.415 0 1 1 0 0 1 0-1.415l5.657-5.656-5.657-5.657a1 1 0 0 1 0-1.412 1 1 0 0 1 1.415 0l5.656 5.656 5.657-5.656a1 1 0 0 1 1.415 0 1 1 0 0 1 0 1.412l-5.658 5.658 5.655 5.655a1 1 0 0 1 0 1.415.991.991 0 0 1-.705.293 1 1 0 0 1-.707-.293z"
                  fill="#313131"
                  data-name="Union 10"
                  transform="translate(11795.395 9463)"
                />
              </g>
            </svg>
          </button>
        </div>

        <div class="second-column">
          <button
            class="tool-button"
            @click="service.send('ACTIVE_CURSOR_TO_PREVIOUS')"
            aria-labelledby="drawing-board-nav-previous"
            :aria-controls="current.context.activeGroupName"
          >
            <svg
              aria-labelledby="drawing-board-nav-previous"
              xmlns="http://www.w3.org/2000/svg"
              width="17.049"
              height="19.324"
              viewBox="0 0 17.049 19.324"
            >
              <title id="drawing-board-nav-previous">往上一個儲存格</title>

              <g
                aria-labelledby="drawing-board-nav-previous"
                id="Path_55"
                fill="#ffffff"
                data-name="Path 55"
              >
                <path
                  aria-labelledby="drawing-board-nav-previous"
                  d="M18.811 18.2H3.493c-.436 0-.825-.226-1.041-.604a1.187 1.187 0 0 1 .006-1.203l7.66-13.05a1.189 1.189 0 0 1 1.034-.592c.43 0 .817.222 1.035.593l7.66 13.049c.22.375.222.825.006 1.203a1.187 1.187 0 0 1-1.042.604z"
                  stroke="none"
                  transform="rotate(-90 9.432 11.383)"
                />
                <path
                  aria-labelledby="drawing-board-nav-previous"
                  d="M11.152 3.551a.382.382 0 0 0-.345.198L3.148 16.798a.382.382 0 0 0-.002.4.382.382 0 0 0 .347.202h15.318c.192 0 .295-.11.347-.201a.382.382 0 0 0-.002-.401l-7.659-13.05a.382.382 0 0 0-.345-.197m0-1.6c.67 0 1.339.33 1.725.988l7.66 13.049C21.318 17.32 20.356 19 18.81 19H3.493c-1.546 0-2.507-1.68-1.725-3.012l7.66-13.05a1.982 1.982 0 0 1 1.724-.987z"
                  stroke="none"
                  fill="#2c2c2c"
                  transform="rotate(-90 9.432 11.383)"
                />
              </g>
            </svg>
          </button>

          <div
            class="canvas-container"
            ref="canvasContainerElement"
          >
            <canvas
              tabindex="-1"
              id="canvas"
              ref="canvas"
              :width="width"
              :height="height"
              @mousedown="startDrawing"
              @touchstart.prevent="startDrawing"
              @mouseup="stopDrawing"
              @touchend.prevent="stopDrawing"
              @mousemove="drawLine"
              @touchmove.prevent="drawLine"
            ></canvas>
          </div>

          <button
            class="tool-button"
            @click="service.send('ACTIVE_CURSOR_TO_NEXT')"
            aria-labelledby="drawing-board-nav-next"
            :aria-controls="current.context.activeGroupName"
          >
            <svg
              aria-labelledby="drawing-board-nav-next"
              xmlns="http://www.w3.org/2000/svg"
              width="17.049"
              height="19.324"
              viewBox="0 0 17.049 19.324"
            >
              <title id="drawing-board-nav-next">往下一個儲存格</title>

              <g
                aria-labelledby="drawing-board-nav-next"
                id="Path_57"
                fill="#ffffff"
                data-name="Path 57"
              >
                <path
                  aria-labelledby="drawing-board-nav-next"
                  d="M18.811 18.2H3.493c-.436 0-.825-.226-1.041-.604a1.187 1.187 0 0 1 .006-1.203l7.66-13.05a1.189 1.189 0 0 1 1.034-.592c.43 0 .817.222 1.035.593l7.66 13.049c.22.375.222.825.006 1.203a1.187 1.187 0 0 1-1.042.604z"
                  stroke="none"
                  transform="rotate(90 10.245 8.755)"
                />
                <path
                  aria-labelledby="drawing-board-nav-next"
                  d="M11.152 3.551a.382.382 0 0 0-.345.198L3.148 16.798a.382.382 0 0 0-.002.4.382.382 0 0 0 .347.202h15.318c.192 0 .295-.11.347-.201a.382.382 0 0 0-.002-.401l-7.659-13.05a.382.382 0 0 0-.345-.197m0-1.6c.67 0 1.339.33 1.725.988l7.66 13.049C21.318 17.32 20.356 19 18.81 19H3.493c-1.546 0-2.507-1.68-1.725-3.012l7.66-13.05a1.982 1.982 0 0 1 1.724-.987z"
                  stroke="none"
                  fill="#2c2c2c"
                  transform="rotate(90 10.245 8.755)"
                />
              </g>
            </svg>

          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch, onMounted, onUpdated } from '@vue/composition-api'
import anime from 'animejs/lib/anime.es.js'
import { useModalNavigation } from '@/utils/useModalNavigation.js'
import tableTooltips from '@/components/tableTooltips.vue'

export default {
  name: 'tableDrawingBoard',
  components: { tableTooltips },
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
      default: 100,
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
    const modalElement = ref(null)
    const activeShowElement = ref(null)
    const drawingBoardTitleElement = ref(null)

    const containerElement = ref(null)
    const canvasContainerElement = ref(null)
    const canvas = ref(null)
    const ctx = ref(null)
    const lastX = ref(0)
    const lastY = ref(0)

    const canDraw = ref(false)
    const keypressed = ref(false)

    const modalButtons = ref(null)

    useModalNavigation(modalButtons, props.current)

    watch(
      () => props.current.matches('drawingBoard.show.clearCanvas') ||
        props.current.matches('drawingBoard.clearCanvasBeforeAnimation'),
      function clearCanvas (value) {
        if (value) {
          ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height)
          props.service.send('CANVAS_CLREAR_FINISHED')
        }
      },
      { lazy: true }
    )

    watch(
      () => props.current.matches('drawingBoard.openDrawingBoardAnimation'),
      function startOpenDrawingBoardAnimation (value) {
        if (value) openModalAnimation()
      },
      { lazy: true }
    )

    watch(
      () => props.current.matches('drawingBoard.closeDrawingBoardAnimation'),
      function startcloseDrawingBoardAnimation (value) {
        if (value) closeModalAnimation()
      },
      { lazy: true }
    )

    onMounted(function tableDrawingBoardOnMounted () {
      modalButtons.value = modalElement.value.querySelectorAll('button:not(.control-hidden)')
    })

    onUpdated(function tableDrawingBoardOUpdate () {
      modalButtons.value = modalElement.value.querySelectorAll('button:not(.control-hidden)')
    })

    return {
      drawingBoardTitleElement,
      containerElement,
      canvasContainerElement,
      activeShowElement,
      autoFoucusButton,
      modalElement,
      canvas,
      ctx,
      lastX,
      lastY,
      keypressed,
      // methods
      startDrawing,
      drawLine,
      stopDrawing,
      clearCanvasThenHide,
    }

    function startDrawing ({ type, clientX, clientY, target, touches }) {
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

    function clearCanvasThenHide () {
      props.service.send('CLEAR_CANVAS')
      props.service.send('HIDE_DRAWING_BOARD')
    }

    function getMousePosition (clientX, clientY) {
      const { left, top } = canvas.value.getBoundingClientRect()
      const x = clientX - left
      const y = clientY - top
      return [x, y]
    }

    function openModalAnimation () {
      anime
        .timeline({
          duration: 300,
          easing: 'easeOutExpo',
        })
        .add({
          targets: containerElement.value,
          height: '40vh',
          width: '100%',
          begin () {
            drawingBoardTitleElement.value.classList.add('visual-hidden')
          },
          complete () {
            canvasInitialSettings()
            autoFoucusButton.value && autoFoucusButton.value.focus()
            props.service.send('OPEN_DRAWING_BOARD_ANIMATION_END')
          },
        })

      anime
        .timeline({
          duration: 300,
          easing: 'linear',
        })
        .add({
          targets: activeShowElement.value,
          opacity: 1,
          begin () {
            activeShowElement.value.style.display = 'flex'
            activeShowElement.value.style.position = 'relative'
          },
        })
    }

    function closeModalAnimation () {
      anime
        .timeline({
          duration: 300,
          easing: 'easeOutExpo',
        })
        .add({
          targets: containerElement.value,
          height: '8vh',
          width: '30%',
          complete () {
            drawingBoardTitleElement.value.classList.remove('visual-hidden')
            props.service.send('CLOSE_DRAWING_BOARD_ANIMATION_END')
          },
        })

      anime
        .timeline({
          duration: 150,
          easing: 'linear',
        })
        .add({
          targets: activeShowElement.value,
          opacity: 0,
          complete () {
            activeShowElement.value.style.display = 'none'
            activeShowElement.value.style.position = 'absolute'
          },
        })
    }

    function canvasInitialSettings () {
      canvas.value.width = canvasContainerElement.value.clientWidth * 0.95
      canvas.value.height = canvasContainerElement.value.clientHeight * 0.95
      ctx.value = canvas.value.getContext('2d')
      ctx.value.lineWidth = 10
      ctx.value.strokeStyle = '#313131'
      ctx.value.lineJoin = 'round'
      ctx.value.lineCap = 'round'
    }
  },
}
</script>

<style scoped>
.container {
  position: sticky;
  padding: 6px 8px;
  box-sizing: border-box;
  bottom: 0;
  width: 30%;
  height: 8vh;
  will-change: auto;
}

.modal {
  position: relative;
  transition: width 0.3s ease-in-out, height 0.3s ease-in-out;
  will-change: auto;
  box-sizing: border-box;
  box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.13);
  border: solid 2px var(--text-color);
  background-color: #fff;
  border-radius: 4px;
  padding: 10px 10px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  will-change: auto;
}

.title-button {
  border: none;
  background-color: transparent;
  padding: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.table-tooltips {
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(0, calc(-100% - 10px));
}

#table-drawing-board-title {
  margin: 0;
  font-size: 1rem;
  text-align: center;
}

.active-show {
  box-sizing: border-box;
  opacity: 0;
  position: absolute;
  display: none;
  width: 100%;
  height: 100%;
  will-change: auto;
  display: none;
  flex-direction: column;
}

.first-column {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.second-column {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
}

.tool-button {
  box-sizing: border-box;
  background-color: transparent;
  border: solid var(--focus-border-width) transparent;
  font-weight: bold;
  text-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  font-size: 1rem;
  user-select: none;
  padding: 5px 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tool-button.close-button {
  margin-left: auto;
}

.canvas-container {
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

#canvas {
  margin: 0;
  padding: 0;
  border: solid var(--focus-border-width) transparent;
}

#canvas:focus, .tool-button:focus {
  border: var(--focus-border);
  border-radius: 4px;
  outline: none;
}

.control-hidden {
  display: none;
}
</style>
