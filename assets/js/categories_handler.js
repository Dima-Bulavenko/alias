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
    window.location.href = "./game.html";
}


document.addEventListener('DOMContentLoaded', function () {

    document.querySelectorAll(".category-container").forEach(element => {
        element.addEventListener('click', setType)
    })
})