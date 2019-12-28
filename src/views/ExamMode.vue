<template>
  <section class="exam-mode">
    <div class="app-sticky-top">
      <top-bar>
        <template #leftContainer>
          <a
            @click.prevent="$router.go(-1)"
            href="/exam"
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
          </a>
        </template>

        <h1>{{ title.join('轉') }}</h1>
      </top-bar>
    </div>

    <div class="exam-mode__content">
      <div
        class="exam-mode-content__info-modal"
        ref="examModeInfoModalButtonElement"
      >
        <button
          class="exam-mode-info-modal__modal-trigger-button"
          ref="modalTriggerButtonElement"
          @click="current.matches('idle.infoModal.hide')
            ? service.send('SHOW_INFO_MODAL')
            : service.send('HIDE_INFO_MODAL')"
          aria-label="測驗說明"
          aria-haspopup="true"
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
          v-if="current.matches('idle.exam.examing') ||
            current.matches('idle.exam.examFinish.examFinishAnimation')"
          class="exam-mode-main-block__exam-block"
          ref="examBlockElement"
        >
          <div
            class="exam-mode-exam-block__normal-exam"
            ref="normalExamElement"
            :tabindex="current.matches('idle.exam.examing.normalExam') ? 0 : -1"
            :aria-hidden="current.matches('idle.exam.examing.normalExam') ? false : 'true'"
            @keydown.down="service.send('SHOW_ANSWER')"
            @keydown.left="service.send('NEXT_CARD', { addToEnhancement: true })"
            @keydown.right="service.send('NEXT_CARD')"
          >
            <exam-mode-block
              examType="normalExam"
              :service="service"
              :current="current"
            ></exam-mode-block>

            <div
              v-if="!current.context.isNotFirstTime && current.context.cursor == 0"
              class="exam-mode-normal-exam__intro-block"
            >
              <img
                class="exam-mode-intro-block__go-tyan"
                src="@/assets/go-tyan.svg"
                alt=""
                aria-hidden="true"
              >

              <home-stream-item
                v-if="!current.context.isNotFirstTime && current.matches('idle.exam.examing.normalExam.idle')"
                class="exam-mode-intro-block__intro-description"
                anglePosition="left"
              >
                <p class="exam-mode-intro-description__text">
                  這個{{ title[0] }}的{{ title[1] }}是什麼？點擊卡片可以看解答喔！<br>
                  打開手寫板可以練習手寫，但目前還沒有辨識功能。
                </p>
              </home-stream-item>

              <home-stream-item
                v-if="!current.context.isNotFirstTime && current.matches('idle.exam.examing.normalExam.answerShowed')"
                class="exam-mode-intro-block__intro-description"
                anglePosition="left"
              >
                <p class="exam-mode-intro-description__text">
                  你答對了嗎？如果答對了就把卡片往右滑消除。<br>
                  答錯了也沒關係，把卡片往左滑。測驗結束之後我會再幫你進行一次錯誤補強喔！
                </p>
              </home-stream-item>
            </div>
          </div>

          <div
            class="exam-mode-exam-block__enhancement-exam"
            ref="enhancementExamElement"
            :tabindex="current.matches('idle.exam.examing.enhancementExam') ? 0 : -1"
            :aria-hidden="current.matches('idle.exam.examing.enhancementExam') ? false : 'true'"
            @keydown.down="service.send('SHOW_ANSWER')"
            @keydown.left="service.send('NEXT_CARD', { addToEnhancement: true })"
            @keydown.right="service.send('NEXT_CARD')"
          >
            <exam-mode-block
              examType="enhancementExam"
              :service="service"
              :current="current"
            ></exam-mode-block>

            <div
              v-if="!current.context.isNotFirstTime && current.context.enhancementCursor == 0"
              class="exam-mode-normal-exam__intro-block"
            >
              <img
                class="exam-mode-intro-block__go-tyan"
                src="@/assets/go-tyan.svg"
                alt=""
                aria-hidden="true"
              >

              <home-stream-item
                v-if="!current.context.isNotFirstTime && current.matches('idle.exam.examing.enhancementExam')"
                class="exam-mode-intro-block__intro-description"
                anglePosition="left"
              >
                <p class="exam-mode-intro-description__text">
                  補強測驗只能參加一次喔！所以即使又答錯了，還是請你往右滑。
                </p>
              </home-stream-item>
            </div>
          </div>
        </div>

        <div
          class="exam-mode-main-block__finish-block"
          ref="finishExamElement"
        >
          <exam-mode-finish
            :service="service"
            :current="current"
          ></exam-mode-finish>
        </div>
      </main>

      <drawing-board
        opacity="0.8"
        :service="service"
        :current="current"
        :style="{ zIndex: 99 }"
        openState="idle.drawingBoard.show"
        clearCanvasState="idle.drawingBoard.show.clearCanvas"
        clearCanvasBeforeCloseState="idle.drawingBoard.clearCanvasBeforeAnimation"
        openAnimationState="idle.drawingBoard.openDrawingBoardAnimation"
        closeAnimationState="idle.drawingBoard.closeDrawingBoardAnimation"
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
import examModeFinish from '@/components/examModeFinish.vue'
import homeStreamItem from '@/components/homeStreamItem.vue'

