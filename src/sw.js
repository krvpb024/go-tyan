const CACHE_NAME = 'gojuon-alpha-4.1'

const { assets } = global.serviceWorkerOption
const assetsToCache = [...assets, './']

self.addEventListener('install', function (event) {
  event.waitUntil(preCacheAssets(assetsToCache))
})

self.addEventListener('fetch', function (event) {
  event.respondWith(returnCacheFirstThenFetch(event.request))
})

self.addEventListener('activate', function (event) {
  event.waitUntil(clearCacheExcept(CACHE_NAME))
})

function preCacheAssets (assets) {
  return caches
    .open(CACHE_NAME)
    .then(function addAssetsToCache (cache) {
      return cache.addAll(assets)
    })
    .then(function skipWaiting () {
      return self.skipWaiting()
    })
}

function returnCacheFirstThenFetch (request) {
  return caches.match(request).then(function returnMatchOrFetch (matching) {
    if (matching) return matching
    return fetch(request)
  })
}

function clearCacheExcept (currentCache) {
  return caches
    .keys()
    .then(function clearOldCache (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName != currentCache) return caches.delete(cacheName)
        })
      )
    })
    .then(function skipWaiting () {
      return self.clients.claim()
    })
}
