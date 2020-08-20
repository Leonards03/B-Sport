import { urls, load } from "../data/api";
import { json, error, loading, capitalize, groupBy } from "../utils/helper";

// functions
function getCompetitionById() {
    const urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get("id");

    Promise.all([
        load(urls.competition(id)),
        load(urls.competitionStandings(id)),
        load(urls.competitionMatches(id))
    ])
        .then(json)
        .then(([competition, standings, matches]) => {
            competition.then(competitionJson => bindCompetition(competitionJson));

            standings.then(standingsJson => bindStandings(standingsJson));

            matches.then(matchesJson => bindMatches(matchesJson));

            M.Collapsible.init(document.querySelectorAll(".collapsible"), {
                accordion: false
            });

            M.AutoInit();
        })
        .then(() => loading(0))
        .catch(error);
}

// binder
function bindCompetition(response){
    document.querySelector("#information").innerHTML = competitionInformation(response, response.currentSeason.winner|| {})
}

function bindStandings(response){
    // filter the standings, only total standings selected
    let standings = response.standings;
    let standingHTML; 
    standings.forEach(standing => {
        if(standing.group !== "" && standing.group){
            standing.group = capitalize(standing.group);
        }
        standingHTML = standingWrapper(standing.group , standing.table);
        document.querySelector("#headings").innerHTML = response.competition.name;
        document.querySelector("#standings").innerHTML += standingHTML;    
    });
}

function bindMatches(response){
    // group matches by its stage
    let stages = groupBy(response.matches, "stage");
    // for each stage
    for(let key in stages){
        // pass the stage name and matches
        document.querySelector("#matches").innerHTML += stageWrapper(capitalize(key) , stages[key]);
    }
}

// view
function competitionInformation(competition, {id="", name="", crestUrl=""}){
    return `
    <div class="card-content">
        <table>
            <tr>
                <th>Region</th>
                <td colspan="2">${competition.area.name}</td>
            </tr>
            <tr>
                <th rowspan="2">Period</th>
                <td>Start</td>
                <td>${competition.currentSeason.startDate}</td>
            </tr>

            <tr>
                <td>End</td>
                <td>${competition.currentSeason.endDate}</td>
            </tr>

            <tr>
                <th>Winner</th>
                <td>
                    <a class="waves-effect" href="./team.html?id=${id || ""}">
                        <img class="responsive-img" src="${crestUrl || ""}" height="50" width="100" />
                        <br>
                        ${name || "-"}
                    </a>
                </td>
            </tr>
            <tr>
                <th>Last updated</th>
                <td colspan="2">${new Date(competition.lastUpdated).toString()}</td>
            </tr>
        </table>
    </div>
    `;
}

/* 
    function to find which team is the winner
    the winner team will be bold
    if both score are the same return td for the same thickness
*/
function scoreThickness(homeScore, awayScore){
    if(homeScore === awayScore)
        return {
            home:"td",
            away:"td"
        }
    
    const cond = homeScore > awayScore;
    return {
        home: cond ? "th":"td",
        away: cond ? "td":"th"
    }
}

function stageWrapper(stage, matches){
    let matchesHTML="";
    matches.forEach(match => matchesHTML+= matchCard(match))
    return `
    <li>
        <div class="collapsible-header">${stage}</div>
        <div class="collapsible-body white">
            <div class="row">
            ${matchesHTML} 
            </div>
        </div>
    </li>
    `;
}

function matchCard(match){
    let tag = scoreThickness(match.score.fullTime.homeTeam, match.score.fullTime.awayTeam)

    return `
    <div class="card col s12 l6">
        <table>
            <tr>
                <th colspan="4">
                    ${match.season.startDate}
                </th>
            </tr>
            <tr>
                <${tag.home} width="48%">
                    <a href="./team.html?id=${match.homeTeam.id}">
                        ${match.homeTeam.name}
                    </a>
                </${tag.home}>
                <td>
                    ${match.score.fullTime.homeTeam || "0"}
                </td>
                <td>
                    ${match.score.fullTime.awayTeam || "0"}
                </td>
                <${tag.away} width="48%" class="right-align">
                    <a href="./team.html?id=${match.awayTeam.id}">
                        ${match.awayTeam.name}
                    </a>
                </${tag.away}>
            </tr>
        </table>
    </div>
    `;
}


function standingWrapper(heading="", teams){
    let teamsHTML="";
    teams.forEach(row => teamsHTML+= groupWrapper(row));

    return `
    <li>
        <div class="collapsible-header">${heading || "Standings"}</div>
        <div class="collapsible-body white">
            <table class="striped highlight responsive-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Team</th>
                        <th class="center">Played</th>
                        <th class="center">Won</th>
                        <th class="center">Draw</th>
                        <th class="center">Lost</th>
                        <th class="center">For</th>
                        <th class="center">Against</th>
                        <th class="center">Goals difference</th>
                        <th class="center">Points</th>
                    </tr>
                </thead>
                <tbody>
                    ${teamsHTML}
                </tbody>
            </table>
        </div>
    </li>
    `;
}

function groupWrapper(row){
    return `
    <tr>
        <td>${row.position}</td>
        <td>
            <a href="./team.html?id=${row.team.id}">
                <img src="${row.team.crestUrl || "./assets/img/no-image.png"}" height="15" width="20"> ${row.team.name}
            </a>
        </td>
        <td class="center">${row.playedGames}</td>
        <td class="center">${row.won}</td>
        <td class="center">${row.draw}</td>
        <td class="center">${row.lost}</td>
        <td class="center">${row.goalsFor}</td>
        <td class="center">${row.goalsAgainst}</td>
        <td class="center">${row.goalDifference}</td>
        <td class="center">${row.points}</td>
    </tr>
    `;
}

export default getCompetitionById;