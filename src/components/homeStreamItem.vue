<template>
  <div class="home-stream-item">
    <div class="home-stream-item__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {

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
  width: 10px;
  height: 10px;
  border-left: 2.5px solid var(--text-color);
  border-top: 2.5px solid var(--text-color);
  top: 0;
  left: 0;
  transform: translate(10px, calc(-50% - 2px)) rotate(45deg);
}
</style>
