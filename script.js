const textElement = document.getElementById("typing-text");
const name = "Allan"; 
let index = 0;

function typeAnimation() {
    if (index < name.length) {
        textElement.innerHTML += name.charAt(index);
        index++;
        setTimeout(typeAnimation, 150); 
    }
}
window.onload = typeAnimation;