<template>
  <section
    class="exam-mode-block-card"
    @mousemove="cardMoving"
    @touchmove.prevent="cardMoving"
    @mouseup="cardMoveEnd"
    @touchend="cardMoveEnd"
    @mouseleave="cardMoveEnd"
    @touchleave="cardMoveEnd"
  >
    <h2 class="app-visual-hidden">
      測驗
    </h2>

    <div
      class="exam-mode-block-card__card-item
        exam-mode-block-card__card-item--first"
      :class="{
        'exam-mode-block-card__card-item--first-show-answer': showAnswer,
      }"
      ref="cardElement"
      @mousedown="cardMoveStart"
      @touchstart="cardMoveStart"
      @mouseup="cardMoveEnd"
      @touchend="cardMoveEnd"
    >
      <div class="exam-mode-block-card-item__question-block">
        <button
          class="exam-mode-block-card-item-question-block__question"
          @click="service.send('SHOW_ANSWER')"
          ref="cardQuestionElement"
          :aria-hidden="
            ['romanizationToHiragana', 'romanizationToKatakana'].includes(
              examMode
            )
              ? false
              : 'true'
          "
        >
          {{ question }}
        </button>

        <div class="exam-mode-block-card-item-question-block__arrow">
          <img src="@/assets/transform-arrow.svg" alt="轉" />
        </div>

        <span
          id="exam-mode-block-card-item-question-block__answer"
          class="exam-mode-block-card-item-question-block__answer"
          ref="cardAnswerElement"
        >
          {{ answer }}
        </span>
      </div>

      <button
        v-show="!showAnswer"
        @click="service.send('CLEAR_CANVAS')"
        class="exam-mode-block-card-item__clear-button"
      >
        重寫
      </button>

      <div class="exam-mode-block-card-item__white-board">
        <white-board
          :clear="current.matches('idle.whiteBoard.clear')"
          :lock="current.matches('idle.exam.examing.normalExam.answerShowed')"
          @clearFinish="service.send('CANVAS_CLEAR_FINISHED')"
        ></white-board>
      </div>
    </div>

    <div
      class="exam-mode-block-card__card-item
        exam-mode-block-card__card-item--second
        exam-mode-block-card__card-item--background"
      ref="cardSecondElement"
    >
      <div class="exam-mode-block-card-item__question-block">
        <span
          class="exam-mode-block-card-item-question-block__question
      exam-mode-block-card-item-question-block__question--second"
          ref="cardSecondQuestionElement"
        >
          {{ question }}
        </span>
      </div>

      <button
        class="exam-mode-block-card-item__clear-button
          exam-mode-block-card-item__clear-button--second"
        ref="cardSecondClearButtonElement"
      >
        重寫
      </button>
    </div>

    <div
      class="exam-mode-block-card__card-item
        exam-mode-block-card__card-item--third
        exam-mode-block-card__card-item--background"
      ref="cardThirdElement"
    ></div>
    <div
      class="exam-mode-block-card__card-item
        exam-mode-block-card__card-item--new
        exam-mode-block-card__card-item--background"
      ref="cardNewElement"
    ></div>
  </section>
</template>

<script>
import { ref, computed, watch, onMounted } from '@vue/composition-api'
import { gsap } from 'gsap'
import { useDragToMove } from '@/utils/useDragToMove.js'
import whiteBoard from '@/components/whiteBoard.vue'

