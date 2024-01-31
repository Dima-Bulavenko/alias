import { getGameOptions, setGameOptions } from "./script.js";

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

            // Redirect to the game page
            window.location.href = "./game.html";

        })
        .catch(error => {
            // If there is an error, disable the page and show an alert
            document.querySelector("body").classList.add("disabled");
            alert("Something went wrong. Please reload the page.")
        });
}

/**
 * Set type for the game
 */
function setType(event) {
    const gameType = this.id;
    const gameOption = JSON.parse(localStorage.getItem("gameOptions"));

    if (gameType === "easy") {
        gameOption.type = "easy";
    } else if (gameType === "medium") {
        gameOption.type = "medium";
    } else if (gameType === "hard") {
        gameOption.type = "hard";
    }

    localStorage.setItem("gameOptions", JSON.stringify(gameOption));
    createWordList();
}


document.addEventListener('DOMContentLoaded', function () {

    document.querySelectorAll(".category-container").forEach(element => {
        element.addEventListener('click', setType)
    })
})