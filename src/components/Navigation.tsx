import React from "react";
import clsx from "clsx";
import {useRecoilState, useRecoilValue} from "recoil";
import {isOnCurPlaylistState} from "../recoil/navigation";
import {hasCurrentPlaylistState} from "../recoil/playlists";

interface NavBtn extends React.HTMLAttributes<HTMLDivElement> {
    isSelected: boolean;
    text: string;
}

function NavBtn({isSelected, text, onClick}: NavBtn) {
    return (
        <div
            className={clsx(
                isSelected ? "w-1/2 border-l-2 border-gray-300" : "w-full",
                "py-2.5 text-center hover:bg-slate-100"
            )}
            onClick={onClick}
        >
            {text}
        </div>
    );
}

export default function Navigation() {
    const [isOnCurPlaylist, setIsOnCurPlaylist] = useRecoilState(isOnCurPlaylistState)
    const hasCurrentPlaylist = useRecoilValue(hasCurrentPlaylistState)

    const onClickPlaylist = () => setIsOnCurPlaylist(false);
    const onClickCurPlaylist = () => setIsOnCurPlaylist(true)

    return (
        <div className="flex w-full cursor-pointer flex-row border-b-2 border-gray-300 text-base ">
            <NavBtn isSelected={hasCurrentPlaylist} text="플레이리스트" onClick={onClickPlaylist}/>
            {hasCurrentPlaylist && <NavBtn isSelected={hasCurrentPlaylist} text="현재 리스트" onClick={onClickCurPlaylist}/>}
        </div>
    );
}
