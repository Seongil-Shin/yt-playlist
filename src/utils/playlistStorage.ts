export interface IVideo {
    thumbnail: string;
    title: string;
    startLink: string;
}

export interface IPlaylist {
    id: number;
    videos: string[]
}

export async function saveVideo(playlistId: number, videoId: string, currentTime: number) {
    const playlists = await getPlaylists();
    const newPlaylist = playlists.map((playlist) => {
        if (playlist.id === playlistId) {
            return {
                ...playlist,
                videos: [...playlist.videos, "https://www.youtube.com/watch?v=" + videoId + "&t=" + Math.floor(currentTime)]
            }
        }
        return playlist;
    })
    chrome.storage.local.set({playlists: newPlaylist});
    console.log(newPlaylist)
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
        videos: []
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
    return playlists.playlists
}