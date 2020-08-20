import { error } from "../utils/helper";
import { Workbox } from "workbox-window/Workbox";

document.addEventListener("DOMContentLoaded",() => {
    // Register Service Worker
    if ("serviceWorker" in navigator) {
        new Workbox("/sw.js").register();
    } else {
        console.log("ServiceWorker are not supported by this browser");
    }

    if ("Notification" in window) {
        requestPermission();
    }
});

function requestPermission(){
    Notification.requestPermission().then(result => {
        if (result === "denied") {
            console.log("Notification feature are blocked");
            return;
        } else if (result === "default") {
            console.error("User closed the notification dialog");
            return;
        }
        console.log("Notification allowed");
        navigator.serviceWorker.ready.then(() => {
            if (("PushManager" in window)) {
                navigator.serviceWorker.getRegistration().then(registration => {
                    registration.pushManager.subscribe({
                            userVisibleOnly: true,
                            applicationServerKey: urlBase64ToUint8Array("BJrdR3J_ruGcYlmtg1CVuUFJpy_PHGtg4pL2dmnEMOKnsoEX8dgWfYFo6RVDRa1-Rhi0f_kT6trJQjnU5qWFAgA")
                        })
                        .then(subscribe => {
                            let keys = {
                                "p256dh": btoa(String.fromCharCode.apply(
                                        null, new Uint8Array(subscribe.getKey("p256dh")))) ,
                                "auth": btoa(String.fromCharCode.apply(
                                        null, new Uint8Array(subscribe.getKey("auth"))))
                            }
                            console.log("Subscribe successful with endpoint: ", subscribe.endpoint);
                            console.log("Subscribe successful with p256dh key: ", keys["p256dh"]);
                            console.log("Subscribe successful with auth key: ", keys["auth"]);
                        }).catch(error)
                });
            }
        });
    })
}

function urlBase64ToUint8Array(base64String){
    const padding = '='.repeat((4- base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for(let i=0; i < rawData.length; ++i){
        outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
}