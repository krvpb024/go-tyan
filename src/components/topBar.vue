<template>
  <header class="top-bar" :class="{ 'top-bar-border': withBorder }">
    <div class="left-container">
      <slot name="leftContainer"></slot>
    </div>

    <div class="title">
      <slot></slot>
    </div>

    <div class="right-container">
      <slot name="rightContainer"></slot>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    withBorder: {
      type: Boolean,
      default: true,
    },
  },
}
</script>

<style scoped>
.top-bar {
  border-radius: 4px;
  background-color: var(--main-color);
  width: 100%;
  height: 50px;
  box-shadow: inset 2px -2px #fff, inset -3px 0 #fff;
  display: grid;
  grid-template: "left-button title right-button" 1fr / 50px 1fr 50px;
  justify-items: center;
  align-items: center;
}

.top-bar-border {
  border: solid 2px var(--text-color);
}

.title h1 {
  font-size: 1.25rem;
  font-weight: bold;
  text-align: center;
  color: var(--text-color);
  text-shadow: 1.7px 1.5px 0 #fff;
}

.left-container, .right-container {
  position: relative;
}

/* firefox can't apply default outline style */
.left-container *:focus,
.right-container *:focus {
  outline-offset: 0px;
  outline: var(--focus-default-outline);
}

body.using-mouse .left-container *:focus,
body.using-mouse .right-container *:focus {
  outline: none;
}

.left-container button, .right-container button, .left-container a, .right-container a {
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background-color: transparent;
  font-weight: bold;
  font-size: 1rem;
  text-shadow: 1.7px 1.5px 0 #fff;
  padding: 4px;
}
</style>
