import { interpret } from 'xstate'

function serviceFactory (machine) {
  return {
    connect: function serviceConnect (host, key, invalidate) {
      const service = interpret(machine)
        .onTransition(function serviceTransition (state) {
          host.current = state
        })
        .start()
      host[key] = service

      return function serviceDisconnect () {
        service.stop()
      }
    }
  }
}

function currentFactory (machine) {
  return {
    connect (host, key) {
      host[key] = machine.initialState
    }
  }
}

export {
  serviceFactory,
  currentFactory
}
