import { bind } from 'hyperhtml'
import '../components/ClientRoute.js'

class HomeView extends HTMLDivElement {
  constructor () {
    super()

    bind(this)`
      <h1>home</h1>
      
      <nav>
        <a is="client-route" href="/table">表格</a>
        <a is="client-route" href="/exam">測驗</a>
      </nav>
    `
  }
}

customElements.define('home-view', HomeView, { extends: 'div' })
