import React, { useEffect, useState } from 'react';
import { waitForElm, checkIfElmRemoved } from '../utils/domFunctions.js';
import { setupDominionWorld } from '../utils/dominionFunctions.js';

const DomChromeExtension = () => {
    const [waitingForGame, setWaitingForGame] = useState(true);
    const init = () => {
        waitForElm('.game-page').then(() => {
            setWaitingForGame(false);
            checkIfElmRemoved(
                '[ng-if="!pageDisplay.shouldKillGame"]',
                'game-page'
            ).then(() => {
                setWaitingForGame(true);
            });
            setupDominionWorld();
        });
    };

    useEffect(() => {
        if (waitingForGame) {
            init();
        }
    }, [waitingForGame]);

    return (
        <div>
            <h1>Dom Chrome Extension</h1>
        </div>
    );
};
export default DomChromeExtension;
