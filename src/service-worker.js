const CACHE_NAME = "b-sport-v1";
const { assets } = global.serviceWorkerOption;
const urlsToCache = [
    "/",
    ...assets
];

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(urlsToCache);
        })
    )
});

self.addEventListener("fetch", function (event) {
    const BASE_URL = "https://api.football-data.org/v2";
    const FONT_URL = "https://fonts.googleapis.com";
    const FONT_FALLBACK = "https://fonts.gstatic.com";
    if (event.request.url.indexOf(BASE_URL) > -1) {
        event.respondWith(
            caches.open(CACHE_NAME).then(cache => {
                return fetch(event.request, {ignoreSearch: true}).then(response => {
                    cache.put(event.request.url, response.clone());
                    return response;
                });
            })
        );
    } else if (event.request.url.indexOf(FONT_URL) > -1){
        event.respondWith(
            caches.open(CACHE_NAME).then(cache => {
                return fetch(event.request, {ignoreSearch: true}).then(response => {
                    cache.put(event.request.url, response.clone());
                    return response;
                });
            })
        );
    }
    else if (event.request.url.indexOf(FONT_FALLBACK) > -1){
        event.respondWith(
            caches.open(CACHE_NAME).then(cache => {
                return fetch(event.request, {ignoreSearch: true}).then(response => {
                    cache.put(event.request.url, response.clone());
                    return response;
                });
            })
        );
    }
    else {
        event.respondWith(
            caches.match(event.request, {ignoreSearch: true}).then(response => {
                return response || fetch(event.request);
            })
        )
    }
});

self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        console.log("ServiceWorker: cache ", cacheName, " deleted");
                        return caches.delete(cacheName);
                    }
                })
            )
        })
    )
});

self.addEventListener("notificationclick", event => {
    event.notification.close();
    if (!event.action) {
        console.log("Notification Click!");
        return;
    }
    switch (event.action) {
        case "okay-action":
            console.log("one team removed from favorite");
            break;

        case "view-favorite-action":
            clients.openWindow("./#favorite");
            break;

        default:
            console.log("unknown action!");
            break;
    }
});


self.addEventListener("push", event => {
    let body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = "Push message no payload";
    }

    let options = {
        body: body,
        icon: "./img/icon.png",
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification("Push Notification", options)
    )
})