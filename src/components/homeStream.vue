<template>
  <section
    class="home-stream"
    ref="streamElement"
    tabindex="0"
    @keydown="streamMoveByKey"
    @wheel="wheelStreamScroll"
    @mousedown="streamMoveStart"
    @mousemove.passive="streamMoving"
    @mouseup="streamMoveEnd"
    @touchstart="streamMoveStart"
    @touchmove.passive="streamMoving"
    @touchend="streamMoveEnd"
  >
    <h2 class="app-visual-hidden">最新消息</h2>

    <div
      class="home-stream__content-block"
      ref="streamContentBlockElement"
    >
      <home-stream-item class="home-stream-content-block__item--first">
        <p>嗨！我是阿五！</p>
      </home-stream-item>

      <home-stream-item class="home-stream-content-block__item--second">
        <p>把頁面加入書籤，或是安裝至手機桌面會更方便使用喔！</p>
      </home-stream-item>

      <home-stream-item class="home-stream-content-block__item--third">
        <p>2020 年 1 月 11 日，一定要回家投票喔！</p>
      </home-stream-item>
    </div>
  </section>
</template>

<script>
import { ref, onMounted, computed } from '@vue/composition-api'
import { gsap } from 'gsap'
import { useDragToMove } from '@/utils/useDragToMove.js'
import homeStreamItem from '@/components/homeStreamItem.vue'

