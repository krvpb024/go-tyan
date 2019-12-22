<template>
  <section class="exam-mode-container">
    <div class="app-sticky-top">
      <top-bar>
        <template #leftContainer>
          <router-link
            to="/exam"
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

        <h1>{{ title }}</h1>
      </top-bar>
    </div>

    <div class="exam-mode-container__content">
      <div
        class="exam-mode-content__info-modal"
        ref="examModeInfoModalButtonElement"
      >
        <button
          class="exam-mode-info-modal__modal-trigger-button"
          @click="current.matches('idle.infoModal.hide')
            ? service.send('SHOW_INFO_MODAL')
            : service.send('HIDE_INFO_MODAL')"
        >
          ！
        </button>

        <exam-mode-info-modal
          :service="service"
          :current="current"
        ></exam-mode-info-modal>
      </div>

      <main class="exam-mode-content__main-block">
        <div
          class="exam-mode-main-block__normal-exam"
          ref="normalExamElement"
          tabindex="0"
          @keydown.down="service.send('SHOW_ANSWER')"
          @keydown.left="service.send('NEXT_CARD', { addToEnhancement: true })"
          @keydown.right="service.send('NEXT_CARD')"
        >
          <exam-mode-block
            examType="normalExam"
            :service="service"
            :current="current"
          ></exam-mode-block>
        </div>

        <div
          class="exam-mode-main-block__enhancement-exam"
          ref="enhancementExamElement"
          tabindex="0"
          @keydown.down="service.send('SHOW_ANSWER')"
          @keydown.left="service.send('NEXT_CARD', { addToEnhancement: true })"
          @keydown.right="service.send('NEXT_CARD')"
        >
          <exam-mode-block
            examType="enhancementExam"
            :service="service"
            :current="current"
          ></exam-mode-block>
        </div>
      </main>

      <drawing-board
        opacity="0.8"
        :service="service"
        :current="current"
      ></drawing-board>
    </div>
  </section>
</template>

<script>
import { ref, watch, computed, onMounted, onUnmounted } from '@vue/composition-api'
import { machine } from '@/states/examModeState.js'
import { useMachine } from '@/utils/useMachine.js'
import { gsap } from 'gsap'
import topBar from '@/components/topBar.vue'
import examModeBlock from '@/components/examModeBlock.vue'
import examModeInfoModal from '@/components/examModeInfoModal.vue'
import drawingBoard from '@/components/drawingBoard.vue'

export default {
  name: 'ExamMode',
  components: { topBar, examModeBlock, examModeInfoModal, drawingBoard },
  setup (props, context) {
    // element
    const normalExamElement = ref(null)
    const enhancementExamElement = ref(null)
    const examModeInfoModalButtonElement = ref(null)

    // data
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

    // effect
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
            enhancementExamElement.value.focus()
          })
      },
      { lazy: true }
    )

    onMounted(function examModeOnMounted () {
      service.value.send('PAGE_MOUNTED')
      document.body.classList.add('app-prevent-scroll')
      document.querySelector('html').classList.add('app-prevent-scroll')
    })

    onUnmounted(function examModeOnUnmounted () {
      document.body.classList.remove('app-prevent-scroll')
      document.querySelector('html').classList.remove('app-prevent-scroll')
    })

    return {
      // element
      normalExamElement,
      enhancementExamElement,
      examModeInfoModalButtonElement,
      // data
      service,
      current,
      title,
    }
  },
}
</script>

<style scoped>
.exam-mode-container__content {
  position: relative;
}

.exam-mode-content__info-modal {
  top: var(--root-padding-size);
  right: var(--root-padding-size);
  width: 28px;
  height: 28px;
  position: absolute;
  display: flex;
  justify-content: flex-end;
}

.exam-mode-info-modal__modal-trigger-button {
  width: 100%;
  height: 100%;
  border-radius: 6px;
  box-shadow: 0 3px 20px 0 rgba(0, 0, 0, 0.16);
  border: solid 2px var(--text-color);
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  font-weight: bold;
  z-index: 110;
}

.exam-mode-info-modal__modal-trigger-button:hover,
.exam-mode-info-modal__modal-trigger-button:active {
  color: var(--text-color);
}

.exam-mode-info-modal__modal-trigger-button:active {
  color: var(--main-color);
}

.exam-mode-info-modal__modal-trigger-button:focus {
  border: var(--focus-border);
  outline: none;
}

.exam-mode-content__main-block {
  position: relative;
  width: 100%;
  overflow: hidden;
  padding: 20px;
  padding-top: 10vh;
  margin-bottom: 100vh;
}

.exam-mode-main-block__normal-exam {
  width: 100%;
}

.exam-mode-main-block__normal-exam:focus, .exam-mode-main-block__enhancement-exam:focus {
  outline: 4px solid var(--main-color);
  outline-offset: 8px;
}

.exam-mode-main-block__enhancement-exam {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  transform: translateX(-100%);
}
</style>
