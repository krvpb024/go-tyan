import { html, render } from 'hybrids'

export const tableItem = {
  render: render(function renderTableItem (host) {
    return html`
      <style>
      :host {
        box-sizing: border-box;
        padding: 3px;
        flex-basis: 20%;
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
