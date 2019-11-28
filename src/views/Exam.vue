<template>
  <div>
    <button @click="current.matches('exam.settingExamRange')
      ? service.send('HIDE_EXAM_RANGE_MODAL')
      : service.send('SHOW_EXAM_RANGE_MODAL')">
      設定測驗範圍
    </button>

    <exam-range-modal
      :service="service"
      :current="current"
    ></exam-range-modal>

    <main v-show="current.matches('exam.normalExam')">
      <section class="container">
        <h1>測驗</h1>

        <exam-card
          :service="service"
          :current="current"
          :currentCard="current.context.cards[current.context.cursor]"
        ></exam-card>

        <p>{{ current.context.cursor }} / {{ current.context.cards.length }}</p>

        <progress
          :value="current.context.cursor"
          :max="current.context.cards.length"
        ></progress>
      </section>
    </main>
  </div>
</template>

<script>
import { machine } from '@/states/examState.js'
import { useMachine } from '@/utils/useMachine.js'
import examCard from '@/components/examCard.vue'
import examRangeModal from '@/components/examRangeModal.vue'

export default {
  components: { examCard, examRangeModal },
  setup () {
    const { service, current } = useMachine(machine)

    return {
      service,
      current,
    }
  },
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
