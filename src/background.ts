chrome.webNavigation.onCompleted.addListener(function (details) {
  console.log("onCompleted");
  console.log(details);
});

export {};
