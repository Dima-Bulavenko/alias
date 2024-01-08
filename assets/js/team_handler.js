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