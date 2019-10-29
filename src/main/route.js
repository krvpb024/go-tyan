import Navigo from 'navigo'

const root = null
const useHash = true
const hash = '#'
const router = new Navigo(root, useHash, hash)

router
  .on({
    table () {
      changeView('table')
    },
    exam () {
      changeView('exam')
    },
    '' () {
      changeView('home')
    },
    '*' () {
      console.log('404')
    },
  })
  .resolve()

export {
  router,
}

function changeView (viewName) {
  const [appElement] = document.getElementsByTagName('app-element')
  appElement.service && appElement.service.send({ type: 'UPDATE_VIEW', data: viewName })
}
