<template>
  <div class="exam-mode-info-modal" ref="examModeInfoModalContainerElement">
    <div
      class="exam-mode-info-modal__background"
      ref="examModeInfoModalBackgroundElement"
      @click="service.send('HIDE_INFO_MODAL')"
    ></div>

    <section
      class="exam-mode-info-modal__content-block"
      ref="examModeInfoModalElement"
    >
      <button
        class="exam-mode-info-modal-content-block__close-button"
        ref="closeButtonElement"
        @click="service.send('HIDE_INFO_MODAL')"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14.729"
          height="14.727"
          viewBox="0 0 14.729 14.727"
        >
          <g
            id="Group_101"
            data-name="Group 101"
            transform="translate(-.414 -.415)"
          >
            <path
              id="Union_10"
              d="M-11781.959-9448.151l-5.657-5.657-5.656 5.657a1 1 0 0 1-1.415 0 1 1 0 0 1 0-1.415l5.657-5.656-5.657-5.657a1 1 0 0 1 0-1.412 1 1 0 0 1 1.415 0l5.656 5.656 5.657-5.656a1 1 0 0 1 1.415 0 1 1 0 0 1 0 1.412l-5.658 5.658 5.655 5.655a1 1 0 0 1 0 1.415.991.991 0 0 1-.705.293 1 1 0 0 1-.707-.293z"
              fill="#313131"
              data-name="Union 10"
              transform="translate(11795.395 9463)"
            />
          </g>
        </svg>
      </button>

      <div class="exam-mode-info-modal-content-block__title-block">
        <h2 class="exam-mode-info-modal-title-block__title">操作方式</h2>
      </div>

      <div class="exam-mode-info-modal-content-block__description-block">
        <div class="exam-mode-info-modal-description-block__description">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32.503"
            height="33.072"
            viewBox="0 0 32.503 33.072"
          >
            <g
              id="Group_201"
              isolation="isolate"
              data-name="Group 201"
              transform="translate(-106.898 -195)"
            >
              <path
                id="Union_14"
                d="M-15187.237-5735.98l-.713-.706a7 7 0 0 1 0-9.9l2.123-2.124a3.977 3.977 0 0 1 2.329-1.14v-9.15a8.007 8.007 0 0 1 8-8h10a8.01 8.01 0 0 1 8 8v15a8.01 8.01 0 0 1-8 8h-10a8 8 0 0 1-1.651-.171l-.194.194a6.962 6.962 0 0 1-4.948 2.051 6.96 6.96 0 0 1-4.946-2.054zm21.737-2.021a6.007 6.007 0 0 0 6-6v-15a6.007 6.007 0 0 0-6-6h-10a6 6 0 0 0-6 6v7.375l4.037-4.04a1.758 1.758 0 0 1 2.475 0 1.757 1.757 0 0 1 0 2.478l-4.834 4.834 4.6 4.6a4 4 0 0 1 0 5.654l-.1.1z"
                fill="#313131"
                data-name="Union 14"
                transform="translate(15296.898 5962.001)"
              />
            </g>
          </svg>

          <span class="exam-mode-info-modal-description__text">點擊解答</span>
        </div>

        <div class="exam-mode-info-modal-description-block__description">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="39.603"
            height="32.996"
            viewBox="0 0 39.603 32.996"
          >
            <path
              id="Union_17"
              d="M-15177-5734.006a7.938 7.938 0 0 1-5.428-2.123A8.013 8.013 0 0 1-15189-5744v-15a8.007 8.007 0 0 1 8-8h10a7.983 7.983 0 0 1 5.429 2.127 7.992 7.992 0 0 1 4.513 2.524A7.945 7.945 0 0 1-15159-5757v2.1h8.451a1.15 1.15 0 0 1 1.151 1.151 1.149 1.149 0 0 1-1.151 1.147h-8.451v10.6a8.007 8.007 0 0 1-8 8zm14-9.995a8.013 8.013 0 0 1-7.757 7.994h3.755a6 6 0 0 0 6-6v-10.6h-2zm-24-15v15a6.009 6.009 0 0 0 6 6h10a6.009 6.009 0 0 0 6-6v-8.6h-8.684l4.872 4.872a1.151 1.151 0 0 1 0 1.627 1.148 1.148 0 0 1-.812.339 1.148 1.148 0 0 1-.815-.339l-6.857-6.857a1.15 1.15 0 0 1 0-1.628l.061-.057a1.868 1.868 0 0 1 .148-.183l6.861-6.861a1.153 1.153 0 0 1 1.624 0 1.15 1.15 0 0 1 0 1.628l-5.157 5.161h8.76v-4.1a6 6 0 0 0-6-6h-10A6 6 0 0 0-15187-5759zm26 4.1v-2.1a5.958 5.958 0 0 0-1.075-3.427 5.966 5.966 0 0 0-1.472-1.479 7.941 7.941 0 0 1 .547 2.907v4.1z"
              fill="#313131"
              data-name="Union 17"
              transform="translate(15189 5767.002)"
            />
          </svg>

          <span class="exam-mode-info-modal-description__text">左滑置後</span>
        </div>

        <div class="exam-mode-info-modal-description-block__description">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="41.125"
            height="32.996"
            viewBox="0 0 41.125 32.996"
          >
            <path
              id="Union_18"
              d="M-15177-5734.006a7.938 7.938 0 0 1-5.428-2.123A8.013 8.013 0 0 1-15189-5744v-15a8.007 8.007 0 0 1 8-8h10a7.983 7.983 0 0 1 5.429 2.127 7.992 7.992 0 0 1 4.513 2.524A7.945 7.945 0 0 1-15159-5757v9.812h7.174l-4.871-4.872a1.149 1.149 0 0 1 0-1.627 1.141 1.141 0 0 1 .812-.335 1.146 1.146 0 0 1 .816.335l6.857 6.861a1.147 1.147 0 0 1 0 1.624c-.02.023-.042.042-.062.061a1.105 1.105 0 0 1-.148.183l-6.861 6.858a1.146 1.146 0 0 1-1.624 0 1.15 1.15 0 0 1 0-1.628l5.157-5.157h-7.25v2.882a8.007 8.007 0 0 1-8 8zm14-9.995a8.013 8.013 0 0 1-7.757 7.994h3.755a6 6 0 0 0 6-6v-2.882h-2zm-24-15v15a6.009 6.009 0 0 0 6 6h10a6.009 6.009 0 0 0 6-6v-.888h-7.959a1.153 1.153 0 0 1-1.151-1.151 1.15 1.15 0 0 1 1.151-1.151h7.959V-5759a6 6 0 0 0-6-6h-10a6 6 0 0 0-6 6zm26 11.809V-5757a5.958 5.958 0 0 0-1.075-3.427 5.966 5.966 0 0 0-1.472-1.479 7.941 7.941 0 0 1 .547 2.906v11.809z"
              fill="#313131"
              data-name="Union 18"
              transform="translate(15189 5767.002)"
            />
          </svg>

          <span class="exam-mode-info-modal-description__text">右滑消除</span>
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

        function getOffset (el) {
          const { top, left, width, height } = el.getBoundingClientRect()

          return {
            left: left + window.scrollX,
            top: top + window.scrollY,
            width,
            height,
          }
        }

        showInfoModalAnimation()
          .then(function showAnimationEnd () {
            props.service.send('SHOW_INFO_MODAL_ANIMATION_END')
            closeButtonElement.value.focus()
          })

        function showInfoModalAnimation () {
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
  max-width: calc(var(--app-max-width) * 0.7);
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
  right: 10px;
  top: 10px;
  padding: 3px;
  background-color: transparent;
  border: var(--focus-border-width) solid transparent;
}

.exam-mode-info-modal-content-block__close-button:focus {
  border: 4px solid var(--main-color);
  outline: none;
}

.exam-mode-info-modal-content-block__title-block {
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

.exam-mode-info-modal-content-block__description-block {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.exam-mode-info-modal-description-block__description {
  margin: 30px 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.exam-mode-info-modal-description__text {
  margin-left: 30px;
  font-size: 1rem;
  font-weight: bold;
}
</style>