export default {
  components: { whiteBoard },
  props: {
    cards: {
      type: Array,
      required: true,
    },
    service: {
      type: Object,
      required: true,
    },
    current: {
      type: Object,
      required: true,
    },
    showAnswer: {
      type: Boolean,
      required: true,
    },
    cardBackToPosition: {
      type: Boolean,
      required: true,
    },
    swipeRight: {
      type: Boolean,
      required: true,
    },
    swipeLeft: {
      type: Boolean,
      required: true,
    },
    newExam: {
      type: Boolean,
      required: true,
    },
  },
  setup (props, context) {
    // composition
    const {
      xMovement,
      canDrag,
      dragStart,
      getDraggingMovement,
      dragEnd,
    } = useDragToMove()

    // element
    const cardElement = ref(null)
    const cardQuestionElement = ref(null)
    const cardAnswerElement = ref(null)
    const cardSecondElement = ref(null)
    const cardSecondQuestionElement = ref(null)
    const cardSecondClearButtonElement = ref(null)
    const cardThirdElement = ref(null)
    const cardNewElement = ref(null)

    const animationElements = computed(function getAnimationElements () {
      return [
        cardElement.value,
        cardSecondElement.value,
        cardThirdElement.value,
        cardNewElement.value,
        cardAnswerElement.value,
        cardQuestionElement.value,
        cardSecondQuestionElement.value,
        cardSecondClearButtonElement.value,
      ]
    })

    // data
    const clearWhiteBoard = ref(false)

    const swipeCheckPoint = ref(null)
    const accelerator = ref(1)

    const examMode = computed(function getExamMode () {
      return context.root.$route.name
    })

    const question = computed(function getQuestion () {
      switch (examMode.value) {
        case 'hiraganaToRomanization':
        case 'hiraganaToKatakana':
          return (props.cards[0] || [])[0]
        case 'katakanaToRomanization':
        case 'katakanaToHiragana':
          return (props.cards[0] || [])[1]
        case 'romanizationToHiragana':
        case 'romanizationToKatakana':
          return (props.cards[0] || [])[2]
        default:
      }
    })

    const nextQuestion = computed(function getQuestion () {
      switch (examMode.value) {
        case 'hiraganaToRomanization':
        case 'hiraganaToKatakana':
          return (props.cards[1] || [])[0]
        case 'katakanaToRomanization':
        case 'katakanaToHiragana':
          return (props.cards[1] || [])[1]
        case 'romanizationToHiragana':
        case 'romanizationToKatakana':
          return (props.cards[1] || [])[2]
        default:
      }
    })

    const answer = computed(function getAnswer () {
      switch (examMode.value) {
        case 'romanizationToHiragana':
        case 'katakanaToHiragana':
          return (props.cards[0] || [])[0]
        case 'hiraganaToKatakana':
        case 'romanizationToKatakana':
          return (props.cards[0] || [])[1]
        case 'hiraganaToRomanization':
        case 'katakanaToRomanization':
          return (props.cards[0] || [])[2]
        default:
      }
    })

    watch(
      () => props.newExam,
      function prepareNewExamWatcher (value, previousValue) {
        if (value && !previousValue) clearAnimationProps()
      },
      { lazy: true }
    )

    watch(
      () => props.swipeRight,
      function cardSwipeRightAnimationWatcher (value) {
        if (!value) return
        dragEnd()
        animationTimelineSwipe('right')
          .restart()
          .then(clearAnimationPropsAndSendEvent)
      },
      { layz: true }
    )

    watch(
      () => props.swipeLeft,
      function cardSwipeLeftAnimationWatcher (value) {
        if (!value) return
        dragEnd()
        animationTimelineSwipe('left')
          .restart()
          .then(clearAnimationPropsAndSendEvent)
      },
      { layz: true }
    )

    function animationTimelineSwipe (direction) {
      const duration = 0.5

      return gsap
        .timeline({ paused: true })
        .set(cardQuestionElement.value, { opacity: 0 })
        .set(cardAnswerElement.value, { opacity: 0 })
        .to(cardElement.value, {
          x: `${direction == 'left' ? '-' : '+'}=${
            document.getElementById('app').offsetWidth
          }`,
          duration: duration,
        })
        .to(
          cardSecondElement.value,
          {
            x: '-=10px',
            y: '-=10px',
            backgroundColor: '#ffffff',
          },
          `-=${duration}`
        )
        .to(
          cardThirdElement.value,
          {
            x: '-=10px',
            y: '-=10px',
            duration,
          },
          `-=${duration}`
        )
        .to(
          cardNewElement.value,
          {
            opacity: props.cards[2] ? 1 : 0,
            x: '-=10px',
            y: '-=10px',
            duration,
          },
          `-=${duration}`
        )
        .to(
          cardSecondQuestionElement.value,
          {
            opacity: 1,
            duration,
          },
          `-=${duration}`
        )
        .to(
          cardSecondClearButtonElement.value,
          {
            opacity: 1,
            duration,
          },
          `-=${duration}`
        )
        .to(
          cardElement.value,
          {
            opacity: direction == 'left' ? 1 : 0,
            duration,
          },
          `-=${duration}`
        )
    }

    function clearAnimationPropsAndSendEvent (tl) {
      props.service.send('CARD_SWIPE_ANIMATION_END')
      clearAnimationProps()
      xMovement.value = 0
      accelerator.value = 1
    }

    watch(
      () => props.cardBackToPosition,
      function cardBackToPositionAnimationWatcher (value) {
        if (!value) return
        dragEnd()
        gsap
          .to(cardElement.value, {
            x: 0,
            opacity: 1,
            duration: 0.3,
          })
          .then(function swipeAnimationEnd () {
            gsap.set(cardElement.value, { clearProps: 'all' })
            xMovement.value = 0
            accelerator.value = 1
            props.service.send('CARD_BACK_TO_POSITION_ANIMATION_END')
          })
      },
      { layz: true }
    )

    onMounted(function examModeBlockCard () {
      swipeCheckPoint.value = document.getElementById('app').offsetWidth / 4
      clearAnimationProps()
    })

    function clearAnimationProps () {
      animationElements.value.forEach(function clearAllAnimationProps (element) {
        gsap.set(element, { clearProps: 'all' })
      })

      if (!props.cards[0]) gsap.set(cardElement.value, { opacity: 0 })
      if (!props.cards[1]) gsap.set(cardSecondElement.value, { opacity: 0 })
      if (!props.cards[2]) gsap.set(cardThirdElement.value, { opacity: 0 })
    }

    return {
      // element
      cardElement,
      cardQuestionElement,
      cardAnswerElement,
      cardSecondElement,
      cardSecondQuestionElement,
      cardThirdElement,
      cardNewElement,
      cardSecondClearButtonElement,
      // data
      animationElements,
      clearWhiteBoard,
      examMode,
      question,
      answer,
      nextQuestion,
      xMovement,
      // methods
      cardMoveStart,
      cardMoving,
      cardMoveEnd,
    }

    function cardMoveStart (e) {
      // props.service.send('SHOW_ANSWER')
      dragStart(e)
    }

    function cardMoving (e) {
      if (!canDrag.value) return

      if (props.current.matches('idle.exam.examing.normalExam.answerShowed')) {
        const movement = getDraggingMovement(e)
        xMovement.value += movement

        window.requestAnimationFrame(function transformCardElement () {
          cardElement.value.style.transform = `translate(${xMovement.value}px, 0)`
          cardElement.value.style.opacity =
            1 - (xMovement.value / swipeCheckPoint.value) * 0.3
        })
      }
    }

    function cardMoveEnd () {
      if (Math.abs(xMovement.value) > swipeCheckPoint.value) {
        props.service.send('NEXT_CARD', {
          addToEnhancement: !(xMovement.value > 0),
        })
      } else if (canDrag.value && xMovement.value) {
        props.service.send('CARD_BACK_TO_POSITION')
      }

      dragEnd()
    }
  },
}
</script>

