<template>
  <div class="container">
    <div class="top-bar">
      <router-link
        to="/"
        class="left-icon"
        aria-labelledby="nav-return-label"
      >
        <svg
          role="img"
          aria-labelledby="nav-return-label"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          width="18.035"
          height="16.297"
        >
          <title id="nav-return-label">返回</title>

          <filter id="shadow">
            <feDropShadow
              dx="2.2"
              dy="2.2"
              stdDeviation="0"
              flood-color="#ffffff"
            />
          </filter>

          <path
            aria-labelledby="nav-return-label"
            d="M7.865 16.414L.684 9.233a.967.967 0 0 1 0-1.368L7.865.684a.967.967 0 0 1 1.368 1.368L3.792 7.493h13.676a.967.967 0 1 1 0 1.934H3.614l5.619 5.619a.967.967 0 1 1-1.368 1.368z"
            stroke="#313131"
            filter="url(#shadow)"
            stroke-width="0.6"
          />
        </svg>
      </router-link>

      <h1 class="title">
        <slot></slot>
      </h1>
    </div>
  </div>
</template>

<script>
export default {
  setup () {

  },
}
</script>

<style scoped>
.container {
  box-sizing: border-box;
  padding: 8px;
  background-color: #fff;
  padding-bottom: 0;
}

.top-bar {
  border-radius: 4px;
  border: solid 2px var(--main-black);
  background-color: var(--main-color);
  width: 100%;
  height: 50px;
  box-shadow: inset 4px -4px #fff, inset -5px 0 #fff;
  display: grid;
  grid-template: "left-button title right-button" 1fr / 40px 1fr 40px;
  justify-items: center;
  align-items: center;
}

.left-icon {
  display: flex;
  justify-content: center;
  align-items: center;
}

.title {
  font-size: 1.25rem;
  font-weight: bold;
  line-height: 1.2;
  text-align: center;
  color: var(--main-black);
  text-shadow: 1.7px 1.5px 0 #fff;
}
</style>
