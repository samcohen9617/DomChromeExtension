export const waitForElm = (selector) => {
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
};

export const watchElm = (selector, callback) => {
  // select the target node
  var target = document.querySelector(selector);
  // create an observer instance
  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      callback(mutation);
    });
  });

  // configuration of the observer:
  var config = { childList: true };

  // pass in the target node, as well as the observer options
  observer.observe(target, config);
};

export const querySelectorAllToArray = (parent, className) => {
  return Array.from(parent.querySelectorAll(className));
}

