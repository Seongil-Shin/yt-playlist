chrome.commands.onCommand.addListener(async function (command) {
  const queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  const [tab] = await chrome.tabs.query(queryOptions);

  if(!tab?.url?.startsWith('https://www.youtube.com/watch') && !tab?.url?.startsWith('http://www.youtube.com/watch')) {
    return;
  }
  if(tab.id === undefined) {
    return;
  }

  const videoId = tab.url.split('v=')[1].split('&')[0];
  chrome.tabs.sendMessage(tab.id, "hello", {}, (response) => {
    console.log(response)
  })
});

export {};
