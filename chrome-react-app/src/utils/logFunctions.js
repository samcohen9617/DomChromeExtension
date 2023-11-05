import {
    querySelectorAllToArrayByClass,
    querySelectorByClassAndNotOtherClass,
} from './domFunctions';

const getAction = (logLine) => {
    return logLine[2].innerText;
};
const getUser = (logLine) => {
    return logLine[1].innerText;
};

const getSubjectBlocks = (logLine) => {
    const subjectBlocks = [];
    let index = 3;
    while (logLine[index].innerText !== '.') {
        if (logLine[index].innerText.includes('.')) {
            if (logLine[index].innerText) {
                subjectBlocks.push(logLine[index].innerText.split('.')[0]);
            }
            break;
        }
        if (logLine[index].innerText) {
            subjectBlocks.push(logLine[index].innerText);
        }
        index++;
    }
    return subjectBlocks.join('');
};
const checkIfShuffle = (logLineBlocks) => {
    return logLineBlocks.find((block) => {
        if (block.innerText.includes('shuffles')) {
            return true;
        }
    });
};
export const parseLogLine = (logLine) => {
    if (
        !querySelectorByClassAndNotOtherClass(
            logLine,
            'log-line',
            'new-turn-line'
        )
    )
        return null;
    const logLineBlocks = querySelectorAllToArrayByClass(
        logLine,
        'log-line-block'
    );
    if (checkIfShuffle(logLineBlocks)) {
        return { user: getUser(logLineBlocks), action: 'shuffles' };
    }
    if (logLineBlocks.length < 3) return null;

    return {
        user: getUser(logLineBlocks),
        action: getAction(logLineBlocks),
        subject: getSubjectBlocks(logLineBlocks),
    };
};
