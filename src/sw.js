import {CacheableResponsePlugin} from "work"

if(workbox)
    console.log("Workbox loaded!");
else 
    console.log("Worbox loading failed");


// workbox.precaching.precacheAndRoute([
//     { url: "/script/vendor/materialize.min.css", revision:"1" },
//     { url: "/script/vendor/materialize.min.js", revision:"1" },
//     { url: "/script/styles/style.css", revision:"1"},
//     { url: "/index.html", revision: "1" },
//     { url: "/app.js", revision: "1" },
//     { url: "/competition.html", revision: "1"},
//     { url: "/competition.js", revision: "1"},
//     { url: "/team.html", revision: "1" },
//     { url: "/team.js", revision: "1"}
// ])


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