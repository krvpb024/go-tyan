if ('serviceWorker' in navigator) {
  // Register a service worker hosted at the root of the
  // site using the default scope.
  navigator.serviceWorker.register('sw.js')
    .then(function (registration) {
    }, function (error) {
      console.log('Service worker registration failed:', error)
    })
} else {
  console.log('Service workers are not supported.')
}