export default {
  components: { homeStreamItem },
  setup () {
    // composition
    const { xMovement, canDrag, dragStart, getDraggingMovement, dragEnd } = useDragToMove()

    // element
    const streamElement = ref(null)
    const streamContentBlockElement = ref(null)

    // data
    const crossLimit = ref(0)
    const leftBoundary = ref(0)
    const rightBoundary = ref(null)
    const accelerator = ref(1)

    const touchStartPoint = ref(0)
    const toucheStartTime = ref(0)
    const touchEndPoint = ref(0)
    const toucheEndTime = ref(0)

    const velocity = ref(0)
    const touchDuration = computed(function getTouchDuration () {
      return toucheEndTime.value - toucheStartTime.value
    })

    // effect
    onMounted(function homeOnMounted () {
      crossLimit.value = streamElement.value.offsetWidth / 4
      rightBoundary.value = streamElement.value.offsetWidth - streamContentBlockElement.value.scrollWidth
    })

    return {
      // element
      streamElement,
      streamContentBlockElement,
      // data
      xMovement,
      crossLimit,
      rightBoundary,
      touchStartPoint,
      touchEndPoint,
      touchDuration,
      // methods
      streamMoveStart,
      streamMoving,
      streamMoveEnd,
      wheelStreamScroll,
      streamMoveByKey,
    }

    function streamMoveStart (e) {
      dragStart(e)
      touchStartPoint.value = e.touches ? e.touches[0].pageX : e.x
      toucheStartTime.value = e.timeStamp
    }

    function streamMoving (e) {
      if (!canDrag.value) return
      const movement = getDraggingMovement(e)
      touchEndPoint.value = e.touches ? e.touches[0].pageX : e.x

      if (movement > 0 && xMovement.value > leftBoundary.value) {
        xMovement.value = xMovement.value + movement * accelerator.value
        // check current position to crossLimit percentage
        accelerator.value = 0.5 - Math.abs(xMovement.value / crossLimit.value)
      } else if (movement < 0 && xMovement.value < rightBoundary.value) {
        xMovement.value = xMovement.value + movement * accelerator.value
        const extra = rightBoundary.value - xMovement.value
        // check current position to crossLimit percentage
        accelerator.value = 0.5 - Math.abs(extra / crossLimit.value)
      } else {
        xMovement.value += movement
      }

      streamContentBlockElement.value.style.transform = `translateX(${xMovement.value}px)`
    }

    function streamMoveEnd (e) {
      dragEnd()
      toucheEndTime.value = e.timeStamp

      if (xMovement.value > leftBoundary.value) {
        gsap
          .to(streamContentBlockElement.value, {
            x: 0,
            duration: 0.3,
          })
          .then(function backToPositionAnimationEnd () {
            xMovement.value = 0
            // don't know why if don't clear props, duration will be ignored
            gsap.set(streamContentBlockElement.value, { clearProps: true })
          })
      } else if (xMovement.value < rightBoundary.value) {
        gsap
          .to(streamContentBlockElement.value, {
            x: rightBoundary.value,
            duration: 0.3,
          })
          .then(function backToPositionAnimationEnd () {
            xMovement.value = rightBoundary.value
            // don't know why if don't clear props, duration will be ignored
            gsap.set(streamContentBlockElement.value, { clearProps: true })
            streamContentBlockElement.value.style.transform = `translateX(${xMovement.value}px)`
          })
        // if drag time too long, then ignore
      } else if (touchDuration.value <= 500) {
        velocity.value = (touchEndPoint.value - touchStartPoint.value) / 8
        inertiaFrame()
      }

      function inertiaFrame () {
        if (
          rightBoundary.value < xMovement.value &&
          xMovement.value < leftBoundary.value
        ) {
          requestAnimationFrame(inertiaFrame)
        }

        let resultValue = xMovement.value + velocity.value
        if (resultValue > leftBoundary.value) {
          resultValue = 0
        } else if (resultValue < rightBoundary.value) {
          resultValue = rightBoundary.value
        }
        const friction = 0.96
        xMovement.value = resultValue
        streamContentBlockElement.value.style.transform = `translateX(${xMovement.value}px)`
        velocity.value *= friction
      }
    }

    function wheelStreamScroll (e) {
      if ((e.deltaY > 0 && rightBoundary.value < xMovement.value) ||
        (e.deltaY < 0 && xMovement.value < leftBoundary.value)
      ) {
        e.preventDefault()
      }

      const movement = (e.deltaY * -1) * 10
      const resultValue = getResultMovementBetweenBoundary(movement)
      xMovement.value = resultValue
      streamContentBlockElement.value.style.transform = `translateX(${xMovement.value}px)`
    }

    function streamMoveByKey (e) {
      if (!['ArrowRight', 'ArrowLeft'].includes(e.key)) return

      let resultValue
      const moveStep = 15

      switch (e.key) {
        case 'ArrowRight':
          e.preventDefault()
          resultValue = getResultMovementBetweenBoundary(moveStep)
          break
        case 'ArrowLeft':
          e.preventDefault()
          resultValue = getResultMovementBetweenBoundary(moveStep * -1)
          break
        default:
          break
      }
      xMovement.value = resultValue
      streamContentBlockElement.value.style.transform = `translateX(${xMovement.value}px)`
    }

    function getResultMovementBetweenBoundary (addValue) {
      let resultValue = xMovement.value + addValue

      if (resultValue > leftBoundary.value) {
        resultValue = 0
      } else if (resultValue < rightBoundary.value) {
        resultValue = rightBoundary.value
      }

      return resultValue
    }
  },
}
</script>

<style scoped>
.home-stream {
  position: relative;
  grid-area: stream;
  overflow: hidden;
  padding: 10px 0;
  width: 100%;
  height: 100%;
}

.home-stream:focus {
  outline: 4px solid var(--main-color);
  outline-offset: 6px;
}

.home-stream__content-block {
  padding: 0 20px;
  height: 100%;
  display: grid;
  grid-template-columns:
    min-content 90px min-content
    250px min-content 40px min-content 40px min-content;
  grid-auto-flow: column dense;
  justify-content: start;
  align-content: flex-start;
  grid-row-gap: 30px;
  row-gap: 30px;
  z-index: 9;
}

.home-stream-content-block__item--first {
  grid-column: 1 / 3;
  grid-row: 1;
}

.home-stream-content-block__item--second {
  grid-column: 2 / 5;
  grid-row: 2;
}
.home-stream-content-block__item--third {
  grid-column: 4 / 7;
  grid-row: 1;
}

.home-stream-content-block__item--forth {
  grid-column: 6 / 9;
  grid-row: 2;
}

.home-stream-content-block__item--fifth {
  grid-column: 8 / 10;
  grid-row: 1;
}
</style>