export default {
  name: 'ExamMode',
  components: {
    topBar,
    examModeBlock,
    examModeInfoModal,
    drawingBoard,
    examModeFinish,
    homeStreamItem,
  },
  setup (props, context) {
    // element
    const normalExamElement = ref(null)
    const enhancementExamElement = ref(null)
    const examModeInfoModalButtonElement = ref(null)
    const modalTriggerButtonElement = ref(null)
    const examBlockElement = ref(null)
    const finishExamElement = ref(null)

    // data
    const localExamRange = JSON.parse(window.localStorage.getItem('examRange'))
    const isNotFirstTime = JSON.parse(window.localStorage.getItem('isNotFirstTime'))

    if (!isNotFirstTime) window.localStorage.setItem('isNotFirstTime', true)

    const { service, current } = useMachine(machine.withContext({
      ...machine.context,
      examRange: localExamRange || machine.context.examRange,
      isNotFirstTime,
    }))

    const title = computed(function getTitle () {
      switch (context.root.$route.name) {
        case 'hiraganaToRomanization':
          return ['平假名', '拼音']
        case 'hiraganaToKatakana':
          return ['平假名', '片假名']
        case 'katakanaToRomanization':
          return ['片假名', '拼音']
        case 'katakanaToHiragana':
          return ['片假名', '平假名']
        case 'romanizationToHiragana':
          return ['拼音', '平假名']
        case 'romanizationToKatakana':
          return ['拼音', '片假名']
        default:
          return ''
      }
    })

    // effect
    watch(
      () => current.value.matches('idle.exam.examing.changeExamModeAnimation'),
      function changeExamAnimationWatcher () {
        const duration = 0.5
        gsap.timeline()
          .to(normalExamElement.value, {
            position: 'absolute',
            x: '100%',
            delay: 0.1,
            duration,
          })
          .to(enhancementExamElement.value, {
            position: 'relative',
            x: '0%',
            duration,
          }, '-=0.5')
          .then(function changeExamAnimationEnd () {
            service.value.send('CHANGE_EXAM_MODE_ANIMATION_END')
            enhancementExamElement.value.focus()
          })
      },
      { lazy: true }
    )

    watch(
      () => current.value.matches('navigateToExamView'),
      function navigateToExamViewWatcher (value) {
        if (value) context.root.$router.push('/exam')
      },
      { lazy: true }
    )

    watch(
      () => current.value.matches('idle.infoModal.hideInfoModalAnimation'),
      function hideInfoModalAnimationWatcher (value) {
        if (value) modalTriggerButtonElement.value.focus()
      },
      { lazy: true }
    )

    watch(
      () => current.value.matches('idle.exam.examFinish.examFinishAnimation'),
      function examFinishAnimationWatcher (value) {
        if (!value) return

        gsap.set(finishExamElement.value, { display: 'grid', position: 'absolute' })
        const duration = 0.3
        gsap.timeline()
          .to(finishExamElement.value, {
            opacity: 1,
            delay: 0.1,
            duration,
          })
          .to(examBlockElement.value, {
            opacity: 0,
            duration,
          }, `-=${duration}`)
          .then(function finishExamAnimationEnd () {
            service.value.send('EXAM_FINISH_ANIMATION_END')
          })
      },
      { lazy: true }
    )

    watch(
      () => current.value.matches('idle.exam.examFinish.restartExamAnimation'),
      function restartExamAnimationWatcher (value) {
        if (!value) return

        const duration = 0.3
        gsap.timeline()
          .to(finishExamElement.value, {
            opacity: 0,
            duration,
          })
          .set(finishExamElement.value, { display: 'none' })
          .then(function finishExamAnimationEnd () {
            service.value.send('RESTART_EXAM_ANIMATION_END')
          })
      },
      { lazy: true }
    )

    onMounted(function examModeOnMounted () {
      service.value.send('PAGE_MOUNTED')
      // expand page height over 100vh to make sitcky drawing board always at bottom
      // then prevent page scroll for user experience
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
      modalTriggerButtonElement,
      examBlockElement,
      finishExamElement,
      // data
      service,
      current,
      title,
    }
  },
}
</script>

<style scoped>
.exam-mode__content {
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

.exam-mode-info-modal__modal-trigger-button:focus {
  outline: var(--focus-default-outline);
}

body.using-mouse .exam-mode-info-modal__modal-trigger-button:focus {
  outline: none;
}

.exam-mode-info-modal__modal-trigger-button:hover,
.exam-mode-info-modal__modal-trigger-button:active {
  color: var(--text-color);
}

.exam-mode-info-modal__modal-trigger-button:active {
  color: var(--main-color);
}

.exam-mode-content__main-block {
  position: relative;
  width: 100%;
  overflow: hidden;
  padding-top: 5vh;
  height: 150vh;
}

.exam-mode-exam-block__normal-exam {
  width: 100%;
}

.exam-mode-normal-exam__intro-block {
  --logo-size: 60px;
  --column-gap: 15px;

  width: 80%;
  max-width: 420px;
  margin: 0 auto;
  margin-top: 5%;
  display: grid;
  grid-template:
    "go-tyan intro-text" var(--logo-size)
    ".       intro-text" auto / var(--logo-size) 1fr;
  grid-column-gap: var(--column-gap);
  column-gap: var(--column-gap);
}

.exam-mode-intro-block__go-tyan {
  grid-area: go-tyan;
}

.exam-mode-intro-block__intro-description {
  grid-area: intro-text;
}

.exam-mode-intro-description__text {
  white-space: normal;
  font-size: 0.8rem;
  line-height: 1rem;
}

.exam-mode-exam-block__enhancement-exam {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  transform: translateX(-100%);
}

.exam-mode-main-block__finish-block {
  background-color: #fff;
  position: relative;
  display: none;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: 200;
}
</style>
