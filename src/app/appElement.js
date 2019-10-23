import './components/modeSelect.js'
import { html, define, render } from 'hybrids'

export const appElement = {
  render: render(
    function renderAppElement () {
      return html`
        <mode-select>
          <a href="/table">五十音表格</a>
          <a href="/exam">五十音測驗</a>
        </mode-select>
      `
    },
    { shadowRoot: false }
  )
}

define('app-element', appElement)
