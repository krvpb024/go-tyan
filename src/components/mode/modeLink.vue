<template>
  <router-link :to="to" class="mode-link">
    <p><slot></slot></p>
  </router-link>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      default: '/'
    }
  }
}
</script>

<style scoped>
.mode-link {
  align-items: center;
  background-color: var(--subtitleColor);
  border-radius: 30px;
  box-sizing: border-box;
  color: var(--titleColor);
  display: flex;
  justify-content: center;
  height: 50px;
  margin: 0 auto;
  margin-bottom: 15px;
  text-decoration: none;
  width: 80%;
  &:active {
    background-color: var(--titleColor);
    color: var(--subtitleColor);
  }
}
</style>
