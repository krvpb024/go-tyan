import { html, define, render } from 'hybrids'
import './components/homeViewSelect.js'
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
          ${current.matches('idle.home') && html.resolve(import('./views/homeView.js').then(function renderHomeView () {
            return html`<home-view></home-view>`
          }))}

          ${current.matches('idle.table') && html.resolve(import('./views/tableView.js').then(function renderHomeView () {
            return html`<table-view></table-view>`
          }))}

          ${current.matches('idle.exam') && html.resolve(import('./views/examView.js').then(function renderHomeView () {
            return html`<exam-view></exam-view>`
          }))}
        </div>
      `
    },
    { shadowRoot: false }
  )
}

define('app-element', appElement)
