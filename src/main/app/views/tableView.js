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
          ${gojuonTuple.map(function renderGojuonTuple ([groupName, groupItems]) {
            return html`
              <section>
                <h2>${generateTitle(groupName)}</h2>
                <table-element>
                ${groupItems.map(function functionName (gojuon) {
                  return html`
                    <table-item data-column="${generateColumnNumber(gojuon)}">
                      <button type="button">${gojuon}</button>
                    </table-item>
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
