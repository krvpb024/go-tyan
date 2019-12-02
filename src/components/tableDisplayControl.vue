<template>
  <div class="container">
    <div class="field">
      <input
        type="checkbox"
        id="hiragana"
        class="display-checkbox visual-hidden"
        @input="service.send({type: 'HIRAGANA_TOGGLE_DISPLAY', data: $event.target.checked})"
        :checked="current.matches('displayPanel.hiragana.show')"
      >
      <label
        for="hiragana"
        class="display-label"
      >
        <span class="label-text">顯示平假名</span>
      </label>
    </div>
    <div class="field">
      <input
        type="checkbox"
        id="katakana"
        class="display-checkbox visual-hidden"
        @input="service.send({type: 'KATAKANA_TOGGLE_DISPLAY', data: $event.target.checked})"
        :checked="current.matches('displayPanel.katakana.show')"
      >
      <label
        for="katakana"
        class="display-label"
      >
        <span class="label-text">顯示片假名</span>
      </label>
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
.container {
  height: 40px;
  display: flex;
  justify-content: flex-end;
  background-color: #fff;
  padding-right: 12px;
}

.field {
  display: flex;
  align-items: center;
}

.field + .field {
  margin-left: 12px;
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

.display-checkbox:checked + .display-label::before {
  background-color: var(--main-color);
}

.label-text {
  font-weight: bold;
  vertical-align: middle;
}
</style>
