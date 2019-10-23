import Navigo from 'navigo'

const root = null
const useHash = true
const hash = '#'
const router = new Navigo(root, useHash, hash)

router
  .on({
    table () {
      rerenderView('table')
    },
    exam () {
      rerenderView('exam')
    },
    '' () {
      rerenderView('home')
    },
    '*' () {
      console.log('404')
    }
  })
  .resolve()

export {
  router
}

function rerenderView (viewName) {
  const appElement = document.getElementsByTagName('app-element')[0]
  appElement.service && appElement.service.send({ type: 'UPDATE_VIEW', data: viewName })
}
