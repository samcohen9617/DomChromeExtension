import {
    CARDS_IN_SUPPLY,
    KINGDOM_VIEWER,
    KINGDOM_VIEWER_HEADER_CONTAINER,
} from './types.js';

import {
    querySelectorAllToArray,
    watchElm,
    querySelectorByClass,
    getAllChildren,
    checkIfElmRemovedWithoutSelector,
    getLastChildrenUntilFirstNodeWithClass,
} from './domFunctions.js';

import { parseLogLine } from './logFunctions.js';

const readCard = (card) => {
    return querySelectorByClass(card, 'name-layer').innerText;
};


const updateDeck = (parsedLogLine, tempDeck) => {
    const { user, action, subject } = parsedLogLine;
    if (action === ' starts with ') {
        subject.forEach((item) => {
            const countCardPair = item.split(' ');
            if (countCardPair[0] === 'a') {
                countCardPair[0] = 1;
            } else {
                countCardPair[1] =
                    countCardPair[1][-1] == 's'
                        ? countCardPair[1].slice(0, -1)
                        : countCardPair[1];
            }
            tempDeck[user].deck[countCardPair[1]] = Number(countCardPair[0]);
            tempDeck[user].discard[countCardPair[1]] = Number(countCardPair[0]);
        });
    } else if (action === 'shuffles') {
        tempDeck[user].deck = { ...tempDeck[user].discard };
    } else if (action === ' plays ') {
        subject.forEach((item) => {
            const countCardPair = item.split(' ');
            if (countCardPair[0] === 'a') {
                countCardPair[0] = 1;
            } else {
                countCardPair[1] =
                    countCardPair[1][-1] == 's'
                        ? countCardPair[1].slice(0, -1)
                        : countCardPair[1];
            }

            tempDeck[user].inPlay[countCardPair[1]] = Number(countCardPair[0]);
            tempDeck[user].drawPile[countCardPair[1]] -= Number(
                countCardPair[0]
            );
        });
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
