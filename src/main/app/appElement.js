import { html, define, render } from 'hybrids'
import './components/homeSelect.js'
import { serviceFactory, currentFactory } from '../../factories/index.js'
import { machine } from './appElementState.js'

export const appElement = {
  service: serviceFactory(machine),
  current: currentFactory(machine),
  render: render(
    function renderAppElement ({ current }) {
      return html`
        ${current.matches('idle.home') && html.resolve(import('./views/homeView.js').then(function showHomeView () {
          return html`<home-view></home-view>`
        }))}

        ${current.matches('idle.table') && html.resolve(import('./views/tableView.js').then(function showHomeView () {
          return html`<table-view></table-view>`
        }))}

        ${current.matches('idle.exam') && html.resolve(import('./views/examView.js').then(function showHomeView () {
          return html`<exam-view></exam-view>`
        }))}
      `
    },
    { shadowRoot: false },
  ),
}

define('app-element', appElement)
