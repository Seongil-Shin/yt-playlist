import * as yt from "./utils/youtube"

chrome.runtime.onMessage.addListener((message, senderR, sendesponse) => {
  sendesponse({
      currentTime : yt.getCurrentTime(),
  })
});

export {};
