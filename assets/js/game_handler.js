/**
 * Get game options from local storage
 */
function getGameOptions() {
    const gameOptions = JSON.parse(localStorage.getItem("gameOptions"));
    return gameOptions;
}

/**
 * Set game options to local storage
 */
function setGameOptions(obj) {
    localStorage.setItem("gameOptions", JSON.stringify(obj));

}


function toggleSectionById(id) {
    const element = document.getElementById(id);
    
    if (element.style.display === "none") {
        element.style.removeProperty("display");
    } else {
        element.style.display = "none";
    }
}

// ---------------

/**
 * Set a word count to the DOM
 */
function setWordCount() {
    const wordCountElement = document.getElementById("word-count");
    wordCountElement.innerText = getGameOptions().settings.wordCount;
}

/**
 * Set team statistics to the DOM
 */
function setTeamStats() {
    const statElement = document.getElementById("stat");

    let teamStatHTML = ``;
    for (let [index, team] of getGameOptions().teams.entries()) {
        teamStatHTML += `
                            <div class="team-stat-item flex-container justify-space-between flex-container justify-space-between" id=team-${index+1}>
                                <div class="name">${team.name}</div>
                                <div class="score">${team.score}</div>
                            </div>`;                          
    }
    
    statElement.innerHTML = teamStatHTML;
}


/**
 * Set round information to the DOM
 */
function setRoundInfo() {
    const gameOptions = getGameOptions();
    const roundCountElement = document.getElementById("round-count");
    const preparedTeamElement = document.getElementById("prepared-team");

    for (team of gameOptions.teams) {
        if (team.isTurn) {
            preparedTeamElement.innerText = team.name;
            roundCountElement.innerText = `Round ${team.round}`;
        }
    }
}


window.addEventListener("load", function () {
    if (PerformanceNavigationTiming.type !== "reload") {
        // Create new properties in gameOptions object
        const gameOptions = getGameOptions();
        
        for ([index, team] of gameOptions.teams.entries()) {
            team.round = 1;

            if (index === 0) {
                team.isTurn = true;
            } else {
                team.isTurn = false;
            }
        }
        setGameOptions(gameOptions);
    }
    
    setWordCount();
    setTeamStats();
    setRoundInfo();
    
    document.getElementById('run-round').addEventListener('click', function (event) {
        toggleSectionById("between-rounds")
    });
});