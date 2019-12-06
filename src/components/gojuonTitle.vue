<template>
  <div class="gojuon-title" :style="{ fontSize }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    fontSize: {
      type: String,
      default: '1rem',
    },
  },
}
</script>

<style scoped>
.gojuon-title > * {
  font-size: inherit;
  background-color: var(--title-bg-color);
  padding: 12px 5px;
  margin: 0;
}
</style>
