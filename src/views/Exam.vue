<template>
  <section class="exam-container">
    <div
      class="root-sticky-top"
      ref="topStickyElement"
    >
      <top-bar>
        <template #leftContainer>
          <router-link
            to="/"
            class="root-top-bar-link-icon"
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
          <button @click="service.send('SHOW_EXAM_RANGE_MODAL')" ref="settingButtonElement">設定</button>

          <exam-range-modal
            :service="service"
            :current="current"
            :buttonInfo="settingButtonBoundingClientRect"
            @modalHide="modalHide"
          ></exam-range-modal>
        </template>
      </top-bar>
    </div>

    <nav>
      <ul>
        <li>
          <router-link to="/exam/hiragana_to_romanization">
            平假名轉拼音
          </router-link>
        </li>

        <li>
          <router-link to="/exam/katakana_to_romanization">
            片假名轉拼音
          </router-link>
        </li>

        <li>
          <router-link to="/exam/romanization_to_hiragana">
            拼音轉平假名
          </router-link>
        </li>

        <li>
          <router-link to="/exam/romanization_to_katakana">
            拼音轉片假名
          </router-link>
        </li>

        <li>
          <router-link to="/exam/hiragana_to_katakana">
            平假名轉片假名
          </router-link>
        </li>

        <li>
          <router-link to="/exam/katakana_to_hiragana">
            片假名轉平假名
          </router-link>
        </li>
      </ul>
    </nav>
  </section>
</template>

<script>
import { ref, onMounted } from '@vue/composition-api'
import { machine } from '@/states/examState.js'
import { useMachine } from '@/utils/useMachine.js'
import topBar from '@/components/topBar.vue'
import examRangeModal from '@/components/examRangeModal.vue'

export default {
  name: 'Exam',
  components: { topBar, examRangeModal },
  setup (props, context) {
    const localExamRange = JSON.parse(window.localStorage.getItem('examRange'))
    const localSubmittedGojuon = JSON.parse(window.localStorage.getItem('submittedGojuon'))

    const { service, current } = useMachine(machine.withContext({
      ...machine.context,
      examRange: localExamRange || machine.context.examRange,
      submittedGojuon: localSubmittedGojuon || machine.context.submittedGojuon,
      selectedGojuon: localSubmittedGojuon || machine.context.selectedGojuon,
    }))

    const settingButtonElement = ref(null)
    const settingButtonBoundingClientRect = ref(null)

    onMounted(function examOnMounted () {
      const { top, left, width, height } = settingButtonElement.value.getBoundingClientRect()
      settingButtonBoundingClientRect.value = { top, left, width, height }
    })

    return {
      service,
      current,
      settingButtonElement,
      settingButtonBoundingClientRect,
      modalHide,
    }

    function modalHide () {
      settingButtonElement.value.focus()
    }
  },
}
</script>
