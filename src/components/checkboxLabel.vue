<template>
  <label
    :for="forId"
    class="display-label"
  >
    <slot></slot>
  </label>
</template>

<script>
export default {
  props: {
    forId: {
      type: String,
    },
  },
}
</script>

<style scoped>
.display-label {
  border: solid 2.5px transparent;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
}

.display-label::before {
  content: "";
  box-sizing: border-box;
  display: inline-block;
  width: 14px;
  height: 14px;
  border-radius: 4px;
  border: solid 1.5px var(--main-black);
  margin-right: 4px;
  vertical-align: middle;
}

input[type="checkbox"]:checked + .display-label::before {
  background-color: var(--main-color);
}

input[type="checkbox"]:focus + .display-label {
  border: solid 2.5px var(--main-color);
  outline: none;
  border-radius: 4px;
}
</style>
