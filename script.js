const textElement = document.getElementById("typing-text");
const name = "Allan Felipe :)"; 
let index = 0;

function typeAnimation() {
    if (index < name.length) {
        textElement.innerHTML += name.charAt(index);
        index++;
        setTimeout(typeAnimation, 150); 
    }
}
window.onload = typeAnimation;


const scrollArrow = document.getElementById("scroll-to-about");
const aboutSection = document.getElementById("about");

scrollArrow.addEventListener("click", () => {
    aboutSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});
