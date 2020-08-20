import { urls, load } from "../data/api";
import { status, json, error, loading, capitalize, groupBy } from "../utils/helper";
import { save, remove, getById, getAll } from "../data/db";
import { redirect } from "../utils/helper";
import { showSaveNotification, showDeleteNotification } from "../services/notification";

// functions
function getTeamById(id) {
    return new Promise((resolve) => {
        load(urls.team(id))
            .then(status)
            .then(json)
            .then(team => bindTeam(team))
            .then(team => {
                loading(0);
                resolve(team);
            })
            .catch(error);
    });
}

function getSavedTeamById(id) {
    return new Promise((resolve) => {
        getById(id).then(team => {
            if (team) {
                bindTeam(team);
                loading(0);
                resolve(team);
            } else {
                window.location.replace(`./team.html?id=${id}`);
            }
        });
    });
}

function getSavedTeams() {
    getAll()
        .then(teams => bindSavedTeam(teams))
        .catch(error);
}

function saveTeam(team){
    save(team).then(result => {
        console.log(result);
        M.toast({html:`${team.name} saved successfully!`, completeCallback:() => redirect(`./team.html?id=${team.id}&favorite=true`)});
        showSaveNotification(team);
    })
    .catch(error);
}

function removeTeam(team){
    remove(team).then(result =>{
        console.log(result);
        M.toast({html:`${team.name} deleted successfully!`, completeCallback: () => redirect(`./team.html?id=${team.id}`) });
        showDeleteNotification(team);
    })
    .catch(error);
}

// Binder
function bindSavedTeam(response){
    let teams = document.querySelector("#teams");
    
    if(teams)
        teams.innerHTML = savedTeamWrapper(response);
}

function bindTeam(response) {
    const data = { ...response };
    response.squad = groupBy(response.squad, "role");
    document.querySelector("#body-content").innerHTML = teamDetailsWrapper(response);
    M.AutoInit();
    return data;
}


// View 
function savedTeamWrapper(teams){
    let teamsHTML = "";
    teams.forEach((team, index) =>{
        teamsHTML+= `
        <tr>
            <td>${++index}</td>
            <td>
                <a href="./team.html?id=${team.id}&favorite=true">
                    ${team.name}
                </a>
            </td>
        </tr>
        `;
    });

    if(teamsHTML === ""|| !teamsHTML){
        return `
        <div class="card">
            <div class="card-content">
                <h2>Favorite Team</h2>
                <br>
                <div class="h-50vh error-wrapper">
                    <div class="center-align h-80">
                        <h2 class="black-ops">Oops</h2>
                        <h4>Empty favorite team</h4>
                        <p>Add some team to your favorite!</p>
                    </div>
                </div>
            </div>
        </div>
        `;
    }

    return `
        <div class="card">
            <div class="card-content">
                <h2>Favorite Team</h2>
                <table class="highlight">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Team</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${teamsHTML}
                    </tbody>
                </table>
            </div>
        </div>
        
    `;
}

function teamDetailsWrapper(team){
    let squadHTML = "";
    for(let role in team.squad){
        squadHTML+= roleCollapsible(role, team.squad[role]);
    }
    return `
    <div class="card">
        <div class="card-content row">
            <img src="${team.crestUrl || './assets/img/no-image.png'}" alt="" class="responsive-img col s12 l4 right">
            <div class="col s12 l8">
                <h2>${team.name}</h2>
                <div class="col s12">
                    <ul class="tabs">
                        <li class="tab col s6"><a href="#team-information">Information</a></li>
                        <li class="tab col s6"><a href="#squad">Squad</a></li>
                    </ul>
                </div>
                <div id="team-information" class="col s12">
                    <table>
                        <tr>
                            <th>Region</th>
                            <td>${team.area.name}</td>
                        </tr>
                        <tr>
                            <th>Founded</th>
                            <td>${team.founded}</td>
                        </tr>
                        <tr>
                            <th>Team Color</th>
                            <td>${team.clubColors}</td>
                        </tr>
                        <tr>
                            <th>Address</th>
                            <td>${team.address}</td>
                        </tr>
                        <tr>
                            <th>Phone</th>
                            <td>${team.phone}</td>
                        </tr>
                        <tr>
                            <th>Email</th>
                            <td>${team.email}</td>
                        </tr>
                        <tr>
                            <th>Website</th>
                            <td><a href="${team.website}" target="_blank">${team.website}</a></td>
                        </tr>
                    </table>
                </div>
                <div id="squad" class="col s12">
                    <ul class="collapsible expandable" id="squad-collapsible">
                        ${squadHTML}
                    </ul>
                </div>
            </div>
        </div>
    </div>
    `;
}

function roleCollapsible(role, people){
    let roleHTML = "";
    people.forEach((person, index) => {
        roleHTML+= `
        <tr>
            <td>${++index}</td>
            <td>${person.name}</td>
            <td>${person.nationality}</td>
            <td>${person.position || "-"}</td>
        </tr>
        `;  
    });

    return `
    <li>
        <div class="collapsible-header">${capitalize(role)}</div>
        <div class="collapsible-body white">
            <table class="striped highlight responsive-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Nationality</th>
                        <th>Position</th>
                    </tr>
                </thead>
                <tbody>
                    ${roleHTML}
                </tbody>
            </table>
        </div>
    </li>
    `;
}

export {
    getTeamById,
    getSavedTeamById,
    getSavedTeams,
    saveTeam,
    removeTeam
}