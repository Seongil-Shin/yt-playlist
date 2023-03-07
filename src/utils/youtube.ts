export function getCurrentTime() {
    const video: (HTMLMediaElement | null) = document.querySelector("video.video-stream");
    if (video) {
        return video.currentTime;
    }
    return 0;
}

export function getEndTime() {
    const video: (HTMLMediaElement | null) = document.querySelector("video.video-stream");
    if (video) {
        return video.duration;
    }
    return 0;
}