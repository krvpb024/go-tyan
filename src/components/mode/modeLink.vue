<template>
  <router-link to="/" class="mode-link">
    <slot></slot>
  </router-link>
</template>

<style scoped>
.mode-link {
  background-color: var(--subtitleColor);
  border-radius: 30px;
  box-sizing: border-box;
  color: var(--titleColor);
  display: inline-block;
  margin-bottom: 15px;
  padding: 15px 0;
  text-decoration: none;
  width: 80%;
}
</style>
