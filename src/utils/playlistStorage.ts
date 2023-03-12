export interface IVideo {
    id: number;
    thumbnail: string;
    title: string;
    startLink: string;
}

export interface IPlaylist {
    id: number;
    videos: IVideo[]
}

export async function saveVideo(playlistId: number, video: { videoId: string, currentTime: number, title: string, thumbnail: string }) {
    const playlists = await getPlaylists();
    const newPlaylist = playlists.map((playlist) => {
        if (playlist.id === playlistId) {
            return {
                ...playlist,
                videos: [...playlist.videos, {
                    id: Math.random() * 100000000000000000,
                    startLink: "https://www.youtube.com/watch?v=" + video.videoId + "&t=" + Math.floor(video.currentTime),
                    title: video.title,
                    thumbnail: video.thumbnail
                }]
            }
        }
        return playlist;
    })

    console.log(newPlaylist)
    return chrome.storage.local.set({playlists: newPlaylist}).then(() => {
        return true
    }).catch(() => {
        return false
    })
}

export async function removeVideo(playlistId: number, videoId: number) {
    const playlists = await getPlaylists();
    const newPlaylist = playlists.map((playlist) => {
        if (playlist.id === playlistId) {
            return {
                ...playlist,
                videos: playlist.videos.filter((video) => video.id !== videoId)
            }
        }
        return playlist;
    })
    return chrome.storage.local.set({playlists: newPlaylist}).then(() => {
        return true
    }).catch(() => {
        return false
    })
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