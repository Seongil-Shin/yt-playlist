export default function makeVideoAdditionButton() {
    createVideoButton()
}

function createVideoButton() {
    const htmlDivElement = document.createElement("div");
    htmlDivElement.style.position = "fixed";
    htmlDivElement.style.bottom = "1rem";
    htmlDivElement.style.right = "1rem";

    htmlDivElement.style.width = "8rem";
    htmlDivElement.style.height = "4rem";
    htmlDivElement.style.fontSize = "1.75rem";
    htmlDivElement.style.lineHeight = "4rem";
    htmlDivElement.style.textAlign = "center";
    htmlDivElement.style.backgroundColor = "rgb(59 130 246)"
    htmlDivElement.style.borderRadius = "1rem";
    htmlDivElement.style.color = "white";
    htmlDivElement.innerText = "영상 추가"

    htmlDivElement.style.cursor = "pointer";
    // hover event
    htmlDivElement.addEventListener("mouseenter", function (e) {
        htmlDivElement.style.background = "rgb(96 165 250)"
    })
    htmlDivElement.addEventListener("mouseleave", function (e) {
        htmlDivElement.style.backgroundColor = "rgb(59 130 246)"
    })

    document.body.appendChild(htmlDivElement)
}