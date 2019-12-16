<template>
  <div
    class="card-container"
    @mousemove="dragging"
    @touchmove="dragging"
    @mouseup="dragEnd"
    @touchend="dragEnd"
  >
    <div
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

    <div class="card-2 card-background card-layout">
      <span class="card-question card-2-question">
        {{ question }}
      </span>
    </div>
    <div class="card-3 card-background card-layout"></div>
    <div class="card-new card-background card-layout"></div>
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

    watch(
      () => props.current.matches('idle.exam.normalExam.answerShowed.cardBackToPositionAnimation'),
      function cardBackToPositionAnimationWatcher (value) {
        if (!value) return
        gsap
          .to('.card', {
            x: 0,
            opacity: 1,
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

      const checkPoint = window.innerWidth / 4
      // console.log(xMovement.value / checkPoint * 0.5)
      cardElement.value.style.opacity = 1 - (xMovement.value / checkPoint * 0.3)

      if (Math.abs(xMovement.value) > checkPoint) {
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
      const tl = gsap.timeline({ paused: true })

      return tl
        .to('.card .card-question, .card .card-answer', {
          opacity: 0,
          duration: 0,
        })
        .to('.card', {
          x: `${direction == 'left' ? '-' : '+'}=${window.innerWidth}`,
          duration: 0.5,
        })
        .to('.card-2', {
          x: '-=10px',
          y: '-=10px',
          backgroundColor: '#ffffff',
        }, '-=0.5')
        .to('.card-3', {
          x: '-=10px',
          y: '-=10px',
          duration: 0.5,
        }, '-=0.5')
        .to('.card-new', {
          opacity: props.cards[2] ? 1 : 0,
          x: '-=10px',
          y: '-=10px',
          duration: 0.5,
        }, '-=0.5')
        .to('.card-2-question', {
          opacity: 1,
          duration: 0.5,
        }, '-=0.5')
        .to('.card', {
          opacity: direction == 'left' ? 1 : 0,
          duration: 0.2,
        }, '-=0.5')
    }

    function clearAnimationPropsAndSendEvent (tl) {
      props.service.send('CARD_SWIPE_ANIMATION_END')
      gsap.set('.card, .card-2, .card-3, .card-new, .card-answer, .card-2-question, .card .card-question, .card .card-answer', { clearProps: 'all' })
      if (!props.cards[0]) gsap.set('.card', { opacity: 0 })
      if (!props.cards[1]) gsap.set('.card-2', { opacity: 0 })
      if (!props.cards[2]) gsap.set('.card-3', { opacity: 0 })
    }
  },
}
</script>

<style>
:root {
  --card-transform: 10px;
  --card-2-transform: 20px;
  --card-3-transform: 30px;
  --card-width: 50%;
}
</style>

<style scoped>
.card-container {
  position: relative;
  margin: 5vh 0;
  margin-bottom: calc(var(--card-2-transform) + 15px); /* add card-2 card-3 transfromY */
  width: 100%;
  height: 30vh;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateX(-10px); /* center cards because cards transition */
}

.card-layout {
  height: 100%;
  width: var(--card-width);
  border-radius: 6px;
  border: solid 2px var(--text-color);
  font-size: 8vh;
  /* padding: 10% 0; */
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
  align-self: end;
  margin-bottom: 10px;
}

.card-answer {
  grid-area: answer;
  opacity: 0;
  align-self: start;
}

.card-2 {
  z-index: 9;
  transform: translate(var(--card-transform), var(--card-transform));
}

.card-2-question {
  opacity: 0;
}

.card-3 {
  z-index: 8;
  transform: translate(var(--card-2-transform), var(--card-2-transform));
}

.card-new {
  z-index: 7;
  opacity: 0;
  transform: translate(var(--card-3-transform), var(--card-3-transform));
}
</style>
