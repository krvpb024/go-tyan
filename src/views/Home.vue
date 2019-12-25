<template>
  <section class="home">
    <header class="home__header">
      <div class="home-header__logo">
        <img src="@/assets/go-tyan.svg" alt="" aria-hidden="true">
      </div>

      <h1 class="home-header__title">
        <span class="home-title__span">阿五</span>
      </h1>

      <two-layer-button
        v-if="showAddToHomeButton"
        aria-label="安裝至手機桌面"
        @buttonClick="addToHomeScreen"
      >
        + 桌面
      </two-layer-button>

      <home-stream></home-stream>
    </header>

    <nav class="home__nav">
      <router-link
        to="/table"
        class="home-nav__nav-item"
      >
        <home-card>
          <template #image>
            <img src="@/assets/table.svg" alt="" aria-hidden="true">
          </template>

          <template #title>
            <h2>五十音表格</h2>
          </template>

          <template #description>
            <ul class="home-nav-item__list-group">
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
<img src="@/assets/exam.svg" alt="" aria-hidden="true">
          </template>

          <template #title>
            <h2>五十音測驗</h2>
          </template>

          <template #description>
            <ul class="home-nav-item__list-group">
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
            <img src="@/assets/about.svg" alt="" aria-hidden="true">
          </template>

          <template #title>
            <h2>關於</h2>
          </template>

          <template #description>
            <ul class="home-nav-item__list-group">
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
<img src="@/assets/coffee.svg" alt="" aria-hidden="true">
          </template>

          <template #title>
            <h2>Buy me a coffee</h2>
          </template>

          <template #description>
            <ul class="home-nav-item__list-group">
              <li>小額贊助鼓勵我們</li>
            </ul>
          </template>
        </home-card>
      </router-link>
    </nav>

    <div
      class="home__tooltips-container"
      :class="{ 'home__tooltips-container--ios-safari': isIosSafari }"
    >
      <tooltips
        class="home__tooltips"
        :service="service"
        :current="current"
        showState="tooltips"
        showAnimationState="tooltips.showTooltipsAnimation"
        idleState="tooltips.showTooltips"
        hideAnimationState="tooltips.hideTooltipsAnimation"
        :anglePosition="{ left: '50%', bottom: '0' }"
        angleTransformX="-50%"
        angleTransformY="50%"
      >
        點擊
        <svg class="home-tooltips__icon" xmlns="http://www.w3.org/2000/svg" width="15.998" height="23.872" viewBox="0 0 15.998 23.872">
          <g id="Group_392" data-name="Group 392" transform="translate(-127 -37.131)">
            <path id="Subtraction_67" data-name="Subtraction 67" d="M-22203-15081h-16v-17h5v.942h-4.061v15.111h14.119v-15.111H-22208v-.942h5v17Z" transform="translate(22346 15142)" fill="#313131"/>
            <path id="Union_11" data-name="Union 11" d="M4.6,8.554.56,4.9a.46.46,0,0,1,0-.7L4.6.544a.588.588,0,0,1,.77,0,.46.46,0,0,1,0,.7L2.309,4.011H14.943a.493.493,0,0,1,0,.985H2.21l3.162,2.86a.46.46,0,0,1,0,.7.585.585,0,0,1-.77,0Z" transform="translate(139.566 36.73) rotate(90)" fill="#313131"/>
          </g>
        </svg>
        選擇加入主畫面
      </tooltips>
    </div>

    <div
      class="home__tooltips-container"
      :class="{ 'home__tooltips-container--android-firefox': isAndroidFirefox }"
    >
      <tooltips
        class="home__tooltips"
        :service="service"
        :current="current"
        showState="tooltips"
        showAnimationState="tooltips.showTooltipsAnimation"
        idleState="tooltips.showTooltips"
        hideAnimationState="tooltips.hideTooltipsAnimation"
        :anglePosition="{ right: '70px', top: '0' }"
        angleTransformY="-50%"
      >
        點擊
        <svg class="home-tooltips__icon" xmlns="http://www.w3.org/2000/svg" width="22.636" height="22.301" viewBox="0 0 22.636 22.301">
          <g id="Group_393" data-name="Group 393" transform="translate(-165.743 -33.698)">
            <g id="Group_391" data-name="Group 391" transform="translate(-119 7)">
              <path id="Path_166" data-name="Path 166" d="M.967-.033A.89.89,0,0,1,1.9.9L1.434,14.434a1.051,1.051,0,0,1-1,1A.89.89,0,0,1-.5,14.5L-.033.967A1.051,1.051,0,0,1,.967-.033Z" transform="translate(296.01 27.075) rotate(45)" fill="#313131"/>
              <path id="Path_165" data-name="Path 165" d="M.967.033a1.051,1.051,0,0,1,1,1l.466,13.534A.89.89,0,0,1,1.5,15.5a1.051,1.051,0,0,1-1-1L.033.967A.89.89,0,0,1,.967.033Z" transform="translate(307.425 37.637) rotate(135)" fill="#313131"/>
              <rect id="Rectangle_895" data-name="Rectangle 895" width="2" height="8" rx="1" transform="translate(300.001 39) rotate(90)" fill="#313131"/>
              <rect id="Rectangle_896" data-name="Rectangle 896" width="2" height="8" rx="1" transform="translate(297 44) rotate(180)" fill="#313131"/>
              <path id="Subtraction_68" data-name="Subtraction 68" d="M-22205-15085h-12a2,2,0,0,1-2-2v-11a2,2,0,0,1,2-2v12.128a1,1,0,0,0,1,1h10a1,1,0,0,0,1-1v-12.082s0-.01,0-.016v-.03a2,2,0,0,1,2,2v11A2,2,0,0,1-22205-15085Z" transform="translate(22507 15134)" fill="#313131"/>
            </g>
          </g>
        </svg>
        加入主畫面
      </tooltips>
    </div>
  </section>
