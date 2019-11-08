import { page } from '../../route.js'

class ClientRoute extends HTMLAnchorElement {
  constructor (...args) {
    super(...args)
    this.attatchRouter = this.attatchRouter.bind(this)
  }

  connectedCallback () {
    this.addEventListener('click', this.attatchRouter)
  }

  disconnectedCallback () {
    this.removeEventListener('click', this.attatchRouter)
  }

  attatchRouter (event) {
    event.preventDefault()
    page(`${this.location}`)
  }

  get location () {
    return this.getAttribute('href')
  }
}

customElements.define('client-route', ClientRoute, { extends: 'a' })
