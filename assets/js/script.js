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
 * Checks if the given object has a valid 'teams' property.
 * The 'teams' property should be an array with a length between 2 and 6.
 */
function teamsIsValid(obj) {
    return "teams" in obj && obj.teams.length >= 2 && obj.teams.length <= 6;
}


/**
 * Checks if the given object has valid 'settings' property.
 * The 'settings' property should be an object with 5 properties:
 */
function settingsIsValid(obj) {
    return "settings" in obj && Object.keys(obj.settings).length === 4;
}


/**
 * Checks if the given object has a valid 'type' property.
 * The 'type' property should be a specific string.
 */
function categoriesIsValid(obj) {
    const allowedTypes = ["easy", "medium", "hard"]
    return "type" in obj && allowedTypes.includes(obj.type);
}

/**
 * Checks if the given value is an object.
 */
function isObject(value) {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
}


/**
 * Validates game options based on the current page.
 * If the options are invalid, redirects the user to the main page.
 */
function validateGameOptions() {
    const currentPath = window.location.pathname;
    const gameOptions = JSON.parse(localStorage.getItem("gameOptions"));
    let isAllValid = true;

    // An object with validation functions for each page.
    const validationFunctionsByPath = {
        "/settings.html": [teamsIsValid],
        "/categories.html": [teamsIsValid, settingsIsValid],
        "/game.html": [teamsIsValid, settingsIsValid, categoriesIsValid]
    };

    // If the current path page is used like a key in the object above,
    // then run all the validation functions for that page.
    if (currentPath in validationFunctionsByPath) {

        // Check if the gameOptions is an object.
        if (!isObject(gameOptions)) {
            isAllValid = false;
        } else {
            isAllValid = validationFunctionsByPath[currentPath].every(func => func(gameOptions));
        }
    }

    // If the game options are invalid, redirect the user to the main page.
    if (!isAllValid) {
        alert("Your game options were set up incorrectly. You will be redirected to the main page.\nOnce there, please click on the 'Start Game' button to set up your options correctly.");
        window.location.href = "./index.html";
    }
}


window.addEventListener("load", function () {
    validateGameOptions();
});

export { getGameOptions, setGameOptions };