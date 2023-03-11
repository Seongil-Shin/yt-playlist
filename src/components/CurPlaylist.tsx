import {useRecoilState, useRecoilValue} from "recoil";
import {currentPlaylistState} from "../recoil/playlists";
import {useEffect} from "react";
import {tabIdState} from "../recoil/tab";

export default function CurPlaylist() {
    const [curPlaylist, setCurPlaylist] = useRecoilState(currentPlaylistState);
    const tabId = useRecoilValue(tabIdState)

    useEffect(() => {

    }, [])

    const onClickAddVideo = () => {
        if (tabId === undefined || curPlaylist === null) {
            return;
        }
        chrome.tabs.sendMessage(tabId, {
            message: "add_video_button",
            data: {
                playlistId: curPlaylist.id,
            }
        })
    }
    const onClickPlayVideo = () => {
        if (tabId === undefined || curPlaylist === null) {
            return;
        }
        chrome.runtime.sendMessage({
            message: "play_video",
            data: {
                videos: curPlaylist?.videos,
                tabId: tabId,
            }
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
                    <div className="w-full h-8 flex flex-row justify-around">
                        <button className="w-2/5 h-full bg-emerald-500 text-white rounded-md hover:bg-emerald-400"
                                onClick={onClickPlayVideo}>재생
                        </button>
                        <button className="w-2/5 h-full bg-blue-500 text-white rounded-md hover:bg-blue-400"
                                onClick={onClickAddVideo}>영상 추가
                        </button>
                    </div>
                </div>
            </div>
            <div className="mx-2 mt-2 h-[1px] bg-gray-200"/>
            <div className="w-full mt-2">
                {
                    curPlaylist?.videos.map((videoUrl, idx) => {
                        return (<div
                            className="w-full h-12 flex flex-col  px-2 box-border justify-center break-all"
                            key={videoUrl + "idx" + idx}>{videoUrl}</div>)
                    })
                }
            </div>
        </div>
    )
}