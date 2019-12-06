<template>
  <section
    aria-labelledby="exam-range-modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div class="sticky-top">
      <top-bar>設定</top-bar>
    </div>

    <h2 class="subtitle">設定測驗範圍</h2>

    <form
      @submit.prevent="service.send('SET_EXAM_RANGE')"
      aria-labelledby="exam-range-modal-title"
    >
      <section v-show="current.matches('examRangeModal.show.error')">
        <div
          role="alert"
          v-if="current.meta['examView.examRangeModal.show.error']"
        >
          <p>{{ current.meta['examView.examRangeModal.show.error'].message }}</p>
        </div>
      </section>

      <section
        v-for="([groupName, rows]) in Object.entries(current.context.gojuon)"
        :key="groupName"
      >
        <gojuon-title>
          <h3>{{generateTitle(groupName)}}</h3>
        </gojuon-title>

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
import topBar from '@/components/topBar.vue'
import gojuonTitle from '@/components/gojuonTitle.vue'

export default {
  components: { topBar, gojuonTitle },
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

<style scoped>
.sticky-top {
  position: sticky;
  top: 0;
}

.subtitle {
  font-size: 1.2rem;
  font-weight: bold;
  padding: 12px 8px;
  margin: 0;
}

.input-group-title {
  font-size: 1rem;
  background-color: var(--title-bg-color);
  padding: 12px 5px;
  margin: 0;
}
</style>
