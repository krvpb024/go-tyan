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
    }
  },
  cursor ({ current: { context: { gojuon, groupName, row, column } } }) {
    return ((gojuon[groupName] || {})[row] || {})[column]
  },
  isCursorPosition: {
    get (host) {
      return function receiveComparison (groupName, rowIndex, columnIndex) {
        return host.current.context.groupName == groupName &&
        host.current.context.row == rowIndex + 1 &&
        host.current.context.column == columnIndex + 1
      }
    },
  },
  render: render(function renderTableView (host) {
    return html`
      <section id="table-view">
        <table-display-control
          ontoggledisplay="${toggleDislayHandler}"
          displayValue="${host.displayValue}"
        ></table-display-control>
        <h1 class="table__h1">五十音表格</h1>
          ${host.gojuonTuple.map(function renderGojuonTuple ([groupName, groupRows]) {
            return html`
              <section>
                <h2 id="${groupName}-title">${generateTitle(groupName)}</h2>
                <table
                  id="${groupName}" role="grid" aria-labelledby="${groupName}-title"
                  data-wrap-cols="true" data-wrap-rows="false"
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
                              aria-pressed="${host.isCursorPosition(groupName, rowIndex, columnIndex).toString()}"
                            >
                              <span id="hiragana" hidden="${
                                  (() => {
                                    if (!host.displayValue.hiragana && host.isCursorPosition(groupName, rowIndex, columnIndex) && host.current.matches('table.hiragana.hide.peek')) return false
                                    else if (!host.displayValue.hiragana) return true
                                    return false
                                  })()}"
                              >
                                ${gojuon[0]}
                              </span>
                              <span id="katakana" hidden="${
                                  (() => {
                                    if (!host.displayValue.katakana && host.isCursorPosition(groupName, rowIndex, columnIndex) && host.current.matches('table.katakana.hide.peek')) return false
                                    else if (!host.displayValue.katakana) return true
                                    return false
                                  })()}"
                              >
                                ${gojuon[1]}
                              </span>
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

        ${host.current.matches('drawingBoard.show') && html.resolve(import('./../components/drawingBoard.js').then(function showDrawingBoard () {
          return html`
            <drawing-board
              role="dialog" tabindex="0"
              width="300" height="200"
              displayValue="${host.displayValue}" cursor="${host.cursor}"
              onpeek="${peek}" oncover="${cover}"
              oncloseboard="${closeBoard}"
              oncursortoprevious="${cursorToPrevious}" oncursortonext="${cursorToNext}"
            ></drawing-board>
          `
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
        return document.querySelector(`#${currentTableName} tr[aria-rowindex="${currentRowNumber}"] td[aria-colindex="${currentColumnNumber - 1}"] button`) ||
        document.querySelector(`#${currentTableName} tr[aria-rowindex="${currentRowNumber - 1}"] td[aria-colindex="${(host.current.context.gojuon[currentTableName][currentRowNumber - 2] || {}).length}"] button`)
      case 'ArrowRight':
        return document.querySelector(`#${currentTableName} tr[aria-rowindex="${currentRowNumber}"] td[aria-colindex="${currentColumnNumber + 1}"] button`) ||
        document.querySelector(`#${currentTableName} tr[aria-rowindex="${currentRowNumber + 1}"] td[aria-colindex="1"] button`)
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

  const targetNode = document.getElementById('table-view')
  const config = { childList: true }

  const observer = new MutationObserver(function focusOnDrawingBoard (mutationsList, observer) {
    const [drawingBoard] = Array.from(mutationsList)
      .map(function remainNode ({ addedNodes: [addedNode] }) {
        return addedNode
      })
      .filter(function remainDrawingBoard ({ tagName } = {}) {
        return tagName == 'drawing-board'.toUpperCase()
      })
    drawingBoard && drawingBoard.focus({ preventScroll: true })
    observer.disconnect()
  })
  observer.observe(targetNode, config)
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

function peek (host, { detail: { type } }) {
  host.service.send({ type })
}

function cover (host, { detail: { type } }) {
  host.service.send({ type })
}

function closeBoard (host) {
  const lastCursorButton = document.querySelector(`#${host.current.context.groupName} tr[aria-rowindex="${host.current.context.row}"] td[aria-colindex="${host.current.context.column}"] button`)
  lastCursorButton && lastCursorButton.focus()
  host.service.send({ type: 'CLEAR_CURSOR' })
}

function cursorToPrevious (host) {
  host.service.send({ type: 'CURSOR_TO_PREVIOUS' })
}

function cursorToNext (host) {
  host.service.send({ type: 'CURSOR_TO_NEXT' })
}
