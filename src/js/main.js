import { waitForElm } from "./utils/domFunctions.js";
import { getKingdom } from "./utils/dominionFunctions.js";
import { getAllCards } from "./utils/apiUtils.js";

const run = () => {
  getKingdom().then((kingdom) => {
    console.log("====>", kingdom);
  });
};

export const init = () => {
  getAllCards().then((cards) => {
    console.log("====>", cards);
  });
  waitForElm(".game-area").then(() => {
    run();
  });
};
