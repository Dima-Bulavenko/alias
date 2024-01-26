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

/**
* Toggles the current stage in the game options.
* If the current stage is the last one, it sets the first stage as the current stage.
* Otherwise, it sets the next stage as the current stage.
*/
function toggleStage() {
    const gameOptions = getGameOptions();
    let newStaged;
    
    for (let [index, stage] of gameOptions.stages.entries()) {
        // If the stage is the current stage
        if (stage.isCurrent) {

            // Set the current stage's isCurrent property to false
            stage.isCurrent = false;

            // If the current stage is the last stage
            if (index === gameOptions.stages.length - 1) {

                // Set the first stage as the new current stage
                newStaged = gameOptions.stages[0]; 
            } else {

                // Otherwise, set the next stage as the new current stage
                newStaged = gameOptions.stages[index+1];
            }

            // Set the new current stage's isCurrent property to true
            newStaged.isCurrent = true;

            // Break the loop as we've found and updated the current stage
            break;
        }
    }
    // Update the game options with the new stages
    setGameOptions(gameOptions);

    // Toggle the game section
    toggleSection();
    
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
    document.getElementById('run-round').addEventListener('click', toggleStage)
}

// ---------------------------------------------------------------


// FUNCTIONS TO HANDLE THE "round" STAGE

/**
 * Set a name of the team which is on turn
 */
function setTeamName() {
    const gameOptions = getGameOptions();
    const roundSectionElement = document.getElementById("round");

    for (team of gameOptions.teams) {
        if (team.isTurn) {
            roundSectionElement.querySelector(".team-name").innerText = team.name;
            break
        }
    }
}


/**
 * Get a random word from the gameOptions word list
 */
function getRandomWord() {
    const gameOptions = getGameOptions();
    const words = gameOptions.words;
    const word = words.splice(Math.floor(Math.random() * words.length), 1)[0];
    setGameOptions(gameOptions);
    return word;
}


/**
 * Count a guessed and missed words and save them to the roundWords.
 */
function countWords(isGuessed) {
    let elementID = isGuessed ? "count-guessed" : "count-missed";
    let countElement = document.getElementById(`${elementID}`);

    // Increase the count of the guessed or missed words
    countElement.innerText = parseInt(countElement.innerText) + 1;

    let word = document.getElementById("control").innerText;
    let gameOptions = getGameOptions();

    // Save the word to the roundWords
    gameOptions.roundWords.push({ 
        word: word, 
        isGuessed: isGuessed,
        team: gameOptions.teams.findIndex(team => team.isTurn),
        isCommon: checkIsRoundFinished()
    });
    setGameOptions(gameOptions);
    
}


/**
 * Delete the control element
 */
function deleteControl(control) {
    control.remove();
}


/**
 * Create a control element and return it
 */
function createControl() {
    const word = getRandomWord();

    const control = document.createElement("div");
    control.id = "control";
    control.className = "flex-container justify-center align-center word-control";
    control.innerText = word;
    return control;
}


/**
 * Format time to MM:SS
 */
function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;

    if (minutes < 10) minutes = '0' + minutes;
    if (remainingSeconds < 10) remainingSeconds = '0' + remainingSeconds;

    return minutes + ':' + remainingSeconds;
}


function checkIsRoundFinished() {
    time = document.getElementById("round-timer").innerText;
    return time === "00:00";
}


/**
 * Create a list of teams to choose who could guess the last word
 */
function handleLastWord() {
    const gameOptions = getGameOptions();
    const whoGuessedElement = document.getElementById("who-guessed")
    
    for ([index, team] of gameOptions.teams.entries()) {
        let teamElement = document.createElement("div")
        teamElement.className = "team";
        teamElement.dataset.teamIndex = index;
        teamElement.innerText = team.name;
        whoGuessedElement.appendChild(teamElement);

        // Add event listener to each team element
        teamElement.addEventListener("click", function(event) {
            const roundWords = gameOptions.roundWords;

            // Take last item in roundWords and set team property to team hwo guessed the last word
            roundWords[roundWords.length - 1].team = parseInt(this.dataset.teamIndex);
            
            whoGuessedElement.style.display = "none";
            whoGuessedElement.querySelectorAll(".team").forEach(team => team.remove());
            setGameOptions(gameOptions);
        })
    }

    whoGuessedElement.style.display = "block";
}

/**
 * Handle the swipe event of the swipe area
 */
