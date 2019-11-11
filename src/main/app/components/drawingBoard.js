import { html, render, define } from 'hybrids'

const drawingBoard = {
  ctx: null,
  width: 200,
  height: 200,
  lastX: 0,
  lastY: 0,
  render: render(function renderDrawingBoard ({ width, height }) {
    return html`
      <style>
        :host {
          position: sticky;
          bottom: 0;
        }

        .root {
          background-color: red;
        }

        .clear-button {
          display: block;
        }

        canvas {
          border: #fff 1px solid;
        }
      </style>

      <div class="root">
        <h1>手寫板</h1>

        <button class="clear-button" onclick="${clearCavnas}">清除</button>

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
  host.ctx.clearRect(0, 0, host.width, host.height)
}

function getMousePosition (canvas, clientX, clientY) {
  const { left, top } = canvas.getBoundingClientRect()
  const x = clientX - left
  const y = clientY - top
  return [x, y]
}
