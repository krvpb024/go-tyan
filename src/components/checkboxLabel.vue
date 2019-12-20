<template>
  <label
    :for="forId"
    class="checkbox-label"
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
.checkbox-label {
  border: solid 2.5px transparent;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 2px;
}

.checkbox-label::before {
  content: "";
  display: inline-block;
  width: 14px;
  height: 14px;
  border-radius: 4px;
  border: solid 1.5px var(--text-color);
  margin-right: 4px;
  vertical-align: middle;
}

input[type="checkbox"]:checked + .checkbox-label::before {
  background-color: var(--main-color);
}

input[type="checkbox"]:focus + .checkbox-label {
  border: var(--focus-border);
  outline: none;
  border-radius: 4px;
}
</style>
