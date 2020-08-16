let webPush = require("web-push");

const vapidKeys = { 
    "publicKey": "BJrdR3J_ruGcYlmtg1CVuUFJpy_PHGtg4pL2dmnEMOKnsoEX8dgWfYFo6RVDRa1-Rhi0f_kT6trJQjnU5qWFAgA", 
    "privateKey": "hbnCyq92BcFaIZorIsEMkHZkvN_C4KBc1_9IAaTqD8I" 
};


webPush.setVapidDetails(
    "mailto:edwin.leonards03@gmail.com",
    vapidKeys.publicKey,
    vapidKeys.privateKey
);


let pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/exxHY1JOAA8:APA91bGSPxmdH2yu2-eyb9YXQxBdnH2y-nje5U8ntvg5jS8pRXOft_aoDPrCXp0rUDYRmlbkhsKfU8YEJ5TnP1BS_UNXBcmg2Q30ID3ZMRfSISeO6rJZP0k65ftUfN9GMlBlIMcwMvTY",
    "keys": {
        "p256dh": "BFJikKOJEOgxCxlsQiDxXz/I5626Kfa0SbGLpc4hymVmKHlhkZEPm5a6kPfZXVgvoY05lsTQf+J/IDUQhYKwiYM=",
        "auth": "o85CikEblCiQbRr037s+JQ=="
    }
}

let payload = "Web Push Payload Notification!";

let options = {
    gcmAPIKey: "177228885464",
    TTL: 60
}

webPush.sendNotification(
    pushSubscription,
    payload,
    options
);