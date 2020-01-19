<template>
  <section
    class="drawing-board"
    ref="drawingBoardElement"
    aria-labelledby="drawing-board-title"
  >
    <div
      class="drawing-board__content-block"
      :style="{ backgroundColor: `rgba(255, 255, 255, ${opacity})` }"
      id="modal"
    >
      <button
        class="drawing-board-content-block__title-button fake-drawing-board-button"
        ref="drawingBoardTitleElement"
        :aria-expanded="open ? 'true': 'false'"
        @click="$emit('buttonClick')"
      >
        <h1
          id="drawing-board-title"
          class="drawing-board-title-button__title"
        >
          手寫板
        </h1>
      </button>

      <div
        class="drawing-board-content-block__tool-block"
        ref="activeShowElement"
      >
        <div
          class="drawing-board-second-column__canvas-container"
          ref="canvasContainerElement"
        >
          <whiteBoard
            tabindex="-1"
            id="canvas"
            :init="init"
            :clear="clear"
            @clearFinish="clearFinish"
            @initFinish="initFinish"
          ></whiteBoard>
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
          v-if="!current.matches('displayPanel.hiragana.show')"
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
          v-if="!current.matches('displayPanel.katakana.show')"
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
          @click="hideDrawingBoard"
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
          class="drawing-board-first-column__tool-button
            drawing-board-first-column__tool-button--previous-button"
          @click="service.send('ACTIVE_CURSOR_TO_PREVIOUS')"
          aria-labelledby="drawing-board-nav-previous"
          :aria-controls="current.context.activeGroupName"
        >
          <img
            src="@/assets/left-arrow.svg"
            alt="往上一個儲存格"
          >
        </button>

        <button
          class="drawing-board-first-column__tool-button
            drawing-board-first-column__tool-button--next-button"
          @click="service.send('ACTIVE_CURSOR_TO_NEXT')"
          aria-labelledby="drawing-board-nav-next"
          :aria-controls="current.context.activeGroupName"
        >
          <img
            src="@/assets/right-arrow.svg"
            alt="往下一個儲存格"
          >
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, watch, onMounted, onUpdated } from '@vue/composition-api'
import { gsap } from 'gsap'
import { useModalNavigation } from '@/utils/useModalNavigation.js'
import whiteBoard from '@/components/whiteBoard.vue'

export default {
  components: { whiteBoard },
  name: 'drawingBoard',
  props: {
    service: {
      type: Object,
      required: true,
    },
    current: {
      type: Object,
      required: true,
    },
    opacity: {
      type: String,
      default: '1',
    },
    open: {
      type: Boolean,
      default: false,
    },
    clearCanvas: {
      type: Boolean,
      required: false,
    },
  },
  setup (props, context) {
    // element
    const drawingBoardElement = ref(null)
    const autoFoucusButtonElement = ref(null)
    const activeShowElement = ref(null)
    const drawingBoardTitleElement = ref(null)
    const canvasContainerElement = ref(null)
    const modalButtonsElement = ref(null)

    // composition
    useModalNavigation(modalButtonsElement, props.current)

    // data
    const init = ref(false)
    const clear = ref(false)

    // effect
    watch(
      () => props.open,
      function startOpenDrawingBoardAnimation (value) {
        if (value) {
          openModalAnimation().then(function animationEnd () {
            init.value = true
            props.service.send('SCROLL_TO_ACTIVE_CURSOR')
            autoFoucusButtonElement.value && autoFoucusButtonElement.value.focus()
          })
        } else {
          closeModalAnimation()
        }

        function openModalAnimation () {
          drawingBoardTitleElement.value.classList.add('app-visual-hidden')

          return gsap.timeline({ paused: true })
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

        function closeModalAnimation () {
          return gsap.timeline({ paused: true })
            .to(drawingBoardElement.value, {
              height: '40px',
              width: '90px',
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
              drawingBoardTitleElement.value.focus()
              props.service.send('FOCUS_CURRENT_ACTIVE_CURSOR')
              props.service.send('CLEAR_ACTIVE_CURSOR')
            })
        }
      },
      { lazy: true }
    )

    watch(
      () => props.clearCanvas,
      function clearWatcher (value) {
        if (!value) return
        clear.value = true
      },
      { lazy: true }
    )

    onMounted(function tableDrawingBoardOnMounted () {
      modalButtonsElement.value = document.querySelectorAll(
        'button:not(.fake-drawing-board-button)'
      )
    })

    onUpdated(function tableDrawingBoardOUpdate () {
      modalButtonsElement.value = document.querySelectorAll(
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
      // data
      init,
      clear,
      // methods
      initFinish,
      clearFinish,
      hideDrawingBoard,
    }
    function initFinish () {
      init.value = false
    }

    function clearFinish () {
      props.service.send('CANVAS_CLEAR_FINISHED')
      clear.value = false
    }

    function hideDrawingBoard () {
      props.service.send('HIDE_DRAWING_BOARD')
    }
  },
}
</script>

<style scoped>
.drawing-board {
  will-change: scroll-position, width, height;
  width: 90px;
  height: 40px;
  pointer-events: auto;
}

.drawing-board__content-block {
  position: relative;
  transition: width 0.3s ease-in-out, height 0.3s ease-in-out;
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
  z-index: 10;
}

.drawing-board-content-block__title-button:focus {
  outline: var(--focus-default-outline);
}

body.using-mouse .drawing-board-content-block__title-button:focus {
  outline: none;
}

.drawing-board-title-button__title {
  margin: 0;
  font-size: 1rem;
  text-align: center;
}

.drawing-board-content-block__tool-block {
  opacity: 0;
  position: absolute;
  display: none;
  width: 100%;
  height: 100%;
  will-change: opacity;
  display: none;
  flex-direction: column;
  grid-template-columns: auto auto auto 1fr auto;
  grid-template-rows: auto 1fr auto 1fr;
  grid-column-gap: 5px;
  column-gap: 5px;
}

.drawing-board-first-column__tool-button {
  background-color: transparent;
  border: solid var(--focus-border-width) transparent;
  font-weight: bold;
  text-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  font-size: 1rem;
  user-select: none;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.drawing-board-first-column__tool-button:focus {
  outline: var(--focus-default-outline);
  outline-offset: 0;
}

body.using-mouse .drawing-board-first-column__tool-button:focus {
  outline: none;
}
.drawing-board-first-column__tool-button--clear-button {
  grid-column: 1;
  grid-row: 1;
}

.drawing-board-first-column__tool-button--peak-hiragana-button {
  grid-column: 2;
  grid-row: 1;
}

.drawing-board-first-column__tool-button--peak-katakana-button {
  grid-column: 3;
  grid-row: 1;
}

.drawing-board-first-column__tool-button--close-button {
  grid-column: 5;
  grid-row: 1;
}

.drawing-board-first-column__tool-button--previous-button {
  grid-row: 3;
  grid-column: 1;
  justify-self: start;
}

.drawing-board-first-column__tool-button--next-button {
  grid-row: 3;
  grid-column: 5;
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
</style>
