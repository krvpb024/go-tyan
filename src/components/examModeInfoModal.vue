<template>
  <div
    class="exam-mode-info-modal"
    ref="examModeInfoModalContainerElement"
    tabindex="-1"
    @keydown.esc="service.send('HIDE_INFO_MODAL')"
  >
    <div
      class="exam-mode-info-modal__background"
      ref="examModeInfoModalBackgroundElement"
      @click="service.send('HIDE_INFO_MODAL')"
    ></div>

    <section
      class="exam-mode-info-modal__content-block"
      ref="examModeInfoModalElement"
      role="dialog"
      aria-modal="true"
    >

      <div
        class="exam-mode-info-modal-content-block__main-block"
        ref="examModeInfoModalMainBlockElement"
      >
        <button
          class="exam-mode-info-modal-content-block__close-button"
          ref="closeButtonElement"
          aria-labelledby="info-modal-close-icon-title"
          @click="service.send('HIDE_INFO_MODAL')"
        >
          <img
            src="@/assets/close.svg"
            alt="關閉"
          >
        </button>

        <div class="exam-mode-info-modal-main-block__title-block">
          <h2 class="exam-mode-info-modal-title-block__title">操作方式</h2>
        </div>

        <p
          class="app-visual-hidden"
          id="exam-mode-info-modal-describe"
        >
          使用點擊卡片或是鍵盤方向鍵「下」，來顯示解答；如果回答錯誤，可以左滑卡片或是使用鍵盤方向鍵「左」；如果回答正確，可以右滑卡片或使用鍵盤方向鍵「右」。
        </p>

        <div
          class="exam-mode-info-modal-main-block__description-block exam-mode-info-modal-main-block__description-block--gesture"
          aria-hidden="true"
        >
          <div class="exam-mode-info-modal-description-block__description"></div>

          <div class="exam-mode-info-modal-description-block__description exam-mode-info-modal-description-block__description--head">
            <p class="exam-mode-info-modal-description__text">
              觸控/滑鼠
            </p>
          </div>

          <div class="exam-mode-info-modal-description-block__description exam-mode-info-modal-description-block__description--head">
            <p class="exam-mode-info-modal-description__text">
              鍵盤
            </p>
          </div>

          <div class="exam-mode-info-modal-description-block__description">
            <p class="exam-mode-info-modal-description__text">顯示解答</p>
          </div>

          <div class="exam-mode-info-modal-description-block__description">
            <img
              src="@/assets/show-answer.svg"
              alt=""
              aria-hidden="true"
            >
          </div>

          <div class="exam-mode-info-modal-description-block__description">
            <img
              src="@/assets/keyboard-down.svg"
              alt=""
              aria-hidden="true"
            >
          </div>

          <div class="exam-mode-info-modal-description-block__description">
            <p class="exam-mode-info-modal-description__text">答錯</p>
          </div>

          <div class="exam-mode-info-modal-description-block__description">
            <img
              src="@/assets/left-swipe.svg"
              alt=""
              aria-hidden="true"
            >
          </div>

          <div class="exam-mode-info-modal-description-block__description">
            <img
              src="@/assets/keyboard-left.svg"
              alt=""
              aria-hidden="true"
            >
          </div>

          <div class="exam-mode-info-modal-description-block__description">
            <span class="exam-mode-info-modal-description__text">答對</span>
          </div>

          <div class="exam-mode-info-modal-description-block__description">
            <img
              src="@/assets/right-swipe.svg"
              alt=""
              aria-hidden="true"
            >
          </div>

          <div class="exam-mode-info-modal-description-block__description">
            <img
              src="@/assets/keyboard-right.svg"
              alt=""
              aria-hidden="true"
            >
          </div>
        </div>
      </div>

    </section>
  </div>
</template>

<script>
import { ref, watch, onMounted } from '@vue/composition-api'
import { gsap } from 'gsap'
import { useModalNavigation } from '@/utils/useModalNavigation'

