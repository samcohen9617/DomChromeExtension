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

export const checkIfElmRemoved = (selector, removedClassName) => {
    return new Promise((resolve) => {
        var x = new MutationObserver(function (mutation) {
            const wasRemoved = mutation.find((m) => {
                if (m.removedNodes.length > 0) {
                    return m.removedNodes[0].className == removedClassName;
                }
            });
            if (wasRemoved) {
                resolve();
            }
        });

        x.observe(document.querySelector(selector), { childList: true });
    });
};

export const querySelectorAllToArray = (parent, selector) => {
    return Array.from(parent.querySelectorAll(selector));
};

export const querySelectorAllToArrayByClass = (parent, selector) => {
    return Array.from(parent.querySelectorAll(`.${selector}`));
};

export const querySelectorByClass = (parent, selector) => {
    return parent.querySelector(`.${selector}`);
};
export const querySelectorByClassAndNotOtherClass = (
    parent,
    selector,
    notSelector
) => {
    return parent.querySelector(`.${selector}:not(.${notSelector})`);
};

export const getAllChildrenUntilNode = (parentSelector, node) => {
    const parent = document.querySelector(parentSelector);
    let children = [];

    let child = parent.firstChild;
    while (child && child != parent.childNodes[parent.childNodes.length - 1]) {
        if (child === node) break;
        children.push(child);
        child = child.nextSibling;
    }
    return children;
};

export const getAllChildren = (parentSelector) => {
    const parent = document.querySelector(parentSelector);
    return Array.from(parent.childNodes);
}