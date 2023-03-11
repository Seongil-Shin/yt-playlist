import React, {useEffect} from "react";
import Navigation from "./Navigation";
import Playlists from "./Playlists";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {isOnCurPlaylistState} from "../recoil/navigation";
import CurPlaylist from "./CurPlaylist";
import {tabIdState} from "../recoil/tab";

export default function PopupApp() {
    const isOnCurPlaylist = useRecoilValue(isOnCurPlaylistState)
    const setTabId = useSetRecoilState(tabIdState);

    useEffect(() => {
        const queryOptions = {active: true, lastFocusedWindow: true};
        chrome.tabs.query(queryOptions).then(([tab]) => {
            setTabId(tab.id);
        });

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
