<template>
  <div
    class="card-container"
    @mousemove="dragging" @touchmove="dragging"
    @mouseup="dragEnd" @touchend="dragEnd"
  >
    <div
      class="card" ref="cardElement"
      @mousedown="dragStart" @touchstart="dragStart"
      @mouseup="dragEnd" @touchend="dragEnd"
    >
      <p class="card-text">
        <span>
          {{ question }}
        </span>
        <span v-show="current.matches('exam.normalExam.answerShowed') || current.matches('exam.enhancementExam.answerShowed')">
          {{ answer }}
        </span>
      </p>
    </div>
  </div>
</template>

<script>
import { ref, computed } from '@vue/composition-api'

export default {
  props: {
    currentCard: {
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
          return props.currentCard[0]
        case 'katakanaToRomanization':
        case 'katakanaToHiragana':
          return props.currentCard[1]
        case 'romanizationToHiragana':
        case 'romanizationToKatakana':
          return props.currentCard[2]
        default:
      }
    })
    const answer = computed(function getAnswer () {
      switch (examMode.value) {
        case 'romanizationToHiragana':
        case 'katakanaToHiragana':
          return props.currentCard[0]
        case 'hiraganaToKatakana':
        case 'romanizationToKatakana':
          return props.currentCard[1]
        case 'hiraganaToRomanization':
        case 'katakanaToRomanization':
          return props.currentCard[2]
        default:
      }
    })

    return {
      cardElement,
      canDrag,
      xMovement,
      examMode,
      question,
      answer,
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
        cardElement.value.style.transform = `translate(0, 0)`
        props.service.send('NEXT_CARD', {
          addToEnhancement: !(xMovement.value > 0),
        })
        xMovement.value = 0
      }
    }

    function dragEnd () {
      canDrag.value = false
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
}

.card {
  will-change: transform;
  position: relative;
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #000;
  user-select: none;
}
</style>
