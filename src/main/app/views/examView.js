import { html, define, render } from 'hybrids'

const examView = {
  render: render(function renderExamView () {
    return html`
      <h1>Exam</h1>
    `
  }, { shadowRoot: false }),
}

define('exam-view', examView)
