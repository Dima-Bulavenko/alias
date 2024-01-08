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
    for (const team of teams) {
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
