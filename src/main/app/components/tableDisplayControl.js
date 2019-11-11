import { html, render, dispatch } from 'hybrids'

export const tableDisplayControl = {
  displayValue: {
    hiragana: false,
    katakana: false,
  },
  render: render(function renderTableDisplayControl ({ displayValue }) {
    return html`
      <style>
        :host {
          position: sticky;
          top: 0;
        }

        .root {
          background-color: green;
        }
      </style>

      <div class="root">
        <div class="field">
          <input
            type="checkbox" id="hiragana"
            oninput="${toggle('HIRAGANA_TOGGLE_DISPLAY')}"
            checked="${displayValue.hiragana}"
          >
          <label for="hiragana">hiragana</label>
        </div>
        <div class="field">
          <input
            type="checkbox" id="katakana"
            oninput="${toggle('KATAKANA_TOGGLE_DISPLAY')}"
            checked="${displayValue.katakana}"
          >
          <label for="katakana">katakana</label>
        </div>
      </div>
    `
  }),
}

function toggle (type) {
  return function dispatchEventToParent (host, { target: { checked } }) {
    dispatch(host, 'toggledisplay', {
      detail: {
        type,
        checked,
      },
    })
  }
}
