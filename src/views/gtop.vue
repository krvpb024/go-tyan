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
        @click.native="showHelp"
      >
      </section-header-btn>
    </section-header>
    <div class="exam-container">
      <div class="exam-container-title">
        <transition
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut posA"
          v-on:after-leave="clearAnswer"
        >
          <h2 class="exam-container-title-h2" key="even" v-if="cursor % 2 === 0">{{currentMode[cursor][0]}}</h2>
          <h2 class="exam-container-title-h2" key="odd" v-else>{{currentMode[cursor][0]}}</h2>
        </transition>
        <!-- <button class="exam-container-title-help" type="button" @click="showHelp">
          <img src="../assets/image/help.svg" alt="help">
        </button> -->
      </div>
      <form class="exam-container-form" @submit.prevent="">
        <input type="text" class="exam-container-input" v-focus v-model="userAnswer" :placeholder="helpAnswer">
        <p>{{cursor + 1}}/{{currentMode.length}}</p>
      </form>
    </div>
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
      helpAnswer: ''
    }
  },
  computed: {
    gType () {
      return this.$route.params.gType
    },
    title () {
      return this.gType === 'hiragana' ? '平假名' : '片假名'
    },
    currentMode () {
      return this.shuffle(this.$data[this.gType])
    },
    correctness () {
      return this.currentMode[this.cursor][1] === this.userAnswer.toLowerCase()
    }
  },
  watch: {
    correctness (newAnswer) {
      if (newAnswer === true) {
        this.cursor += 1
        if (this.cursor === this.currentMode.length) {
          this.cursor = 0
        }
      }
    }
  },
  methods: {
    showHelp () {
      this.helpAnswer = this.currentMode[this.cursor][1]
      this.userAnswer = ''
    },
    clearAnswer () {
      this.helpAnswer = ''
      this.userAnswer = ''
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
.exam-container-title-h2 {
  animation-duration: 0.5s;
  color: #7c5077;
  display: inline-block;
  font-size: 10rem;
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
.exam-container-form {
  display: inline-block;
}
.posA {
  position: absolute;
}
</style>
