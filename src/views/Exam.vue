<template>
  <section class="exam-container">
    <div
      class="app-sticky-top"
      ref="topStickyElement"
    >
      <top-bar>
        <template #leftContainer>
          <router-link
            to="/"
            class="app-top-bar-link-icon"
            aria-labelledby="nav-return-label"
          >
            <svg
              role="img"
              aria-labelledby="nav-return-label"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              width="18.035"
              height="16.297"
            >
              <title id="nav-return-label">返回</title>

              <filter id="shadow">
                <feDropShadow
                  dx="2.2"
                  dy="2.2"
                  stdDeviation="0"
                  flood-color="#ffffff"
                />
              </filter>

              <path
                aria-labelledby="nav-return-label"
                d="M7.865 16.414L.684 9.233a.967.967 0 0 1 0-1.368L7.865.684a.967.967 0 0 1 1.368 1.368L3.792 7.493h13.676a.967.967 0 1 1 0 1.934H3.614l5.619 5.619a.967.967 0 1 1-1.368 1.368z"
                stroke="#313131"
                filter="url(#shadow)"
                stroke-width="0.6"
              />
            </svg>
          </router-link>
        </template>

        <h1>測驗</h1>

        <template #rightContainer>
          <button
            @click="service.send('SHOW_EXAM_RANGE_MODAL')"
            ref="settingButtonElement"
            aria-haspopup="true"
          >設定</button>

          <exam-range-modal
            :service="service"
            :current="current"
            :buttonInfo="settingButtonBoundingClientRect"
            @modalHide="modalHide"
          ></exam-range-modal>
        </template>
      </top-bar>
    </div>

    <nav class="exam-container__nav">
      <router-link
        class="exam-nav__link"
        to="/exam/hiragana_to_romanization"
      >
        <exam-card>
          <template #transformFrom>
            <span>あ</span>
          </template>

          <template #transformTo>
            <span>a</span>
          </template>

          <template #title>
            <h2>
              <span>平假名</span>
              <span>轉</span>
              <span>拼音</span>
            </h2>
          </template>
        </exam-card>
      </router-link>

      <router-link
        class="exam-nav__link"
        to="/exam/romanization_to_hiragana"
      >
        <exam-card>
          <template #transformFrom>
            <span>a</span>
          </template>

          <template #transformTo>
            <span>あ</span>
          </template>

          <template #title>
            <h2>
              <span>拼音</span>
              <span>轉</span>
              <span>平假名</span>
            </h2>
          </template>
        </exam-card>
      </router-link>

      <router-link
        class="exam-nav__link"
        to="/exam/katakana_to_romanization"
      >
        <exam-card>
          <template #transformFrom>
            <span>ア</span>
          </template>

          <template #transformTo>
            <span>a</span>
          </template>

          <template #title>
            <h2>
              <span>片假名</span>
              <span>轉</span>
              <span>拼音</span>
            </h2>
          </template>
        </exam-card>
      </router-link>

      <router-link
        class="exam-nav__link"
        to="/exam/romanization_to_katakana"
      >
        <exam-card>
          <template #transformFrom>
            <span>a</span>
          </template>

          <template #transformTo>
            <span>ア</span>
          </template>

          <template #title>
            <h2>
              <span>拼音</span>
              <span>轉</span>
              <span>片假名</span>
            </h2>
          </template>
        </exam-card>
      </router-link>

      <router-link
        class="exam-nav__link"
        to="/exam/hiragana_to_katakana"
      >
        <exam-card>
          <template #transformFrom>
            <span>あ</span>
          </template>

          <template #transformTo>
            <span>ア</span>
          </template>

          <template #title>
            <h2>
              <span>平假名</span>
              <span>轉</span>
              <span>片假名</span>
            </h2>
          </template>
        </exam-card>
      </router-link>

      <router-link
        class="exam-nav__link"
        to="/exam/katakana_to_hiragana"
      >
        <exam-card>
          <template #transformFrom>
            <span>ア</span>
          </template>

          <template #transformTo>
            <span>あ</span>
          </template>

          <template #title>
            <h2>
              <span>片假名</span>
              <span>轉</span>
              <span>平假名</span>
            </h2>
          </template>
        </exam-card>
      </router-link>
    </nav>
  </section>
</template>

<script>
import { ref, onMounted } from '@vue/composition-api'
import { machine } from '@/states/examState.js'
import { useMachine } from '@/utils/useMachine.js'
import topBar from '@/components/topBar.vue'
import examRangeModal from '@/components/examRangeModal.vue'
import examCard from '@/components/examCard.vue'

export default {
  name: 'Exam',
  components: { topBar, examRangeModal, examCard },
  setup (props, context) {
    // element
    const settingButtonElement = ref(null)

    // data
    const localExamRange = JSON.parse(window.localStorage.getItem('examRange'))
    const localSubmittedGojuon = JSON.parse(window.localStorage.getItem('submittedGojuon'))

    const { service, current } = useMachine(machine.withContext({
      ...machine.context,
      examRange: localExamRange || machine.context.examRange,
      submittedGojuon: localSubmittedGojuon || machine.context.submittedGojuon,
      selectedGojuon: localSubmittedGojuon || machine.context.selectedGojuon,
    }))

    const settingButtonBoundingClientRect = ref(null)

    // effect
    onMounted(function examOnMounted () {
      const { top, left, width, height } = settingButtonElement.value.getBoundingClientRect()
      settingButtonBoundingClientRect.value = { top, left, width, height }
    })

    return {
      // element
      settingButtonElement,
      // data
      service,
      current,
      settingButtonBoundingClientRect,
      // methods
      modalHide,
    }

    function modalHide () {
      settingButtonElement.value.focus()
    }
  },
}
</script>

<style scoped>
.exam-container__nav {
  --column-gap: 25px;
  --row-gap: 25px;

  display: grid;
  grid-auto-flow: row;
  grid-column-gap: var(--column-gap);
  column-gap: var(--column-gap);
  grid-row-gap: var(--row-gap);
  row-gap: var(--row-gap);
  grid-template-columns: repeat(auto-fill, 150px);
  justify-content: center;
  margin: 31px auto;
  padding: 0 20px;
}

.exam-nav__link:focus {
  outline: 4px solid var(--main-color);
  outline-offset: 10px;
}
</style>
