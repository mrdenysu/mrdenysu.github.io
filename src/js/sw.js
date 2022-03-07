const version = "1.0.3-" + Math.round(Math.random() * 100);
const assetsUrls = [
  // Pages
  "/index.html", "/about.html", "/offline.html",
  // JS
  "/assets/js/main.js",
  // CSS
  "/assets/css/main.css",
  // Img
  "/assets/img/3.jpg", "/assets/img/logo.svg", "/assets/img/favicon.ico",
];

const staticCacheName = `s-${version}`;
const dynamicCacheName = `d-${version}`;

self.addEventListener('install', async (event) => {
  console.log("{SW}: install");
  //  Кешируем сайт
  const cache = await caches.open(staticCacheName);
  await cache.addAll(assetsUrls);
});

self.addEventListener('activate', async (event) => {
  console.log("{SW}: activate")
  // Удаление старого кеша
  const cacheList = await caches.keys();

  await Promise.all(
    cacheList
      .filter(name => name !== staticCacheName)
      .map(name => caches.delete(name))
  )
});

self.addEventListener('fetch', async (event) => {
  console.log("{SW}: fetch")
  const {request} = event;
  const url = new URL(request.url)

  if (url.origin === location.origin)
    event.respondWith(cacheFirst(request))
  else
    event.respondWith(networkFirst(request));
});

async function cacheFirst(request) {
  const cached = await caches.match(request)
  return cached ?? await fetch(request)
}

async function networkFirst(request) {
  const cache = await caches.open(dynamicCacheName);
  try {
    const response = await fetch(request);
    await cache.put(request, response.clone())
    return response;
  } catch (e) {
    const cachedResponse = await cache.match(request);

    return cachedResponse ?? await caches.match("/offline.html");
  }
}