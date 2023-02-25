interface YTVideo extends Element{
    currentTime: number;
}

export function getCurrentTime() {
    const video : (YTVideo | null)= document.querySelector("video.video-stream");

    if (video) {
        return video.currentTime;
    }
    return 0;
}