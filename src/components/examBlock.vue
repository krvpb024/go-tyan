<template>
  <section class="exam-block-container">
    <exam-block-card
      :service="service"
      :current="current"
      :currentCard="currentCard"
    ></exam-block-card>

    <p>{{ progressValue }} / {{ progressMax }}</p>

    <progress
      :value="progressValue"
      :max="progressMax"
    ></progress>
  </section>
</template>

<script>
import { computed } from '@vue/composition-api'
import examBlockCard from '@/components/examBlockCard.vue'

export default {
  name: 'examBlock',
  components: { examBlockCard },
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
    const currentCard = computed(function getCurrentCard () {
      switch (props.examType) {
        case 'normalExam':
          return props.current.context.cards[props.current.context.cursor]
        case 'enhancementExam':
          return props.current.context.enhancementCards[props.current.context.enhancementCursor]
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
      currentCard,
      progressValue,
      progressMax,
    }
  },
}
</script>

<style scoped>
.exam-block-container {
  display: flex;
  flex-direction: column;
}
</style>
