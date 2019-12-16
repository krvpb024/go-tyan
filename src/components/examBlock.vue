<template>
  <section class="exam-block-container">
    <exam-block-card
      :service="service"
      :current="current"
      :cards="cards"
    ></exam-block-card>

    <div class="exam-block-progress">
      <exam-progress
        :value="progressValue"
        :max="progressMax"
      ></exam-progress>
    </div>

    <p class="eb-status">{{ progressValue }} / {{ progressMax }}</p>
  </section>
</template>

<script>
import { computed } from '@vue/composition-api'
import examBlockCard from '@/components/examBlockCard.vue'
import examProgress from '@/components/examProgress.vue'

export default {
  name: 'examBlock',
  components: { examBlockCard, examProgress },
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
      cards,
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
  overflow: hidden;
  align-items: center;
}

.exam-block-progress {
  width: calc(var(--card-width) + var(--card-2-transform));
}

.eb-status {
  font-size: 1.25rem;
  font-weight: bold;
  margin: 5px;
}
</style>
