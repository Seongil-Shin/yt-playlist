import * as yt from "../utils/youtube"

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const msg = message.message || message
    switch(msg) {
        case "save_video":
            sendResponse({
                currentTime : yt.getCurrentTime(),
            })
            break;
            // 유저가 잠시 스탑한 거 구분
        case "check_video_end":
            const currentTime = yt.getCurrentTime()
            console.log(currentTime, message.prevTime)
            if(currentTime === message.prevTime) {
                sendResponse({
                    isEnded: true,
                })
            } else {
                sendResponse({
                    isEnded: false,
                    currentTime : currentTime
                })
            }
            break;
    }
});

export {};
