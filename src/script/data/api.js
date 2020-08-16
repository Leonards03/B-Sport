import { status, json, error, loading } from "../utils/helper"
import Process from "./process";
import { getAll, getById } from "./db";

const API_KEY = "a9418e95c833463ea192fc78701157c7";
const BASE_URL = "https://api.football-data.org/v2";
const urls = {
    competitions: `${BASE_URL}/competitions?plan=TIER_ONE`,
    competition: id => `${BASE_URL}/competitions/${id}`,
    competitionStandings: id => `${BASE_URL}/competitions/${id}/standings?standingType=TOTAL`,
    competitionMatches: id => `${BASE_URL}/competitions/${id}/matches`,
    team: id => `${BASE_URL}/teams/${id}`
};

function load(url) {
    return fetch(url, {
        headers: {
            "X-Auth-Token": API_KEY
        }
    });
}

function getCompetitions() {
    load(urls.competitions)
        .then(status)
        .then(json)
        .then(responseJson => Process.competitions(responseJson))
        .then(() => loading(0));

    if ("caches" in window) {
        caches.match(urls.competitions).then(response => {
            if (response) {
                response.json().then(data => Process.competitions(data))
                    .then(() => loading(0));
            }
        });
    }
}

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
            competition.then(competitionJson => Process.competition(competitionJson));

            standings.then(standingsJson => Process.standings(standingsJson));

            matches.then(matchesJson => Process.matches(matchesJson));

            M.Collapsible.init(document.querySelectorAll(".collapsible"), {
                accordion: false
            });

            M.AutoInit();
        })
        .then(() => loading(0))
        .catch(error);

    if ("caches" in window) {
        Promise.all([
            caches.match(urls.competition(id)),
            caches.match(urls.competitionStandings(id)),
            caches.match(urls.competitionMatches(id))
        ])
            .then(([competition, standings, matches]) => {
                if (competition)
                    competition.json().then(competitionJson => Process.competition(competitionJson));

                if (standings)
                    standings.json().then(standingsJson => Process.standings(standingsJson));

                if (matches)
                    matches.json().then(matchesJson => Process.matches(matchesJson));

                M.Collapsible.init(document.querySelectorAll(".collapsible"), {
                    accordion: false
                });

                M.AutoInit();
            })
            .then(() => {
                console.log("from cache")
                loading(0);
            })
            .catch(error);
    }
}

function getTeamById(id) {
    return new Promise((resolve, reject) => {
        load(urls.team(id))
            .then(status)
            .then(json)
            .then(team => Process.team(team))
            .then(team => {
                loading(0);
                resolve(team);
            })
            .catch(error);

        if ("caches" in window) {
            caches.match(urls.team(id)).then(response => {
                if (response) {
                    response.json()
                        .then(team => Process.team(team))
                        .then(team => {
                            loading(0);
                            resolve(team);
                        });
                }
            });
        }
    });

}

function getSavedTeams() {
    getAll().then(teams => Process.savedTeam(teams));
}

function getSavedTeamById(id) {
    return new Promise((resolve, reject) => {
        getById(id).then(team => {
            if (team) {
                Process.team(team);
                loading(0);
                resolve(team);
            } else {
                window.location.replace(`./team.html?id=${id}`);
            }
        });
    });
}

export {
    getCompetitions,
    getCompetitionById,
    getTeamById,
    getSavedTeams,
    getSavedTeamById
}