<template>
  <div class="root">
    <div class="field">
      <input
        type="checkbox" id="hiragana"
        @input="$emit('toggleHiragana', $event.target.checked)"
        :checked="hiraganaDisplay"
      >
      <label for="hiragana">hiragana</label>
    </div>
    <div class="field">
      <input
        type="checkbox" id="katakana"
        @input="$emit('toggleKatakana', $event.target.checked)"
        :checked="katakanaDisplay"
      >
      <label for="katakana">katakana</label>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    hiraganaDisplay: {
      type: Boolean,
      default: true,
    },
    katakanaDisplay: {
      type: Boolean,
      default: true,
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
