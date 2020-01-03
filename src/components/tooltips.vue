<template>
  <div
    class="tooltips"
    :class="{ 'tooltips--show': show }"
    :aria-hidden="(!show).toString()"
    aria-live="assertive"
    role="alert"
    ref="tooltipsElement"
    @click="$emit('click')"
  >
    <p class="tooltips__text">
      <slot></slot>
    </p>

    <div
      class="tooltips__angle"
      :style="{
        ...anglePosition,
        transform: `translate(${angleTransformX}, ${angleTransformY}) rotate(45deg)`,
      }"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    service: {
      type: Object,
      required: true,
    },
    current: {
      type: Object,
      required: true,
    },
    anglePosition: {
      type: Object,
      default: () => ({ left: 0, top: 0 }),
    },
    angleTransformX: {
      type: String,
      default: '0',
    },
    angleTransformY: {
      type: String,
      default: '0',
    },
  },
}
</script>

<style>
:root {
  --tooltips-opacity-duration: 400ms;
  --tooltips-container-transition: transform 0ms var(--tooltips-opacity-duration);
  --tooltips-container-transition-show: transform 0ms 0ms;
  --tooltips-container-tramsform: scale(0);
  --tooltips-container-tramsform-show: scale(1);
}
</style>

<style scoped>
.tooltips {
  position: relative;
  background-color: var(--main-color);
  border-radius: 8px;
  width: auto;
  white-space: nowrap;
  align-items: center;
  justify-content: center;
  padding: 27px 16px;
  opacity: 0;
  transition: opacity var(--tooltips-opacity-duration) 0ms;
}

.tooltips--show {
  opacity: 1;
}

.tooltips__angle {
  position: absolute;
  content: "";
  display: block;
  width: 10px;
  height: 10px;
  background-color: var(--main-color);
  transition: inherit;
}

.tooltips__text {
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  width: 100%;
  white-space: wrap;
}
</style>
