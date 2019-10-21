import Navigo from 'navigo'
const router = new Navigo()

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
