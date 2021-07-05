chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({
    password: "Default password",
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (/^https/.test(tab.url)) {
    chrome.scripting
      .insertCSS({
        target: { tabId: tabId },
        files: ["./foreground_style.css"],
      })
      .then(() => {
        console.log("Injected Css");
        chrome.scripting
          .executeScript({
            target: { tabId: tabId },
            files: ["./foreground.js"],
          })
          .then(() => {
            console.log("Injected the foreground script");
          });
      })
      .catch((err) => console.error(err));
  }
});
