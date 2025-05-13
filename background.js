
chrome.action.onClicked.addListener( tab => {
  
  // send message to contentScript with action 'extractJobDescription'
  chrome.tabs.sendMessage(tab.id, { action: 'extractJobDescription' });

  console.log(Date.now(), "Extension icon clicked");
}
)

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'about',
    title: 'About',
    contexts: ['action']
  });
});

chrome.contextMenus.onClicked.addListener(info => {
  if (info.menuItemId === 'about') {
    chrome.tabs.create({
      url: 'https://nilla-moige.github.io/chrome-extension-linkedIn-job-snatcher/'
    });
  }
});

// Moved UI from context menu into popup

// This function is called when the extension is installed or updated
// chrome.runtime.onInstalled.addListener(() => {
//   // Create a context menu item
//   // See: https://developer.chrome.com/docs/extensions/reference/api/contextMenus#method-create
//   chrome.contextMenus.create({
//     id: "exampleContextMenu", // Unique identifier for the context menu item
//     title: "Context Menu", // Text to be displayed in the context menu
//     contexts: ["page"], // Show the context menu item only when text is selected
//   });
// });

// This function is called when a context menu item is clicked
// See: https://developer.chrome.com/docs/extensions/reference/api/contextMenus#event-onClicked
// chrome.contextMenus.onClicked.addListener((info, tab) => {
//   // Check if the clicked menu item is 'exampleContextMenu'
//   if (info.menuItemId === "exampleContextMenu") {
//     const selectedText = info.selectionText; // Get the selected text
//     console.log(Date.now(), "Selected text: ", selectedText);
//     chrome.tabs.sendMessage(tab.id, { action: 'extractJobDescription', promptNum: 1 }, (response) => {
//       console.log("Content script responded: ", response);
//     });
//   }
// });
