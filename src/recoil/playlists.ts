import {atom, selector} from "recoil";
import {IPlaylist} from "../utils/playlistStorage";


export const playlistsState = atom<IPlaylist[]>({
    key: "playlists",
    default: []
});

export const currentPlaylistState = atom<IPlaylist | null>({
    key: "currentPlaylist",
    default: null
})

export const hasCurrentPlaylistState = selector<boolean>({
    key: "hasCurrentPlaylist",
    get: ({get}) => get(currentPlaylistState) !== null
})