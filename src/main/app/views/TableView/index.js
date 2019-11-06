import { machine } from './tableState.js'
import { bind, wire } from 'hyperhtml'
import { interpret } from 'xstate'

class TableView extends HTMLDivElement {
  constructor () {
    super()

    this.updateCursor = this.updateCursor.bind(this)
    this.current = machine.initialState
    this.service = interpret(machine)
      .onTransition(state => {
        console.log(state)
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

  setFocusToTargetButton (event) {
    if (['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'].includes(event.code)) {
      event.preventDefault()

      var currentButton = event.target

      var currentTd = currentButton.parentElement
      var currentColumnNumber = Number(currentTd.getAttribute('aria-colindex'))

      var currentTr = currentTd.parentElement
      var currentRowNumber = Number(currentTr.getAttribute('aria-rowindex'))

      var currentTable = currentTr.parentElement
      var currentTableName = currentTable.id

      const target = findTargetBy(event.code)

      if (target) target.focus()
    }

    function findTargetBy (eventCode) {
      switch (eventCode) {
        case 'ArrowUp':
          return document.querySelector(`#${currentTableName} tr[aria-rowindex="${currentRowNumber - 1}"] td[aria-colindex="1"] button`)
        case 'ArrowDown':
          return document.querySelector(`#${currentTableName} tr[aria-rowindex="${currentRowNumber + 1}"] td[aria-colindex="1"] button`)
        case 'ArrowLeft':
          return document.querySelector(`#${currentTableName} tr[aria-rowindex="${currentRowNumber}"] td[aria-colindex="${currentColumnNumber - 1}"] button`)
        case 'ArrowRight':
          return document.querySelector(`#${currentTableName} tr[aria-rowindex="${currentRowNumber}"] td[aria-colindex="${currentColumnNumber + 1}"] button`)
        default:
      }
    }
  }

  updateCursor (data) {
    return () => {
      this.service.send({
        type: 'UPDATE_CURSOR',
        data,
      })
    }
  }

  render () {
    bind(this)`
      <h1>表格</h1>
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
              <button
                tabindex="${[columnIndex, rowIndex].every(num => num == 0) ? '0' : '-1'}"
                onkeydown="${this.setFocusToTargetButton}"
                onclick="${this.updateCursor({
                  groupName,
                  row: rowIndex,
                  column: columnIndex,
                })}"
              >
                ${gojuon}
              </button>
            </th>
          `)}
          </tr>
        `)}
        </table>
      </section>
      `)}
    `
  }
}

customElements.define('table-view', TableView, { extends: 'div' })
