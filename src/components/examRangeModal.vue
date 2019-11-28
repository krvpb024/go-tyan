<template>
  <section
    v-show="current.matches('exam.settingExamRange')"
    aria-labelledby="exam-range-modal-title"
    role="dialog"
    aria-modal="true"
  >
    <h1 id="exam-range-modal-title">選擇測驗範圍</h1>

    <form
      @submit.prevent="service.send('SET_EXAM_RANGE')"
      aria-labelledby="exam-range-modal-title"
    >
      <section v-show="current.matches('exam.settingExamRange.error')">
        <div
          role="alert"
          v-if="current.meta['examView.exam.settingExamRange.error']"
        >
          <p>{{ current.meta['examView.exam.settingExamRange.error'].message }}</p>
        </div>
      </section>

      <section
        v-for="([groupName, rows]) in Object.entries(current.context.gojuon)"
        :key="groupName"
      >
        <h2>{{generateTitle(groupName)}}</h2>

        <div
          v-for="(row, rowIndex) in rows"
          :key="rowIndex"
        >
          <input
            type="checkbox"
            :id="`${groupName}-row-${rowIndex}-select-all`"
            :checked="current.context.selectedGojuon.includes(`${groupName}-${rowIndex}`)"
            @input="updateSelectedGojuon({ groupName, rowIndex }, $event)"
          >
          <label :for="`${groupName}-row-${rowIndex}-select-all`">{{ getRowString(row) }}</label>
        </div>
      </section>

      <button type="submit">送出</button>
      <button
        type="button"
        @click="service.send('HIDE_EXAM_RANGE_MODAL')"
      >關閉</button>
    </form>
  </section>
</template>

<script>
import { generateTitle } from '@/states/gojuon.js'

export default {
  props: {
    service: {
      type: Object,
      required: true,
    },
    current: {
      type: Object,
      required: true,
    },
  },
  setup (props) {
    return {
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
      props.service.send('UPDATE_SELECTED_GOJUON', {
        data: {
          checked,
          target: `${groupName}-${rowIndex}`,
        },
      })
    }
  },
}
</script>
