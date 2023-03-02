import {getPlaylist, saveVideo} from "./utils/playlistStorage";

chrome.commands.onCommand.addListener(async function (command) {
  const queryOptions = {active: true, lastFocusedWindow: true};
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  const [tab] = await chrome.tabs.query(queryOptions);

  if (!tab?.url?.startsWith('https://www.youtube.com/watch') && !tab?.url?.startsWith('http://www.youtube.com/watch')) {
    return;
  }
  if (tab.id === undefined) {
    return;
  }

  switch(command) {
    case "save_video":
      const videoId = tab.url.split('v=')[1].split('&')[0];
      chrome.tabs.sendMessage(tab.id, "save_video", {}, (response) => {
        saveVideo(videoId, response.currentTime);
      })
      break;
    case "run_playlist":
      const playlist = await getPlaylist();
      console.log(playlist)
      break;
    case "clear_playlist":
      chrome.storage.local.set({ playlist: [] });
      break;
  }
});

export {};
