import {getPlaylist} from "../utils/playlistStorage";

interface Props {
    tabId : number
}

interface PlaylistState {
    isRunning : boolean,
    intervalId: NodeJS.Timer | null

    toggleIsRunning: Function
    setIntervalId: Function
}

const playlistState : PlaylistState = {
    isRunning : false,
    intervalId: null,

    toggleIsRunning() {
        this.isRunning = !this.isRunning
    },
    setIntervalId(id:NodeJS.Timer | null) {
        this.intervalId = id;
    }
}
export default async function runPlaylist(tabId :number) {
    playlistState.toggleIsRunning();

    if(playlistState.isRunning === false) {
        if(playlistState.intervalId !== null) {
            clearInterval(playlistState.intervalId);
        }
        playlistState.setIntervalId(null);
        return;
    }


    const playlist = await getPlaylist();
    console.log(playlist)

    if(playlist.length === 0) {
        return;
    }

    let idx = 0, prevTime = 0;

    // 첫번째 비디오 재생
    chrome.tabs.update(tabId, {
        url: playlist[idx++]
    })


    const intervalId = setInterval(() => {
        chrome.tabs.sendMessage(tabId, {
            message:"check_video_end",
            prevTime: prevTime
        }, {}, (res) => {
            if(res.isEnded) {
                if(idx === playlist.length) {
                    clearInterval(intervalId);
                    playlistState.setIntervalId(null);
                    return;
                }
                chrome.tabs.update(tabId, {
                    url: playlist[idx++]
                })
                prevTime = 0;
                console.log(playlist[idx])
            } else {
                prevTime = res.currentTime;
            }
        })
    },1000)

    playlistState.setIntervalId(intervalId);
}