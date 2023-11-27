import { startsWithAction, playsAction } from './actionFunctions.js';

import {
    querySelectorAllToArray,
    watchElm,
    getAllChildren,
    getLastChildrenUntilFirstNodeWithClass,
} from './domFunctions.js';

import { parseLogLine } from './logFunctions.js';

const updateDeck = (parsedLogLine, tempDeck) => {
    const { user, action, subject } = parsedLogLine;
    switch (action) {
        case ' starts with ':
            tempDeck = startsWithAction(subject, user, tempDeck);
            break;
        case 'shuffles':
            tempDeck[user].deck = { ...tempDeck[user].discard };
            // tempDeck[user].discard = {};
            break;
        case ' plays ':
            tempDeck = playsAction(subject, user, tempDeck);
            break;
        default:
            break;
    }
    return tempDeck;
};

export const setupDominionWorld = () => {
    getPlayers().then((players) => {
        let tempDeck = players;
        getAllChildren('.log-scroll-container').map((logLine) => {
            const parsedLogLine = parseLogLine(logLine);
            if (parsedLogLine) {
                tempDeck = updateDeck(parsedLogLine, tempDeck);
                return parsedLogLine;
            }
            return null;
        });
        let currentTurn = null;
        players = tempDeck;

        tempDeck = null;
        watchElm(
            document
                .querySelector('.log-container')
                .querySelector('.log-scroll-container'),
            (evt) => {
                const currentTurnLogs = getLastChildrenUntilFirstNodeWithClass(
                    document
                        .querySelector('.log-container')
                        .querySelector('.log-scroll-container'),
                    'new-turn-line'
                );
                if (currentTurnLogs.length > 0) {
                    if (
                        currentTurnLogs[currentTurnLogs.length - 1]
                            .innerText !== currentTurn
                    ) {
                        console.log(
                            '====> new turn',
                            currentTurnLogs[currentTurnLogs.length - 1]
                                .innerText
                        );

                        tempDeck = players;
                    }

                    currentTurnLogs.forEach((logLine) => {
                        const parsedLogLine = parseLogLine(logLine);
                        if (parsedLogLine) {
                            tempDeck = updateDeck(parsedLogLine, tempDeck);
                            console.log('====> temp deck', tempDeck);
                        }
                    });
                    currentTurn =
                        currentTurnLogs[currentTurnLogs.length - 1].innerText;
                }

                const parsedLogLine = parseLogLine(evt.addedNodes[0]);

                if (parsedLogLine) {
                    updateDeck(parsedLogLine, players);
                }
            }
        );
    });
};

const getPlayers = () => {
    const players = {};
    return new Promise((resolve) => {
        const playerNames = querySelectorAllToArray(
            document,
            'player-info-name'
        ).map((player) => {
            players[player.innerText[0]] = {
                playerName: player.innerText,
                deck: {},
                drawPile: {},
                discard: {},
                inPlay: {},
                hand: {},
                elsewhere: {},
            };
            return player.innerText;
        });
        resolve(players);
    });
};
