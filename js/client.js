fetch('https://random-word-api.herokuapp.com/word?number=5')
    .then(response => response.json())
    .then(words => {
        let div = document.getElementById("toType")
        let str = "";
        words.forEach(word => {
            str += word + " ";
        });
        div.innerHTML = str;
    })
    .catch(error => console.error(error));

function highlightCharacter(elementId, charIndex, color) { 
    let div = document.getElementById(elementId);
    let text = div.textContent; 

    let highlightCharacterText =
        text.substring(0, charIndex) +
        `<span style="color: ${color}">${text[charIndex]}</span>` +
        text.substring(charIndex + 1);

    div.innerHTML = highlightCharacterText;
}

function keyPress() {
    let div = document.getElementById("toType");
    let position = 0;

    document.addEventListener("keydown", (event) => {
        if (event.key === div.textContent.charAt(position)) {
            highlightCharacter("toType", position, "white");
            position++;
            console.log(position);
        } else if (event.key !== div.textContent.charAt(position)) {
            highlightCharacter("toType", position, "red");
            position++;
            console.log(position);
        }
    })
}

window.onload = keyPress();