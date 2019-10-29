import '../components/homeSelect.js'
import '../components/tableElement.js'
import '../components/tableItem.js'
import { html, define, render } from 'hybrids'
import { machine } from './tableViewState.js'
import { serviceFactory, currentFactory } from '../../../factories/index.js'

const tableView = {
  service: serviceFactory(machine),
  current: currentFactory(machine),
  render: render(function renderTableView (host) {
    return html`
      <h1 class="table__h1">五十音表格</h1>

      <table-element>
        ${host.current.context.gojuon.map(function renderTableItem (gojuon) {
          return html`
            <table-item data-column="${generateColumnNumber(gojuon)}">
              <button type="button">${gojuon}</button>
            </table-item>
          `
        })}
      </table-element>
    `
  }, { shadowRoot: false }),
}

define('table-view', tableView)

function generateColumnNumber ([hiragana]) {
  if (hiragana == 'ん') {
    return 1
  } else if (['わ', 'を'].includes(hiragana)) {
    return 2
  } else if (
    ['や', 'ゆ', 'よ'].includes(hiragana) ||
    hiragana.length == 2
  ) {
    return 3
  }
  return 5
}
