<template>
  <section-container>
    <section-header>
      <h1>選擇模式</h1>
      <section-header-btn slot="right" position="right" tag="button" :show="true">
        <img src="../assets/image/info.svg" alt="info">
      </section-header-btn>
    </section-header>
    <mode-group>
      <h2>五十音 -> 拼音</h2>
      <mode-link>平假名</mode-link>
      <mode-link>片假名</mode-link>
    </mode-group>
    <mode-group>
      <h2>拼音 -> 五十音</h2>
      <mode-link>平假名</mode-link>
      <mode-link>片假名</mode-link>
      <mode-link>平、片假名</mode-link>
    </mode-group>
  </section-container>
</template>

<script>
// @ is an alias to /src
import sectionHeader from '@/components/sectionHeader.vue'
import sectionHeaderBtn from '@/components/sectionHeaderBtn.vue'
import sectionContainer from '@/components/sectionContainer.vue'
import modeGroup from '@/components/mode/modeGroup.vue'
import modeLink from '@/components/mode/modeLink.vue'

export default {
  components: {
    sectionHeader,
    sectionHeaderBtn,
    sectionContainer,
    modeGroup,
    modeLink
  }
}
</script>

<style scoped>
h2 {
  color: var(--mainColor);
}
</style>
