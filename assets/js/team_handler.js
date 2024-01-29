/**
 * Function to get a random team name and mark it as take
 */
function getRandomName() {
    let teams = JSON.parse(localStorage.getItem('teams'));
    let team;
    let randomIndex;

    // Select a random team that hasn't been taken
    do {
        randomIndex = Math.floor(Math.random() * teams.length);
        team = teams[randomIndex];
    } while (team.taken);

    // Mark the selected team as taken and update localStorage
    team.taken = true;
    localStorage.setItem("teams", JSON.stringify(teams));

    // Return the selected team name
    return team.name;
}


function addTeam() {
    let teamsElement = document.getElementById("teams");

    // Clone the first team element and set its text content to a random team name
    let teamHtml = teamsElement.firstElementChild.cloneNode(true);
    teamHtml.getElementsByClassName("team")[0].textContent = getRandomName();

    // Add new team to DOM
    teamsElement.appendChild(teamHtml)

}


function removeTeam() {
    const teams = JSON.parse(localStorage.getItem('teams'));
    const teamElement = this.parentElement;
    const teamName = teamElement.querySelector(".team").textContent;

    // Update the 'taken' status of the corresponding team to false
    for (let team of teams) {
        if (team.name === teamName) {
            team.taken = false;

            // Save updated team status to local storage
            localStorage.setItem("teams", JSON.stringify(teams));
            break
        }
    }

    // Remove the team element from the DOM
    this.parentElement.remove();
}


/**
 * Enable or disable team deletion on the number of teams
 */
function toggleTeamDeletion(teamsAmount) {
    let deleteElements = document.getElementsByClassName("delete-team")
    if (teamsAmount <= 2) {
        for (let element of deleteElements) {
            element.setAttribute("hidden", true);
        }
    } else {
        for (let element of deleteElements) {
            element.removeAttribute('hidden');
        }
    }
}


/**
 * Enable or disable team addition based on the number of teams
 */
function toggleTeamAddition(teamsAmount) {
    const addTeamClasses = document.getElementById("add-team").classList;
    const isDisabled = addTeamClasses.contains("disabled")

    if (teamsAmount < 6 && isDisabled) {
        addTeamClasses.remove("disabled");
    }

    if (teamsAmount === 6 && !isDisabled) {
        addTeamClasses.add("disabled");
    }
}


// Observe changes in the 'teams' element using MutationObserver
const teamsObserver = new MutationObserver(function (mutationList, observer) {
    for (const mutation of mutationList) {

        if (mutation.type === 'childList') {
            const teamsAmount = mutation.target.children.length;

            // Enable or disable team addition
            toggleTeamAddition(teamsAmount);

            // Enable or disable team deletion
            toggleTeamDeletion(teamsAmount);

            // Add remove event listener to newly added team
            for (let newTeam of mutation.addedNodes) {
                let deleteTeamElem = newTeam.getElementsByClassName("delete-team")[0];
                deleteTeamElem.addEventListener("click", removeTeam)
            }


        }
    }
});


// Wait for the window to load before executing the following code
window.addEventListener("load", function () {
    // Remove any existing "teams" data from localStorage
    this.localStorage.removeItem("teams");

    // Initialize an array of team objects with names and availability status
    let teamsObjects = [
        { name: "Thunderhawks", taken: false },
        { name: "Galactic Tigers", taken: false },
        { name: "Mystic Dragons", taken: false },
        { name: "Quantum Quasars", taken: false },
        { name: "Solar Sprints", taken: false },
        { name: "Lunar Lynxes", taken: false },
        { name: "Neon Nomads", taken: false },
        { name: "Polar Prowess", taken: false },
        { name: "Vortex Voyagers", taken: false },
        { name: "Cosmic Comets", taken: false },
        { name: "Velocity Vikings", taken: false },
        { name: "Aurora Avengers", taken: false },
        { name: "Nova Nomads", taken: false },
        { name: "Astro Arrows", taken: false },
        { name: "Blazing Bulls", taken: false },
        { name: "Rapid Raptors", taken: false },
        { name: "Eclipse Eagles", taken: false },
        { name: "Fusion Foxes", taken: false },
        { name: "Stellar Stingers", taken: false }
    ];

    // Store the array of team objects in localStorage as a JSON string
    localStorage.setItem("teams", JSON.stringify(teamsObjects));

    // Get elements with class 'team' and set their text content to random team names
    let teamsElements = document.getElementsByClassName('team');
    for (let team of teamsElements) {
        let teamName = getRandomName();
        team.textContent = teamName;
    }

    // Add Event listener to add new team
    document.getElementById('add-team').addEventListener('click', addTeam);

    // Add event listeners to the 'delete-team' buttons to handle team removal
    let deleteTeamElements = document.getElementsByClassName("delete-team");
    for (let deleteTeamElement of deleteTeamElements) {
        deleteTeamElement.addEventListener('click', removeTeam)
    }

    // Get target element for observing
    const teamsElement = document.getElementById('teams');

    // Create config for observe mutations of adding and removing teams' children
    const teamsObserverConfig = { childList: true };

    // Start observing changes in the 'teams' element
    teamsObserver.observe(teamsElement, teamsObserverConfig);
})

// Prevent navigation to next setup game stage, add teams to gameOptions
// and continue the navigation.
document.getElementById("next").addEventListener("click", function (event) {

    // Prevent navigation
    event.preventDefault();

    // Create game options object to store data about game
    let gameOptions = {
        teams: [],
    };

    // Iterate through all teams' elements
    for (let [index, element] of [...document.querySelectorAll("#teams .team")].entries()) {

        // Add team objects to gameOptions and create its properties
        gameOptions.teams.push({
            name: element.textContent,
            round: index === 0 ? 1 : 0,
            isTurn: index === 0 ? true : false,
            score: 0
        })
    }

    // Save the gameOptions in local storage
    localStorage.setItem("gameOptions", JSON.stringify(gameOptions));

    // Resume navigation
    window.location.href = event.target.href;
})
