import idb from "idb/lib/idb.js";
import { redirect } from "../utils/helper";
import {showSaveNotification, showDeleteNotification} from "../services/notification";

const dbPromised = idb.open("b-sport", 1, upgradeDb => {
    let teamObjectStore = upgradeDb.createObjectStore("teams", {
        keyPath: "id"
    });
    teamObjectStore.createIndex("name", "name", { unique: false});
});

function saveTeam(team){
    dbPromised.then(db => {
        let tx = db.transaction("teams","readwrite");
        let store = tx.objectStore("teams");
        store.put(team);
        return tx.complete;
    }).then(() => {
        M.toast({html:`${team.name} saved successfully!`, completeCallback:() => redirect(`./team.html?id=${team.id}&favorite=true`)});
        showSaveNotification(team);
    });
}

function removeTeam(team){
    let id = parseInt(team.id)
    dbPromised.then(db => {
        let tx = db.transaction("teams","readwrite");
        let store = tx.objectStore("teams");

        store.delete(id);
        return tx.complete;
    }).then(() => {
        M.toast({html:`${team.name} deleted successfully!`, completeCallback: () => redirect(`./team.html?id=${team.id}`) });
        showDeleteNotification(team);
    });
}

function getAll(){
    return new Promise((resolve, reject) =>{
        dbPromised.then(db =>{
            let tx = db.transaction("teams", "readonly");
            let store = tx.objectStore("teams");

            return store.getAll();
        })
        .then(teams => resolve(teams))
        .catch(e => reject(e));
    });
}

function getById(id){
    id = parseInt(id);
    return new Promise((resolve, reject)=>{
        dbPromised.then(db => {
            let tx = db.transaction("teams","readonly");
            let store = tx.objectStore("teams");
            
            return store.get(id);
        }).then(teams => resolve(teams));
    });
}

export {
    saveTeam,
    removeTeam,
    getById,
    getAll
}