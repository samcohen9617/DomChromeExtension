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
} from './domFunctions.js';

import { parseLogLine } from './logFunctions.js';

const readCard = (card) => {
    return querySelectorByClass(card, 'name-layer').innerText;
};

const getCardsInSupply = (kingdomViewer) => {
    const cardsInSupplySection = [...kingdomViewer.children].find((section) => {
        return (
            section.querySelector(`.${KINGDOM_VIEWER_HEADER_CONTAINER}`)
                .children[0].innerText === CARDS_IN_SUPPLY
        );
    });

    if (!cardsInSupplySection) return [];

    const cardInSupplyElements = querySelectorAllToArray(
        cardsInSupplySection,
        'anonymous-card'
    );
    const cardsInSupply = cardInSupplyElements.map((card) => readCard(card));
};

const updateDeck = (parsedLogLine, players) => {
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
            players[user].deck[countCardPair[1]] = Number(countCardPair[0]);
            players[user].discard[countCardPair[1]] = Number(countCardPair[0]);
        });
    } else if (action === 'shuffles') {
        players[user].deck = { ...players[user].discard };
    } else if (action === ' plays ') {
        subject.forEach((item) => {
            const countCardPair = item.split(' ');
            console.log('====> countCardPair', countCardPair);
            if (countCardPair[0] === 'a') {
                countCardPair[0] = 1;
            } else {
                countCardPair[1] =
                    countCardPair[1][-1] == 's'
                        ? countCardPair[1].slice(0, -1)
                        : countCardPair[1];
            }

            console.log('====> countCardPair', countCardPair);
            players[user].inPlay[countCardPair[1]] = Number(countCardPair[0]);
            players[user].drawPile[countCardPair[1]] -= Number(
                countCardPair[0]
            );
        });
    }
    console.log('====> players deck', players[user]);
};

export const setupDominionWorld = () => {
    getPlayers().then((players) => {
        console.log('====> players', players);
        const actionSet = new Set();

        getAllChildren('.log-scroll-container').map((logLine) => {
            const parsedLogLine = parseLogLine(logLine);
            if (parsedLogLine) {
                actionSet.add(parsedLogLine.action);
                updateDeck(parsedLogLine, players);
                return parsedLogLine;
            }
            return null;
        });

        watchElm('.log-scroll-container', (w) => {
            const parsedLogLine = parseLogLine(w.addedNodes[0]);
            if (parsedLogLine) {
                updateDeck(parsedLogLine, players);
                actionSet.add(parsedLogLine.action);
            }
        });
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
