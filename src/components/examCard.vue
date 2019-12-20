<template>
  <section class="ex-root">
    <div class="ex-root__container">
      <p class="ex-container__description">
        <slot name="transformFrom"></slot>

        <svg class="ex-description__arrow-icon" xmlns="http://www.w3.org/2000/svg" width="16.521" height="17.011" viewBox="0 0 16.521 17.011">
          <g id="Group_286" data-name="Group 286" transform="rotate(180 46.5 154.406)">
            <rect id="Rectangle_541" width="16" height="2.3" fill="#313131" data-name="Rectangle 541" rx="1.15" transform="translate(77 299.1)"/>
            <rect id="Rectangle_542" width="12" height="2.3" fill="#313131" data-name="Rectangle 542" rx="1.15" transform="rotate(-45 400.718 57.825)"/>
            <rect id="Rectangle_543" width="12" height="2.3" fill="#313131" data-name="Rectangle 543" rx="1.15" transform="rotate(45 -321.512 243.632)"/>
          </g>
        </svg>

        <slot name="transformTo"></slot>
      </p>

      <div class="ex-container__title">
        <slot name="title"></slot>
      </div>
    </div>
  </section>
</template>

<script>
export default {}
</script>

<style scoped>
.ex-root {
  position: relative;
  z-index: 10;
}

.ex-root::after {
  top: 0;
  left: 0;
  position: absolute;
  content: "";
  display: block;
  width: 100%;
  height: 100%;
  background-color: #000;
  z-index: 9;
  border: solid 2px var(--card-border-color);
  background-color: var(--main-color);
  transform:  translate(7px, 7px);
  border-radius: 4px;
}

.ex-root__container {
  position: relative;
  border-radius: 4px;
  border: solid 2px var(--card-border-color);
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 25px 20px;
  z-index: 10;
}

.ex-container__description {
  display: flex;
  margin-bottom: 25px;
  font-size: 2rem;
  align-items: center;
}

.ex-description__arrow-icon {
  margin: 0 15px;
}

.ex-container__title {
  font-size: 0.7rem;
  white-space: nowrap;
}

.ex-container__title span +  span {
  margin-left: 10px;
}

</style>
