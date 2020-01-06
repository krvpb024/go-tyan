<template>
  <section class="exam-mode-block">
    <div class="exam-mode-block__card">
      <exam-mode-block-card
        :service="service"
        :current="current"
        :cards="cards"
        :showAnswer="current.matches('idle.exam.examing.normalExam.answerShowed.idle')"
        :swipeRight="current.matches('idle.exam.examing.normalExam.answerShowed.cardSwipeRightAnimation')"
        :swipeLeft="current.matches('idle.exam.examing.normalExam.answerShowed.cardSwipeLeftAnimation')"
        :cardBackToPosition="current.matches('idle.exam.examing.normalExam.answerShowed.cardBackToPositionAnimation')"
        :newExam="current.matches('idle.exam.examing.normalExam')"
      ></exam-mode-block-card>
    </div>

    <div class="exam-mode-block__progress">
      <exam-mode-block-progress
        :service="service"
        :current="current"
        :value="progressValue"
        :max="progressMax"
      ></exam-mode-block-progress>
    </div>
  </section>
</template>

<script>
import { computed } from '@vue/composition-api'
import examModeBlockCard from '@/components/examModeBlockCard.vue'
import examModeBlockProgress from '@/components/examModeBlockProgress.vue'

export default {
  name: 'examBlock',
  components: { examModeBlockCard, examModeBlockProgress },
  props: {
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
  },
  setup (props) {
    // data
    const cards = computed(function getCards () {
      switch (props.examType) {
        case 'normalExam':
          return props.current.context.cards.slice(
            props.current.context.cursor,
            props.current.context.cursor + 4
          )
        case 'enhancementExam':
          return props.current.context.enhancementCards.slice(
            props.current.context.enhancementCursor,
            props.current.context.enhancementCursor + 4
          )
        default:
          throw new Error('unknown examType')
      }
    })

    const progressValue = computed(function getProgressValue () {
      switch (props.examType) {
        case 'normalExam':
          return props.current.context.cursor
        case 'enhancementExam':
          return props.current.context.enhancementCursor
        default:
          throw new Error('unknown examType')
      }
    })

    const progressMax = computed(function getProgressMax () {
      switch (props.examType) {
        case 'normalExam':
          return props.current.context.cards.length
        case 'enhancementExam':
          return props.current.context.enhancementCards.length
        default:
          throw new Error('unknown examType')
      }
    })

    return {
      // data
      cards,
      progressValue,
      progressMax,
    }
  },
}
</script>

<style scoped>
.exam-mode-block {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  align-items: center;
}

.exam-mode-block__card {
  width: 100%;
  height: 100%;
  /* add card-second card-third transfromY */
  margin-bottom: calc(var(--card-second-transform) + 15px);
}

.exam-mode-block__progress {
  width: calc(var(--card-width) + var(--card-second-transform));
  min-width: calc(var(--card-min-size) + var(--card-second-transform));
  max-width: calc(var(--card-max-size) + var(--card-second-transform));
}
</style>