</template>

<script>
import { ref, computed, onMounted } from '@vue/composition-api'
import { useMachine } from '@/utils/useMachine.js'
import { machine } from '@/states/homeState.js'
import is from 'is_js'
import homeStream from '@/components/homeStream.vue'
import homeCard from '@/components/homeCard.vue'
import twoLayerButton from '@/components/twoLayerButton.vue'
import tooltips from '@/components/tooltips.vue'

export default {
  name: 'Home',
  components: { homeStream, homeCard, twoLayerButton, tooltips },
  setup () {
    // composition
    const { service, current } = useMachine(machine)
    // data
    const isAndroidChrome = ref(is.android() && is.chrome())
    const isAndroidFirefox = ref(is.android() && is.firefox())
    const isIosSafari = ref(is.ios() && is.safari())
    const showAddToHomeButton = computed(function getShowAddToHomeButton () {
      return (isAndroidChrome.value && deferredPrompt.value) ||
        isAndroidFirefox.value ||
        isIosSafari.value
    })

    const deferredPrompt = ref(null)

    // effect
    onMounted(function homeOnMounted () {
      window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent Chrome 67 and earlier from automatically showing the prompt
        e.preventDefault()
        deferredPrompt.value = e
      })
    })

    return {
      // data
      service,
      current,
      isIosSafari,
      isAndroidFirefox,
      showAddToHomeButton,
      // methods
      addToHomeScreen,
    }

    function addToHomeScreen () {
      if (deferredPrompt.value) {
        console.log(deferredPrompt.value)
        deferredPrompt.value.prompt()
        deferredPrompt.value.userChoice.then(function responseUserChoice (choiceResult) {
          if (choiceResult.outcome == 'accepted') {
            console.log('User accepted the A2HS prompt')
          } else {
            console.log('User dismissed the A2HS prompt')
          }
          deferredPrompt.value = null
        })
      } else {
        service.value.send('SHOW_TOOLTIPS')
      }
    }
  },
}
</script>

<style scoped>
.home {
  position: relative;
}

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
  width: 74px;
  height: 72px;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr;
  align-items: center;
  justify-items: center;
}

.home-header__logo * {
  grid-row: 1;
  grid-column: 1;
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

.fix-touch {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  z-index: 100;
}

.home__nav {
  --column-gap: 25px;
  --row-gap: 25px;

  padding: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
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

.home-nav-item__list-group {
  padding-bottom: 10px;
}

.home__tooltips-container {
  position: fixed;
  z-index: 100;
}

.home__tooltips-container--ios-safari {
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
}

.home-tooltips__icon {
  margin: 0 10px;
}

.home__tooltips-container--android-firefox {
  right: 20px;
  top: 20px;
}
</style>
