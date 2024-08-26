const cacheName = "Jan Oberpichler _ Sven Oberpichler-Journey of a Lonely Robot-0.24.08.26rc1";
const contentToCache = [
    "Build/b2d9f29fb8ca81379d9fbc82c6e6e177.loader.js",
    "Build/1888da46c53d0e0d412d34a081e96b13.framework.js.gz",
    "Build/3f1ee5a0c6654bead93051e2111c5290.data.gz",
    "Build/87d47006fd85355cf9f487367372501b.wasm.gz",
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
