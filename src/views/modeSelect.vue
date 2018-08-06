<template>
  <section-container>
    <section-header>
      選擇模式
      <section-header-btn
        slot="right"
        position="right"
        tag="button"
        :show="true"
        insideType="img"
        :insideSrc="require('@/assets/image/info.svg')"
        insideAlt="info"
      >
      </section-header-btn>
    </section-header>
    <mode-group>
      <h2>五十音 -> 拼音</h2>
      <mode-link to="/gtop/hiragana">平假名</mode-link>
      <mode-link to="/gtop/katakana">片假名</mode-link>
    </mode-group>
    <mode-group>
      <h2>拼音 -> 五十音</h2>
      <mode-link to="/ptog/hiragana">平假名</mode-link>
      <mode-link to="/ptog/katakana">片假名</mode-link>
    </mode-group>
    <mode-group>
      <h2>平假名 &lt;-&gt; 片假名</h2>
      <mode-link to="/hisk/hiragana">平假名 -> 片假名</mode-link>
      <mode-link to="/hisk/katakana">片假名 -> 平假名</mode-link>
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

<style>
h2 {
  color: var(--mainColor);
}
</style>
