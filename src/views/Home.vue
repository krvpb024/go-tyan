<template>
  <section class="home">
    <header class="home__header">
      <img
        class="home-header__logo"
        src="@/assets/awu.png"
        alt="阿五 logo"
      >

      <h1 class="home-header__title">
        <span class="home-title__span">阿五</span>
      </h1>

      <button class="home-header__install-button">
        <span class="home-install-button__content">
          + 桌面
        </span>
      </button>

      <div
        class="home-header__stream"
        ref="streamElement"
      >
        <!-- chrome some times won't fire touchmove when listen on home-header__stream -->
        <div
          class="fix-touch"
          @touchstart="streamMoveStart"
          @touchmove.prevent="streamMoving"
          @touchend="streamMoveEnd"
        ></div>

        <div
          class="home-stream__content-block"
          ref="streamContentBlockElement"
        >
          <home-stream-item class="home-content-block__item--first">
            <p>嗨！53阿五！</p>
          </home-stream-item>

          <home-stream-item class="home-content-block__item--second">
            <p>加入到桌面更方便使用喔！</p>
          </home-stream-item>

          <home-stream-item class="home-content-block__item--third">
            <p>詐騙集團走開！</p>
          </home-stream-item>

          <home-stream-item class="home-content-block__item--forth">
            <p>小胖也走開！</p>
          </home-stream-item>

          <home-stream-item class="home-content-block__item--fifth">
            <p>加入到桌面更方便使用喔！fifth</p>
          </home-stream-item>
        </div>
      </div>
    </header>

    <nav class="home__nav">
      <router-link
        to="/table"
        class="home-nav__nav-item"
      >
        <home-card>
          <template #image>
            <img
              src="@/assets/table.svg"
              alt=""
            >
          </template>

          <template #title>
            <h2>五十音表格</h2>
          </template>

          <template #description>
            <ul>
              <li>提供默背及手寫練習</li>
            </ul>
          </template>
        </home-card>
      </router-link>

      <router-link
        to="/exam"
        class="home-nav__nav-item"
      >
        <home-card>
          <template #image>
            <img
              src="@/assets/exam.svg"
              alt=""
            >
          </template>

          <template #title>
            <h2>五十音測驗</h2>
          </template>

          <template #description>
            <ul>
              <li>平假名、片假名、拼音轉換</li>
              <li>手寫測驗</li>
            </ul>
          </template>
        </home-card>
      </router-link>

      <router-link
        to="/"
        class="home-nav__nav-item"
      >
        <home-card>
          <template #image>
            <img
              src="@/assets/about.svg"
              alt=""
            >
          </template>

          <template #title>
            <h2>關於</h2>
          </template>

          <template #description>
            <ul>
              <li>關於這個 App 及我們</li>
            </ul>
          </template>
        </home-card>
      </router-link>

      <router-link
        to="/"
        class="home-nav__nav-item"
      >
        <home-card>
          <template #image>
            <img
              src="@/assets/coffee.svg"
              alt=""
            >
          </template>

          <template #title>
            <h2>Buy me a coffee</h2>
          </template>

          <template #description>
            <ul>
              <li>小額贊助鼓勵我們</li>
            </ul>
          </template>
        </home-card>
      </router-link>
    </nav>
  </section>
</template>

<script>
import { ref, onMounted } from '@vue/composition-api'
import { gsap } from 'gsap'
import { useDragToMove } from '@/utils/useDragToMove.js'
import homeCard from '@/components/homeCard.vue'
import homeStreamItem from '@/components/homeStreamItem.vue'