export default {
  name: 'examModeInfoModal',
  props: {
    service: {
      type: Object,
      required: true,
    },
    current: {
      type: Object,
      required: true,
    },
    buttonInfo: {
      type: Object,
    },
  },
  setup (props) {
    // element
    const examModeInfoModalContainerElement = ref(null)
    const examModeInfoModalBackgroundElement = ref(null)
    const examModeInfoModalElement = ref(null)
    const examModeInfoModalMainBlockElement = ref(null)
    const closeButtonElement = ref(null)

    // data
    const examModeInfoModalAnimationTimeline = ref(null)
    const modalFocusables = ref(null)

    // composition
    useModalNavigation(modalFocusables)

    // effect
    watch(
      () => props.current.matches('idle.infoModal.showInfoModalAnimation'),
      function showInfoModalAnimationWatcher (value) {
        if (!value) return
        const { top, left, width, height } = getOffset(examModeInfoModalContainerElement.value)

        showInfoModalAnimation()
          .then(function showAnimationEnd () {
            props.service.send('SHOW_INFO_MODAL_ANIMATION_END')
            closeButtonElement.value.focus()
          })

        function getOffset (el) {
          const { top, left, width, height } = el.getBoundingClientRect()

          return {
            left: left + window.scrollX,
            top: top + window.scrollY,
            width,
            height,
          }
        }

        function showInfoModalAnimation () {
          gsap.set(examModeInfoModalMainBlockElement.value, { clearProps: 'all' })
          gsap.set(examModeInfoModalElement.value, { clearProps: 'all' })
          gsap.set(examModeInfoModalElement.value, { display: 'block' })
          gsap.set(examModeInfoModalBackgroundElement.value, { display: 'block' })

          examModeInfoModalAnimationTimeline.value = gsap.timeline({ paused: true })

          const duration = 0.3
          return examModeInfoModalAnimationTimeline.value
            .from(examModeInfoModalElement.value, {
              left,
              top,
              width,
              height,
              duration,
              ease: 'circ.inOut',
            })
            .from(examModeInfoModalElement.value, {
              x: '+=50%',
              y: '+=50%',
              duration: duration - 0.1,
            }, `-=${duration}`)
            .fromTo(examModeInfoModalMainBlockElement.value, {
              display: 'none',
              opacity: 0,
            }, {
              display: 'block',
              opacity: 1,
              duration: duration - 0.2,
            })
            .play()
        }
      }
    )

    watch(
      () => props.current.matches('idle.infoModal.hideInfoModalAnimation'),
      function hideInfoModalAnimationWatcher (value) {
        if (!value) return
        hideInfoModalAnimation()
          .then(function hideAnimationEnd () {
            props.service.send('HIDE_INFO_MODAL_ANIMATION_END')
          })

        function hideInfoModalAnimation () {
          return examModeInfoModalAnimationTimeline.value.reverse()
            .then(function hideModal () {
              gsap.set(examModeInfoModalElement.value, { display: 'none' })
              gsap.set(examModeInfoModalBackgroundElement.value, { display: 'none' })
            })
        }
      }
    )

    onMounted(function examModeInfoModalOnMounted () {
      modalFocusables.value = examModeInfoModalContainerElement.value.querySelectorAll('button')
    })

    return {
      // element
      examModeInfoModalMainBlockElement,
      examModeInfoModalContainerElement,
      examModeInfoModalElement,
      examModeInfoModalBackgroundElement,
      closeButtonElement,
      modalFocusables,
    }
  },
}
</script>

<style scoped>
.exam-mode-info-modal {
  position: absolute;
  z-index: 100;
  width: 100%;
  height: 100%;
}

.exam-mode-info-modal__background {
  display: none;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.exam-mode-info-modal__content-block {
  position: fixed;
  width: 70%;
  max-width: calc(var(--app-max-width) * 0.5);
  border-radius: 6px;
  box-shadow: 0 3px 20px 0 rgba(0, 0, 0, 0.16);
  border: solid 3px var(--text-color);
  background-color: #fff;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  display: none;
  overflow: hidden;
  will-change: auto;
}

.exam-mode-info-modal-content-block__close-button {
  position: absolute;
  left: 10px;
  top: 10px;
  padding: 0;
  background-color: transparent;
  border: var(--focus-border-width) solid transparent;
  display: flex;
  align-items: center;
  justify-content: center;
}

.exam-mode-info-modal-content-block__close-button:focus {
  outline: var(--focus-default-outline);
}

body.using-mouse .exam-mode-info-modal-content-block__close-button:focus {
  outline: none;
}

.exam-mode-info-modal-main-block__title-block {
  text-align: center;
  border-bottom: 3px solid var(--text-color);
  width: 80%;
  margin: 0 auto;
  padding-top: 31px;
  padding-bottom: 22px;
}

.exam-mode-info-modal-title-block__title {
  font-size: 1.25rem;
  margin: 0;
}

.exam-mode-info-modal-main-block__description-block {
  position: relative;
  margin: 10px 10% 30px;
}

.exam-mode-info-modal-main-block__description-block--gesture {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  grid-row-gap: 40px;
  row-gap: 40px;
  margin: 25px 20px 45px;
}

.exam-mode-info-modal-description-block__description {
  display: flex;
  align-items: center;
  justify-content: center;
}

.exam-mode-info-modal-description-block__description--head {
  align-self: end;
}

.exam-mode-info-modal-description__text {
  font-size: 1rem;
  font-weight: bold;
  white-space: nowrap;
}

.exam-mode-info-modal-description__list-group {
  padding-top: 5px;
  font-size: 1rem;
  font-weight: bold;
}

.exam-mode-info-modal-list-group__list-item {
  white-space: normal;
  line-height: 1.5rem;
}

.exam-mode-info-modal-list-group__list-item
  + .exam-mode-info-modal-list-group__list-item {
  margin-top: 10px;
}
</style>
