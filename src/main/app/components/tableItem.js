import { html, define, render } from 'hybrids'

const tableItem = {
  render: render(function renderTableItem (host) {
    return html`
      <style>
      :host {
        box-sizing: border-box;
        padding: 3px;
      }

      :host([data-column="1"]) {
        width: 100%;
      }

      :host([data-column="2"]) {
        width: 50%;
      }

      :host([data-column="3"]) {
        width: calc(100% / 3);
      }

      :host([data-column="5"]) {
        width: 20%;
      }

      ::slotted(button) {
        width: 100%;
        height: 100%;
      }
      </style>

      <slot></slot>
    `
  }),
}

define('table-item', tableItem)
