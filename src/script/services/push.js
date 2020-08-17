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
    "endpoint": "https://fcm.googleapis.com/fcm/send/dKms1jXW994:APA91bHlfnXbXuq0sp1ut3qMhF1lFVc1PBWB4X_UDYn9gUr9SF0kbgzAknkwBnfqqIW3kP78OZfF3cyplzCFq5ylrrMMlz_s39HbkPstN2G1s3sljdwOJqygq8GHCmY23X-ch0FbwG1P",
    "keys": {
        "p256dh": "BI13lugHVTV6UGSrFvTJLMLY4HI8F9Mog8mzdUAeceZoR8JK3zM9BZXlCYMmUzbWfjEH4P2jtJTzjWE+dnC+BL0=",
        "auth": "EqSjwfKcRJGs6A7uc7fmEA=="
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