import '../components/homeViewSelect.js'
import { html, define, render } from 'hybrids'

const homeView = {
  render: render(function renderHomeView () {
    return html`
      <h1>App</h1>

      <home-view-select>
        <a href="/table">五十音表格</a>
        <a href="/exam">五十音測驗</a>
      </home-view-select>
    `
  }, { shadowRoot: false }
  )
}

define('home-view', homeView)
