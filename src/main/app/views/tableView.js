import { html, define, render } from 'hybrids'
import { machine } from './tableViewState.js'
import { serviceFactory, currentFactory } from '../../../factories/index.js'
import { tableDisplayControl } from './../components/tableDisplayControl.js'
import style from './tableView.css'

const tableView = {
  service: serviceFactory(machine),
  current: currentFactory(machine),
  gojuonTuple ({
    current: {
      context: {
        gojuon = {},
      } = {},
    } = {},
  }) {
    return Object.entries(gojuon)
  },
  displayValue ({ current }) {
    return {
      hiragana: current.matches('table.hiragana.show'),
      katakana: current.matches('table.katakana.show'),
      drawingBoard: current.matches('drawingBoard.show'),
    }
  },
  render: render(function renderTableView ({ current, gojuonTuple, displayValue }) {
    return html`
      <section>
        <table-display-control ontoggledisplay="${toggleDislayHandler}" displayValue="${displayValue}"></table-display-control>

        <h1 class="table__h1">五十音表格</h1>
          ${gojuonTuple.map(function renderGojuonTuple ([groupName, groupRows]) {
            return html`
              <section>
                <h2 id="${groupName}-title">${generateTitle(groupName)}</h2>
                <table
                  id="${groupName}" role="grid" aria-labelledby="${groupName}-title"
                  aria-rowcount="${groupRows.length}" aria-colcount="5"
                >
                ${groupRows.map(function renderRows (row, rowIndex) {
                  return html`
                    <tr role="rowgroup" aria-rowindex="${rowIndex + 1}">
                      ${row.map(function renderGojuonColumn (gojuon, columnIndex) {
                        return html`
                          <td role="gridcell" aria-colindex="${columnIndex + 1}">
                            <button
                              class="${style['table-button']}"
                              tabindex="${columnIndex == 0 && rowIndex == 0 ? '0' : '-1'}"
                              onkeydown="${setFocusToTargetButton}"
                              onclick="${updateCursor}"
                              aria-pressed="${
                                (current.context.groupName == groupName &&
                                current.context.row == rowIndex + 1 &&
                                current.context.column == columnIndex + 1).toString()
                              }"
                            >
                              <span id="hiragana" hidden="${!displayValue.hiragana}">${gojuon[0]}</span>
                              <span id="katakana" hidden="${!displayValue.katakana}">${gojuon[1]}</span>
                              <span>${gojuon[2]}</span>
                            </button>
                          </td>
                        `
                      })}
                    </tr>
                  `
                })}
                </table>
              </section>
            `
          })}

        ${displayValue.drawingBoard && html.resolve(import('./../components/drawingBoard.js').then(function showDrawingBoard () {
          return html`<drawing-board width="300" height="200"></drawing-board>`
        }))}
      </section>
    `.define({ tableDisplayControl })
  }, { shadowRoot: false }),
}

define('table-view', tableView)

// functions
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

function setFocusToTargetButton (host, event) {
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

function toggleDislayHandler (host, event) {
  const { type, checked } = event.detail
  host.service.send({ type, data: checked })
}

function updateCursor (host) {
  const {
    currentColumnNumber: column,
    currentRowNumber: row,
    currentTableName: groupName,
  } = getButtonInformation(event.currentTarget)

  host.service.send({
    type: 'UPDATE_CURSOR',
    data: {
      groupName,
      row,
      column,
    },
  })
}

function getButtonInformation (button) {
  var currentTd = button.parentElement
  var currentColumnNumber = Number(currentTd.getAttribute('aria-colindex'))

  var currentTr = currentTd.parentElement
  var currentRowNumber = Number(currentTr.getAttribute('aria-rowindex'))

  var currentTable = currentTr.parentElement
  var currentTableName = currentTable.id

  return { currentColumnNumber, currentRowNumber, currentTableName }
}
