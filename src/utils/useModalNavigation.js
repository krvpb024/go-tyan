export function useModalNavigation (element) {
  const elementArray = Array.from(element)
  const first = elementArray[0]
  const last = elementArray[elementArray.length - 1]

  first.focus()

  first.addEventListener('keydown', navToLast)
  last.addEventListener('keydown', navToFirst)

  return {
    removeListener () {
      first.removeEventListener('keydown', navToLast)
      last.removeEventListener('keydown', navToFirst)
    },
  }

  function navToLast (e) {
    if (e.code == 'Tab' && e.shiftKey) {
      e.preventDefault()
      last.focus()
    }
  }

  function navToFirst (e) {
    if (e.code == 'Tab' && !e.shiftKey) {
      e.preventDefault()
      first.focus()
    }
  }
}
