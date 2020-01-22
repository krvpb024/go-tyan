<template>
  <div class="home-stream-item">
    <div
      class="home-stream-item__content"
      :class="[`home-stream-item__content--${anglePosition}`]"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    anglePosition: {
      type: String,
      default: 'top',
    },
  },
}
</script>

<style scoped>
.home-stream-item {
  position: relative;
}

.home-stream-item::after {
  top: 0;
  left: 0;
  position: absolute;
  content: "";
  display: block;
  width: 100%;
  height: 100%;
  background-color: var(--main-color);
  border: solid 2.5px var(--text-color);
  border-radius: 6px;
  transform: translate(5px, 5px);
  z-index: 9;
}

.home-stream-item__content {
  background-color: #fff;
  border: solid 2.5px var(--text-color);
  border-radius: 6px;
  padding: 13px 18px;
  position: relative;
  white-space: nowrap;
  z-index: 10;
}

.home-stream-item__content::after {
  background-color: #fff;
  content: "";
  position: absolute;
  display: block;
  width: 13px;
  height: 13px;
  border-left: 2.5px solid var(--text-color);
  border-top: 2.5px solid var(--text-color);
  border-radius: 3.3px 0 0 0;
}

.home-stream-item__content--top::after {
  top: 0;
  left: 0;
  transform: translate(13px, calc(-50% - 1.7px)) rotate(45deg);
}

.home-stream-item__content--left::after {
  top: 0;
  left: 0;
  transform: translate(calc(-50% - 2px), 10px) rotate(-45deg);
}
</style>
