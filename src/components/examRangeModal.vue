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
          class="gojuon-group-container"
          v-for="(row, rowIndex) in rows"
          :key="rowIndex"
        >
          <input
            type="checkbox"
            class="visual-hidden"
            :id="`${groupName}-row-${rowIndex}-select-all`"
            :checked="current.context.selectedGojuon.includes(`${groupName}-${rowIndex}`)"
            @input="updateSelectedGojuon({ groupName, rowIndex }, $event)"
          >
          <checkbox-label :forId="`${groupName}-row-${rowIndex}-select-all`">

            <span
              v-for="hiragana in getRowString(row)"
              :key="hiragana"
              class="label-text"
            >
              {{ hiragana }}
            </span>
          </checkbox-label>
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
import checkboxLabel from '@/components/checkboxLabel.vue'

export default {
  components: { topBar, gojuonTitle, checkboxLabel },
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
        .map(function remainHiragana ([hiragana]) {
          return hiragana
        })
        // .reduce(function flatArrays (acc, column) {
        //   const [hiragana] = column
        //   return acc.concat(hiragana)
        // }, '')
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

.gojuon-group-container {
  border-bottom: .5px solid #d3d3d3;
  padding: 10px;
}

.label-text {
  font-size: 1.25rem;
}

.label-text:first-child {
  margin-left: 10px;
}

.label-text + .label-text {
  margin-left: 1rem;
}
</style>
