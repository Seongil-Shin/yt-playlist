export interface IVideo {
    thumbnail: string;
    title: string;
    startLink: string;
}

export interface IPlaylist {
    id: number;
    playlist: string[]
}

export async function saveVideo(videoId: string, currentTime: number) {
    const playlist = await getPlaylists();
    const newPlaylist = [...playlist, "https://www.youtube.com/watch?v=" + videoId + "&t=" + Math.floor(currentTime)];
    chrome.storage.local.set({playlists: newPlaylist});
}

export async function addPlaylist() {
    const playlist = await getPlaylists();
    const maxId = playlist.reduce((acc, playlist) => {
        if (acc < playlist.id) {
            return playlist.id;
        }
        return acc
    }, 0)
    const newPlaylist = [...playlist, {
        id: maxId + 1,
        playlist: []
    }]

    console.log(newPlaylist)

    chrome.storage.local.set({playlists: newPlaylist});
    return newPlaylist
}

export async function getPlaylists() {
    const playlists = await chrome.storage.local.get("playlists") as { playlists: IPlaylist[] | undefined };

    if (playlists.playlists === undefined) {
        return [];
    }

    console.log(playlists)

    return Object.keys(playlists).length === 0 ? [] : playlists.playlists
}