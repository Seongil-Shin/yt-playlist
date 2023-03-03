export async function saveVideo(videoId: string, currentTime: number) {
    const playlist = await getPlaylist();
    const newPlaylist = [...playlist, "https://www.youtube.com/watch?v=" + videoId + "&t=" + Math.floor(currentTime)];
    chrome.storage.local.set({ playlist: newPlaylist });
}

export async function getPlaylist(){
    const playlist = await chrome.storage.local.get("playlist") as {playlist: string[] | undefined};

    if(playlist.playlist === undefined) {
        return [];
    }

    return Object.keys(playlist).length === 0 ?  []  : playlist.playlist
}