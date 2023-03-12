import {saveVideo} from "../utils/playlistStorage";
import {getCurrentTime} from "../utils/youtube";

export default function makeVideoAdditionButton(playlistId: number) {
    const addVideoButton = createVideoButton()

    addVideoButton.addEventListener("click", async function (e) {
        const videoId = document.location.href.split('v=')[1].split('&')[0];
        const title = document.title;
        const thumbnail = document.head.querySelector("meta[property='og:image']")?.getAttribute("content") || "";

        await saveVideo(playlistId, {
            videoId: videoId,
            currentTime: getCurrentTime(),
            title: title,
            thumbnail: thumbnail
        })
    })
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
    return htmlDivElement;
}