<template>
  <div
    class="exam-mode-block-card"
    @mousemove="dragging"
    @touchmove="dragging"
    @mouseup="dragEnd"
    @touchend="dragEnd"
  >
    <div
      class="exam-mode-block-card__card
        exam-mode-block-card__card--first"
      ref="cardElement"
      @mousedown="dragStart"
      @touchstart="dragStart"
      @mouseup="dragEnd"
      @touchend="dragEnd"
    >
      <span
        class="exam-mode-block-card__question"
        ref="cardQuestionElement"
      >
        {{ question }}
      </span>
      <span
        class="exam-mode-block-card__answer"
        ref="cardAnswerElement"
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
  },
  setup (props, context) {
    // element
    const cardElement = ref(null)
    const cardQuestionElement = ref(null)
    const cardAnswerElement = ref(null)
    const cardSecondElement = ref(null)
    const cardSecondQuestionElement = ref(null)
    const cardThirdElement = ref(null)
    const cardNewElement = ref(null)

    // data
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
    const canDrag = ref(false)
    const lastTouchX = ref(null)
    const xMovement = ref(0)
    const swipeCheckPoint = ref(null)

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
      () => props.current.matches('idle.exam.normalExam.answerShowed.idle') ||
        props.current.matches('idle.exam.enhancementExam.answerShowed.idle'),
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
      () => props.current.matches('idle.exam.normalExam.answerShowed.cardSwipeRightAnimation') ||
        props.current.matches('idle.exam.enhancementExam.answerShowed.cardSwipeRightAnimation'),
      function cardSwipeRightAnimationWatcher (value) {
        if (!value) return
        animationTimelineSwipe('right')
          .restart()
          .then(clearAnimationPropsAndSendEvent)
      },
      { layz: true }
    )

    watch(
      () => props.current.matches('idle.exam.normalExam.answerShowed.cardSwipeLeftAnimation') ||
        props.current.matches('idle.exam.enhancementExam.answerShowed.cardSwipeLeftAnimation'),
      function cardSwipeLeftAnimationWatcher (value) {
        if (!value) return
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
    }

    watch(
      () => props.current.matches('idle.exam.normalExam.answerShowed.cardBackToPositionAnimation') ||
        props.current.matches('idle.exam.enhancementExam.answerShowed.cardBackToPositionAnimation'),
      function cardBackToPositionAnimationWatcher (value) {
        if (!value) return
        gsap
          .to(cardElement.value, {
            x: 0,
            opacity: 1,
            duration: 0.3,
          })
          .then(function swipeAnimationEnd () {
            gsap.set(cardElement.value, { clearProps: 'all' })
            xMovement.value = 0
            props.service.send('CARD_BACK_TO_POSITION_ANIMATION_END')
          })
      },
      { layz: true }
    )

    onMounted(function examModeBlockCard () {
      swipeCheckPoint.value = document.getElementById('app').offsetWidth / 4
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
      canDrag,
      xMovement,
      examMode,
      question,
      answer,
      nextQuestion,
      // methods
      dragStart,
      dragging,
      dragEnd,
    }

    function dragStart (e) {
      props.service.send('SHOW_ANSWER')
      canDrag.value = true

      if (e.touches) {
        lastTouchX.value = e.touches[0].pageX
      }
    }

    function dragging (e) {
      if (!canDrag.value) return
      props.service.send('CARD_MOVE')

      let movement
      if (e.touches) {
        movement = e.touches[0].pageX - lastTouchX.value
        lastTouchX.value = e.touches[0].pageX
      } else {
        movement = e.movementX
      }

      if (props.current.matches('idle.exam.enhancementExam') && movement < 0 && xMovement.value <= 0) return

      xMovement.value = xMovement.value + movement
      cardElement.value.style.transform = `translate(${xMovement.value}px, 0)`

      cardElement.value.style.opacity = 1 - (xMovement.value / swipeCheckPoint.value * 0.3)

      if (Math.abs(xMovement.value) > swipeCheckPoint.value) {
        canDrag.value = false
        props.service.send('NEXT_CARD', {
          addToEnhancement: !(xMovement.value > 0),
        })
      }
    }

    function dragEnd () {
      canDrag.value = false
      props.service.send('CARD_BACK_TO_POSITION')
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
  --card-max-size: 300px;
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
  width: 100%;
  height: 100%;
  border-radius: 6px;
  border: solid 2px var(--card-border-color);
  font-size: 8vh;
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
