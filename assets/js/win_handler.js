import { getGameOptions} from "./script.js"

function getWinnerIndex() {
    const gameOptions = getGameOptions();
    let winnerIndex;
    let winnerScore = 0;
    
    for (let [index, team] of gameOptions.teams.entries()) {
        if (team.score > winnerScore) {
            winnerIndex = index;
            winnerScore = team.score;
        }
    }

    return winnerIndex;
}

window.addEventListener('DOMContentLoaded', function() {
    const teams = getGameOptions().teams;
    const winnerIndex = getWinnerIndex();
    const winner = teams.splice(winnerIndex, 1)[0];
    
    document.getElementById("winner-name").innerText = winner.name;
    document.getElementById("winner-score").innerText = winner.score;

    const teamsInfoElement = document.querySelector(".winner-teams-info");
    console.log(teamsInfoElement);
    for (let team of teams) {
        const teamInfoElement = teamsInfoElement.querySelector(".winner-team-info").cloneNode(true);
        console.log(teamInfoElement);
        teamInfoElement.querySelector(".name").innerText = team.name;
        teamInfoElement.querySelector(".points").innerText = team.score;

        teamsInfoElement.appendChild(teamInfoElement);
    }

    document.querySelector("#menu")
    .addEventListener("click", event => window.location.href = "./index.html");
})