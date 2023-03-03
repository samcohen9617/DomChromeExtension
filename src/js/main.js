import { waitForElm } from "./utils/domFunctions.js";
import { getKingdom } from "./utils/dominionFunctions.js";

const run = () => {
  getKingdom().then((kingdom) => {
    console.log("====>", kingdom);
  });
};

export const init = () => {
  waitForElm(".game-area").then(() => {
    run();
  });
};
