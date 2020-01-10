<template>
  <div class="square-button-container">
    <button
      class="square-button"
      @click="$emit('click')"
      :disabled="disabledValue"
    >
      <slot></slot>
    </button>

    <div class="square-button__label">
      <p
        class="square-button-label__text"
        :class="{ 'square-button-label__text--disabled': disabledValue }"
      >
        <slot name="label"></slot>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    disabledValue: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped>
.square-button-container {
  position: relative;
}

.square-button {
  border-radius: 15px;
  width: 56px;
  height: 56px;
  border: solid 2px var(--card-border-color);
  background-color: var(--main-color);
  font-weight: bold;
  text-shadow: 1.7px 1.5px 0 #fff;
  padding: 0;
  box-shadow: inset -1px -1px 0 1px #fff;
}

.square-button:disabled,
.square-button-label__text--disabled {
  color: inherit;
  opacity: 0.5;
}

.square-button-label__text {
  margin-top: 5px;
  white-space: nowrap;
  display: inline-block;
  width: 100%;
  text-align: center;
  overflow: visible;
}
</style>
