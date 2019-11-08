import { bind, wire } from 'hyperhtml'
import { interpret } from 'xstate'
import { machine } from './state/tableState.js'
import './components/DrawingBoard.js'
import style from './index.css'

class TableView extends HTMLDivElement {
  constructor (...args) {
    super(...args)

    // this.updateCursor = this.updateCursor.bind(this)
    this.checkedHandler = this.checkedHandler.bind(this)

    this.current = machine.initialState
    this.service = interpret(machine)
      .onTransition(state => {
        this.current = state
        this.render()
      })
      .start()
  }

  get gojuonTuple () {
    const {
      context: {
        gojuon = {},
      } = {},
    } = this.current

    return Object.entries(gojuon)
  }

  generateTitle (groupName) {
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

  checkedHandler (type) {
    return (event) => {
      this.service.send({
        type,
        data: event.target.checked,
      })
    }
  }

  render () {
    bind(this)`
      <h1>表格</h1>

      <form class="${style['table-form']}">
        <input type="checkbox" id="hiragana-input" oninput="${this.checkedHandler('HIRAGANA_TOGGLE_DISPLAY')}" checked="${this.current.matches('table.hiragana.show')}">
        <label for="hiragana-input">hiragana</label>

        <input type="checkbox" id="katakana-input" oninput="${this.checkedHandler('KATAKANA_TOGGLE_DISPLAY')}" checked="${this.current.matches('table.katakana.show')}">
        <label for="katakana-input">katakana</label>

        <input type="checkbox" id="drawingBoard-input" oninput="${this.checkedHandler('DRAWING_BOARD_TOGGLE_DISPLAY')}" checked="${this.current.matches('drawingBoard.show')}">
        <label for="drawingBoard-input">drawingBoard</label>
      </form>

      ${this.gojuonTuple.map(([groupName, groupRows]) => wire()`
      <section>
        <h2 id="${groupName}-caption" align="top">${this.generateTitle(groupName)}</h2>

        <table
          id="${groupName}-table" role="grid" aria-labelledby="${groupName}-caption"
          aria-rowcount="${groupRows.length}" aria-colcount="5" 
        >
        ${groupRows.map((row, rowIndex) => wire()`
          <tr aria-rowindex="${rowIndex + 1}">
          ${row.map((gojuon, columnIndex) => wire()`
            <td aria-colindex="${columnIndex + 1}">
              <span id="hiragana" hidden="${this.current.matches('table.hiragana.hide')}">${gojuon[0]}</span>
              <span id="katakana" hidden="${this.current.matches('table.katakana.hide')}">${gojuon[1]}</span>
              <span id="pinyin">${gojuon[2]}</span>
            </th>
          `)}
          </tr>
        `)}
        </table>
      </section>
      `)}

      ${this.current.matches('drawingBoard.show')
        ? wire()`
        <div
          class="${style['drawing-board-container']}"
        >
          <h1>手寫板</h1>

          <drawing-board
            class="root" width="200" height="200"
          ></drawing-board>
        </div>
        `
        : ''
      }
    `
  }

  // get cursor () {
  //   const { groupName, row, column } = this.current.context
  //   return { groupName, row, column }
  // }

  // setFocusToTargetButton (event) {
  //   if (!['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'].includes(event.code)) return

  //   event.preventDefault()

  //   const currentButton = event.target

  //   const currentTd = currentButton.parentElement
  //   const currentColumnNumber = Number(currentTd.getAttribute('aria-colindex'))

  //   const currentTr = currentTd.parentElement
  //   const currentRowNumber = Number(currentTr.getAttribute('aria-rowindex'))

  //   const currentTable = currentTr.parentElement
  //   const currentTableName = currentTable.id

  //   const target = findTargetBy(event.code)
  //   if (target) target.focus()

  //   function findTargetBy (eventCode) {
  //     switch (eventCode) {
  //       case 'ArrowUp':
  //         return currentTable.querySelector(`#${currentTableName} tr[aria-rowindex="${currentRowNumber - 1}"] td[aria-colindex="1"] button`)
  //       case 'ArrowDown':
  //         return currentTable.querySelector(`#${currentTableName} tr[aria-rowindex="${currentRowNumber + 1}"] td[aria-colindex="1"] button`)
  //       case 'ArrowLeft':
  //         return currentTable.querySelector(`#${currentTableName} tr[aria-rowindex="${currentRowNumber}"] td[aria-colindex="${currentColumnNumber - 1}"] button`)
  //       case 'ArrowRight':
  //         return currentTable.querySelector(`#${currentTableName} tr[aria-rowindex="${currentRowNumber}"] td[aria-colindex="${currentColumnNumber + 1}"] button`)
  //       default:
  //     }
  //   }
  // }

  // updateCursor (data) {
  //   return () => {
  //     this.service.send({
  //       type: 'UPDATE_CURSOR',
  //       data,
  //     })
  //   }
  // }

  /* <button
  class="${style['canvas-button']}"
  aria-pressed="${this.cursor.groupName == groupName && this.cursor.row == rowIndex && this.cursor.column == columnIndex}"
  tabindex="${[columnIndex, rowIndex].every(num => num == 0) ? '0' : '-1'}"
  onkeydown="${this.setFocusToTargetButton}"
  onclick="${this.updateCursor({
    groupName,
    row: rowIndex,
    column: columnIndex,
  })}"
>
  <span id="hiragana" hidden="${this.current.matches('table.hiragana.hide')}">${gojuon[0]}</span>
  <span id="katakana" hidden="${this.current.matches('table.katakana.hide')}">${gojuon[1]}</span>
  <span id="pinyin">${gojuon[2]}</span>
</button> */
}

customElements.define('table-view', TableView, { extends: 'div' })
