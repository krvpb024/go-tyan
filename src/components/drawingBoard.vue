<template>
  <div
    role="dialog"
    aria-labelledby="drawing-board-title"
    aria-modal="true"
    class="drawing-board"
    ref="drawingBoardElement"
  >
    <div
      ref="contentBlockElement"
      class="drawing-board__content-block"
      :style="{ backgroundColor: `rgba(255, 255, 255, ${opacity})` }"
      id="modal"
    >
      <button
        class="drawing-board-content-block__title-button fake-drawing-board-button"
        ref="drawingBoardTitleElement"
        @click="service.send(
          service.id == 'examMode'
            ? 'OPEN_DRAWING_BOARD'
            : 'SHOW_TOOLTIPS')"
      >

        <h1
          id="drawing-board-title"
          class="drawing-board-title-button__title"
        >
          手寫板
        </h1>
      </button>

      <div class="drawing-board-content-block__tooltips">
        <tooltips
          :service="service"
          :current="current"
          showState="drawingBoard.hide.tooltips"
          showAnimationState="drawingBoard.hide.tooltips.showTooltipsAnimation"
          idleState="drawingBoard.hide.tooltips.showTooltips"
          hideAnimationState="drawingBoard.hide.tooltips.hideTooltipsAnimation"
          :anglePosition="{ left: 0, bottom: 0 }"
          angleTransformX="20px"
          angleTransformY="50%"
        >
          請先點選五十音
        </tooltips>
      </div>

      <div
        class="drawing-board-content-block__tool-block"
        ref="activeShowElement"
      >

        <div
          class="drawing-board-second-column__canvas-container"
          ref="canvasContainerElement"
        >
          <canvas
            tabindex="-1"
            class="drawing-board-canvas-container__canvas-element"
            id="canvas"
            ref="canvasElement"
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
          class="drawing-board-first-column__tool-button
            drawing-board-first-column__tool-button--clear-button"
          @click="service.send('CLEAR_CANVAS')"
          aria-controls="canvas"
        >
          清除
        </button>

        <button
          class="drawing-board-first-column__tool-button
            drawing-board-first-column__tool-button--peak-hiragana-button"
          v-if="service.id == 'tableView' && !current.matches('displayPanel.hiragana.show')"
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
          class="drawing-board-first-column__tool-button
            drawing-board-first-column__tool-button--peak-katakana-button"
          v-if="service.id =='tableView' && !current.matches('displayPanel.katakana.show')"
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
          class="drawing-board-first-column__tool-button
            drawing-board-first-column__tool-button--close-button"
          @click="service.send('HIDE_DRAWING_BOARD')"
          ref="autoFoucusButtonElement"
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

        <button
          v-if="service.id == 'tableView'"
          class="drawing-board-first-column__tool-button
            drawing-board-first-column__tool-button--previous-button"
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

        <button
          v-if="service.id == 'tableView'"
          class="drawing-board-first-column__tool-button
            drawing-board-first-column__tool-button--next-button"
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
</template>

<script>
import { ref, watch, onMounted, onUpdated } from '@vue/composition-api'
import { gsap } from 'gsap'
import { useModalNavigation } from '@/utils/useModalNavigation.js'
import tooltips from '@/components/tooltips.vue'

