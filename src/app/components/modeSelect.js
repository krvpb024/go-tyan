import { html, define } from 'hybrids'
import { router } from '../../route.js'

export const modeSelect = {
  render: function renderModeSelect () {
    return html`
    <style>
    .link-container {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
    </style>

    <div class="link-container">
      <slot onslotchange="${setRouter}"></slot>
    </div>
  `
  }
}

define('mode-select', modeSelect)

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
        router.navigate(`/${location}`)
      })
      return aTag
    })
}
