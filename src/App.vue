<template>
  <div id="app" class="app-container">
    <router-view></router-view>
  </div>
</template>

<script>
export default {}
</script>

<style>
:root {
  --main-color: #ffe65a;
  --text-color: #313131;
  --card-border-color: #1d1d1d;
  --title-bg-color: #f5f5f5;
  --focus-border-width: 2.5px;
  --focus-border: solid var(--focus-border-width) var(--main-color);
  --app-max-width: 768px;
  --root-padding-size: 8px;
}

html {
  box-sizing: border-box;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

a {
  color: inherit;
  text-decoration: none;
}

*, *:before, *:after {
  box-sizing: inherit;
}

body {
  color: var(--text-color);
}

h1, h2, h3, h4, h5 {
  margin: 0;
}

p {
  margin: 0;
}

.app-visual-hidden {
  clip-path: inset(100%);
  clip: rect(1px 1px 1px 1px); /* IE 6/7 */
  clip: rect(1px, 1px, 1px, 1px);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap; /* added line */
  width: 1px;
}

.app-sticky-top {
  padding: var(--root-padding-size);
  background-color: #fff;
  padding-bottom: 0;
  position: sticky;
  top: 0;
  z-index: 11;
}

.app-top-bar-link-icon {
  display:flex;
  align-items: center;
  justify-content: center;
}

.app-container {
  max-width: var(--app-max-width);
  margin: 0 auto;
}
</style>
