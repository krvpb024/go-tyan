import '../components/homeSelect.js'
import { html, define, render } from 'hybrids'

const homeView = {
  render: render(function renderHomeView () {
    return html`
      <h1>App</h1>

      <home-select>
        <a href="/table">五十音表格</a>
        <a href="/exam">五十音測驗</a>
      </home-select>
    `
  }, { shadowRoot: false },
  ),
}

define('home-view', homeView)
