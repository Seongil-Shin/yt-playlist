import {useRecoilState} from "recoil";
import {currentPlaylistState} from "../recoil/playlists";
import getTabId from "../utils/getTabId";
import {useEffect, useMemo, useState} from "react";

// @ts-ignore
import DeleteIcon from "../assets/icons/delete.svg"
import {removeVideo} from "../utils/playlistStorage";
import {getStartTimeFromURL} from "../utils/youtube";

export default function CurPlaylist() {
    const [curPlaylist, setCurPlaylist] = useRecoilState(currentPlaylistState);
    const [isPlaying, setIsPlaying] = useState(false);

    const playlistThumbnail = useMemo(() => {
        // first exist thumbnail
        if (curPlaylist) {
            const firstVideo = curPlaylist.videos.find((video) => video.thumbnail !== "")
            if (firstVideo) {
                return firstVideo.thumbnail
            }
        }
        return ""
    }, [curPlaylist])

    useEffect(() => {
        chrome.storage.local.get({"playState": {isPlaying: false, curPlaylist: null}}).then((res) => {
            setIsPlaying(res.playState.isPlaying)
        })
    }, [])

    const onClickAddVideo = async () => {
        const tabId = await getTabId()
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

    const onClickPlayVideo = async () => {
        const tabId = await getTabId()
        if (tabId === undefined || curPlaylist === null) {
            return;
        }
        await chrome.runtime.sendMessage({
            message: "play_video",
            data: {
                videos: curPlaylist?.videos,
                tabId: tabId,
            }
        })
        await chrome.storage.local.set({
            playState: {
                isPlaying: !isPlaying,
                curPlaylist: isPlaying ? null : curPlaylist,
            }
        })
        setIsPlaying(!isPlaying)
    }

    const onClickDeleteVideo = async (videoId: number) => {
        if (curPlaylist === null) {
            return;
        }
        const result = await removeVideo(curPlaylist.id, videoId);
        if (result === true) {
            setCurPlaylist({
                ...curPlaylist,
                videos: curPlaylist.videos.filter((video) => video.id !== videoId)
            })
        }
    }

    return (
        <div className="w-full h-full">
            <div className="w-full h-1/4 flex p-2 box-border">
                <div className="w-1/3 h-full rounded-md bg-gray-300">
                    {playlistThumbnail !== "" &&
                        <img
                            src={playlistThumbnail}
                            alt="thumbnail"
                            className="w-full h-full"/>
                    }
                </div>
                <div className="w-2/3 h-full mx-2 flex flex-col justify-between">
                    <div className="flex flex-row justify-between items-center">
                        <div className="text-xl font-bold">title</div>
                        <div
                            className="w-12 h-6 cursor-pointer bg-gray-400 rounded-md text-white text-center leading-6 hover:bg-gray-400/80">수정
                        </div>
                    </div>
                    <div className="w-full h-8 flex flex-row justify-around">
                        <button className="w-2/5 h-full bg-emerald-500 text-white rounded-md hover:bg-emerald-400"
                                onClick={onClickPlayVideo}>{isPlaying ? "정지" : "재생"}
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
                    curPlaylist?.videos.map((video, idx) => {
                        return (<div
                            className="w-full h-12 flex flex-row  px-2 box-border justify-between items-center break-all"
                            key={video.startLink + "idx" + video.id}>
                            <div className="">{video.title}<br/>시작시간 : {getStartTimeFromURL(video.startLink)}</div>
                            <div className="w-6 h-6 cursor-pointer" onClick={() => onClickDeleteVideo(video.id)}><img
                                src={DeleteIcon}/></div>
                        </div>)
                    })
                }
            </div>
        </div>
    )
}