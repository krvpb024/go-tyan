import { interpret } from 'xstate'
import { bind, wire } from 'hyperhtml'
import { machine } from './appElementState.js'

class AppElement extends HTMLElement {
  constructor () {
    super()

    this.service = interpret(machine)
      .onTransition(state => {
        bind(this)`
          ${state.matches('idle.home')
            ? import('./views/homeView').then(function renderHomeView () {
                return wire()`<div is="home-view"></div>`
              })
            : ''}

          ${state.matches('idle.table')
            ? import('./views/TableView/index.js').then(function renderTableView () {
                return wire()`
                  <div is="table-view"></div>
                `
            })
          : ''}

          ${state.matches('idle.exam')
            ? import('./views/ExamView.js').then(function renderExamView () {
                return wire()`
                  <div is="exam-view"></div>
                `
              })
            : ''
          }
        `
      })
      .start()
  }
}

customElements.define('app-element', AppElement, { extends: 'section' })
