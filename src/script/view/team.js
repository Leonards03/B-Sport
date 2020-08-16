import { getTeamById, getSavedTeamById} from "../data/api.js";
import { saveTeam, removeTeam } from "../data/db.js";

const team = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    const isFavorite = urlParams.get("favorite");
    const btnTrigger = document.querySelector("#trigger");
    let team;

    if(isFavorite){
        team = getSavedTeamById(id);
        btnTrigger.querySelector("i").innerHTML = "delete";
        btnTrigger.href = "#delete-modal";
        const btnDelete = document.querySelector("#btn-delete")
        
        btnDelete.onclick = () => setAction(removeTeam, team);
    }
    else {
        team = getTeamById(id);
        btnTrigger.querySelector("i").innerHTML = "save";
        btnTrigger.href = "#favorite-modal";
        const btnFavorite = document.querySelector("#btn-favorite")

        btnFavorite.onclick = () => setAction(saveTeam, team);
    }

    function setAction(callback, item){
        item.then(response => callback(response));
    }
};

export default team;