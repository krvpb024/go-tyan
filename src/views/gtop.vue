<template>
  <section-container>
    <section-header>
      <section-header-btn
        slot="left"
        position="left"
        tag="a"
        :show="true"
        insideType="img"
        :insideSrc="require('@/assets/image/arrow_back.svg')"
        insideAlt="back"
      >
      </section-header-btn>
      {{title}}
      <section-header-btn
        slot="right"
        position="right"
        tag="button"
        :show="true"
        insideType="img"
        :insideSrc="require('@/assets/image/ihelp.svg')"
        insideAlt="help"
        @click.native="showModal"
      >
        <transition
          slot="modal"
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
          <div class="gtop-modal" v-show="triggerModal">
            <p>{{modalText}}</p>
          </div>
        </transition>
      </section-header-btn>
    </section-header>
    <form class="exam-container" @submit.prevent="showHelp">
      <div class="exam-container-title">
        <transition
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut posA"
          v-on:after-leave="clearAnswer"
        >
          <label class="exam-container-title-label" :class="{ small: currentExam[cursor][quanstionIndex].length === 2 ? true : false }" for="exam-container-input" key="even" v-if="cursor % 2 === 0">{{currentExam[cursor][quanstionIndex]}}</label>
          <label class="exam-container-title-label" :class="{ small: currentExam[cursor][quanstionIndex].length === 2 ? true : false }" for="exam-container-input" key="odd" v-else>{{currentExam[cursor][quanstionIndex]}}</label>
        </transition>
      </div>
      <div class="exam-container-div">
        <input type="text" class="exam-container-input" id="exam-container-input" v-focus v-model="userAnswer" :placeholder="helpAnswer">
        <p>{{cursor + 1}}/{{currentExam.length}}</p>
      </div>
    </form>
  </section-container>
</template>

<script>
// @ is an alias to /src
import sectionHeader from '@/components/sectionHeader.vue'
import sectionHeaderBtn from '@/components/sectionHeaderBtn.vue'
import sectionContainer from '@/components/sectionContainer.vue'

import 'animate.css'

export default {
  data () {
    return {
      cursor: 0,
      userAnswer: '',
      helpAnswer: '',
      showHelpTrigger: false,
      triggerModal: false,
      currentExam: []
    }
  },
  created () {
    this.currentExam = this.generateExam(this.gojuonArray)
  },
  mounted () {
    switch (this.$route.name) {
      case 'gtopMode': {
        if (!JSON.parse(localStorage.getItem('modalGtop'))) {
          this.showModal()
          localStorage.setItem('modalGtop', 'true')
        }
        break
      }
      case 'ptogMode': {
        if (!JSON.parse(localStorage.getItem('modalPtog'))) {
          this.showModal()
          localStorage.setItem('modalPtog', 'true')
        }
        break
      }
    }
  },
  computed: {
    modalText () {
      switch (this.$route.name) {
        case 'gtopMode': {
          return '點擊兩次換行鍵(enter)可以獲得提示'
        }
        case 'ptogMode': {
          return '點擊兩次換行鍵(enter)可以獲得提示，此模式下建議使用手寫輸入法'
        }
      }
    },
    gojuonArray () {
      switch (this.$route.params.gType) {
        case 'hiragana': {
          return JSON.parse(localStorage.getItem('hiragana'))
        }
        case 'katakana': {
          return JSON.parse(localStorage.getItem('katakana'))
        }
      }
    },
    quanstionIndex () {
      switch (this.$route.name) {
        case 'gtopMode': {
          return 0
        }
        case 'ptogMode': {
          return 1
        }
      }
    },
    answerIndex () {
      return this.quanstionIndex === 0 ? 1 : 0
    },
    title () {
      return this.$route.params.gType === 'hiragana' ? '平假名' : '片假名'
    }
  },
  watch: {
    userAnswer (newAnswer) {
      if (this.currentExam[this.cursor][this.answerIndex] === newAnswer.toLowerCase()) {
        this.cursor += 1
        if (this.cursor === this.currentExam.length) {
          this.cursor = 0
          this.currentExam = this.generateExam()
        }
      }
    }
  },
  methods: {
    showHelp () {
      if (!this.showHelpTrigger) {
        this.showHelpTrigger = true
        setTimeout(() => {
          this.showHelpTrigger = false
        }, 1000)
        return
      }
      // some input method need to click enter to complete input
      // to ignore that, by checking whether helpAnswer is empty or not
      if (!this.helpAnswer) {
        this.helpAnswer = this.currentExam[this.cursor][this.answerIndex]
        this.userAnswer = ''
        this.showHelpTrigger = false
      }
    },
    clearAnswer () {
      this.helpAnswer = ''
      this.userAnswer = ''
      this.showHelpTrigger = false
    },
    shuffle (array) {
      let m = array.length
      let t
      let i
      while (m) {
        i = Math.floor(Math.random() * m--)
        t = array[m]
        array[m] = array[i]
        array[i] = t
      }
      return array
    },
    showModal () {
      if (this.triggerModal) {
        this.triggerModal = false
      } else {
        this.triggerModal = true
        setTimeout(() => {
          this.triggerModal = false
        }, 5000)
      }
    },
    generateExam (gojuonArray) {
      return this.shuffle(gojuonArray)
    }
  },
  directives: {
    focus: {
      // directive definition
      inserted: function (el) {
        el.focus()
      }
    }
  },
  components: {
    sectionHeader,
    sectionHeaderBtn,
    sectionContainer
  }
}
</script>

<style>
.exam-container {
  align-items: center;
  display: flex;
  justify-content: center;
  text-align: center;
  padding: 20px 0;
}
.exam-container-title {
  align-items: center;
  display: flex;
  flex-basis: 70%;
  justify-content: center;
  height: 200px;
  position: relative;
}
.exam-container-title-label {
  animation-duration: 0.5s;
  color: #7c5077;
  display: inline-block;
  font-size: 10rem;
  font-weight: bold;
  margin: 0;
}
.exam-container-title-label.small {
  font-size: 7rem;
}
.exam-container-title-help {
  background-color: transparent;
  border: none;
  bottom: 0;
  height: 30px;
  padding: 0;
  position: absolute;
  transform: translateX(100%);
  right: 0;
  width: 30px;
}
.exam-container-input {
  display: inline-block;
  border: 1px solid var(--subtitleColor);
  font-size: 1.5rem;
  height: 60px;
  margin: 0;
  padding: 0;
  text-align: center;
  width: 60px;
  &::placeholder {
    color: black;
    font-size: 1.5rem;
  }
}
.exam-container-div {
  display: inline-block;
}
.posA {
  position: absolute;
}
.gtop-modal {
  animation-duration: 0.3s;
  background-color: var(--subtitleColor);
  bottom: 0;
  border-radius: 30px;
  margin-right: 5px;
  padding: 10px 20px;
  position: absolute;
  right: 0;
  transform: translateY(100%);
  white-space: normal;
  min-width: 50vw;
  max-width: 80vw;
}
.gtop-modal p {
  line-height: 1.3rem;
  margin: 0;
}
</style>
