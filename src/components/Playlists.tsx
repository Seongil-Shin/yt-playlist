import {useRecoilState, useSetRecoilState} from "recoil";
import React, {useEffect} from "react";
import {addPlaylist, getPlaylists, IPlaylist} from "../utils/playlistStorage";
import {currentPlaylistState, playlistsState} from "../recoil/playlists";
import {isOnCurPlaylistState} from "../recoil/navigation";

export default function Playlists() {
    // 리코일로 연동
    const [playlists, setPlaylists] = useRecoilState(playlistsState);
    const setCurrentPlaylist = useSetRecoilState(currentPlaylistState)
    const setIsOnCurPlaylist = useSetRecoilState(isOnCurPlaylistState)

    useEffect(() => {
        getPlaylists().then((res) => setPlaylists(res));
    }, [])

    const onClickNewPlaylist = () => {
        addPlaylist().then(res => setPlaylists(res));
    };
    const onClickPlaylist = (playlist: IPlaylist) => {
        setCurrentPlaylist(playlist)
        setIsOnCurPlaylist(true)
    }

    return (
        <>
            <div className="w-full h-12">
                <button className="h-8 w-20 bg-blue-500 rounded-lg float-right mr-2 mt-2 text-white text-sm"
                        onClick={onClickNewPlaylist}>
                    새 재생목록
                </button>
            </div>
            <div className="mt-2 flex-col space-y-2 px-2 pb-2">
                {
                    playlists.map((item) => {
                        return (
                            <div key={item.id}
                                 className="border-4 border-gray-300 border-[1px] h-12 w-full px-2 text-base leading-[3rem] box-border rounded-md hover:bg-slate-100 cursor-pointer"
                                 onClick={() => onClickPlaylist(item)}>
                                {"새 재생목록"}
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}