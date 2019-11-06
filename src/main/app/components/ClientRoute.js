import { page } from '../../route.js'

class ClientRoute extends HTMLAnchorElement {
  connectedCallback () {
    this.addEventListener('click', function attatchRouter (event) {
      event.preventDefault()
      page(`${this.location}`)
    })
  }

  get location () {
    return this.getAttribute('href')
  }
}

customElements.define('client-route', ClientRoute, { extends: 'a' })
