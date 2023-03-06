(async () => {
  const src = chrome.runtime.getURL("src/js/main.js");
  const contentMain = await import(src);
  contentMain.init();
})();
