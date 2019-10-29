import { html, define } from 'hybrids'
import { page } from '../../route.js'

export const viewSelect = {
  render: function renderviewSelect () {
    return html`
      <style>
      :host {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }
      </style>

      <slot onslotchange="${setRouter}"></slot>
    `
  },
}

define('home-select', viewSelect)

// functions
function setRouter (host, event) {
  const slot = host.shadowRoot.querySelector('slot')
  const slotElements = Array.from(slot.assignedElements())

  slotElements
    .filter(function isAnchorTag ({ tagName }) {
      return tagName.toLowerCase() === 'a'
    })
    .forEach(function attatchRouterToLinks (aTag) {
      aTag.addEventListener('click', function attatchRouter (event) {
        event.preventDefault()
        const location = aTag.getAttribute('href')
        page(`${location}`)
      })
      return aTag
    })
}
