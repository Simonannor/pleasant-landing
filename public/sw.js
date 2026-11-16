// Pleasant Springs Chapel — service worker
// Precaches the critical above-fold images so every visit after the first
// loads them from the service-worker cache instead of the network.

const CACHE_NAME = "chapel-v1";

const CRITICAL_ASSETS = [
  "/assets/chapel-shield.webp",
  "/assets/logo/chapel-frame-001.jpg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CRITICAL_ASSETS))
  );
});

self.addEventListener("fetch", (event) => {
  // Serve images from cache first; fall back to network and store for next time.
  if (event.request.destination === "image") {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) return cached;
        return fetch(event.request).then((fetched) => {
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, fetched.clone()));
          return fetched;
        });
      })
    );
  }
});
