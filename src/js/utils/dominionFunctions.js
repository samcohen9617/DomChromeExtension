import {
  CARDS_IN_SUPPLY,
  KINGDOM_VIEWER,
  KINGDOM_VIEWER_HEADER_CONTAINER,
  KINGDOM_VIEWER_CARD_CONTAINER
} from "./types.js";

import {querySelectorAllToArray} from './domFunctions.js'

const readCard = (card) => {
    
}

const getCardsInSupply = (kingdomViewer) => {
    const cardsInSupplySection = [...kingdomViewer.children].find((section) => {
      return (
        section.querySelector(`.${KINGDOM_VIEWER_HEADER_CONTAINER}`).children[0]
          .innerText === CARDS_IN_SUPPLY
      );
    });
  
    if (!cardsInSupplySection) return [];
  
    const cardInSupplyElements = querySelectorAllToArray(cardsInSupplySection, 'anonymous-card')
    const cardsInSupply = cardInSupplyElements.map(readCard)
    console.log("====>", cardInSupplyElements);
    // const cardsInSupply = kingdom.filter(section =>)
  };

export const getKingdom = () => {
  return new Promise((resolve) => {
    const kingdomViewer = document.getElementsByClassName(KINGDOM_VIEWER)[0];
    getCardsInSupply(kingdomViewer);
    // const kingdom = kingdomViewer.getElementsByClassName("card");
    resolve(kingdomViewer);
  });
};




