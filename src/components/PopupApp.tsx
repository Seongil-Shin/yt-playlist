import React from "react";
import Navigation from "./Navigation";
import Playlists from "./Playlists";
import {useRecoilValue} from "recoil";
import {isOnCurPlaylistState} from "../recoil/navigation";
import CurPlaylist from "./CurPlaylist";

export default function PopupApp() {
    const isOnCurPlaylist = useRecoilValue(isOnCurPlaylistState)

    return (
        <div className="h-96 w-80">
            <Navigation/>
            {
                isOnCurPlaylist ? <CurPlaylist/> : <Playlists/>
            }
        </div>
    );
}
