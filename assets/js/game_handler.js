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
}

// ---------------------------------------------------------------


// FUNCTIONS TO HANDLE THE "round" STAGE

/**
 * Set a name of the team which is on turn
 */
function setTeamName() {
    const gameOptions = getGameOptions();
    console.log(gameOptions.teams)
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
 * Count a guessed and missed words
 * And return a boolean value, true if the word is guessed, false if it's missed
 */
function countWords(swipeDistance) {
    let countElement;
    let isGuessed;

    // If the swipe distance is greater than 0, the word is missed
    if (swipeDistance > 0) {
        countElement = document.getElementById("count-missed");
        isGuessed = false;
    } else {
        countElement = document.getElementById("count-guessed");
        isGuessed = true;
    }

    // Increase the count of the guessed or missed words
    countElement.innerText = parseInt(countElement.innerText) + 1;

    return isGuessed;
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

                    // Set delay to delay the running of handleRound function
                    const delay = 0.2;
                    const controlTop = parseInt(control.style.top);

                    // Remove event listeners to prevent the swipe event from being triggered again
                    swipeAreaElement.removeEventListener("touchstart", handleTouchStart);
                    swipeAreaElement.removeEventListener("touchmove", handleTouchMove);
                    swipeAreaElement.removeEventListener("touchend", handleTouchEnd);

                    // Set transition to animate the swipe of control element before running handleRound function
                    control.style.transition = `${delay}s linear`;
                    control.style.opacity = "0.5";
                    control.style.transform = `translate(0, ${controlTop > 0 ? '150' : '-150'}px) scale(0.5)`;

                    // Run handleRound function after the delay
                    setTimeout(handleRound, delay * 1000 + 100, swipeAreaElement, swipeDistance, control);
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