function swipeHandler() {
    // Get the swipe area element
    const swipeAreaElement = document.getElementById("swipe-area");

    // Get the control element which contains a word to guess
    const control = swipeAreaElement.querySelector("#control");

    // Help to calculate the swipe distance
    let touchStartY;

    // Id of the first touch
    // It's used to prevent the swipe event from being triggered by other touches
    let firstTouchId;

    // The maximum distance of the swipe.
    // Determine max distance of a swipe after that needed to run handleRound function
    let maxSwipeDistance = 70;

    /**
     * Handle the touch start event 
     */
    function handleTouchStart(event) {
        event.preventDefault();
        
        // If the first touch is undefined, set the first touch id
        if (typeof firstTouchId === "undefined") {
            firstTouchId = event.changedTouches[0].identifier;
        }

        // If the first touch is the same as the first touch id, set the touch start Y position
        if (event.changedTouches[0].identifier === firstTouchId) {
            touchStartY = event.changedTouches[0].pageY;
            control.style.position = "relative";
        }
    }


    /**
     * Handle the touch move event 
     */
    function handleTouchMove(event) {
        event.preventDefault();
        [...event.changedTouches].forEach(touch => {

            // Check whether a touch is the first touch
            if (touch.identifier === firstTouchId) {

                // Calculate the swipe distance of current touch
                const swipeDistance = touch.pageY - touchStartY;

                // If the swipe distance is greater than the maximum swipe distance, run a set of functions
                if (Math.abs(swipeDistance) > maxSwipeDistance) {
                    let isGuessed;

                    // Check whether the word is guessed or missed
                    if (swipeDistance > 0) {
                        isGuessed = false;
                    } else {
                        isGuessed = true;
                    }

                    // Set delay to delay the running of handleRound function
                    const delay = 0.2;
                    const controlTop = parseInt(control.style.top);

                    // Remove event listeners to prevent the swipe event from being triggered again
                    swipeAreaElement.removeEventListener("touchstart", handleTouchStart);
                    swipeAreaElement.removeEventListener("touchmove", handleTouchMove);
                    swipeAreaElement.removeEventListener("touchend", handleTouchEnd);

                    // Set transition to animate the swipe of control element before running handleRound function
                    control.style.transition = `${delay}s linear`;
                    control.style.opacity = "0";
                    control.style.transform = `translate(0, ${controlTop > 0 ? '150' : '-150'}px) scale(0.5)`;

                    // Run handleRound function after the delay
                    setTimeout(handleRound, delay * 1000 + 100, isGuessed);
                }

                // id the swipe distance is less than the maximum swipe distance, move the control element
                control.style.top = `${swipeDistance}px`;
            }
        })
    }


    /**
     * Handle the touch end event 
     */
    function handleTouchEnd(event) {
        event.preventDefault();
        [...event.changedTouches].forEach(touch => {
            
            // Check whether a touch is the first touch
            if (touch.identifier === firstTouchId) {
                let duration = 0.2;

                // Get the control back to initial position
                control.style.transition = `top ${duration}s`;
                control.style.top = "0px";

                // Set delay to execute the transition above.
                setTimeout(() => {
                    control.style.removeProperty("transition");
                    control.style.removeProperty("top");
                    control.style.removeProperty("position");
                }, duration * 1000);
            }
        })
    }


    swipeAreaElement.addEventListener("touchstart", handleTouchStart)

    swipeAreaElement.addEventListener("touchmove", handleTouchMove)

    swipeAreaElement.addEventListener("touchend", handleTouchEnd)
}


/**
 * Execute necessary functions to implement logic of round stage.
 */
function handleRound(isGuessed) {
    const control = document.getElementById("control");
    const swipeAreaElement = document.getElementById("swipe-area");
    const gameOptions = getGameOptions();
    
    // Count guessed or missed word and add word object
    // to roundWord property of gameOptions
    countWords(isGuessed);

    
    deleteControl(control);

    // Check if round was finished
    if(checkIsRoundFinished()) {

        // If the last word was guessed and commonFinalWord is true
        if (gameOptions.settings.commonFinalWord && isGuessed) {
            handleLastWord();
            document.querySelectorAll("#who-guessed .team").forEach(team => {
                team.addEventListener("click", function(event) {
                    setAfterRoundSection();
                    toggleStage();
                })
            });
        } else {
            // Just switch to next stage
            setAfterRoundSection();
            toggleStage();
        }
    } else {
        // If the round is not finished create new swipeHandler and new control
        swipeAreaElement.appendChild(createControl());
        swipeHandler();
    }
}

