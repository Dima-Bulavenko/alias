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