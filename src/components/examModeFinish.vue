<template>
  <section class="exam-mode-finish" aria-live="polite">
    <div class="exam-mode-finish__logo-block">
      <img
        src="@/assets/go-tyan.svg"
        alt=""
        aria-hidden="true"
      >
    </div>

    <div class="exam-mode-finish__description-block">
      <home-stream-item class="home-content-block__item--first">
        <h2 class="exam-mode-finish__title" id="exam-mode-finish__title">測驗結束囉！</h2>
      </home-stream-item>
    </div>

    <div class="exam-mode-finish__again-block">
      <two-layer-button
        :invert="true"
        @buttonClick="takeExamAgain"
      >
        <span class="exam-mode-finish-block__two-layer-button-icon">
          <img
            src="@/assets/again.svg"
            alt=""
            aria-hidden="true"
          >
        </span>
        再試一次
      </two-layer-button>
    </div>

    <div class="exam-mode-finish__leave-block">
      <two-layer-button
        tagType="a"
        :invert="true"
        @buttonClick="leave"
        hrefValue="/exam"
      >
        <span class="exam-mode-finish-block__two-layer-button-icon">
          <img
            src="@/assets/exit.svg"
            alt=""
            aria-hidden="true"
          >
        </span>

        離開這裡
      </two-layer-button>
    </div>
  </section>
</template>

<script>
import homeStreamItem from '@/components/homeStreamItem.vue'
import twoLayerButton from '@/components/twoLayerButton.vue'

export default {
  components: { homeStreamItem, twoLayerButton },
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
  setup (props, context) {
    return {
      takeExamAgain,
      leave,
    }

    function takeExamAgain () {
      window.gtag('event', 'take_exam_again', {
        'event_category': 'exam_mode',
        'event_label': 'take_exam_again',
      })

      props.service.send('TAKE_EXAM_AGAIN')
    }

    function leave () {
      window.gtag('event', 'leave_exam', {
        'event_category': 'exam_mode',
        'event_label': 'leave_exam',
      })

      context.root.$router.go(-1)
    }
  },
}
</script>

<style scoped>
.exam-mode-finish {
  display: grid;
  width: 100%;
  height: 100%;
  grid-template:
    "go-tyan      go-tyan     " auto
    "description  description " auto
    "again-button leave-button" auto / auto auto;
  justify-content: center;
  align-content: start;
  justify-items: center;
  grid-column-gap: 30px;
  column-gap: 30px;
  margin-top: 70px;
}

.exam-mode-finish__title {
  font-size: 1.25rem;
}

.exam-mode-finish__logo-block {
  grid-area: go-tyan;
  width: 126px;
  height: 124px;
  margin-bottom: 20px;
}

.exam-mode-finish__description-block {
  grid-area: description;
  margin-bottom: 70px;
}

.exam-mode-finish__again-block {
  grid-area: again-button;
}

.exam-mode-finish__leave-block {
  grid-area: leave-button;
}

.exam-mode-finish-block__two-layer-button-icon {
  width: 25px;
  height: 24px;
  display: inline-block;
  margin-left: 5px;
}

.exam-mode-finish-block__two-layer-button-icon svg {
  max-width: 100%;
  max-height: 100%;
}
</style>
