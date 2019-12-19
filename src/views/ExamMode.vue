<template>
  <section class="exam-mode-container">
    <div
      class="root-sticky-top"
      ref="topStickyElement"
    >
      <top-bar>
        <template #leftContainer>
          <router-link
            to="/exam"
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

        <h1>{{ title }}</h1>
      </top-bar>
    </div>

    <div class="exam-content">
      <div class="exam-mode-info-modal-wrap">
        <button
          class="exam-mode-info-modal-button"
          ref="examModeInfoModalButtonElement"
          @click="current.matches('idle.infoModal.hide')
            ? service.send('SHOW_INFO_MODAL')
            : service.send('HIDE_INFO_MODAL')"
        >
          ！
        </button>

        <exam-mode-info-modal
          :buttonInfo="examModeInfoModalButtonInfo"
          :service="service"
          :current="current"
        ></exam-mode-info-modal>
      </div>

      <div class="exam-block">
        <div class="exam-block__normal-exam" ref="normalExamElement">
          <exam-block
            examType="normalExam"
            :service="service"
            :current="current"
          ></exam-block>
        </div>

        <div class="exam-block__enhancement-exam" ref="enhancementExamElement">
          <exam-block
            examType="enhancementExam"
            :service="service"
            :current="current"
          ></exam-block>
        </div>

      </div>

      <div class="exam-mode-drawing-board">
        <table-drawing-board opacity="0.8" :service="service" :current="current"></table-drawing-board>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, watch, computed, onMounted } from '@vue/composition-api'
import { machine } from '@/states/examModeState.js'
import { useMachine } from '@/utils/useMachine.js'
import { gsap } from 'gsap'
import topBar from '@/components/topBar.vue'
import examBlock from '@/components/examBlock.vue'
import examModeInfoModal from '@/components/examModeInfoModal.vue'
import tableDrawingBoard from '@/components/tableDrawingBoard.vue'

export default {
  name: 'ExamMode',
  components: { topBar, examBlock, examModeInfoModal, tableDrawingBoard },
  setup (props, context) {
    const localExamRange = JSON.parse(window.localStorage.getItem('examRange'))

    const { service, current } = useMachine(machine.withContext({
      ...machine.context,
      examRange: localExamRange || machine.context.examRange,
    }))

    const title = computed(function getTitle () {
      switch (context.root.$route.name) {
        case 'hiraganaToRomanization':
          return '平假名轉拼音'
        case 'hiraganaToKatakana':
          return '平假名轉片假名'
        case 'katakanaToRomanization':
          return '片假名轉拼音'
        case 'katakanaToHiragana':
          return '片假名轉平假名'
        case 'romanizationToHiragana':
          return '拼音轉平假名'
        case 'romanizationToKatakana':
          return '拼音轉片假名'
        default:
          return ''
      }
    })

    const normalExamElement = ref(null)
    const enhancementExamElement = ref(null)

    const examModeInfoModalButtonElement = ref(null)
    const examModeInfoModalButtonInfo = ref(null)

    onMounted(function examModeOnMounted () {
      service.value.send('PAGE_MOUNTED')

      const { top, left, width, height } = examModeInfoModalButtonElement.value.getBoundingClientRect()
      examModeInfoModalButtonInfo.value = { top, left, width, height }
    })

    watch(
      () => current.value.matches('idle.exam.changeExamModeAnimation'),
      function changeExamAnimationWatcher () {
        gsap.timeline()
          .to(normalExamElement.value, {
            position: 'absolute',
            x: '100%',
            duration: 0.5,
          })
          .to(enhancementExamElement.value, {
            position: 'relative',
            x: '0%',
            duration: 0.5,
          }, '-=0.5')
          .then(function changeExamAnimationEnd () {
            service.value.send('CHANGE_EXAM_MODE_ANIMATION_END')
          })
      },
      { lazy: true }
    )

    return {
      service,
      current,
      title,
      normalExamElement,
      enhancementExamElement,
      examModeInfoModalButtonElement,
      examModeInfoModalButtonInfo,
    }
  },
}
</script>

<style scoped>
.exam-content {
  position: relative;
}

.exam-mode-info-modal-wrap {
  right: 0;
  position: absolute;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}

.exam-mode-info-modal-button {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  box-shadow: 0 3px 20px 0 rgba(0, 0, 0, 0.16);
  border: solid 2px var(--text-color);
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 12px;
  font-weight: bold;
  z-index: 110;
}

.exam-mode-info-modal-button:hover, .exam-mode-info-modal-button:active {
  color: var(--text-color);
}

.exam-mode-info-modal-button:active {
  color: var(--main-color);
}

.exam-mode-info-modal-button:focus {
  border: var(--focus-border);
  outline: none;
}

.exam-block {
  position: relative;
  width: 100%;
  overflow: hidden;
  padding-top: 15vh;
}

.exam-block__normal-exam {
  width: 100%;
}

.exam-block__enhancement-exam {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  transform:  translateX(-100%);
}

.exam-mode-drawing-board {
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>
