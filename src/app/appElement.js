import './components/viewSelect.js'
import { html, define, render } from 'hybrids'
import { serviceFactory } from '../../factories/index.js'
import { machine } from './appElementState.js'

export const appElement = {
  service: serviceFactory(machine),
  current: machine.context,
  render: render(
    function renderAppElement ({ current }) {
      return html`
        <style>
        .root {
          position: relative;
        }

        .root__home, .root__table, .root__exam {
          position: relative;
        }

        .root__home--hide, .root__table--hide, .root__exam--hide {
          display: none;
        }
        </style>

        <div class="root">
          <div class="root__home${current.matches('idle.home') ? '' : ' root__home--hide'}">
            <h1>App</h1>

            <view-select>
              <a href="/table">五十音表格</a>
              <a href="/exam">五十音測驗</a>
            </view-select>
          </div>

          <div class="root__table${current.matches('idle.table') ? '' : ' root__table--hide'}">
            <h1>table</h1>
          </div>

          <div class="root__exam${current.matches('idle.exam') ? '' : ' root__exam--hide'}">
            <h1>exam</h1>
          </div>
        </div>
      `
    },
    { shadowRoot: false }
  )
}

define('app-element', appElement)
