import runPlaylist from "./runPlaylist";

chrome.commands.onCommand.addListener(function (command) {
    switch (command) {
        case "clear_playlist":
            chrome.storage.local.set({playlists: []});
            break;
    }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    switch (message.message) {
        case "play_video":
            runPlaylist(message.data.tabId, message.data.videos)
    }
})
export {};
