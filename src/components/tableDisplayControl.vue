<template>
  <div class="table-display-control">
    <div class="table-display-control__field">
      <input
        type="checkbox"
        id="hiragana"
        class="app-visual-hidden"
        @input="toggleHiraganaInput"
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
        @input="toggleKatakanaInput"
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
  setup (props) {
    return {
      toggleHiraganaInput,
      toggleKatakanaInput,
    }
    function toggleHiraganaInput (event) {
      window.gtag('event', 'toggle_table_display_input', {
        'event_category': 'gojuon_table_display',
        'event_label': 'hiragana',
      })

      props.service.send({ type: 'HIRAGANA_TOGGLE_DISPLAY', data: event.target.checked })
    }

    function toggleKatakanaInput (event) {
      window.gtag('event', 'toggle_table_display_input', {
        'event_category': 'gojuon_table_display',
        'event_label': 'katakana',
      })

      props.service.send({ type: 'KATAKANA_TOGGLE_DISPLAY', data: event.target.checked })
    }
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
