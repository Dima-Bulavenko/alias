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


window.addEventListener("DOMContentLoaded", function () {
    const rangeInput = document.querySelectorAll('.range-input');

    for (let input of rangeInput) {

        // Set  a value of range input and a progress
        setValueAndProgress(input);

        input.addEventListener('input', function () {
            setValueAndProgress(this)
        })

    }
})
    
