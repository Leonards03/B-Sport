import { urls, load } from "../data/api";
import { status, json, error, loading, sortObjectArrayById } from "../utils/helper";

// functions
function getCompetitions() {
    load(urls.competitions())
        .then(status)
        .then(json)
        .then(responseJson => competitions(responseJson))
        .then(() => loading(0))
        .catch(error);

    if ("caches" in window) {
        caches.match(urls.competitions()).then(response => {
            if (response) {
                response.json().then(data => competitions(data))
                    .then(() => loading(0))
                    .catch(error);
            }
        });
    }
}

// binder
function competitions(response){
    let sorted = sortObjectArrayById(response.competitions);
    document.querySelector("#body-content").innerHTML = competitionsWrapper(sorted);
}

// view
function competitionsWrapper(competitions){
    let competitionsHTML="";
    competitions.forEach((competition,index) =>{
        competitionsHTML+=`
        <tr>
            <td>${++index}</td>
            <td>
                <a href="./competition.html?id=${competition.id}">
                    ${competition.name}
                </a>
            </td>
            <td>${competition.area.name}</td>
            <td class="center">${competition.currentSeason.startDate}</td>
            <td class="center">${competition.currentSeason.endDate}</td>
        </tr>
        `
    });

    return `
    <div class="card">
        <div class="card-content">
            <h2>Competitions</h2>
            <table class="striped highlight">
                <thead>
                    <tr>
                        <th rowspan="2">#</th>
                        <th rowspan="2">Competition</th>
                        <th rowspan="2">Region</th>
                        <th class="center" colspan="2">Period</th>
                    </tr>
                    <tr>
                        <th class="center">Starts</th>
                        <th class="center">Ends</th>
                    </tr>
                </thead>
                <tbody>
                    ${competitionsHTML}
                </tbody>
            </table>
        </div>
    </div>
    `;
}

export default getCompetitions;