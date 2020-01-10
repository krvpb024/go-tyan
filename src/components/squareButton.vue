<template>
  <button class="square-button" @click="$emit('click')">
    <slot></slot>

    <p class="square-button__label"><slot name="label"></slot></p>
  </button>
</template>

<script>
export default {}
</script>

<style scoped>
.square-button {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 15px;
  border: solid 2px var(--card-border-color);
  background-color: var(--main-color);
  font-weight: bold;
  text-shadow: 1.7px 1.5px 0 #fff;
  padding: 0;
  box-shadow: inset -1px -1px 0 1px #fff;
}
.square-button__label {
  padding-top: 4px;
  position: absolute;
  bottom: 0;
  left: 0;
  display: inline-block;
  width: 100%;
  text-align: center;
  transform: translateY(100%);
}
</style>
