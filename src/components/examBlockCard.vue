<template>
  <div
    class="card-container"
    @mousemove="dragging"
    @touchmove="dragging"
    @mouseup="dragEnd"
    @touchend="dragEnd"
  >
    <div
      v-if="cards[0]"
      class="card card-layout"
      ref="cardElement"
      @mousedown="dragStart"
      @touchstart="dragStart"
      @mouseup="dragEnd"
      @touchend="dragEnd"
    >
      <span class="card-question">
        {{ question }}
      </span>
      <span class="card-answer">
        {{ answer }}
      </span>
    </div>

    <div v-if="cards[1]" class="card-2 card-background card-layout">
      <span class="card-question card-2-question">
        {{ nextQuestion }}
      </span>
    </div>
    <div v-if="cards[2]" class="card-3 card-background card-layout"></div>
    <div v-if="cards[3]" class="card-new card-background card-layout"></div>
  </div>
</template>

<script>
import { ref, computed, watch } from '@vue/composition-api'
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
    const cardElement = ref(null)
    const canDrag = ref(false)
    const lastTouchX = ref(null)
    const xMovement = ref(0)

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
      () => props.current.matches('idle.exam.normalExam.answerShowed.idle'),
      function answerShowedAnimationWatcher (value) {
        if (!value) return
        gsap
          .to('.card-answer', {
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
          .play()
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
          .play()
          .then(clearAnimationPropsAndSendEvent)
      },
      { layz: true }
    )

    watch(
      () => props.current.matches('idle.exam.normalExam.answerShowed.cardBackToPositionAnimation'),
      function cardBackToPositionAnimationWatcher (value) {
        if (!value) return
        gsap
          .to('.card', {
            x: 0,
            duration: 0.3,
          })
          .then(function swipeAnimationEnd () {
            gsap.set('.card', { clearProps: 'all' })
            props.service.send('CARD_BACK_TO_POSITION_ANIMATION_END')
          })
      },
      { layz: true }
    )

    return {
      cardElement,
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

      xMovement.value = xMovement.value + movement
      cardElement.value.style.transform = `translate(${xMovement.value}px, 0)`

      if (Math.abs(xMovement.value) > (window.innerWidth / 4)) {
        canDrag.value = false
        props.service.send('NEXT_CARD', {
          addToEnhancement: !(xMovement.value > 0),
        })
      }
    }

    function dragEnd () {
      canDrag.value = false
      xMovement.value = 0
      props.service.send('CARD_BACK_TO_POSITION')
    }

    function animationTimelineSwipe (direction) {
      return gsap
        .timeline({ paused: true })
        .to('.card', {
          x: `${direction == 'left' ? '-' : '+'}=${window.innerWidth}`,
          duration: 0.5,
        })
        .to('.card-2', {
          x: '-=10px',
          y: '-=10px',
          backgroundColor: '#ffffff',
        }, '-=0.5')
        .to('.card-2-question', {
          opacity: 1,
          duration: 0.5,
        }, '-=0.5')
        .to('.card-3', {
          x: '-=10px',
          y: '-=10px',
          duration: 0.5,
        }, '-=0.5')
        .to('.card-new', {
          opacity: 1,
          x: '-=10px',
          y: '-=10px',
          duration: 0.5,
        }, '-=0.5')
        .to('.card', {
          opacity: direction == 'left' ? 1 : 0,
          duration: 0.2,
        }, '-=0.5')
    }

    function clearAnimationPropsAndSendEvent () {
      props.service.send('CARD_SWIPE_ANIMATION_END')
      gsap.set('.card, .card-2, .card-3, .card-new, .card-answer, .card-2-question', { clearProps: 'all' })
    }
  },
}
</script>

<style scoped>
.card-container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.card-layout {
  width: 226px;
  height: 262px;
  border-radius: 6px;
  border: solid 2px var(--text-color);
  font-size: 3.625rem;
  padding: 10% 0;
  transform-origin: center;
  display: grid;
  grid-template:
    "question" 1fr
    "answer  " 1fr / 1fr;
  align-items: center;
  justify-items: center;
}

.card-background {
  background-color: var(--main-color);
  position: absolute;
}

.card {
  will-change: auto;
  position: relative;
  user-select: none;
  z-index: 10;
  background-color: #fff;
}

.card-question {
  grid-area: question;
}

.card-answer {
  grid-area: answer;
  opacity: 0;
}

.card-2 {
  z-index: 9;
  transform: translate(10px, 10px);
}

.card-2-question {
  opacity: 0;
}

.card-3 {
  z-index: 8;
  transform: translate(20px, 20px);
}

.card-new {
  z-index: 7;
  opacity: 0;
  transform: translate(30px, 30px);
}
</style>
