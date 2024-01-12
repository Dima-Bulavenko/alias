/**
 * Set input value to element text and set progress of input.
 */
function setValueAndProgress(input) {
    if (input.type === "range") {

        // Set input value to show a user
        input.parentElement.querySelector(".setting-value").innerText = input.value

        // Calculate progress
        const progress = (input.value - input.min) / (input.max - input.min) * 100;

        // Set input progress
        input.style.background = `linear-gradient(to right, var(--main-color) ${progress}%, var(--text-color) ${progress}%)`
    }
}


/**
 * Checks if teams are set up. If not, prompts user and redirects based on user's choice.
 */
function validateTeams() {
    // Retrieve teams from local storage
    const teams = JSON.parse(localStorage.getItem("gameOptions")).teams;

    // Validate teams
    if (!Array.isArray(teams) ||  teams.length < 2) {
        // Prompt user
        let userConfirmation = confirm("No teams set up. Click OK to set up teams, or Cancel to return to the main page.");

        // Redirect based on user's choice
        if (userConfirmation) {
            window.location.href = "./teams.html";
        } else {
            window.location.href = "./index.html";
        }
    }
}


window.addEventListener("DOMContentLoaded", function () {
    validateTeams();

    const rangeInput = document.querySelectorAll('.range-input');

    for (let input of rangeInput) {

        // Set  a value of range input and a progress
        setValueAndProgress(input);

        input.addEventListener('input', function () {
            setValueAndProgress(this)
        })

    }
})
    
