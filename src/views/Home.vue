<template>
  <section class="home">
    <header class="home__header">
      <div class="home-header__logo">
        <img src="@/assets/go-tyan.svg" alt="" aria-hidden="true" />
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
      <router-link to="/table" class="home-nav__nav-item">
        <home-card>
          <template #image>
            <img src="@/assets/table.svg" alt="" aria-hidden="true" />
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

      <router-link to="/exam" class="home-nav__nav-item">
        <home-card>
          <template #image>
            <img src="@/assets/exam.svg" alt="" aria-hidden="true" />
          </template>

          <template #title>
            <h2>字卡練習</h2>
          </template>

          <template #description>
            <ul class="home-nav-item__list-group">
              <li>平假名、片假名、拼音轉換</li>
            </ul>
          </template>
        </home-card>
      </router-link>

      <!-- <router-link
        to="/"
        class="home-nav__nav-item"
      >
        <home-card>
          <template #image>
            <img
              src="@/assets/about.svg"
              alt=""
              aria-hidden="true"
            >
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
            <img
              src="@/assets/coffee.svg"
              alt=""
              aria-hidden="true"
            >
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
      </router-link> -->
    </nav>

    <div
      class="home__tooltips-container home__tooltips-container--ios-safari"
      v-if="showWhenIosSafari"
    >
      <tooltips
        @click="service.send('TOOLTIPS_HIDE')"
        :show="current.matches('idle.tooltipsShow')"
        class="home__tooltips"
        :service="service"
        :current="current"
        :anglePosition="{ left: '50%', bottom: '0' }"
        angleTransformX="-50%"
        angleTransformY="50%"
      >
        <span class="home-tooltips__text">
          點擊
        </span>

        <img
          class="home-tooltips__icon"
          src="@/assets/ios-share.svg"
          alt="加入主畫面按鈕"
        />
        <span class="home-tooltips__text">
          加入主畫面
        </span>
      </tooltips>
    </div>

    <div
      class="home__tooltips-container home__tooltips-container--android-firefox"
      v-if="showWhenAndroidFirefox"
    >
      <tooltips
        @click="service.send('TOOLTIPS_HIDE')"
        :show="current.matches('idle.tooltipsShow')"
        class="home__tooltips"
        :service="service"
        :current="current"
        :anglePosition="{ right: '70px', top: '0' }"
        angleTransformY="-50%"
      >
        <span class="home-tooltips__text">
          點擊
        </span>
        <img
          class="home-tooltips__icon"
          src="@/assets/firefox-home.svg"
          alt="加入主畫面"
        />
      </tooltips>
    </div>

    <div
      class="home__tooltips-container home__tooltips-container--is-inapp"
      v-if="showWhenIsInapp"
    >
      <tooltips
        @click="service.send('TOOLTIPS_HIDE')"
        :show="current.matches('idle.tooltipsShow')"
        class="home__tooltips"
        :service="service"
        :current="current"
        :anglePosition="{ left: '0', top: '0' }"
        angleTransformX="100%"
        angleTransformY="50%"
      >
        <span class="home-tooltips__text">
          「加入主畫面」功能目前不支援於您目前使用的瀏覽器，建議您切換至
          {{ recommendedBrowser }} 瀏覽器。
        </span>
      </tooltips>
    </div>
  </section>
</template>

<script>
import { ref, computed } from '@vue/composition-api'
import { useMachine } from '@/utils/useMachine.js'
import { machine } from '@/states/homeState.js'
import is from 'is_js'
import InApp from 'detect-inapp'
import homeStream from '@/components/homeStream.vue'
import homeCard from '@/components/homeCard.vue'
import twoLayerButton from '@/components/twoLayerButton.vue'
import tooltips from '@/components/tooltips.vue'

const inapp = new InApp(navigator.userAgent || navigator.vendor || window.opera)

export default {
  name: 'Home',
  components: { homeStream, homeCard, twoLayerButton, tooltips },
  setup (props, context) {
    // composition
    const { service, current } = useMachine(machine)
    const deferredPrompt = computed(function getDeferredPrompt () {
      return context.root.$store.state.deferredPrompt
    })

    // data
    const standalone = ref(
      window.navigator.standalone == true ||
        window.matchMedia('(display-mode: standalone)').matches
    )
    const showWhenAndroidChrome = computed(function getShowWhenAndroidChrome () {
      return (
        is.android() && is.chrome() && !standalone.value && deferredPrompt.value
      )
    })
    const showWhenAndroidFirefox = computed(
      function getShowWhenAndroidFirefox () {
        return is.android() && is.firefox() && !standalone.value
      }
    )
    const showWhenIosSafari = computed(function getShowWhenIosSafari () {
      return is.ios() && is.safari() && !inapp.isInApp && !standalone.value
    })
    const showWhenIsInapp = computed(function getShowWhenIsInapp () {
      return (
        (is.ios() || is.android()) &&
        inapp.isInApp &&
        ['messenger', 'facebook', 'line', 'twitter', 'instagram'].includes(
          inapp.browser
        )
      )
    })
    const showAddToHomeButton = computed(function getShowAddToHomeButton () {
      return (
        showWhenAndroidChrome.value ||
        showWhenAndroidFirefox.value ||
        showWhenIosSafari.value ||
        showWhenIsInapp.value
      )
    })

    const recommendedBrowser = computed(function getRecommendedBrowser () {
      if (is.ios()) return 'Safari'
      else if (is.android()) return 'FireFox、Chrome'
      return ''
    })

    // effect
    context.root.$store.dispatch('updateDefferedPrompt')

    return {
      // data
      service,
      current,
      standalone,
      showWhenAndroidChrome,
      showWhenIosSafari,
      showWhenAndroidFirefox,
      showAddToHomeButton,
      showWhenIsInapp,
      recommendedBrowser,
      // methods
      addToHomeScreen,
    }

    function addToHomeScreen () {
      if (deferredPrompt.value) {
        deferredPrompt.value.prompt()
        deferredPrompt.value.userChoice.then(function responseUserChoice (
          choiceResult
        ) {
          if (choiceResult.outcome == 'accepted') {
            console.log('User accepted the A2HS prompt')
          } else {
            console.log('User dismissed the A2HS prompt')
          }
        })
      } else {
        service.value.send('TOOLTIPS_SHOW')
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
    '.      logo   title  .      install-button .     ' auto
    'stream stream stream stream stream         stream' auto / 20px 70px auto 1fr auto 20px;
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
  content: '';
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

.home-header__install-button::after {
  content: '';
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

.home-nav-item__list-group {
  padding-left: 20px;
  padding-bottom: 10px;
}

.home__tooltips-container {
  position: fixed;
  z-index: 100;
}

.home__tooltips-container--ios-safari,
.home__tooltips-container--is-inapp {
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
}

.home__tooltips-container--is-inapp {
  width: 80%;
}

.home-tooltips__text {
  text-align: center;
  white-space: normal;
}

.home-tooltips__text + .home-tooltips__icon {
  margin-left: 10px;
}

.home-tooltips__icon + .home-tooltips__text {
  margin-left: 10px;
}

.home__tooltips-container--android-firefox {
  right: 30px;
  top: 20px;
}
</style>
