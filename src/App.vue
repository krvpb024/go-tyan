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
  --focus-border: solid 2.5px var(--main-color);
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
</style>
