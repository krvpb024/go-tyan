import Navigo from 'navigo'

const root = null
const useHash = true
const hash = '#'
const router = new Navigo(root, useHash, hash)

router
  .on({
    table: function () {
      console.log('table')
    },
    exam: function () {
      console.log('exam')
    },
    '*': function () {
      console.log('404')
    }
  })
  .resolve()

export {
  router
}
