<template>
  <section class="table-view">
    <div
      class="root-sticky-top"
      ref="topStickyElement"
    >
      <top-bar>
        <template #leftContainer>
          <router-link
            to="/"
            class="left-icon"
            aria-labelledby="nav-return-label"
          >
            <svg
              role="img"
              aria-labelledby="nav-return-label"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              width="18.035"
              height="16.297"
            >
              <title id="nav-return-label">返回</title>

              <filter id="shadow">
                <feDropShadow
                  dx="2.2"
                  dy="2.2"
                  stdDeviation="0"
                  flood-color="#ffffff"
                />
              </filter>

              <path
                aria-labelledby="nav-return-label"
                d="M7.865 16.414L.684 9.233a.967.967 0 0 1 0-1.368L7.865.684a.967.967 0 0 1 1.368 1.368L3.792 7.493h13.676a.967.967 0 1 1 0 1.934H3.614l5.619 5.619a.967.967 0 1 1-1.368 1.368z"
                stroke="#313131"
                filter="url(#shadow)"
                stroke-width="0.6"
              />
            </svg>
          </router-link>
        </template>

        <h1>五十音表格</h1>
      </top-bar>

      <table-display-control
        :service="service"
        :current="current"
      ></table-display-control>
    </div>

    <main>
      <section
        v-for="([groupName, rows]) in Object.entries(current.context.gojuon)"
        :key="groupName"
        role="region"
        :aria-labelledby="`${groupName}-title`"
        class="table-section"
      >
        <gojuon-title fontSize="1.25rem">
          <h2 :id="`${groupName}-title`">{{ generateTitle(groupName) }}</h2>
        </gojuon-title>

        <table
          :id="groupName"
          :aria-labelledby="`${groupName}-title`"
          data-wrap-cols="true"
          data-wrap-rows="false"
          :aria-rowcount="rows.length"
          aria-colcount="5"
        >
          <tr>
            <th scope="col">
              <span class="th-text">a</span>
            </th>
            <th scope="col">
              <span class="th-text">i</span>
            </th>
            <th scope="col">
              <span class="th-text">u</span>
            </th>
            <th scope="col">
              <span class="th-text">e</span>
            </th>
            <th scope="col">
              <span class="th-text">o</span>
            </th>
          </tr>

          <tr
            v-for="(row, rowIndex) in rows"
            :key="rowIndex"
            role="rowgroup"
            :aria-rowindex="rowIndex + 1"
            class="table-row"
          >
            <td
              v-for="(gojuon /* [hiragana, katakana, romanization] */, columnIndex) in row"
              :key="gojuon != 'empty' ? `${gojuon[0]}-${gojuon[1]}-${gojuon[2]}` : `empty-${rowIndex}-${columnIndex}`"
              role="gridcell"
              :aria-colindex="columnIndex + 1"
            >
              <button
                :id="`${groupName}-${rowIndex}-${columnIndex}`"
                class="table-button"
                :class="{'empty-button': gojuon == 'empty'}"
                :aria-pressed="isCursorPosition(groupName, rowIndex, columnIndex) ? 'true' : false"
                @keydown.prevent.up="service.send('FOCUS_COUSOR_UP')"
                @keydown.prevent.down="service.send('FOCUS_COUSOR_DOWN')"
                @keydown.prevent.right="service.send('FOCUS_COUSOR_RIGHT')"
                @keydown.prevent.left="service.send('FOCUS_COUSOR_LEFT')"
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
                <div
                  class="table-button__content"
                  :class="[groupName == 'yoon' ? 'three-row' : 'two-row']"
                >
                  <template v-if="gojuon != 'empty'">
                    <span
                      lang="ja-JP"
                      class="hiragana"
                      v-show="checkDisplayAndPeek('hiragana', groupName, rowIndex, columnIndex)"
                    >
                      {{ gojuon[0] }}
                    </span>

                    <span
                      lang="ja-JP"
                      class="katakana"
                      v-show="checkDisplayAndPeek('katakana', groupName, rowIndex, columnIndex)"
                    >
                      {{ gojuon[1] }}
                    </span>

                    <span
                      lang="ja-JP"
                      class="romanization"
                    >{{ gojuon[2] }}</span>
                  </template>

                  <template v-else>
                    無內容
                  </template>
                </div>
              </button>
            </td>
          </tr>
        </table>
      </section>

      <table-drawing-board
        :service="service"
        :current="current"
        :activeGroupName="current.context.activeGroupName"
        :activeRow="current.context.activeRow"
        :activeColumn="current.context.activeColumn"
      ></table-drawing-board>

    </main>
  </section>
