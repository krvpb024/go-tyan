<template>
  <main>
    <section class="table-view">
      <table-display-control
        ref="tableDisplayControl" :service="service" :current="current"
      ></table-display-control>

      <h1 class="table__h1">五十音表格</h1>

      <section
        v-for="([groupName, rows]) in gojuonTuples" :key="groupName"
        role="region" :aria-labelledby="`${groupName}-title`"
      >
        <h2 :id="`${groupName}-title`">{{ generateTitle(groupName) }}</h2>

        <table
          :id="groupName" role="grid" :aria-labelledby="`${groupName}-title`"
          data-wrap-cols="true" data-wrap-rows="false"
          :aria-rowcount="rows.length" aria-colcount="5"
        >
          <tr>
            <th scope="col">a</th>
            <th scope="col">i</th>
            <th scope="col">u</th>
            <th scope="col">e</th>
            <th scope="col">o</th>
          </tr>

          <tr
            v-for="(row, rowIndex) in rows"
            :key="rowIndex" role="rowgroup"
            :aria-rowindex="rowIndex + 1"
          >
            <td
              v-for="(gojuon /* [hiragana, katakana, pinyin] */, columnIndex) in row"
              :key="gojuon != 'empty' ? `${gojuon[0]}-${gojuon[1]}-${gojuon[2]}` : `empty-${rowIndex}-${columnIndex}`"
              role="gridcell" :aria-colindex="columnIndex + 1"
            >
              <button
                :tabindex="columnIndex == 0 && rowIndex == 0 ? '0' : '-1'"
                :id="`${groupName}-${rowIndex}-${columnIndex}`"
                class="table-button" :class="{'empty-button': gojuon == 'empty'}"
                :aria-pressed="isCursorPosition(groupName, rowIndex, columnIndex) ? 'true' : false"
                @keydown.prevent.up="service.send('FOCUS_COUSOR_UP')" @keydown.prevent.down="service.send('FOCUS_COUSOR_DOWN')"
                @keydown.prevent.right="service.send('FOCUS_COUSOR_RIGHT')" @keydown.prevent.left="service.send('FOCUS_COUSOR_LEFT')"
                @focus="service.send({
                  type: 'UPDATE_FOCUS_CURSOR',
                  data: {
                    focusGroupName: groupName,
                    focusRow: rowIndex,
                    focusColumn: columnIndex,
                  }}
                )"
                @click="service.send({
                  type: 'UPDATE_ACTIVE_CURSOR',
                  data: {
                    activeGroupName: groupName,
                    activeRow: rowIndex,
                    activeColumn: columnIndex,
                  }
                })"
              >
                <template v-if="gojuon != 'empty'">
                  <span lang="ja-JP" v-show="checkDisplayAndPeek('hiragana', groupName, rowIndex, columnIndex)">
                    {{ gojuon[0] }}
                  </span>
                  <span lang="ja-JP" v-show="checkDisplayAndPeek('katakana', groupName, rowIndex, columnIndex)">
                    {{ gojuon[1] }}
                  </span>
                  <span lang="ja-JP">{{ gojuon[2] }}</span>
                </template>
                <template v-else>
                  無內容
                </template>
              </button>
            </td>
          </tr>
        </table>
      </section>

      <table-drawing-board
        v-show="current.matches('drawingBoard.show')"
        role="dialog" aria-labelledby="table-drawing-board-title" aria-modal="true"
        :service="service" :current="current"
        :activeGroupName="current.context.activeGroupName"
        :activeRow="current.context.activeRow"
        :activeColumn="current.context.activeColumn"
      >
        <template #title>
          <h1 id="table-drawing-board-title">手寫板</h1>
        </template>
      </table-drawing-board>

    </section>
  </main>
</template>

<script>
import { ref, computed, watch } from '@vue/composition-api'
import { machine } from '@/states/tableState.js'
import { useMachine } from '@/utils/useMachine.js'
import tableDisplayControl from '@/components/tableDisplayControl.vue'
import tableDrawingBoard from '@/components/tableDrawingBoard.vue'

export default {
  components: {
    tableDisplayControl,
    tableDrawingBoard,
  },
  setup () {
    const { service, current } = useMachine(machine)
    const tableDisplayControl = ref(null)

    const gojuonTuples = computed(function getGojuonTuples () {
      return Object.entries(current.value.context.gojuon)
    })

    watch([
      () => current.value.context.activeGroupName,
      () => current.value.context.activeRow,
      () => current.value.context.activeColumn,
    ], function scrollToCursor (
      [groupName, row, column] = [],
      [previousGroupName, previousRow, previousColumn] = []
    ) {
      if (
        current.value.matches('drawingBoard.show') &&
        // don't know why multiple source watcher will trigger twice
        // first time will give same value, add this condition to ignore
        (groupName != previousGroupName ||
        row != previousRow ||
        column != previousColumn)
      ) {
        const activeButton = document.getElementById(`${groupName}-${row}-${column}`)
        const tableDisplayControlHeight = tableDisplayControl.value.$el.offsetHeight
        const top = window.scrollY + activeButton.getBoundingClientRect().top - tableDisplayControlHeight - 20
        window.scrollTo({ top, behavior: 'smooth' })
      } else if (
        current.value.matches('drawingBoard.hide')
      ) {
        const focusButton = document.getElementById(`${previousGroupName}-${previousRow}-${previousColumn}`)
        focusButton && focusButton.focus()
      }
    })

    watch([
      () => current.value.context.focusGroupName,
      () => current.value.context.focusRow,
      () => current.value.context.focusColumn,
    ], function setFocusToButton (
      [groupName, row, column] = [],
      [previousGroupName, previousRow, previousColumn] = []
    ) {
      if (
        // don't know why multiple source watcher will trigger twice
        // first time will give same value, add this condition to ignore
        groupName != previousGroupName ||
        row != previousRow ||
        column != previousColumn
      ) {
        const target = document.getElementById(`${groupName}-${row}-${column}`)
        target && target.focus()
      }
    }, { lazy: true })

    return {
      tableDisplayControl,
      service,
      current,
      gojuonTuples,
      // methods
      generateTitle,
      isCursorPosition,
      checkDisplayAndPeek,
    }

    function generateTitle (groupName) {
      switch (groupName) {
        case 'seion':
          return '清音'
        case 'dakion':
          return '濁音'
        case 'handakuon':
          return '半濁音'
        case 'yoon':
          return '拗音'
        default:
          return ''
      }
    }

    function isCursorPosition (groupName, rowIndex, columnIndex) {
      return current.value.context.activeGroupName == groupName &&
        current.value.context.activeRow == rowIndex &&
        current.value.context.activeColumn == columnIndex
    }

    function checkDisplayAndPeek (hiraganaOrKatakana, groupName, rowIndex, columnIndex) {
      const targetDisplay = hiraganaOrKatakana == 'hiragana'
        ? current.value.matches('displayPanel.hiragana.show')
        : current.value.matches('displayPanel.katakana.show')

      if (!targetDisplay && isCursorPosition(groupName, rowIndex, columnIndex) && current.value.matches(`displayPanel.${hiraganaOrKatakana}.hide.peek`)) return true
      else if (!targetDisplay) return false
      return true
    }
  },
}
</script>

<style scoped>
.table-button[aria-pressed="true"] {
  background-color: red;
}

.empty-button {
  color: transparent;
}
</style>
