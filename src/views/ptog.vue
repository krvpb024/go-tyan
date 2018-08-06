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
        alt="back"
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
        alt="back"
        @click.native="showModal"
      >
        <transition
          slot="modal"
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
          <div class="gtop-modal" v-show="triggerModal">
            <p>點擊兩次換行鍵(enter)可以獲得提示</p>
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
          <label class="exam-container-title-label" for="exam-container-input" key="even" v-if="cursor % 2 === 0">{{currentExam[cursor][1]}}</label>
          <label class="exam-container-title-label" for="exam-container-input" key="odd" v-else>{{currentExam[cursor][1]}}</label>
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
      hiragana: JSON.parse(localStorage.getItem('hiragana')),
      katakana: JSON.parse(localStorage.getItem('katakana')),
      cursor: 0,
      userAnswer: '',
      helpAnswer: '',
      showHelpTrigger: false,
      triggerModal: false,
      currentExam: []
    }
  },
  created () {
    this.currentExam = this.generateExam()
  },
  computed: {
    gType () {
      return this.$route.params.gType
    },
    title () {
      return this.gType === 'hiragana' ? '平假名' : '片假名'
    }
  },
  watch: {
    userAnswer (newAnswer) {
      if (this.currentExam[this.cursor][0] === newAnswer.toLowerCase()) {
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
        this.helpAnswer = this.currentExam[this.cursor][0]
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
        }, 3000)
      }
    },
    generateExam () {
      return this.shuffle(this.$data[this.gType])
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
