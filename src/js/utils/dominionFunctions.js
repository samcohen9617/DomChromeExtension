export const getKingdom = () => {
  return new Promise((resolve) => {
    const kingdomViewer = document.getElementsByClassName("kingdom-viewer")[0];
    getCardsInSupply(kingdomViewer);
    // const kingdom = kingdomViewer.getElementsByClassName("card");
    resolve(kingdomViewer);
  });
};

const getCardsInSupply = (kingdomViewer) => {
  const cardsInSupplySection = [...kingdomViewer.children].filter((section) => {
    return (
      section.querySelector(".kingdom-viewer-header-container").children[0]
        .innerText === "Cards in Supply"
    );
  });
  console.log("====>", cardsInSupplySection);
  // const cardsInSupply = kingdom.filter(section =>)
};
