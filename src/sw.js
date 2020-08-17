import "regenerator-runtime";
import { CacheableResponsePlugin } from "workbox-cacheable-response/CacheableResponsePlugin";
import { precacheAndRoute } from "workbox-precaching/precacheAndRoute";
import { registerRoute } from "workbox-routing/registerRoute";
import { CacheFirst } from "workbox-strategies/CacheFirst";
import { StaleWhileRevalidate } from "workbox-strategies/StaleWhileRevalidate";
import { ExpirationPlugin } from "workbox-expiration/ExpirationPlugin";
import { Workbox } from "workbox-window/Workbox";

if(Workbox)
    console.log("Workbox loaded!");
else 
    console.log("Worbox loading failed");

precacheAndRoute(self.__WB_MANIFEST, {
    ignoreURLParametersMatching: [/.*/]
});

registerRoute(
    new RegExp("/assets/img/"),
    new CacheFirst({
        cacheName: "images"
    })
);

registerRoute(
    new RegExp("/pages/"),
    new StaleWhileRevalidate({
        cacheName: "pages"
    })
);

registerRoute(
    /^https:\/\/api\.football\-data\.org\/v2\//,
    new StaleWhileRevalidate({
        cacheName: "football-response",
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200]
            }),
            new ExpirationPlugin({
                maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
                maxEntries: 60
            })
        ]
    })
);

registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    new StaleWhileRevalidate({
        cacheName: "google-fonts-stylesheets"
    })
);

registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,
    new CacheFirst({
        cacheName: "google-fonts-webfonts",
        plugins: [
        new CacheableResponsePlugin({
            statuses: [0, 200],
        }),
        new ExpirationPlugin({
            maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
            maxEntries: 60,
        }),
        ]
    })
)

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
        icon: "./assets/img/icon.png",
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification("Push Notification", options)
    )
});