<template>
  <section
    class="exam-range-modal-container"
    aria-labelledby="exam-range-modal-title"
    role="dialog"
    aria-modal="true"
    ref="examRangeModalContainerElement"
  >
    <div class="exam-range-background" @click="service.send('HIDE_EXAM_RANGE_MODAL')"></div>

    <div class="exam-range-modal">
      <div class="top-bar">
        <top-bar
          :withBorder="false"
          @leftClick="service.send('HIDE_EXAM_RANGE_MODAL')"
          @rightClick="service.send('SET_EXAM_RANGE')"
        >
          <template #leftContainer>
            <button @click="service.send('HIDE_EXAM_RANGE_MODAL')">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14.729"
                height="14.727"
                viewBox="0 0 16 16"
              >

                <filter id="shadow">
                  <feDropShadow
                    dx="2.2"
                    dy="2.2"
                    stdDeviation="0"
                    flood-color="#ffffff"
                  />
                </filter>

                <g
                  id="Group_101"
                  data-name="Group 101"
                  transform="translate(-.414 -.415)"
                >
                  <path
                    id="Union_10"
                    d="M-11781.959-9448.151l-5.657-5.657-5.656 5.657a1 1 0 0 1-1.415 0 1 1 0 0 1 0-1.415l5.657-5.656-5.657-5.657a1 1 0 0 1 0-1.412 1 1 0 0 1 1.415 0l5.656 5.656 5.657-5.656a1 1 0 0 1 1.415 0 1 1 0 0 1 0 1.412l-5.658 5.658 5.655 5.655a1 1 0 0 1 0 1.415.991.991 0 0 1-.705.293 1 1 0 0 1-.707-.293z"
                    class="cls-1"
                    fill="#313131"
                    filter="url(#shadow)"
                    data-name="Union 10"
                    transform="translate(11795.395 9463)"
                  />
                </g>
              </svg>
            </button>
          </template>

          <h1 id="exam-range-modal-title">設定</h1>

          <template #rightContainer>
            <button @click="service.send('SET_EXAM_RANGE')">儲存</button>
          </template>
        </top-bar>
      </div>

      <div class="scroll-container">

        <h2 class="subtitle">設定測驗範圍</h2>

        <form
          @submit.prevent="service.send('SET_EXAM_RANGE')"
          aria-labelledby="exam-range-modal-title"
        >
          <section v-show="current.matches('examRangeModal.show.error')">
            <div
              role="alert"
              v-if="current.meta['examRangeView.examRangeModal.show.error']"
            >
              <p>{{ current.meta['examRangeView.examRangeModal.show.error'].message }}</p>
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
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, watch, onMounted } from '@vue/composition-api'
import { gsap } from 'gsap'
import { generateTitle } from '@/states/gojuon.js'
import { useModalNavigation } from '@/utils/useModalNavigation.js'
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
    buttonInfo: {
      type: Object,
    },
  },
  setup (props, context) {
    const examRangeModalContainerElement = ref(null)

    const examRangeModalAnimationTimeline = ref(null)

    const modalFocusables = ref(null)
    useModalNavigation(modalFocusables)

    watch(
      () => props.current.matches('examRangeModal.showAnimation'),
      function showModalAnimationWatcher (value) {
        if (!value) return

        showModalAnimation()
          .then(function animationEnd () {
            props.service.send('SHOW_EXAM_RANGE_MODAL_ANIMATION_END')
            modalFocusables.value = examRangeModalContainerElement.value.querySelectorAll('button, input[type="checkbox"]')
            modalFocusables.value[0] && modalFocusables.value[0].focus()
          })
      },
      { lazy: true }
    )

    watch(
      () => props.current.matches('examRangeModal.hideAnimation'),
      function hideModalAnimationWatcher (value) {
        if (!value) return

        hideModalAnimation()
          .then(function animationEnd () {
            props.service.send('HIDE_EXAM_RANGE_MODAL_ANIMATION_END')
            context.emit('modalHide')
          })
      },
      { lazy: true }
    )

    onMounted(function examRangeModalOnMounted () {
      props.service.send('PAGE_MOUNTED')
    })

    return {
      examRangeModalContainerElement,
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
    }

    function updateSelectedGojuon ({ groupName, rowIndex }, { currentTarget: { checked } }) {
      props.service.send('UPDATE_SELECTED_GOJUON', {
        data: {
          checked,
          target: `${groupName}-${rowIndex}`,
        },
      })
    }

    function showModalAnimation () {
      gsap.set('.exam-range-modal', { clearProps: 'all' })
      gsap.set('.exam-range-modal-container', { display: 'block' })

      examRangeModalAnimationTimeline.value = gsap.timeline({ paused: true })

      return examRangeModalAnimationTimeline.value
        .from('.exam-range-modal', {
          left: props.buttonInfo.left,
          top: props.buttonInfo.top,
          width: props.buttonInfo.width,
          height: props.buttonInfo.height,
          duration: 0.3,
          ease: 'circ.inOut',
        })
        .from('.exam-range-modal', {
          x: '+=50%',
          y: '+=50%',
          duration: 0.15,
        }, '-=0.3')
        .to('.exam-range-background', {
          duration: 0.3,
          opacity: 0.5,
        }, '-=0.3')
        .play()
    }

    function hideModalAnimation () {
      return examRangeModalAnimationTimeline.value.reverse()
        .then(function hideModal () {
          gsap.set('.exam-range-modal-container', { display: 'none' })
        })
    }
  },
}
</script>

<style scoped>
.exam-range-modal-container {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: none;
}

.exam-range-background {
  position: fixed;
  background-color: #000;
  opacity: 0;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  will-change: auto;
}

.exam-range-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  background-color: #fff;
  border: solid 2px var(--text-color);
  border-radius: 4px;
  overflow: hidden;
  will-change: auto;
}

.scroll-container {
  flex: 1;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  padding: 0 5px;
}

.subtitle {
  font-size: 1.2rem;
  font-weight: bold;
  padding: 12px 8px;
  margin: 0;
}

.gojuon-group-container {
  border-bottom: 0.5px solid #d3d3d3;
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
