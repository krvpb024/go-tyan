import page from 'page'

page({ window })
page.base('/app')

page('/table', changeView('table'))
page('/exam', changeView('exam'))
page('*', changeView('home'))

export {
  page,
}

function changeView (viewName) {
  return function changeViewWithName () {
    const appElement = document.getElementById('app-element')
    appElement.service && appElement.service.send({ type: 'UPDATE_VIEW', data: viewName })
  }
}
