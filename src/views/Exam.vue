<template>
  <div>
    <button @click="current.matches('examRangeModal.show')
      ? service.send('HIDE_EXAM_RANGE_MODAL')
      : service.send('SHOW_EXAM_RANGE_MODAL')">
      設定測驗範圍
    </button>

    <exam-range-modal
      v-show="current.matches('examRangeModal.show')"
      :service="service"
      :current="current"
    ></exam-range-modal>

    <main v-show="current.matches('examRangeModal.hide')">
      <exam-block
        v-if="current.matches('exam.normalExam')"
        :service="service"
        :current="current"
        examType="normalExam"
      ></exam-block>

      <exam-block
        v-else-if="current.matches('exam.enhancementExam')"
        :service="service"
        :current="current"
        examType="enhancementExam"
      ></exam-block>

      <section v-else-if="current.matches('exam.examFinish')">
        <h1>測驗結束</h1>

        <button @click="service.send('TAKE_EXAM_AGAIN')">重來一次</button>
      </section>
    </main>
  </div>
</template>

<script>
import { machine } from '@/states/examState.js'
import { useMachine } from '@/utils/useMachine.js'
import examRangeModal from '@/components/examRangeModal.vue'
import examBlock from '@/components/examBlock.vue'

export default {
  components: { examRangeModal, examBlock },
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
</style>
