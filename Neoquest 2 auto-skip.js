// ==UserScript==
// @name         Neoquest 2 auto-skip
// @namespace    http://tampermonkey.net/
// @version      2024-11-06
// @description  try to take over the world!
// @author       chinccw
// @match        https://www.neopets.com/games/nq2/nq2.phtml*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=neopets.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

  function AutoSkip()
  {
    let BeginFightButton = document.querySelector('img[alt="Begin the Fight!"]');
    if (BeginFightButton)
    {
     BeginFightButton.click();
    }

    let NextTurnButton = document.querySelector('img[src="//images.neopets.com/nq2/x/com_next.gif"]');
     if (NextTurnButton)
    {
     NextTurnButton.click();
    }

    let EndFightButton = document.querySelector('img[src="//images.neopets.com/nq2/x/com_end.gif"]');
    if (EndFightButton)
    {
        EndFightButton.click();
    }

    let ReturnToMapButton = document.querySelector('img[src="//images.neopets.com/nq2/x/tomap.gif"]');
    let FindStringWonFight = document.querySelector('img[src="//images.neopets.com/nq2/x/tomap.gif"]');


        if (document.body.textContent.includes("You won the fight!"))
        {
            if (ReturnToMapButton)
            {
                ReturnToMapButton.click();
                //setTimeout(function(){  }, 2000);
            }
        }

  } // end of function AutoSkip()

    setTimeout( AutoSkip(),500);


})();