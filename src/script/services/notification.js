function showNotification(title, options){
    if(Notification.permission === "granted"){
        navigator.serviceWorker.ready.then(registration =>{
            registration.showNotification(title, options);
        })
    } else{
        console.log("Notification features are not allowed");
    }
}

function showSaveNotification(team){;
    const title = `${team.name} added to favorite`;
    const options = {
        "body": `You just added ${team.name} to favorite teams`,
        "icon": "./assets/img/icon.png",
        "actions": [
            {
                "action": "view-favorite-action",
                "title": "Lemme see!"
            }
        ]
    }
    showNotification(title, options);
}

function showDeleteNotification(team){
    const title = `${team.name} removed from favorite`;
    const options = {
        "body": `You just removed ${team.name} from favorite teams`,
        "icon": "./assets/img/icon.png",
        "actions": [
            {
                "action": "okay-action",
                "title": "Okay!"
            }
        ]
    }
    showNotification(title, options);
}

export {
    showSaveNotification,
    showDeleteNotification
}