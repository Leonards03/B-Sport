import {
    groupBy,
    sortObjectArrayById, 
    replaceUnderscoreAndCapitalize
} from "../utils/helper"
import View from "../view/view";


class Process{
    static competitions(response){
        let sorted = sortObjectArrayById(response.competitions);
        document.querySelector("#body-content").innerHTML = View.competitionsWrapper(sorted);
    }
    
    static competition(response){
        document.querySelector("#information").innerHTML = View.competitionInformation(response, response.currentSeason.winner|| {})
    }
    
    static standings(response){
        // filter the standings, only total standings selected
        let standings = response.standings.filter(standing => standing.type === "TOTAL");
        let standingHTML; 
        standings.forEach(standing => {
            if(standing.group !== "" && standing.group){
                standing.group = replaceUnderscoreAndCapitalize(standing.group);
            }
            standingHTML = View.standingWrapper(standing.group , standing.table);
            document.querySelector("#headings").innerHTML = response.competition.name;
            document.querySelector("#standings").innerHTML += standingHTML;    
        });
    }
    
    static team(response){
        const data = { ...response };
        response.squad = groupBy(response.squad,"role");
        document.querySelector("#body-content").innerHTML = View.teamDetailsWrapper(response);
        M.AutoInit();
        return data;
    }
    
    static savedTeam(response){
        let teams = document.querySelector("#teams");
        
        if(teams)
            teams.innerHTML = View.savedTeamWrapper(response);
    }

    static matches(response){
        // group matches by its stage
        let stages = groupBy(response.matches, "stage");
        // for each stage
        for(let key in stages){
            // pass the stage name and matches
            document.querySelector("#matches").innerHTML += View.stageWrapper(replaceUnderscoreAndCapitalize(key) , stages[key]);
        }
    }
    
}

export default Process;