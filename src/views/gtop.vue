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
          <label class="exam-container-title-label" for="exam-container-input" key="even" v-if="cursor % 2 === 0">{{currentExam[cursor][0]}}</label>
          <label class="exam-container-title-label" for="exam-container-input" key="odd" v-else>{{currentExam[cursor][0]}}</label>
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
      cursor: 44,
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
      if (this.currentExam[this.cursor][1] === newAnswer.toLowerCase()) {
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
        return
      }
      this.helpAnswer = this.currentExam[this.cursor][1]
      this.userAnswer = ''
      this.showHelpTrigger = false
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

<style scoped>
.exam-container {
  align-items: center;
  display: flex;
  justify-content: center;
  text-align: center;
  padding: 20px 0;
}
.exam-container-title {
  display: inline-block;
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
  margin-right: 30px;
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
  font-size: 2rem;
  height: 50px;
  margin: 0;
  padding: 0;
  text-align: center;
  width: 50px;
  &::placeholder {
    color: black;
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
  border-radius: 50px;
  margin-right: 5px;
  position: absolute;
  transform: translateY(100%);
  right: 0;
}
.gtop-modal p {
  margin: 10px;
}
</style>
