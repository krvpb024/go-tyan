import { html, render, define, dispatch } from 'hybrids'

const drawingBoard = {
  // props
  displayValue: {
    hiragana: false,
    katakana: false,
  },
  cursor: {
    observe (host, value, lastValue) {
      clearCavnas(host)
    },
  },
  // data
  ctx: null,
  width: 200,
  height: 200,
  lastX: 0,
  lastY: 0,
  keypressed: false,
  render: render(function renderDrawingBoard ({ width, height, displayValue }) {
    return html`
      <style>
        :host {
          position: sticky;
          bottom: 0;
        }

        .root {
          background-color: #f99;
        }

        button:focus {
          border: 2px black solid;
        }

        .block-button {
          display: block;
        }

        canvas {
          border: #fff 1px solid;
        }
      </style>

      <div class="root">
        <h1>手寫板</h1>

        <button class="block-button" onclick="${clearCavnas}">
          清除
        </button>

        <button class="block-button" onclick="${closeDrawingBoard}">
          關閉
        </button>

        <div>
          <button onclick="${cursorToPrevious}">
            ←
          </button>

          <button onclick="${cursorToNext}">
            →
          </button>
        </div>

        ${!displayValue.hiragana
        ? html`
        <button
          id="hiragana" class="block-button"
          onmousedown="${sendParent('peek')}" ontouchstart="${sendParent('peek')}" onkeypress=${sendParent('peek')}
          onmouseup="${sendParent('cover')}" ontouchend="${sendParent('cover')}" onkeyup="${sendParent('cover')}"
        >
          偷看平假名
        </button>`
        : ''
        }

        ${!displayValue.katakana
        ? html`
        <button
          id="katakana" class="block-button"
          onmousedown="${sendParent('peek')}" ontouchstart="${sendParent('peek')}" onkeypress=${sendParent('peek')}
          onmouseup="${sendParent('cover')}" ontouchend="${sendParent('cover')}" onkeyup="${sendParent('cover')}"
        >
          偷看片假名
        </button>`
        : ''
        }

        <canvas
          width="${width}" height="${height}"
          onmousedown="${startDrawing}" ontouchstart="${startDrawing}"
          onmouseup="${stopDrawing}" ontouchend="${stopDrawing}"
          onmousemove="${drawLine}" ontouchmove="${drawLine}"
        ></canvas>
      </div>
    `
  }),
}

define('drawing-board', drawingBoard)

export {
  drawingBoard,
}

// functions

// canvas
function startDrawing (host, { clientX, clientY, target }) {
  if (!host.canvas) host.canvas = target
  if (!host.ctx) {
    host.ctx = host.canvas.getContext('2d')
    host.ctx.lineWidth = 15
    host.ctx.lineJoin = 'round'
    host.ctx.lineCap = 'round'
  }
  host.canDraw = true
  const [x, y] = getMousePosition(host.canvas, clientX, clientY)
  host.lastX = x
  host.lastY = y
}

function drawLine (host, { clientX, clientY }) {
  if (!host.canDraw) return
  const [x, y] = getMousePosition(host.canvas, clientX, clientY)

  host.ctx.beginPath()
  host.ctx.moveTo(host.lastX, host.lastY)
  host.ctx.lineTo(x, y)
  host.ctx.stroke()

  host.lastX = x
  host.lastY = y
}

function stopDrawing (host) {
  host.canDraw = false
}

function clearCavnas (host) {
  if (!host.ctx) return
  host.ctx.clearRect(0, 0, host.width, host.height)
}

function getMousePosition (canvas, clientX, clientY) {
  const { left, top } = canvas.getBoundingClientRect()
  const x = clientX - left
  const y = clientY - top
  return [x, y]
}

// buttons
function sendParent (eventName) {
  return function sendpeekEventToParent (host, { type: DOMEventType, code, currentTarget }) {
    if (
      ['mousedown', 'touchstart', 'mouseup', 'touchend'].includes(DOMEventType) ||
      (['keypress', 'keyup'].includes(DOMEventType) && code == 'Space')
    ) {
      if (DOMEventType == 'keypress' && host.keypressed == true) return

      switch (DOMEventType) {
        case 'keypress':
          host.keypressed = true
          break
        case 'keyup':
          host.keypressed = false
          break
        default:
      }

      dispatch(host, eventName, {
        detail: {
          type: `${eventName.toUpperCase()}_${currentTarget.id.toUpperCase()}`,
        },
      })
    }
  }
}

function closeDrawingBoard (host, event) {
  dispatch(host, 'closeboard')
}

function cursorToPrevious (host) {
  clearCavnas(host)
  dispatch(host, 'cursortoprevious')
}

function cursorToNext (host) {
  clearCavnas(host)
  dispatch(host, 'cursortonext')
}
