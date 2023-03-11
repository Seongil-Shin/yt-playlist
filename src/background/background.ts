import runPlaylist from "./runPlaylist";

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

    switch (command) {
        case "save_video":
            break;
        case "run_playlist":
            break;
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
