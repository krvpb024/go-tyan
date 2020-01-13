<template>
  <section class="home-card">
    <div class="home-card__image-block">
      <slot name="image"></slot>
    </div>

    <div class="home-card__title-block">
      <slot name="title"></slot>
    </div>

    <div class="home-card__description-block">
      <slot name="description"></slot>
    </div>
  </section>
</template>

<script>
export default {}
</script>

<style scoped>
.home-card {
  display: grid;
  grid-template:
    'image-block title-block      ' auto
    'image-block description-block' 1fr / auto 1fr;
  border: solid 2.5px var(--text-color);
  border-radius: 6px;
  width: 100%;
  height: 100%;
  padding-right: 10px;
  background-color: #fff;
}

.home-card__image-block {
  box-sizing: border-box;
  grid-area: image-block;
  width: 115px;
  height: 115px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  border: solid 2.5px var(--text-color);
  background-color: var(--main-color);
  transform: translate(-11px, -7px);
}

.home-card__title-block {
  grid-area: title-block;
  margin-bottom: 10px;
  margin-top: 10px;
}

.home-card__title-block * {
  font-size: 1.5rem;
}

.home-card__description-block {
  grid-area: description-block;
}

.home-card__description-block ul {
  font-weight: bold;
}

.home-card__description-block ul li {
  margin-bottom: 2px;
}
</style>
