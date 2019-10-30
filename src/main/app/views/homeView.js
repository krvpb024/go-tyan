import { viewSelect } from '../components/viewSelect.js'
import { html, define, render } from 'hybrids'

const homeView = {
  render: render(function renderHomeView () {
    return html`
      <h1>App</h1>

      <view-select>
        <a href="/table">五十音表格</a>
        <a href="/exam">五十音測驗</a>
      </view-select>
    `.define({ viewSelect })
  }, { shadowRoot: false },
  ),
}

define('home-view', homeView)