<style>
:root {
  --card-transform: 10px;
  --card-second-transform: 20px;
  --card-third-transform: 30px;
  --card-width: 260px;
  --card-height: 332px;
}
</style>

<style scoped>
.exam-mode-block-card {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateX(-10px); /* center cards because cards transition */
  padding: 10px;
}

.exam-mode-block-card__card-item {
  width: var(--card-width);
  height: var(--card-height);
  border-radius: 6px;
  border: solid 2px var(--card-border-color);
  font-size: 4rem;
  transform-origin: center;
  will-change: opacity, transform;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.exam-mode-block-card__card-item--background {
  background-color: var(--main-color);
  position: absolute;
}

.exam-mode-block-card__card-item--first {
  position: relative;
  user-select: none;
  z-index: 10;
  background-color: #fff;
  will-change: opacity, transform;
  transition: box-shadow 0;
}

.exam-mode-block-card__card-item--first-show-answer {
  box-shadow: 3px 3px 5px 5px rgba(0, 0, 0, 0.3);
  transition: box-shadow 0.3s;
}

.exam-mode-block-card__card-item--second {
  z-index: 9;
  transform: translate(var(--card-transform), var(--card-transform));
  will-change: opacity, transform;
}

.exam-mode-block-card__card-item--third {
  z-index: 8;
  transform: translate(
    var(--card-second-transform),
    var(--card-second-transform)
  );
  will-change: opacity, transform;
}

.exam-mode-block-card__card-item--new {
  z-index: 7;
  opacity: 0;
  transform: translate(
    var(--card-third-transform),
    var(--card-third-transform)
  );
  will-change: opacity, transform;
}

.exam-mode-block-card-item__question-block {
  position: relative;
  width: 80%;
  display: grid;
  grid-template-columns: calc(100% / 3) calc(100% / 3) 0 calc(100% / 3);
  grid-template-rows: auto;
  align-items: center;
  justify-items: center;
  z-index: 10;
  pointer-events: none;
  margin-top: 27px;
  transition: grid-template-columns 0;
  will-change: grid-template-columns;
}

.exam-mode-block-card__card-item--first-show-answer
  .exam-mode-block-card-item__question-block {
  grid-template-columns: 0 calc(100% / 3) calc(100% / 3) calc(100% / 3);
  transition: grid-template-columns 0.15s;
}

.exam-mode-block-card-item__white-board {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9;
}

.exam-mode-block-card-item__clear-button {
  position: absolute;
  right: 16px;
  bottom: 13px;
  background-color: transparent;
  border: none;
  padding: 5px;
  z-index: 10;
  font-size: 1rem;
  font-weight: bold;
}

.exam-mode-block-card-item-question-block__question {
  grid-column: 2 / 3;
  align-self: end;
  background-color: transparent;
  border: none;
  padding: 0;
  pointer-events: auto;
  justify-self: stretch;
  display: flex;
  justify-content: center;
  align-items: center;
}

.exam-mode-block-card-item-question-block__question--second {
  opacity: 0;
}

.exam-mode-block-card-item__clear-button--second {
  opacity: 0;
}

.exam-mode-block-card-item-question-block__arrow {
  grid-column: 3 / 4;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0;
}

.exam-mode-block-card-item-question-block__arrow img {
  width: 27px;
  height: auto;
  object-fit: contain;
}

.exam-mode-block-card__card-item--first-show-answer
  .exam-mode-block-card-item-question-block__arrow {
  opacity: 1;
  transition: opacity 0.15s 0.15s;
}

.exam-mode-block-card-item-question-block__answer {
  grid-column: 4 / 5;
  opacity: 0;
  align-self: start;
  transition: opacity 0;
}

.exam-mode-block-card__card-item--first-show-answer
  .exam-mode-block-card-item-question-block__answer {
  opacity: 1;
  transition: opacity 0.15s 0.15s;
}
</style>
