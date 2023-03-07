import {useRecoilState} from "recoil";
import {currentPlaylistState} from "../recoil/playlists";
import {useEffect} from "react";

export default function CurPlaylist() {
    const [curPlaylist, setCurPlaylist] = useRecoilState(currentPlaylistState);

    useEffect(() => {

    }, [])

    const onClickAddVideo = async () => {
        const queryOptions = {active: true, lastFocusedWindow: true};
        // `tab` will either be a `tabs.Tab` instance or `undefined`.
        const [tab] = await chrome.tabs.query(queryOptions);
        if (tab.id === undefined) {
            return;
        }

        chrome.tabs.sendMessage(tab.id, {
            message: "add_video_button",
        })
    }

    return (
        <div className="w-full h-full">
            <div className="w-full h-1/4 flex p-2 box-border">
                <div className="w-1/3 h-full rounded-md">
                    <img
                        src="https://play-lh.googleusercontent.com/afS719gxko5j3EkeHIPpDbSP4HjwTG7-pHn3URfzQ7wPXquVX6uV6VeEnFCmkQwk4w"
                        alt="thumbnail"
                        className="w-full h-full"/>
                </div>
                <div className="w-2/3 h-full mx-2 flex flex-col justify-between">
                    <div className="text-xl font-bold">title</div>
                    <button className="w-full h-8 bg-blue-500 text-white rounded-md hover:bg-blue-400"
                            onClick={onClickAddVideo}>영상 추가
                    </button>
                </div>
            </div>
            <div className="mx-2 mt-2 h-[1px] bg-gray-200"/>
        </div>
    )
}