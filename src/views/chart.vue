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
      五十音表
    </section-header>
    <h2>平假名</h2>
    <div class="table-container">
      <div class="table-item"
        v-for="(value, index) in hiragana"
        :key="index"
        :class="{
            small: ['や', 'ゆ', 'よ', 'わ', 'を', 'ん'].indexOf(value[0]) !== -1 || value[0].length === 2
          }"
      >
        <div class="table-item-gojuon">
          <p>{{value[0]}}</p>
        </div>
        <div class="table-item-pingying">
          <p>{{value[1]}}</p>
        </div>
      </div>
    </div>
    <h2>片假名</h2>
    <div class="table-container">
      <div class="table-item"
        v-for="(value, index) in katakana"
        :key="index"
        :class="{
            small: ['ヤ', 'ユ', 'ヨ', 'ワ', 'ヲ', 'ン'].indexOf(value[0]) !== -1 || value[0].length === 2
          }"
      >
        <div class="table-item-gojuon">
          <p>{{value[0]}}</p>
        </div>
        <div class="table-item-pingying">
          <p>{{value[1]}}</p>
        </div>
      </div>
    </div>
  </section-container>
</template>

<script>
import sectionHeader from '@/components/sectionHeader.vue'
import sectionHeaderBtn from '@/components/sectionHeaderBtn.vue'
import sectionContainer from '@/components/sectionContainer.vue'

export default {
  data () {
    return {
      hiragana: JSON.parse(localStorage.getItem('hiragana')),
      katakana: JSON.parse(localStorage.getItem('katakana'))
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
.table-container {
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  width: 85%;
}
.table-item {
  border: 1px solid #000;
  display: flex;
  box-sizing: border-box;
  flex-basis: calc(18%);
  flex-direction: column;
  text-align: center;
  padding: 3%;
  margin: 1%;
}
.table-item-gojuon, .table-item-pingying {
  flex: 1;
}
.table-item-gojuon p, .table-item-pingying p {
  font-size: 1.2rem;
  margin: 0;
}
.table-item.small {
  flex-basis: calc(100% / 3 - 2%)
}
</style>
