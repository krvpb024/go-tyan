// Workbox injectManifest
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0-beta.1/workbox-sw.js')
workbox.precaching.precacheAndRoute([
  {
    "url": "app.33ada3e7.css",
    "revision": "ab318c50da7c8159cd0a808e3a7eea51"
  },
  {
    "url": "chunk-vendors.28d0a6b8.css",
    "revision": "e071ce4f2501ac49ab948bfb2bf53b74"
  },
  {
    "url": "icon/48.png",
    "revision": "a294542d9fdbcb5486b8322f34b678e1"
  },
  {
    "url": "icon/48@11x.png",
    "revision": "e5e63612036376c8d5f4dcfceb90e91b"
  },
  {
    "url": "icon/48@13x.png",
    "revision": "c2a7fd61a9f14b5ec0b5260169e73c1b"
  },
  {
    "url": "icon/48@2x.png",
    "revision": "35cb752ec8e07e8f27c2f40e72395d5e"
  },
  {
    "url": "icon/48@4x.png",
    "revision": "eca696362926af6f3f4470dddfd1441a"
  },
  {
    "url": "icon/48@6x.png",
    "revision": "3961fa9ad265d717f8629b1687249a73"
  },
  {
    "url": "icon/ios48@4x.png",
    "revision": "61fb18e560f8a225b8a86bcd744655ad"
  },
  {
    "url": "img/48@6x.3961fa9a.png",
    "revision": "3961fa9ad265d717f8629b1687249a73"
  },
  {
    "url": "img/arrow_back.b948abb0.svg",
    "revision": "b948abb0a341df0e285ded7319536713"
  },
  {
    "url": "img/close.50ebd0dc.svg",
    "revision": "50ebd0dc09192d9559ddd40222305c4c"
  },
  {
    "url": "img/ihelp.529de732.svg",
    "revision": "529de732bea558a03cdba8db18dd4fae"
  },
  {
    "url": "img/info.86e18a97.svg",
    "revision": "86e18a97581a0183d2a650d4a49e42fc"
  },
  {
    "url": "img/ios48@4x.61fb18e5.png",
    "revision": "61fb18e560f8a225b8a86bcd744655ad"
  },
  {
    "url": "index.html",
    "revision": "0a299ef02cd64d7ea7c34cbc53e1ac87"
  },
  {
    "url": "js/app.af23fa84.js",
    "revision": "b0d77af4b7cec2ea006fd75d0a22cd2b"
  },
  {
    "url": "js/chunk-vendors.a02c9a92.js",
    "revision": "08f8a4601d72bfedd98de83e25d55fc6"
  },
  {
    "url": "manifest.json",
    "revision": "f42be98a838060bddd27073e2343c730"
  }
])
// Workbox injectManifest End

self.addEventListener('install', event => {
  self.skipWaiting()
})
