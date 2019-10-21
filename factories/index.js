import { interpret } from 'xstate'

function serviceFactory (machine) {
  return {
    connect: function serviceConnect (host, key, invalidate) {
      const service = interpret(machine)
        .onTransition(function serviceTransition (state) {
          console.log(service)
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

export {
  serviceFactory
}
