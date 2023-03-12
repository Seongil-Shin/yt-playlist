export default function getTabId() {
    return new Promise<number | undefined>((resolve) => {
        chrome.tabs.query({active: true, lastFocusedWindow: true}, (tabs) => {
            resolve(tabs[0].id)
        })
    })
}