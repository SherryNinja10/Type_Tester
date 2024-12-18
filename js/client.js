var errors = 0;

if (window.location.pathname.includes("index.html") || window.location.pathname === "/") {
    fetch('https://random-word-api.herokuapp.com/word?number=5')
    .then(response => response.json())
    .then(words => {
        let div = document.getElementById("toType");
        div.innerHTML = ""; // Clear previous content

        // Combine words into a single string with spaces
        let text = words.join(" ");

        // Create a span for each character and append to the div
        Array.from(text).forEach(char => {
            let span = document.createElement("span");
            span.textContent = char; // Set the character
            div.appendChild(span);  // Append span to the div
        });
    })
    .catch(error => console.error(error));

// Highlight specific character
function highlightCharacter(position, color) {
    let div = document.getElementById("toType");
    let spans = div.getElementsByTagName("span"); // Get all span elements
    if (position >= 0 && position < spans.length) {
        spans[position].style.color = color; // Change the color of the specific span
    }
}


    function keyPress() {
        let div = document.getElementById("toType");
        let position = 0;

        document.addEventListener("keydown", (event) => {
            if (position >= div.textContent.length) {
                console.log("End of content reached!");
                window.location.href = `results.html?errors=${errors}`;
            } else if (event.key == "Backspace") {
                if (position === 0){
                    console.log("already 0");
                } else {
                    position--;
                    highlightCharacter(position,"rgb(168, 168, 168)");
                    console.log(position);
                }
            } else if (event.key === div.textContent.charAt(position)) {
                highlightCharacter(position, "white");
                position++;
                console.log(position);
            } else if (event.key !== div.textContent.charAt(position)) {
                highlightCharacter(position, "red");
                position++;
                errors++;
                console.log(position);
            }
        })
    }

    window.onload = keyPress;
} else {

    function displayErrors() {
    // Get the query string from the URL
    const params = new URLSearchParams(window.location.search);
    
    // Get the 'errors' query parameter
    const errors = params.get('errors');

    console.log(errors);

    let str = `<p> Number of errors: ${errors}</p>`;
    document.getElementById("results").insertAdjacentHTML("beforeend", str);
    }

    displayErrors();

    window.onload = function () {
        const navigationEntries = performance.getEntriesByType('navigation');
        if (navigationEntries.length > 0 && navigationEntries[0].type === 'reload') {
            window.location.href = 'index.html';
        }
    };
}