import { watch } from '@vue/composition-api'

export function useModalNavigation (elementArray) {
  watch(elementArray,
    function modalFocusableElementWatcher (elements, previousElements, onCleanup) {
      if (elements == null || previousElements == null) return
      var first = elements[0]
      var last = elements[elements.length - 1]

      first.addEventListener('keydown', navToLast)
      last.addEventListener('keydown', navToFirst)

      onCleanup(function modalNavigationCleanUp () {
        first.removeEventListener('keydown', navToLast)
        last.removeEventListener('keydown', navToFirst)
      })

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
  )
}
