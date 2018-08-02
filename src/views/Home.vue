<template>
  <section-header>
    <h1>選擇模式</h1>
    <sectionHeaderBtn slot="right" position="right" tag="button" :show="true">
      <img src="../assets/image/info.svg" alt="info">
    </sectionHeaderBtn>
  </section-header>
</template>

<script>
// @ is an alias to /src
import sectionHeader from '@/components/sectionHeader.vue'
import sectionHeaderBtn from '@/components/sectionHeaderBtn.vue'

export default {
  components: {
    sectionHeader,
    sectionHeaderBtn
  }
}
</script>
