import { bind } from 'hyperhtml'

class DrawingBoard extends HTMLElement {
  constructor (...args) {
    super(...args)

    this.startDrawing = this.startDrawing.bind(this)
    this.stopDrawing = this.stopDrawing.bind(this)
    this.drawLine = this.drawLine.bind(this)
    this.clearCavnas = this.clearCavnas.bind(this)

    this.shadow = this.attachShadow({ mode: 'closed' })
    this.render()

    // canvas settings
    this.canvas = this.shadow.querySelector('canvas')
    this.ctx = this.canvas.getContext('2d')
    this.ctx.lineWidth = 15
    this.ctx.lineJoin = 'round'
    this.ctx.lineCap = 'round'

    // state
    this.lastY = 0
    this.lastX = 0
    this.canDraw = false
  }

  get canvasWidth () {
    return this.getAttribute('width')
  }

  get canvasHeight () {
    return this.getAttribute('height')
  }

  getMousePosition (clientX, clientY) {
    const { left, top } = this.canvas.getBoundingClientRect()
    const x = clientX - left
    const y = clientY - top
    return [x, y]
  }

  startDrawing ({ clientX, clientY }) {
    this.canDraw = true
    const [x, y] = this.getMousePosition(clientX, clientY)
    ;[this.lastX, this.lastY] = [x, y]
  }

  drawLine ({ clientX, clientY }) {
    if (!this.canDraw) return
    const [x, y] = this.getMousePosition(clientX, clientY)

    this.ctx.beginPath()
    this.ctx.moveTo(this.lastX, this.lastY)
    this.ctx.lineTo(x, y)
    this.ctx.stroke()

    ;[this.lastX, this.lastY] = [x, y]
  }

  stopDrawing () {
    this.canDraw = false
  }

  clearCavnas () {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
  }

  render () {
    bind(this.shadow)`
      <style>
      canvas {
        border: 1px green solid;
      }
      </style>

      <div>
        <button onclick="${this.clearCavnas}">清除</button>
      </div>

      <canvas
        width="${this.canvasWidth}" height="${this.canvasHeight}"
        onmousedown="${this.startDrawing}" ontouchstart="${this.startDrawing}"
        onmouseup="${this.stopDrawing}" ontouchend="${this.stopDrawing}"
        onmousemove="${this.drawLine}" ontouchmove="${this.drawLine}"
      ></canvas>
    `
  }
}

customElements.define('drawing-board', DrawingBoard)
