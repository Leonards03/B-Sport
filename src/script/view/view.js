class View {
    static competitionInformation(competition, {id="", name="", crestUrl=""}){
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
    
    static competitionsWrapper(competitions){
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
    
    static groupWrapper(row){
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
    
    static standingWrapper(heading="", teams){
        let teamsHTML="";
        teams.forEach(row => teamsHTML+= this.groupWrapper(row));
    
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
    
    static matchCard(match){
        let homeTeam = match.score.fullTime.homeTeam > match.score.fullTime.awayTeam ? "th":"td";
        let awayTeam = match.score.fullTime.homeTeam < match.score.fullTime.awayTeam ? "th":"td";
    
        return `
        <div class="card col s12 l6">
            <table>
                <tr>
                    <th colspan="4">
                        ${match.season.startDate}
                    </th>
                </tr>
                <tr>
                    <${homeTeam} width="48%">
                        <a href="./team.html?id=${match.homeTeam.id}">
                            ${match.homeTeam.name}
                        </a>
                    </${homeTeam}>
                    <td>
                        ${match.score.fullTime.homeTeam || "0"}
                    </td>
                    <td>
                        ${match.score.fullTime.awayTeam || "0"}
                    </td>
                    <${awayTeam} width="48%" class="right-align">
                        <a href="./team.html?id=${match.awayTeam.id}">
                            ${match.awayTeam.name}
                        </a>
                    </${awayTeam}>
                </tr>
            </table>
        </div>
        `;
    }
    
    static stageWrapper(stage, matches){
        let matchesHTML="";
        matches.forEach(match => matchesHTML+= this.matchCard(match))
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
    
    static teamDetailsWrapper(team){
        let squadHTML = "";
        for(let role in team.squad){
            squadHTML+= this.roleCollapsible(role, team.squad[role]);
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
    
    static roleCollapsible(role, people){
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
            <div class="collapsible-header">${role}</div>
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
    
    static savedTeamWrapper(teams){
        let teamsHTML = "";
        teams.forEach((team, index) =>{
            teamsHTML+= `
            <tr>
                <td>${++index}</td>
                <td>
                    <a href="./team.html?id=${team.id}&favorite=true">
                        <img src=""/> 
                        ${team.name}
                    </a>
                </td>
            </tr>
            `;
        });
    
        if(teamHTML === ""){
            teamHTML+= `
                <tr>

                </tr>
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
}

export default View;