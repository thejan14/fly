const cacheName = "Jan Oberpichler _ Sven Oberpichler-Journey of a Lonely Robot-0.24.08.24a";
const contentToCache = [
    "Build/421807e9f3a0a1538d00a6e6bc6bbb28.loader.js",
    "Build/1888da46c53d0e0d412d34a081e96b13.framework.js.gz",
    "Build/66e917b38a12ab2ad63679f3cee98884.data.gz",
    "Build/53633816ecbaf961e5b876bd9f8bae09.wasm.gz",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
