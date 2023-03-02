import * as yt from "./utils/youtube"

chrome.runtime.onMessage.addListener((message, senderR, sendesponse) => {
    switch(message) {
        case "save_video":
            sendesponse({
                currentTime : yt.getCurrentTime(),
            })
            break;
    }
});

export {};
