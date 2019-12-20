<template>
  <div class="table-display-control">
    <div class="table-display-control__field">
      <input
        type="checkbox"
        id="hiragana"
        class="app-visual-hidden"
        @input="service.send({type: 'HIRAGANA_TOGGLE_DISPLAY', data: $event.target.checked})"
        :checked="current.matches('displayPanel.hiragana.show')"
      >

      <checkbox-label forId="hiragana">
        <span class="table-display-control__label-text">顯示平假名</span>
      </checkbox-label>
    </div>

    <div class="field">
      <input
        type="checkbox"
        id="katakana"
        class="app-visual-hidden"
        @input="service.send({type: 'KATAKANA_TOGGLE_DISPLAY', data: $event.target.checked})"
        :checked="current.matches('displayPanel.katakana.show')"
      >

      <checkbox-label forId="katakana">
        <span class="table-display-control__label-text">顯示片假名</span>
      </checkbox-label>
    </div>
  </div>
</template>

<script>
import checkboxLabel from '@/components/checkboxLabel.vue'

export default {
  components: { checkboxLabel },
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
.table-display-control {
  height: 40px;
  display: flex;
  justify-content: flex-end;
  background-color: #fff;
  align-items: center;
}

.table-display-control__field {
  display: flex;
  align-items: center;
}

.table-display-control__field + .table-display-control__field {
  margin-left: 12px;
}

.table-display-control__label-text {
  font-weight: bold;
  vertical-align: middle;
}
</style>