export default {
  name: 'tableDrawingBoard',
  components: { tooltips },
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
    opacity: {
      type: String,
      default: '1',
    },
  },
  setup (props, context) {
    // element
    const drawingBoardElement = ref(null)
    const autoFoucusButtonElement = ref(null)
    const contentBlockElement = ref(null)
    const activeShowElement = ref(null)
    const drawingBoardTitleElement = ref(null)
    const canvasContainerElement = ref(null)
    const canvasElement = ref(null)
    const modalButtonsElement = ref(null)

    // data
    const ctx = ref(null)
    const lastX = ref(0)
    const lastY = ref(0)

    const canDraw = ref(false)
    const keypressed = ref(false)

    useModalNavigation(modalButtonsElement, props.current)

    const containerElementAnimationTimeline = ref(null)

    // effect
    watch(
      () => props.current.matches('drawingBoard.show.clearCanvas') ||
        props.current.matches('drawingBoard.clearCanvasBeforeAnimation'),
      clearCanvas,
      { lazy: true }
    )
    watch(
      () => props.current.matches('idle.drawingBoard.show.clearCanvas') ||
        props.current.matches('idle.drawingBoard.clearCanvasBeforeAnimation'),
      clearCanvas,
      { lazy: true }
    )
    function clearCanvas (value) {
      if (value) {
        ctx.value.clearRect(0, 0, canvasElement.value.width, canvasElement.value.height)
        props.service.send('CANVAS_CLREAR_FINISHED')
      }
    }

    watch(
      () => props.current.matches('drawingBoard.openDrawingBoardAnimation'),
      startOpenDrawingBoardAnimation,
      { lazy: true }
    )
    watch(
      () => props.current.matches('idle.drawingBoard.openDrawingBoardAnimation'),
      startOpenDrawingBoardAnimation,
      { lazy: true }
    )
    function startOpenDrawingBoardAnimation (value) {
      if (!value) return
      openModalAnimation().then(function animationEnd () {
        canvasInitialSettings()
        autoFoucusButtonElement.value && autoFoucusButtonElement.value.focus()
        props.service.send('OPEN_DRAWING_BOARD_ANIMATION_END')
      })

      function openModalAnimation () {
        drawingBoardTitleElement.value.classList.add('app-visual-hidden')

        containerElementAnimationTimeline.value = gsap.timeline({ paused: true })
        return containerElementAnimationTimeline.value
          .to(drawingBoardElement.value, {
            height: '40vh',
            width: '100%',
            duration: 0.3,
            ease: 'circ.inOut',
          })
          .to(activeShowElement.value, {
            display: 'grid',
            position: 'relative',
          }, '-=0.3')
          .to(activeShowElement.value, {
            opacity: 1,
            duration: 0.1,
          }, '-=0.3')
          .play()
      }

      function canvasInitialSettings () {
        // this api will round floating points, it will cause canvas keep growing
        canvasElement.value.width = canvasContainerElement.value.clientWidth - 10
        canvasElement.value.height = canvasContainerElement.value.clientHeight - 10
        ctx.value = canvasElement.value.getContext('2d')
        ctx.value.lineWidth = 10
        ctx.value.strokeStyle = '#313131'
        ctx.value.lineJoin = 'round'
        ctx.value.lineCap = 'round'
      }
    }

    watch(
      () => props.current.matches('drawingBoard.closeDrawingBoardAnimation'),
      startCloseDrawingBoardAnimation,
      { lazy: true }
    )
    watch(
      () => props.current.matches('idle.drawingBoard.closeDrawingBoardAnimation'),
      startCloseDrawingBoardAnimation,
      { lazy: true }
    )

    function startCloseDrawingBoardAnimation (value) {
      if (!value) return
      closeModalAnimation().then(function animationEnd () {
        props.service.send('CLOSE_DRAWING_BOARD_ANIMATION_END')
      })

      function closeModalAnimation () {
        containerElementAnimationTimeline.value = gsap.timeline({ paused: true })

        return containerElementAnimationTimeline.value
          .to(drawingBoardElement.value, {
            height: '50px',
            width: '100px',
            duration: 0.3,
            ease: 'circ.inOut',
          })
          .to(activeShowElement.value, {
            opacity: 0,
            duration: 0.1,
          }, '-=0.3')
          .to(activeShowElement.value, {
            display: 'none',
            duration: 0,
          }, '-=0.3')
          .play()
          .then(function animationEnd () {
            drawingBoardTitleElement.value.classList.remove('app-visual-hidden')
          })
      }
    }

    onMounted(function tableDrawingBoardOnMounted () {
      modalButtonsElement.value = contentBlockElement.value.querySelectorAll(
        'button:not(.fake-drawing-board-button)'
      )
    })

    onUpdated(function tableDrawingBoardOUpdate () {
      modalButtonsElement.value = contentBlockElement.value.querySelectorAll(
        'button:not(.fake-drawing-board-button)'
      )
    })

    return {
      // element
      drawingBoardTitleElement,
      drawingBoardElement,
      canvasContainerElement,
      activeShowElement,
      autoFoucusButtonElement,
      contentBlockElement,
      canvasElement,
      // data
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
      const { left, top } = canvasElement.value.getBoundingClientRect()
      const x = clientX - left
      const y = clientY - top
      return [x, y]
    }
  },
}
</script>

<style scoped>
.drawing-board {
  position: sticky;
  padding: 6px 8px;
  bottom: 0;
  width: 100px;
  height: 50px;
  will-change: auto;
}

.drawing-board__content-block {
  position: relative;
  transition: width 0.3s ease-in-out, height 0.3s ease-in-out;
  will-change: auto;
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

.drawing-board-content-block__title-button {
  border: none;
  background-color: transparent;
  padding: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.drawing-board-title-button__title {
  margin: 0;
  font-size: 1rem;
  text-align: center;
}

.drawing-board-content-block__tooltips {
  position: absolute;
  top: 0;
  left: 0;
  transform: translateY(-120%);
}

.drawing-board-content-block__tool-block {
  opacity: 0;
  position: absolute;
  display: none;
  width: 100%;
  height: 100%;
  will-change: auto;
  display: none;
  flex-direction: column;
  grid-template-columns: auto auto auto auto 1fr auto;
  grid-template-rows: auto 1fr auto 1fr;
}

.drawing-board-first-column__tool-button {
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
  position: relative;
}

.drawing-board-first-column__tool-button--clear-button {
  grid-column: 1 / 2;
  grid-row: 1;
}

.drawing-board-first-column__tool-button--peak-hiragana-button {
  grid-column: 3;
  grid-row: 1;
}

.drawing-board-first-column__tool-button--peak-katakana-button {
  grid-column: 4;
  grid-row: 1;
}

.drawing-board-first-column__tool-button--close-button {
  grid-column: 6;
  grid-row: 1;
}

.drawing-board-first-column__tool-button--previous-button {
  grid-row: 3;
  grid-column: 1;
  justify-self: start;
}

.drawing-board-first-column__tool-button--next-button {
  grid-row: 3;
  grid-column: 6;
  justify-self: end;
}

.drawing-board-second-column__canvas-container {
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  grid-row: 1 / -1;
  grid-column: 1 / -1;
}

.drawing-board-canvas-container__canvas-element {
  margin: 0;
  padding: 0;
  border: solid var(--focus-border-width) transparent;
}

.drawing-board-canvas-container__canvas-element:focus,
.drawing-board-first-column__tool-button:focus {
  border: var(--focus-border);
  border-radius: 4px;
  outline: none;
}
</style>