function startRound() {
    const gameOptions = getGameOptions();

    // Get round duration and timer element 
    let roundTime = gameOptions.settings.roundDuration;
    const timerElement = document.getElementById("round-timer");
    
    // Set roundWords if we don't have it
    if (!('roundWords' in gameOptions)) {
        gameOptions.roundWords = [];
        setGameOptions(gameOptions);
    }

    // Set random word to control and change it style by adding new class
    const controlElement = document.getElementById("control");
    controlElement.innerText = getRandomWord();
    controlElement.classList.add("word-control");


    swipeHandler();
    const roundInterval = setInterval(() => {
        --roundTime;
        if (roundTime === 0) {
            clearInterval(roundInterval)
        }
        timerElement.innerText = formatTime(roundTime);
    }, 1000);
}
// ---------------------------------------------------------------

// FUNCTIONS TO HANDLE THE "after-round" STAGE

/**
 * Calculate score of one round.
* @returns {Object} Object with team index as a key and team score as a value
 */
function countRoundPoints() {
    const gameOptions = getGameOptions();
    const roundWords = gameOptions.roundWords;
    const roundPoints = {}

    // "gameOptions.settings.penaltyMiss" can be true or false
    // so it can be converted to 1 or 0
    const penaltyMiss = gameOptions.settings.penaltyMiss;

    for (wordObj of roundWords) {
        teamIndex = wordObj.team;

        // If the team is not in roundPoints object, add it
        if (!(teamIndex in roundPoints)) {
            roundPoints[teamIndex] = 0;
        }

        // If the word is guessed, add 1 point to the team score
        if (wordObj.isGuessed) {
            roundPoints[teamIndex] += 1;

        // If the word is not guessed and it's not common, subtract penaltyMiss points from the team score
        } else if (!(wordObj.isGuessed) && !(wordObj.isCommon)) {
            roundPoints[teamIndex] -= penaltyMiss;
        }        
    }
    
    return roundPoints;
    
}

/**
 * Set data to "#after-round-info" element
 */
function setAfterRoundInfo() {
    const roundPoints = countRoundPoints();
    const infoElement = document.getElementById("after-round-info");
    const gameOptions = getGameOptions();

    // Delete all children of infoElement
    infoElement.innerHTML = "";
    
    for ([teamIndex, teamPoints] of Object.entries(roundPoints)) {
        
        // if team has 0 points and it didn't play this round, don't show it
        if (teamPoints === 0 && !(gameOptions.teams[teamIndex].isTurn)) continue;

        let teamName = gameOptions.teams[teamIndex].name;
        let teamInfo = document.createElement("div");
        
        teamPoints = teamPoints >= 0 ? `+${teamPoints}` : `${teamPoints}`;
        teamInfo.className = "team-info flex-container justify-space-between";
        teamInfo.innerHTML = `<div class="name">${teamName}</div>
                            <div class="points">${teamPoints}</div>`;
        infoElement.appendChild(teamInfo);
    }
}

/**
 * Toggle word type (guessed or missed)
 */
function changeWordType(index) {
    const gameOptions = getGameOptions();
    gameOptions.roundWords[index].isGuessed = !gameOptions.roundWords[index].isGuessed;
    setGameOptions(gameOptions);
}


/**
 * Set data to "#words-list" element
 */
function setAfterRoundWordList(){
    const gameOptions = getGameOptions();
    const wordListElement = document.getElementById("words-list");
    wordListElement.innerHTML = "";

    const roundWords = gameOptions.roundWords;
    const teams = gameOptions.teams;
    let commonWordText = "";

    for (let [wordIndex, wordObj] of roundWords.entries()) {
        let word = wordObj.word;
        let wordItem = document.createElement("div");
        wordItem.className = "words-item";

        if (wordObj.isCommon && gameOptions.settings.commonFinalWord) {
            commonWordText = `(${wordObj.isGuessed ? teams[wordObj.team].name : "common"})`;
        }

        wordItem.innerHTML = `<div class="word">${word} ${commonWordText}</div>
                            <i class="fa-solid fa-thumbs-up ${wordObj.isGuessed ? "active" : ""}"></i>`;

        wordListElement.appendChild(wordItem);
        
        const thumbIcon = wordItem.querySelector(".fa-thumbs-up");
        thumbIcon.addEventListener("click", function(event) {
            const gameOptions = getGameOptions();
            this.classList.toggle("active");

            if (wordObj.isCommon && !(wordObj.isGuessed) && gameOptions.settings.commonFinalWord ) {
                handleLastWord();
                document.querySelectorAll("#who-guessed .team").forEach(team => {
                    team.addEventListener("click", function(event) {
                        changeWordType(wordIndex);
                        countRoundPoints();
                        setAfterRoundInfo();
                        setAfterRoundWordList()
                    })
                });
            } else {
                changeWordType(wordIndex);
                countRoundPoints();
                setAfterRoundInfo();
                setAfterRoundWordList()
            }
        })
        
                            
    }
}

