

function waitForElm(selector) {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector));
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}
waitForElm(".game-log").then((elm) => {
  // select the target node
  var target = document.querySelector(".log-scroll-container");
  console.log('found');
  // create an observer instance
  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      console.log(mutation.type);
    });
  });

  // configuration of the observer:
  var config = { childList: true};

  // pass in the target node, as well as the observer options
  observer.observe(target, config);
});
