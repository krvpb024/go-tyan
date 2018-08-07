// Workbox injectManifest
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0-beta.1/workbox-sw.js')
workbox.precaching.precacheAndRoute([])
// Workbox injectManifest End

self.addEventListener('install', event => {
  self.skipWaiting()
})