export default {
  name: 'Home',
  components: { homeCard, homeStreamItem },
  setup () {
    // composition
    const { xMovement, dragStart, getDraggingMovement, dragEnd } = useDragToMove()

    // element
    const streamElement = ref(null)
    const streamContentBlockElement = ref(null)

    // data
    const checkPoint = ref(0)
    const rightBoundary = ref(0)
    const accelerator = ref(1)

    // effect
    onMounted(function homeOnMounted () {
      checkPoint.value = streamElement.value.offsetWidth / 4
      rightBoundary.value = streamElement.value.offsetWidth - streamContentBlockElement.value.scrollWidth
    })

    return {
      // element
      streamElement,
      streamContentBlockElement,
      // data
      xMovement,
      checkPoint,
      rightBoundary,
      // methods
      streamMoveStart,
      streamMoving,
      streamMoveEnd,
    }

    function streamMoveStart (e) {
      dragStart(e)
    }
    function streamMoving (e) {
      const movement = getDraggingMovement(e)
      if (movement == 0) return

      if (movement > 0 && xMovement.value > 0) {
        xMovement.value = xMovement.value + movement * accelerator.value
        accelerator.value = 0.5 - Math.abs(xMovement.value / checkPoint.value)
      } else if ((movement < 0 && xMovement.value < rightBoundary.value)) {
        xMovement.value = xMovement.value + movement * accelerator.value
        const extra = rightBoundary.value - xMovement.value
        accelerator.value = 0.5 - Math.abs(extra / checkPoint.value)
      } else {
        xMovement.value += movement
      }

      streamContentBlockElement.value.style.transform = `translateX(${xMovement.value}px)`
    }
    function streamMoveEnd () {
      dragEnd()
      if (xMovement.value > 0) {
        gsap
          .to(streamContentBlockElement.value, {
            x: 0,
            duration: 0.3,
          })
          .then(function backToPositionAnimationEnd () {
            xMovement.value = 0
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
            gsap.set(streamContentBlockElement.value, { clearProps: true })
            streamContentBlockElement.value.style.transform = `translateX(${xMovement.value}px)`
          })
      }
    }
  },
}
</script>

<style scoped>
.home__header {
  margin-top: 27px;
  display: grid;
  align-items: center;
  grid-gap: 10px;
  gap: 10px;
  grid-template:
    ".      logo   title  .      install-button .     " auto
    "stream stream stream stream stream         stream" auto / 20px 70px auto 1fr auto 20px;
}

.home-header__logo {
  grid-area: logo;
  object-fit: contain;
  width: 100%;
  height: auto;
}

.home-header__title {
  grid-area: title;
  position: relative;
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--text-color);
  text-shadow: 1.7px 1.5px 0 #fff;
}

.home-title__span {
  position: relative;
  z-index: 10;
}

.home-header__title::after {
  position: absolute;
  border-radius: 8px;
  content: "";
  display: block;
  width: calc(100% + 8px);
  height: 80%;
  background-color: var(--main-color);
  bottom: 0;
  left: 0;
  z-index: 9;
  transform: translate(-2px, 2px);
}

.home-header__install-button {
  grid-area: install-button;
  background-color: #fff;
  border: none;
  padding: 0;
  position: relative;
}

.home-header__install-button:focus {
  outline: 4px solid var(--main-color);
  outline-offset: 8px;
}

.home-header__install-button::after {
  content: "";
  display: block;
  background-color: var(--main-color);
  width: 100%;
  height: 100%;
  position: absolute;
  border: 2px solid var(--text-color);
  border-radius: 6px;
  top: 0;
  left: 0;
  z-index: 9;
  transform: translate(4px, 4px);
}

.home-install-button__content {
  position: relative;
  background-color: #fff;
  display: inline-block;
  border: 2px solid var(--text-color);
  border-radius: 6px;
  padding: 6px;
  font-weight: bold;
  font-size: 1rem;
  z-index: 10;
}

.home-header__stream {
  position: relative;
  grid-area: stream;
  overflow: hidden;
  padding: 10px 0;
}

.fix-touch {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  z-index: 100;
}

.home-stream__content-block {
  padding: 0 20px;
  height: 100%;
  display: grid;
  grid-template-columns:
    40px minmax(min-content, auto) 40px minmax(min-content, auto)
    40px minmax(min-content, auto) 40px minmax(min-content, auto) 40px minmax(min-content, auto);
  grid-auto-flow: column dense;
  justify-content: start;
  align-content: flex-start;
  grid-row-gap: 30px;
  row-gap: 30px;
  grid-column-gap: 30px;
  column-gap: 30px;
  z-index: 9;
}

.home-content-block__item--first {
  grid-column: 1 / 4;
  grid-row: 1;
}

.home-content-block__item--second {
  grid-column: 3 / 6;
  grid-row: 2;
}
.home-content-block__item--third {
  grid-column: 5 / 8;
  grid-row: 1;
}

.home-content-block__item--forth {
  grid-column: 7 / 10;
  grid-row: 2;
}

.home-content-block__item--fifth {
  grid-column: 9 / 11;
  grid-row: 1;
}

.home__nav {
  --column-gap: 25px;
  --row-gap: 25px;

  padding: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min-content, auto));
  grid-column-gap: var(--column-gap);
  column-gap: var(--column-gap);
  grid-row-gap: var(--row-gap);
  row-gap: var(--row-gap);
}

.home-nav__nav-item {
  display: block;
}

.home-nav__nav-item:focus {
  outline: 4px solid var(--main-color);
  outline-offset: 6px;
}
</style>
