<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style>
:root {
  --main-color: #ffe65a;
  --text-color: #313131;
  --title-bg-color: #f5f5f5;
  --focus-border-width: 2.5px;
  --focus-border: solid var(--focus-border-width) var(--main-color);
}

html {
  box-sizing: border-box;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

*, *:before, *:after {
  box-sizing: inherit;
}

body {
  color: var(--text-color);
}

.visual-hidden {
  clip-path: inset(100%);
  clip: rect(1px 1px 1px 1px); /* IE 6/7 */
  clip: rect(1px, 1px, 1px, 1px);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap; /* added line */
  width: 1px;
}

.root-sticky-top {
  box-sizing: border-box;
  padding: 8px;
  background-color: #fff;
  padding-bottom: 0;
  position: sticky;
  top: 0;
}

.root-top-bar-link-icon {
  display:flex;
  align-items: center;
  justify-content: center;
}
</style>
