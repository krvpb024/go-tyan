import '../components/homeViewSelect.js'
import { html, define, render } from 'hybrids'

const tableView = {
  render: render(function renderTableView () {
    return html`
      <h1>Table</h1>
    `
  }, { shadowRoot: false })
}

define('table-view', tableView)
