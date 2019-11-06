import { bind } from 'hyperhtml'

class ExamView extends HTMLDivElement {
  constructor () {
    super()

    bind(this)`
      <h1>Exam</h1>
    `
  }
}

customElements.define('exam-view', ExamView, { extends: 'div' })
