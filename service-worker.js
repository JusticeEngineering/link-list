console.log('Background running', chrome);
chrome.browserAction.onClicked.addListener(
   () => chrome.tabs.create({
    url: 'index.html'
  })
)

chrome.runtime.onMessageExternal.addListener(
  (request, sender, sendResponse) => {
    if (request.url) {
      chrome.tabs.create({
        url: `index.html?url=${request.url}`
      })
      sendResponse({success: true});
    }
  }
);