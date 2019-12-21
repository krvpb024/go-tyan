import { ref } from '@vue/composition-api'

export function useDragToMove () {
  // data
  const canDrag = ref(false)
  const lastTouchX = ref(null)
  const xMovement = ref(0)

  return {
    // data
    canDrag,
    xMovement,
    // methods
    dragStart,
    getDraggingMovement,
    dragEnd,
  }

  function dragStart (e) {
    canDrag.value = true
    if (e.touches) lastTouchX.value = e.touches[0].pageX
  }

  function getDraggingMovement (e) {
    if (!canDrag.value) return 0

    let movement
    if (e.touches) {
      movement = e.touches[0].pageX - lastTouchX.value
      lastTouchX.value = e.touches[0].pageX
    } else {
      movement = e.movementX
    }

    return movement == null ? 0 : movement
  }

  function dragEnd () {
    canDrag.value = false
  }
}