</template>

<script>
import { ref, watch } from '@vue/composition-api'
import { machine } from '@/states/tableState.js'
import { useMachine } from '@/utils/useMachine.js'
import { generateTitle } from '@/states/gojuon.js'
import tableDisplayControl from '@/components/tableDisplayControl.vue'
import tableDrawingBoard from '@/components/tableDrawingBoard.vue'
import topBar from '@/components/topBar.vue'
import gojuonTitle from '@/components/gojuonTitle.vue'

export default {
  name: 'Table',
  components: {
    tableDisplayControl,
    tableDrawingBoard,
    topBar,
    gojuonTitle,
  },
  setup () {
    const { service, current } = useMachine(machine)
    const topStickyElement = ref(null)

    watch(
      () => current.value.matches('table.cellFocus.switchFocus'),
      function switchFocus (value) {
        if (value) {
          const { focusGroupName, focusRow, focusColumn } = current.value.context
          const target = document.getElementById(`${focusGroupName}-${focusRow}-${focusColumn}`)
          target && target.focus()

          service.value.send('SWITCH_FOCUS_FINISHED')
        }
      }
    )

    watch(
      () => current.value.matches('table.cellActive.scrollToActiveCursor'),
      function scrollToActiveCursor (value) {
        if (value) {
          try {
            const { activeGroupName, activeRow, activeColumn } = current.value.context
            const activeButton = document.getElementById(`${activeGroupName}-${activeRow}-${activeColumn}`)

            if (!topStickyElement.value) return
            const topStickyElementHeight = topStickyElement.value.offsetHeight

            if (!activeButton) return
            const top = window.scrollY + activeButton.getBoundingClientRect().top - topStickyElementHeight - 20
            window.scrollTo({ top, behavior: 'smooth' })

            service.value.send('SWITCH_ACTIVE_FINISHED')
          } catch (err) {
            console.error(err)
          } finally {
            service.value.send('SWITCH_ACTIVE_FINISHED')
          }
        }
      }
    )

    return {
      topStickyElement,
      service,
      current,
      // methods
      generateTitle,
      isCursorPosition,
      checkDisplayAndPeek,
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
.table-view {
  position: relative;
}

table {
  padding: 10px 12px;
  width: 100%;
}

tr {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 4px;
}

th,
td {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  max-width: 64px;
  height: 64px;
}

th {
  height: auto;
}

th + th,
td + td {
  margin-left: 4px;
}

.th-text {
  display: inline-block;
  width: 100%;
  height: 100%;
}

.table-button {
  font-family: system-ui;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  border: solid 0.6px #d3d3d3;
  background-color: #fff;
  font-size: 1rem;
  padding: 3px;
}

.table-button__content {
  display: grid;
  align-items: center;
  justify-items: center;
}

.table-button__content.two-row {
  grid-template:
    "hiragana     katakana    " 1fr
    "romanization romanization" 1fr / 1fr 1fr;
}

.table-button__content.three-row {
  grid-template:
    "hiragana    " 1fr
    "katakana    " 1fr
    "romanization" 1fr / 1fr;
}

.hiragana {
  grid-area: hiragana;
}

.katakana {
  grid-area: katakana;
}

.romanization {
  grid-area: romanization;
}

.table-button:focus {
  border: var(--focus-border);
  outline: none;
}

.table-button[aria-pressed="true"] {
  background-color: var(--main-color);
  border: var(--focus-border);
}

.empty-button {
  color: transparent;
}
</style>
