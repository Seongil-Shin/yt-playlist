import {atom} from "recoil";

export const isOnCurPlaylistState = atom<boolean>({
    key: "isOnCurPlaylist",
    default: false
})
