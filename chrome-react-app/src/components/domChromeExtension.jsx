import React, { useEffect } from "react";
import { waitForElm } from "../utils/domFunctions.js";
import { getAllCards } from "../utils/apiUtils.js";
import { getKingdom } from "../utils/dominionFunctions.js";

const DomChromeExtension = () => {
  const run = () => {
    getKingdom().then((kingdom) => {
      console.log("====>", kingdom);
    });
  };

  const init = () => {
    getAllCards().then((cards) => {
      console.log("====>", cards);
    });
    waitForElm(".game-area").then(() => {
      run();
    });
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div>
      <h1>Dom Chrome Extension</h1>
    </div>
  );
};
export default DomChromeExtension;
