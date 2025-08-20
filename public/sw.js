const CACHE_NAME = "e2i-voip-v1";
const STATIC_CACHE = "e2i-voip-static-v1";
const DYNAMIC_CACHE = "e2i-voip-dynamic-v1";

// Ressources à mettre en cache immédiatement
const STATIC_ASSETS = [
  "/",
  "/offline",
  "/manifest.json",
  "/favicon.ico",
  "/images/logo.svg",
  "/images/photos/pexels-ketut-subiyanto-4559714-min.jpg",
  "/man-oniphone-business-min.jpg",
];

// Stratégie de cache pour les images
const IMAGE_CACHE_STRATEGY = "cache-first";
const API_CACHE_STRATEGY = "network-first";
const STATIC_CACHE_STRATEGY = "stale-while-revalidate";

// Installation du service worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
});

// Activation et nettoyage des anciens caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Interception des requêtes
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Gestion des images
  if (request.destination === "image") {
    event.respondWith(handleImageRequest(request));
    return;
  }

  // Gestion des API
  if (url.pathname.startsWith("/api/")) {
    event.respondWith(handleApiRequest(request));
    return;
  }

  // Gestion des ressources statiques
  if (request.destination === "script" || request.destination === "style") {
    event.respondWith(handleStaticRequest(request));
    return;
  }

  // Gestion des pages
  if (request.mode === "navigate") {
    event.respondWith(handlePageRequest(request));
    return;
  }
});

// Stratégie Cache First pour les images
async function handleImageRequest(request) {
  const cache = await caches.open(STATIC_CACHE);
  const cachedResponse = await cache.match(request);

  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    // Retourner une image de fallback si disponible
    const fallbackResponse = await cache.match("/images/placeholder.jpg");
    return fallbackResponse || new Response("", { status: 404 });
  }
}

// Stratégie Network First pour les API
async function handleApiRequest(request) {
  try {
    const networkResponse = await fetch(request);
    const cache = await caches.open(DYNAMIC_CACHE);
    cache.put(request, networkResponse.clone());
    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    return new Response(JSON.stringify({ error: "Offline" }), {
      status: 503,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// Stratégie Stale While Revalidate pour les ressources statiques
async function handleStaticRequest(request) {
  const cache = await caches.open(STATIC_CACHE);
  const cachedResponse = await cache.match(request);

  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  });

  return cachedResponse || fetchPromise;
}

// Stratégie Network First pour les pages
async function handlePageRequest(request) {
  try {
    const networkResponse = await fetch(request);
    const cache = await caches.open(DYNAMIC_CACHE);
    cache.put(request, networkResponse.clone());
    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    return caches.match("/offline");
  }
}

// Gestion des messages du client
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }

  if (event.data && event.data.type === "GET_CACHE_STATUS") {
    event.ports[0].postMessage({
      type: "CACHE_STATUS",
      staticCache: STATIC_CACHE,
      dynamicCache: DYNAMIC_CACHE,
    });
  }
});

// Nettoyage automatique du cache dynamique
self.addEventListener("periodicsync", (event) => {
  if (event.tag === "cleanup-cache") {
    event.waitUntil(cleanupCache());
  }
});

async function cleanupCache() {
  const cache = await caches.open(DYNAMIC_CACHE);
  const keys = await cache.keys();

  // Supprimer les entrées de plus de 7 jours
  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;

  for (const request of keys) {
    const response = await cache.match(request);
    if (response) {
      const date = response.headers.get("date");
      if (date && new Date(date).getTime() < weekAgo) {
        await cache.delete(request);
      }
    }
  }
}
