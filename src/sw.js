const CACHE_NAME = 'gojuon-alpha-5.1'

const { assets } = global.serviceWorkerOption
const assetsToCache = [...assets, './']

self.addEventListener('install', function swInstall (event) {
  self.skipWaiting()
  event.waitUntil(preCacheAssets(assetsToCache))
})

self.addEventListener('activate', function swActivate (event) {
  event.waitUntil(clearCacheExcept(CACHE_NAME))
})

self.addEventListener('fetch', function swFetch (event) {
  event.respondWith(returnCacheFirstThenNetwork(event.request))
})

function preCacheAssets (assets) {
  return caches
    .open(CACHE_NAME)
    .then(function addAssetsToCache (cache) {
      return cache.addAll(assets)
    })
}

function returnCacheFirstThenNetwork (request) {
  return caches.match(request).then(function returnMatchOrNetwork (matching) {
    if (matching) return matching
    return fetch(request)
  })
}

function clearCacheExcept (currentCache) {
  self.clients.claim()

  return caches
    .keys()
    .then(function clearOldCache (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName != currentCache) return caches.delete(cacheName)
        })
      )
    })
}
