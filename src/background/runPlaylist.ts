import {IVideo} from "../utils/playlistStorage";

interface Props {
    tabId: number
}

interface PlaylistState {
    isRunning: boolean,
    intervalId: NodeJS.Timer | null

    toggleIsRunning: Function
    setIntervalId: Function
}

const playlistState: PlaylistState = {
    isRunning: false,
    intervalId: null,

    toggleIsRunning() {
        this.isRunning = !this.isRunning
    },
    setIntervalId(id: NodeJS.Timer | null) {
        this.intervalId = id;
    }
}
export default async function runPlaylist(tabId: number, videos: IVideo[]) {
    playlistState.toggleIsRunning();

    if (playlistState.isRunning === false) {
        if (playlistState.intervalId !== null) {
            clearInterval(playlistState.intervalId);
        }
        playlistState.setIntervalId(null);
        return;
    }

    if (videos.length === 0) {
        return;
    }

    let idx = 0, prevTime = 0;

    // 첫번째 비디오 재생
    await chrome.tabs.update(tabId, {
        url: videos[idx++].startLink
    })


    const intervalId = setInterval(() => {
        chrome.tabs.sendMessage(tabId, {
            message: "check_video_end",
            prevTime: prevTime
        }, {}, (res) => {
            if (res.isEnded) {
                if (idx === videos.length) {
                    clearInterval(intervalId);
                    playlistState.setIntervalId(null);
                    return;
                }
                chrome.tabs.update(tabId, {
                    url: videos[idx++].startLink
                })
                prevTime = 0;
            } else {
                prevTime = res.currentTime;
            }
        })
    }, 1000)

    playlistState.setIntervalId(intervalId);
}