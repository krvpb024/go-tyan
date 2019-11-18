<template>
  <main>
    <section class="table-view">
      <table-display-control
        ref="tableDisplayControl"
        :hiraganaDisplay="hiraganaDisplay" :katakanaDisplay="katakanaDisplay"
        @toggleHiragana="toggleHiragana" @toggleKatakana="toggleKatakana"
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
                class="table-button" :class="{'empty-button': gojuon == 'empty'}"
                :aria-pressed="isCursorPosition(groupName, rowIndex, columnIndex) ? 'true' : false"
                @keydown="setFocusToTargetButton" @click="updateCursor"
              >
                <template v-if="gojuon != 'empty'">
                  <span  lang="ja-JP" v-show="checkDisplayAndPeek('hiragana', groupName, rowIndex, columnIndex)">
                    {{ gojuon[0] }}
                  </span>
                  <span  lang="ja-JP" v-show="checkDisplayAndPeek('katakana', groupName, rowIndex, columnIndex)">
                    {{ gojuon[1] }}
                  </span>
                  <span  lang="ja-JP">{{ gojuon[2] }}</span>
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
        v-if="current.matches('drawingBoard.show')"
        role="dialog" aria-labelledby="table-drawing-board-title" aria-modal="true"
        :hiraganaDisplay="hiraganaDisplay" :katakanaDisplay="katakanaDisplay"
        :groupName="current.context.groupName" :row="current.context.row" :column="current.context.column"
        @peek="peek" @closeboard="closeBoard"
        @cursortoprevious="cursorToPrevious" @cursortonext="cursorToNext"
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
import smoothscroll from 'smoothscroll-polyfill'
smoothscroll.polyfill()

export default {
  components: {
    tableDisplayControl: () => import(/* webpackChunkName: "tableDisplayControl" */ '@/components/tableDisplayControl.vue'),
    tableDrawingBoard: () => import(/* webpackChunkName: "tableDrawingBoard" */ '@/components/tableDrawingBoard.vue'),
  },
  setup () {
    const { service, current } = useMachine(machine)
    const tableDisplayControl = ref(null)

    const gojuonTuples = computed(function getGojuonTuples () {
      return Object.entries(current.value.context.gojuon)
    })
    const hiraganaDisplay = computed(function getHiraganaDisplay () {
      return current.value.matches('table.hiragana.show')
    })
    const katakanaDisplay = computed(function getKatakanaDisplay () {
      return current.value.matches('table.katakana.show')
    })

    watch([
      () => current.value.context.groupName,
      () => current.value.context.row,
      () => current.value.context.column,
    ], function scrollToCursor (params) {
      const cursorButton = document.querySelector(`#${current.value.context.groupName} tr[aria-rowindex="${current.value.context.row}"] td[aria-colindex="${current.value.context.column}"] button`)
      if (cursorButton) {
        const tableDisplayControlHeight = tableDisplayControl.value.$el.offsetHeight
        const top = window.scrollY + cursorButton.getBoundingClientRect().top - tableDisplayControlHeight - 20
        window.scrollTo({ top, behavior: 'smooth' })
      }
    })

    return {
      tableDisplayControl,
      current,
      gojuonTuples,
      hiraganaDisplay,
      katakanaDisplay,
      // methods
      generateTitle,
      isCursorPosition,
      toggleDislayHandler,
      setFocusToTargetButton,
      updateCursor,
      toggleHiragana,
      toggleKatakana,
      peek,
      closeBoard,
      cursorToPrevious,
      cursorToNext,
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
      return current.value.context.groupName == groupName &&
        current.value.context.row == rowIndex + 1 &&
        current.value.context.column == columnIndex + 1
    }

    function toggleDislayHandler (event) {
      const { type, checked } = event.detail
      service.value.send({ type, data: checked })
    }

    function setFocusToTargetButton (event) {
      if (['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'].includes(event.code)) {
        event.preventDefault()

        var {
          currentColumnNumber,
          currentRowNumber,
          currentTableName,
        } = getButtonInformation(event.currentTarget)

        const target = findTargetBy(event.code)
        if (target) target.focus()
      }

      function findTargetBy (eventCode) {
        switch (eventCode) {
          case 'ArrowUp':
            return document.querySelector(`#${currentTableName} tr[aria-rowindex="${currentRowNumber - 1}"] td[aria-colindex="${currentColumnNumber}"] button`)
          case 'ArrowDown':
            return document.querySelector(`#${currentTableName} tr[aria-rowindex="${currentRowNumber + 1}"] td[aria-colindex="${currentColumnNumber}"] button`)
          case 'ArrowLeft':
            return document.querySelector(`#${currentTableName} tr[aria-rowindex="${currentRowNumber}"] td[aria-colindex="${currentColumnNumber - 1}"] button`) ||
              document.querySelector(`#${currentTableName} tr[aria-rowindex="${currentRowNumber - 1}"] td[aria-colindex="${(current.value.context.gojuon[currentTableName][currentRowNumber - 2] || {}).length}"] button`)
          case 'ArrowRight':
            return document.querySelector(`#${currentTableName} tr[aria-rowindex="${currentRowNumber}"] td[aria-colindex="${currentColumnNumber + 1}"] button`) ||
              document.querySelector(`#${currentTableName} tr[aria-rowindex="${currentRowNumber + 1}"] td[aria-colindex="1"] button`)
          default:
        }
      }
    }

    function updateCursor () {
      const {
        currentColumnNumber: column,
        currentRowNumber: row,
        currentTableName: groupName,
      } = getButtonInformation(event.currentTarget)

      service.value.send({
        type: 'UPDATE_CURSOR',
        data: {
          groupName,
          row,
          column,
        },
      })
    }

    function getButtonInformation (button) {
      const currentTd = button.parentElement
      const currentColumnNumber = Number(currentTd.getAttribute('aria-colindex'))

      const currentTr = currentTd.parentElement
      const currentRowNumber = Number(currentTr.getAttribute('aria-rowindex'))

      const currentTable = currentTr.parentElement
      const currentTableName = currentTable.id

      return { currentColumnNumber, currentRowNumber, currentTableName }
    }

    function toggleHiragana (checked) {
      service.value.send({ type: 'HIRAGANA_TOGGLE_DISPLAY', data: checked })
    }
    function toggleKatakana (checked) {
      service.value.send({ type: 'KATAKANA_TOGGLE_DISPLAY', data: checked })
    }

    function peek (type) {
      service.value.send({ type })
    }

    function closeBoard () {
      const lastCursorButton = document.querySelector(`#${current.value.context.groupName} tr[aria-rowindex="${current.value.context.row}"] td[aria-colindex="${current.value.context.column}"] button`)
      lastCursorButton && lastCursorButton.focus()
      service.value.send({ type: 'CLEAR_CURSOR' })
    }

    function cursorToPrevious () {
      service.value.send({ type: 'CURSOR_TO_PREVIOUS' })
    }

    function cursorToNext () {
      service.value.send({ type: 'CURSOR_TO_NEXT' })
    }

    function checkDisplayAndPeek (hiraganaOrKatakana, groupName, rowIndex, columnIndex) {
      const targetDisplay = hiraganaOrKatakana == 'hiragana'
        ? hiraganaDisplay.value
        : katakanaDisplay.value

      if (!targetDisplay && isCursorPosition(groupName, rowIndex, columnIndex) && current.value.matches(`table.${hiraganaOrKatakana}.hide.peek`)) return true
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
