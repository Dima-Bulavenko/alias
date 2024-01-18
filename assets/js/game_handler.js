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

/**
 * Show sections when its state is "current" and hide when it's not
 */
function toggleSection() {
    const gameOptions = getGameOptions();
    
    for (let stage of gameOptions.stages) {
        let stageElement = document.getElementById(stage.name);

        if (!(stage.isCurrent)) {

            // Hide the section if it's not current
            stageElement.style.display = "none";
        } else {
            
            // Show the section if it's current
            stageElement.style.removeProperty("display");
        }
    }
}

// FUNCTIONS TO HANDLE THE "before-round" STAGE

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


/**
 * Runs all function to set up the "before-round" stage
 */
function setupBeforeRoundStage(){
    setWordCount();
    setTeamStats();
    setRoundInfo();
}

// ---------------------------------------------------------------


/**
 * Create a word list based on the game type
 */
function createWordList() {
    const gameOptions = getGameOptions();
    let path;
    
    // Set path to the JSON file based on the game type
    if (gameOptions.type === "easy") {
        path = "./easy_words.json";
    } else if (gameOptions.type === "medium") {
        path = "./medium_words.json";
    } else {
        path = "./hard_words.json";
    }
    
    // Fetch the JSON file and save it to the gameOptions object
    fetch(path)
        .then(response => {
            // Check if the response is OK
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Save the words to the gameOptions object
            gameOptions.words = data;
            setGameOptions(gameOptions);
        })
        .catch(error => {
            // If there is an error, disable the page and show an alert
            document.querySelector("body").classList.add("disabled");
            alert("Something went wrong. Please reload the page.")
        });
}


window.addEventListener("load", function () {
    const gameOptions = getGameOptions();

    // If the game options don't have a 'words' property, create a word list
    if (!("words" in gameOptions)) {
        createWordList();
    }

    // If the game options don't have a 'stages' property, create it
    if (!("stages" in gameOptions)) {
        gameOptions.stages = [
            {name: "before-round", isCurrent: true},
            {name: "round", isCurrent: false},
            {name: "after-round", isCurrent: false}
        ]
        setGameOptions(gameOptions);
    }

    document.getElementById('run-round').addEventListener('click', function (event) {
        toggleSectionById("between-rounds")
    });
});
