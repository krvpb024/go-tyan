<template>
  <div
    class="exam-mode-block-card"
    @mousemove="cardMoving"
    @touchmove.prevent="cardMoving"
    @mouseup="cardMoveEnd"
    @touchend="cardMoveEnd"
    @mouseleave="cardMoveEnd"
    @touchleave="cardMoveEnd"
  >
    <h2 class="app-visual-hidden">
      {{ examType == 'normalExam'
          ? '測驗'
          : '補強測驗' }}
    </h2>

    <div
      class="exam-mode-block-card__card
        exam-mode-block-card__card--first"
      ref="cardElement"
      @mousedown="cardMoveStart"
      @touchstart="cardMoveStart"
      @mouseup="cardMoveEnd"
      @touchend="cardMoveEnd"
    >
      <span
        class="exam-mode-block-card__question"
        ref="cardQuestionElement"
        :aria-hidden="
          ['romanizationToHiragana', 'romanizationToKatakana'].includes(examMode)
            ? false
            : 'true'
        "
        lang="ja-JP"
      >
        {{ question }}
      </span>
      <span
        id="exam-mode-block-card__answer"
        class="exam-mode-block-card__answer"
        ref="cardAnswerElement"
        lang="ja-JP"
      >
        {{ answer }}
      </span>
    </div>

    <div
      class="exam-mode-block-card__card
        exam-mode-block-card__card--second
        exam-mode-block-card__card--background"
      ref="cardSecondElement"
    >
      <span
        class="exam-mode-block-card__question
          exam-mode-block-card__question--second"
        ref="cardSecondQuestionElement"
      >
        {{ question }}
      </span>
    </div>
    <div
      class="exam-mode-block-card__card
        exam-mode-block-card__card--third
        exam-mode-block-card__card--background"
      ref="cardThirdElement"
    ></div>
    <div
      class="exam-mode-block-card__card
        exam-mode-block-card__card--new
        exam-mode-block-card__card--background"
      ref="cardNewElement"
    ></div>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted } from '@vue/composition-api'
import { gsap } from 'gsap'
import { useDragToMove } from '@/utils/useDragToMove.js'

