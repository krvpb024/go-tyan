<template>
  <div class="root">
    <div class="field">
      <input
        type="checkbox" id="hiragana"
        @input="service.send({type: 'HIRAGANA_TOGGLE_DISPLAY', data: $event.target.checked})"
        :checked="current.matches('displayPanel.hiragana.show')"
      >
      <label for="hiragana">hiragana</label>
    </div>
    <div class="field">
      <input
        type="checkbox" id="katakana"
        @input="service.send({type: 'KATAKANA_TOGGLE_DISPLAY', data: $event.target.checked})"
        :checked="current.matches('displayPanel.katakana.show')"
      >
      <label for="katakana">katakana</label>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    service: {
      type: Object,
      required: true,
    },
    current: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped>
  .root {
    position: sticky;
    top: 0;
    background-color: green;
  }
</style>
