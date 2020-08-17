import idb from "idb/lib/idb.js";

const dbPromised = idb.open("b-sport", 1, upgradeDb => {
    let teamObjectStore = upgradeDb.createObjectStore("teams", {
        keyPath: "id"
    });
    teamObjectStore.createIndex("name", "name", { unique: false});
});

function save(team){
    return new Promise((resolve, reject) => {
        dbPromised.then(db => {
            let tx = db.transaction("teams","readwrite");
            let store = tx.objectStore("teams");
    
            store.put(team);
            return tx.complete;
        })
        .then(() => resolve("success"))
        .catch(error => reject(`oops error, ${error}`));
    });
}

function remove(team){
    let id = parseInt(team.id)
    return new Promise((resolve, reject) => {
        dbPromised.then(db => {
            let tx = db.transaction("teams","readwrite");
            let store = tx.objectStore("teams");
    
            store.delete(id);
            return tx.complete;
        })
        .then(() => resolve("success"))
        .catch(error => reject(`oops error, ${error}`));
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
        .catch(error => reject(`oops error, ${error}`));
    });
}

function getById(id){
    id = parseInt(id);
    return new Promise((resolve, reject)=>{
        dbPromised.then(db => {
            let tx = db.transaction("teams","readonly");
            let store = tx.objectStore("teams");
            
            return store.get(id);
        })
        .then(teams => resolve(teams))
        .catch(error => reject(`oops error, ${error}`));
    });
}

export {
    save,
    remove,
    getById,
    getAll
}