/**
 * Runs all function to set up the "after-round" stage
 */
function setAfterRoundSection() {
    setAfterRoundInfo();
    setAfterRoundWordList();
    document.getElementById("continue").addEventListener("click", finishRound);
}


/**
 * Add round points to a team score property
 */
function calculateTeamsScore() {
    const gameOptions = getGameOptions();
    const roundPoints = countRoundPoints();

    for ([teamIndex, teamPoints] of Object.entries(roundPoints)) {
        gameOptions.teams[teamIndex].score += teamPoints;
    }

    setGameOptions(gameOptions);
}

/**
 * Implement logic of getting winner
 * Returns false if there is no winner or winner object if there is the winner
 */
function getWinner() {
    const gameOptions = getGameOptions();

    // Get word number which is needed to win and convert it to number
    const wordsAmountToWin = parseInt(gameOptions.settings.wordCount);
    const teams = gameOptions.teams;
    let winner = [];

    // Check if all teams have the same round
    const isRoundsEqual = teams.every(team => team.round === teams[0].round);
    // Check if any team has score equal or greater than wordsAmountToWin
    const isAnyTeamScoreEqualOrAboveWordsAmountToWin = teams.some(team => team.score >= wordsAmountToWin)

    if (isRoundsEqual && isAnyTeamScoreEqualOrAboveWordsAmountToWin) {
        let maxScore = wordsAmountToWin;
        for (let team of teams) {
            if (team.score === maxScore) {
                // If there are more than one team with max score, add them to the winner array
                winner.push(team)
            } else if (team.score > maxScore) {
                // if the  current team score is greater than maxScore, set the team score as maxScore 
                // and reset the winner array and add the current team to the winner array
                winner = [team];
                maxScore = team.score;
            }
        }
    }

    // If there is only one winner, return it, otherwise return false
    return winner.length === 1 ? winner[0] : false;
}

/**
 * Set a new team for next round and increase team's round property
 */
function setNewTeamTurnAndRound() {
    const gameOptions = getGameOptions();
    let newTeam;
    
    for (let [index, team] of gameOptions.teams.entries()) {
        // check if the team is on turn
        if (team.isTurn) {

            // Set the current team's isTurn property to false
            team.isTurn = false;

            // if the current team is the last team
            if (index === gameOptions.teams.length - 1) {

                // Set the first team as the new current team
                newTeam = gameOptions.teams[0]; 
            } else {

                // Otherwise, set the next team as the new current team
                newTeam = gameOptions.teams[index+1];
            }

            // Set the new current stage's isCurrent property to true
            newTeam.isTurn = true;

            // Increase the round of the new current team
            newTeam.round += 1;

            // Break the loop as we've found and updated the current stage
            break;
        }
    }
    // Update the game options with the new stages
    setGameOptions(gameOptions);
}

/**
 * Runs necessary functions to finish the round 
 */
function finishRound() {
    // Calculate teams score
    calculateTeamsScore();

    // get winner if there is one
    const winner = getWinner();
    
    // Reset roundWords property
    const gameOptions = getGameOptions();
    gameOptions.roundWords = [];
    setGameOptions(gameOptions)

    if (winner) {
        // logic if game is finished
        console.log(winner)
        window.location.href = "./win.html";
        return 
    }

    setNewTeamTurnAndRound();
    toggleStage()
    window.location.reload();
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


window.addEventListener("DOMContentLoaded", function () {
    const gameOptions = getGameOptions();

    document.getElementById("round-timer").innerText = formatTime(gameOptions.settings.roundDuration);

    // If the game options don't have a 'stages' property, create it
    if (!("stages" in gameOptions)) {
        
        gameOptions.stages = [
            { name: "before-round", isCurrent: true },
            { name: "round", isCurrent: false },
            { name: "after-round", isCurrent: false }
        ]
    }

    setGameOptions(gameOptions);

    // Hide all sections except active one
    toggleSection();

    // Prepare before round section
    setupBeforeRoundStage();

    // Event listener to start round
    document.getElementById("control").addEventListener("click", startRound);
    setTeamName();
    
    // If the game options don't have a 'words' property, create a word list
    if (!("words" in gameOptions)) {
        createWordList();
    }
});
