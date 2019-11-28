<template>
  <div>
    <button
      @click="current.matches('exam.settingExamRange')
      ? service.send('HIDE_EXAM_RANGE_MODAL')
      : service.send('SHOW_EXAM_RANGE_MODAL')"
    >
      設定測驗範圍
    </button>

    <section
      v-show="current.matches('exam.settingExamRange')"
      aria-labelledby="exam-range-modal-title" role="dialog" aria-modal="true"
    >
      <h1 id="exam-range-modal-title">選擇測驗範圍</h1>

      <form
        @submit.prevent="service.send('SET_EXAM_RANGE')"
        aria-labelledby="exam-range-modal-title"
      >
        <section v-show="current.matches('exam.settingExamRange.error')">
          <div role="alert" v-if="current.meta['examView.exam.settingExamRange.error']">
            <p>{{ current.meta['examView.exam.settingExamRange.error'].message }}</p>
          </div>
        </section>

        <section
          v-for="([groupName, rows]) in Object.entries(current.context.gojuon)" :key="groupName"
        >
          <h2>{{generateTitle(groupName)}}</h2>

          <div v-for="(row, rowIndex) in rows" :key="rowIndex">
            <input
              type="checkbox" :id="`${groupName}-row-${rowIndex}-select-all`"
              :checked="current.context.selectedGojuon.includes(`${groupName}-${rowIndex}`)"
              @input="updateSelectedGojuon({ groupName, rowIndex }, $event)"
            >
            <label :for="`${groupName}-row-${rowIndex}-select-all`">{{ getRowString(row) }}</label>
          </div>
        </section>

        <button type="submit">送出</button>
        <button type="button" @click="service.send('HIDE_EXAM_RANGE_MODAL')">關閉</button>
      </form>
    </section>

    <main v-show="current.matches('exam.normalExam')">
      <section class="container">
        <h1>測驗</h1>

        <exam-card
          :service="service" :current="current"
          :currentCard="current.context.cards[current.context.cursor]"
        ></exam-card>

        <p>{{ current.context.cursor }} / {{ current.context.cards.length }}</p>

        <progress :value="current.context.cursor" :max="current.context.cards.length"></progress>
      </section>
    </main>
  </div>
</template>

<script>
import { generateTitle } from '@/states/gojuon.js'
import { machine } from '@/states/examState.js'
import { useMachine } from '@/utils/useMachine.js'
import examCard from '@/components/examCard.vue'

export default {
  components: { examCard },
  setup () {
    const { service, current } = useMachine(machine)

    return {
      service,
      current,
      // methods
      generateTitle,
      getRowString,
      updateSelectedGojuon,
    }

    function getRowString (row) {
      return row
        .filter(function removeEmpty (gojuon) {
          return gojuon != 'empty'
        })
        .reduce(function flatArrays (acc, column) {
          const [hiragana] = column
          return acc.concat(hiragana)
        }, '')
    }

    function updateSelectedGojuon ({ groupName, rowIndex }, { currentTarget: { checked } }) {
      service.value.send('UPDATE_SELECTED_GOJUON', {
        data: {
          checked,
          target: `${groupName}-${rowIndex}`,
        },
      })
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