export default {
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
    examType: {
      type: String,
      required: true,
    },
    isCurrentExamMode: {
      type: Boolean,
      required: true,
    },
  },
  setup (props, context) {
    // composition
    const { xMovement, canDrag, dragStart, getDraggingMovement, dragEnd } = useDragToMove()
    // element
    const cardElement = ref(null)
    const cardQuestionElement = ref(null)
    const cardAnswerElement = ref(null)
    const cardSecondElement = ref(null)
    const cardSecondQuestionElement = ref(null)
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
      ]
    })
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
      () => props.current.matches('idle.exam.examing.normalExam.answerShowed.idle') ||
        props.current.matches('idle.exam.examing.enhancementExam.answerShowed.idle'),
      function answerShowedAnimationWatcher (value) {
        if (!value) return
        gsap
          .to(cardAnswerElement.value, {
            opacity: 1,
            duration: 0.3,
          })
      },
      { layz: true }
    )

    watch(
      () => props.current.matches('idle.exam.examing.normalExam.answerShowed.cardSwipeRightAnimation') ||
        props.current.matches('idle.exam.examing.enhancementExam.answerShowed.cardSwipeRightAnimation'),
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
      () => props.current.matches('idle.exam.examing.normalExam.answerShowed.cardSwipeLeftAnimation') ||
        props.current.matches('idle.exam.examing.enhancementExam.answerShowed.cardSwipeLeftAnimation'),
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
      const tl = gsap.timeline({ paused: true })
      const duration = 0.5
      return tl
        .to(cardQuestionElement.value, {
          opacity: 0,
          duration: 0,
        })
        .to(cardAnswerElement.value, {
          opacity: 0,
          duration: 0,
        })
        .to(cardElement.value, {
          x: `${direction == 'left' ? '-' : '+'}=${document.getElementById('app').offsetWidth}`,
          duration: duration,
        })
        .to(cardSecondElement.value, {
          x: '-=10px',
          y: '-=10px',
          backgroundColor: '#ffffff',
        }, `-=${duration}`)
        .to(cardThirdElement.value, {
          x: '-=10px',
          y: '-=10px',
          duration,
        }, `-=${duration}`)
        .to(cardNewElement.value, {
          opacity: props.cards[2] ? 1 : 0,
          x: '-=10px',
          y: '-=10px',
          duration,
        }, `-=${duration}`)
        .to(cardSecondQuestionElement.value, {
          opacity: 1,
          duration,
        }, `-=${duration}`)
        .to(cardElement.value, {
          opacity: direction == 'left' ? 1 : 0,
          duration,
        }, `-=${duration}`)
    }

    function clearAnimationPropsAndSendEvent (tl) {
      props.service.send('CARD_SWIPE_ANIMATION_END')

      animationElements.value.forEach(function clearAllAnimationProps (element) {
        gsap.set(element, { clearProps: 'all' })
      })
      if (!props.cards[0]) gsap.set(cardElement.value, { opacity: 0 })
      if (!props.cards[1]) gsap.set(cardSecondElement.value, { opacity: 0 })
      if (!props.cards[2]) gsap.set(cardThirdElement.value, { opacity: 0 })
      xMovement.value = 0
      accelerator.value = 1
    }

    watch(
      () => props.current.matches('idle.exam.examing.normalExam.answerShowed.cardBackToPositionAnimation') ||
        props.current.matches('idle.exam.examing.enhancementExam.answerShowed.cardBackToPositionAnimation'),
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

    watch(
      () => props.current.matches('idle.exam.examing.enhancementExam.answerShowed.cardShakeAnimation'),
      function cardShakeAnimationWatcher (value) {
        if (!value) return
        const shakeTimeline = gsap
          .timeline({ paused: true })
          .to(cardElement.value, {
            x: 10,
            duration: 0.05,
          })
          .to(cardElement.value, {
            x: 0,
            duration: 0.05,
          })

        shakeTimeline
          .repeat(2).play()
          .then(function cardShakeAnimationEnd () {
            props.service.send('CARD_SHAKE_ANIMATION_END')
          })
      },
      { layz: true }
    )

    onMounted(function examModeBlockCard () {
      swipeCheckPoint.value = document.getElementById('app').offsetWidth / 4

      if (!props.cards[0]) gsap.set(cardElement.value, { opacity: 0 })
      if (!props.cards[1]) gsap.set(cardSecondElement.value, { opacity: 0 })
      if (!props.cards[2]) gsap.set(cardThirdElement.value, { opacity: 0 })
    })

    return {
      // element
      cardElement,
      cardQuestionElement,
      cardAnswerElement,
      cardSecondElement,
      cardSecondQuestionElement,
      cardThirdElement,
      cardNewElement,
      // data
      animationElements,
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
      props.service.send('SHOW_ANSWER')
      dragStart(e)
    }

    function cardMoving (e) {
      if (!canDrag.value) return
      const movement = getDraggingMovement(e)

      if (
        props.current.matches('idle.exam.examing.enhancementExam') &&
        movement < 0 &&
        xMovement.value <= 0
      ) {
        xMovement.value = xMovement.value + movement * accelerator.value
        accelerator.value = 0.5 - Math.abs(xMovement.value / swipeCheckPoint.value)
      } else {
        xMovement.value += movement
      }

      cardElement.value.style.transform = `translate(${xMovement.value}px, 0)`
      cardElement.value.style.opacity = 1 - (xMovement.value / swipeCheckPoint.value * 0.3)

      if (Math.abs(xMovement.value) > swipeCheckPoint.value) {
        dragEnd()
        props.service.send('NEXT_CARD', {
          addToEnhancement: !(xMovement.value > 0),
        })
      }
    }

    function cardMoveEnd () {
      props.service.send('CARD_BACK_TO_POSITION')
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
  --card-width: 30vw;
  --card-min-size: 200px;
  --card-max-size: 230px;
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
}

.exam-mode-block-card__card {
  width: var(--card-width);
  height: var(--card-width);
  min-height: var(--card-min-size);
  min-width: var(--card-min-size);
  max-height: var(--card-max-size);
  max-width: var(--card-max-size);
  border-radius: 6px;
  border: solid 2px var(--card-border-color);
  font-size: 4rem;
  transform-origin: center;
  display: grid;
  grid-template:
    "question" 1fr
    "answer  " 1fr / 1fr;
  align-items: center;
  justify-items: center;
}

.exam-mode-block-card__card--background {
  background-color: var(--main-color);
  position: absolute;
}

.exam-mode-block-card__card--first {
  will-change: auto;
  position: relative;
  user-select: none;
  z-index: 10;
  background-color: #fff;
}

.exam-mode-block-card__card--second {
  z-index: 9;
  transform: translate(var(--card-transform), var(--card-transform));
}

.exam-mode-block-card__card--third {
  z-index: 8;
  transform: translate(
    var(--card-second-transform),
    var(--card-second-transform)
  );
}

.exam-mode-block-card__card--new {
  z-index: 7;
  opacity: 0;
  transform: translate(
    var(--card-third-transform),
    var(--card-third-transform)
  );
}

.exam-mode-block-card__question {
  grid-area: question;
  align-self: end;
  margin-bottom: 10px;
}

.exam-mode-block-card__question--second {
  opacity: 0;
}

.exam-mode-block-card__answer {
  grid-area: answer;
  opacity: 0;
  align-self: start;
}
</style>
