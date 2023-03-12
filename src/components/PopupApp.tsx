import React, {useEffect} from "react";
import Navigation from "./Navigation";
import Playlists from "./Playlists";
import {useRecoilState, useSetRecoilState} from "recoil";
import {isOnCurPlaylistState} from "../recoil/navigation";
import CurPlaylist from "./CurPlaylist";
import {currentPlaylistState} from "../recoil/playlists";

export default function PopupApp() {
    const [isOnCurPlaylist, setIsOnCurPlaylist] = useRecoilState(isOnCurPlaylistState)
    const setCurPlaylist = useSetRecoilState(currentPlaylistState)

    useEffect(() => {
        async function initState() {
            const playState = await chrome.storage.local.get({"playState": {isPlaying: false, curPlaylist: null}})
            setIsOnCurPlaylist(playState.playState.isPlaying)
            setCurPlaylist(playState.playState.curPlaylist)
        }

        initState()
    }, [])

    return (
        <div className="h-96 w-80">
            <Navigation/>
            {
                isOnCurPlaylist ? <CurPlaylist/> : <Playlists/>
            }
        </div>
    );
}
