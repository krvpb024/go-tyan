<template>
  <header class="home-section-title">
    <div class="header-nav">
      <slot name="left">
        <sectionHeaderBtn
          slot="left"
          position="left"
          tag="a"
          :show="false"
        ></sectionHeaderBtn>
      </slot>
      <h1 class="header-nav-title"><slot></slot></h1>
      <slot name="right">
        <sectionHeaderBtn
          slot="right"
          position="right"
          tag="a"
          :show="false"
        ></sectionHeaderBtn>
      </slot>
    </div>
  </header>
</template>

<script>
import sectionHeaderBtn from '@/components/sectionHeaderBtn.vue'
export default {
  components: {
    sectionHeaderBtn
  }
}
</script>

<style scoped>
.home-section-title {
  align-items: stretch;
  background-color: var(--mainColor);
  display: flex;
  height: 70px;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 100;
}

.header-nav {
  align-items: center;
  flex: 1;
  display: flex;
  justify-content: space-between;
}
.header-nav-title {
  color: var(--titleColor);
  font-size: 1.6rem;
  font-weight: normal;
  margin: 0;
}
</style>
