import { interpret } from 'xstate'
import { ref } from '@vue/composition-api'

export function useMachine (machine) {
  const service = ref(interpret(machine))
  const current = ref(machine.initialState)

  service
    .value
    .onTransition(function updateState (state) {
      // console.log(JSON.stringify(state.value, null, 2))
      current.value = state
    })
    .start()

  return {
    service,
    current,
  }
}
