const API_KEY = "a9418e95c833463ea192fc78701157c7";
const BASE_URL = "https://api.football-data.org/v2";
const urls = {
    competitions: () =>  `${BASE_URL}/competitions?plan=TIER_ONE`,
    competition: id => `${BASE_URL}/competitions/${id}`,
    competitionStandings: id => `${BASE_URL}/competitions/${id}/standings?standingType=TOTAL`,
    competitionMatches: id => `${BASE_URL}/competitions/${id}/matches`,
    team: id => `${BASE_URL}/teams/${id}`
};

function load(url){
    return fetch(url, {
        headers: {
            "X-Auth-Token": API_KEY
        }
    });
}

export {
    urls,
    load
}