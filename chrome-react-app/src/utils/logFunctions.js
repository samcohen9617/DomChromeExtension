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
    console.log('====> parsing subject', logLine);
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
        console.log(
            '====> user and action',
            getUser(logLineBlocks),
            'shuffles'
        );
        return {};
    }
    console.log('====> did not shuffle', logLineBlocks);
    if (logLineBlocks.length < 3) return null;

    console.log(
        '====> user and action',
        getUser(logLineBlocks),
        getAction(logLineBlocks),
        getSubjectBlocks(logLineBlocks)
    );

    return {};
};
