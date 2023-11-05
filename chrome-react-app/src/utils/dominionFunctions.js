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

export const setupDominionWorld = () => {
    getPlayers().then((players) => {
        console.log('====> players', players);
        getAllChildren('.log-scroll-container').forEach((logLine) => {
            parseLogLine(logLine);
        });
        watchElm('.log-scroll-container', (w) => {
            parseLogLine(w.addedNodes[0]);
        });
    });
};

const getPlayers = () => {
    return new Promise((resolve) => {
        const players = querySelectorAllToArray(
            document,
            'player-info-name'
        ).map((player) => {
            return {
                playerName: player.innerText,
            };
        });
        resolve(players);
    });
};
