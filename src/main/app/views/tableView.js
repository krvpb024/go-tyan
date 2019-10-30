import { html, define, render } from 'hybrids'
import { machine } from './tableViewState.js'
import { serviceFactory, currentFactory } from '../../../factories/index.js'
import { tableElement } from '../components/tableElement.js'
import { tableItem } from '../components/tableItem.js'

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
  render: render(function renderTableView ({ gojuonTuple }) {
    return html`
      <section>
        <h1 class="table__h1">五十音表格</h1>
          ${gojuonTuple.map(function renderGojuonTuple ([groupName, groupRows]) {
            return html`
              <section>
                <h2 id="${groupName}-group-title">${generateTitle(groupName)}</h2>
                <table-element id="${groupName}-group" role="grid" aria-labelledby="${groupName}-group-title" aria-rowcount="${groupRows.length}" aria-colcount="5">
                ${groupRows.map(function renderRows (row, rowIndex) {
                  return html`
                    <div role="rowgroup" aria-rowindex="${rowIndex + 1}">
                      ${row.map(function renderGojuonColumn (gojuon, columnIndex) {
                        return html`
                          <table-item role="gridcell" aria-colindex="${columnIndex + 1}">
                            <button type="button" tabindex="${columnIndex == 0 && rowIndex == 0 ? '0' : '-1'}" onkeydown="${navigateGojuon}">${gojuon}</button>
                          </table-item>
                        `
                      })}
                    </div>
                  `.define({ tableElement, tableItem })
                })}
                </table-element>
              </section>
            `
          })}
      </section>
    `
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

function navigateGojuon (host, event) {
  if (['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'].includes(event.code)) {
    event.preventDefault()

    switch (event.code) {
      case 'ArrowLeft':
        switchTarget({ columnAdd: -1 })
        break
      case 'ArrowRight':
        switchTarget({ columnAdd: 1 })
        break
      case 'ArrowUp':
        switchTarget({ rowAdd: -1 })
        break
      case 'ArrowDown':
        switchTarget({ rowAdd: 1 })
        break
      default:
    }
  }

  // functions

  function switchTarget ({ columnAdd = 0, rowAdd = 0 }) {
    const colElement = event.target.parentElement
    const rowElement = colElement.parentElement
    const targetColindex = Number(colElement.getAttribute('aria-colindex')) + columnAdd
    const targetRowIndex = Number(rowElement.getAttribute('aria-rowindex')) + rowAdd

    const constgroupElement = rowElement.parentElement
    const groupId = constgroupElement.id

    const targetRow = document.querySelector(`#${groupId} [aria-rowindex="${targetRowIndex}"]`)
    if (!targetRow) return
    const targetColumn = targetRow.querySelector(
      // alwyas back to first element when change row
      `table-item[aria-colindex="${columnAdd ? targetColindex : 1}"]`,
    )
    if (!targetColumn) return

    const targetButton = targetColumn.querySelector('button')
    targetButton.focus()
  }
}
