import { html, render } from 'hybrids'

export const tableElement = {
  render: render(function renderTableViewContainer () {
    return html`
      <style>
      :host {
        width: 800px;
      }

      ::slotted([role="rowgroup"]) {
        display: flex;
        justify-content: space-between;
      }
      </style>

      <slot></slot>
    `
  }),
}
