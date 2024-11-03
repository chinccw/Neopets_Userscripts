// ==UserScript==
// @name         Neopets-Game Confirm Before Leaving Page 1.0
// @namespace    https://github.com/chinccw/Neopets-Game-Leave-Page-Confirm
// @version      1.0
// @author       chinccw
// @description  Prompts a confirmation dialog when trying to close or navigate away from the page
// @match        https://www.neopets.com/games/game.phtml*
// @match        https://www.neopets.com/games/play_flash.phtml*
// @grant        none
// ==/UserScript==

//if you launch game in 'large' size (which will open the game in new window), check if the link start with https://www.neopets.com/games/play_flash.phtml
//(what is after phtml doesn't matter). if the game-link is something else, you just need to add another line under line 8.
//the line would be // @match   https://putyourlinkhere*

(function() {
    'use strict';

    // Add an event listener for the 'beforeunload' event
    window.addEventListener('beforeunload', function(event) {
        // Set a confirmation message
        const message = "Are you sure you want to leave this page?";

        // Standard way to set the return value for a confirmation dialog
        event.returnValue = message; // For most modern browsers
        return message; // For legacy browsers
    });
})();
