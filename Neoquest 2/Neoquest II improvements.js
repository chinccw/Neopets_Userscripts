// ==UserScript==
// @name         Neoquest II improvements
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Neoquest II improvements, hotkeys and display required XP
// @author       iamtechknow
// @match        https://www.neopets.com/games/nq2/nq2.phtml*
// @match        http://www.neopets.com/games/nq2/nq2.phtml*
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';

// Constants
const NORTH = 1, SOUTH = 2, WEST = 3, EAST = 4, NW = 5, SW = 6, NE = 7, SE = 8, SPACEBAR = 32;

let $ = window.jQuery;

// Allow player to use keyboard shortcuts
let hasSentNavAction = false;
document.onkeypress = function (e) {
    e = e || window.event;
    const dosub = typeof unsafeWindow !== 'undefined'
        ? (unsafeWindow.dosub)
        : window.dosub;
    const charCode = e.charCode || e.keyCode;
    const character = String.fromCharCode(charCode);
    const commandsTable = $("table[width='160']");
    const hasTalkCommand = commandsTable.find("a[href^='nq2.phtml?act=talk']").length > 0;
    const hasTradeCommand = commandsTable.find("a[href^='nq2.phtml?act=merch']").length > 0;

    // console.log(`Received event charCode ${charCode} for ${character}`);

    // Overworld Hotkeys, use if navigation GIF image exists
    if ($("img[src='//images.neopets.com/nq2/x/nav.gif']").length > 0) {
        if (hasSentNavAction)
            return;

        // Use the dosub() function defined in the HTML to move the character
        switch (character) {
            case '7': // North-West
            case 'q':
                dosub(NW);
                hasSentNavAction = true;
                break;
            case '8': // North
            case 'w':
                dosub(NORTH);
                hasSentNavAction = true;
                break;
            case '9': // North-East
            case 'e':
                dosub(NE);
                hasSentNavAction = true;
                break;
            case '4': // West
            case 'a':
                dosub(WEST);
                hasSentNavAction = true;
                break;
            case '6': // East
            case 'd':
                dosub(EAST);
                hasSentNavAction = true;
                break;
            case '1': // South-West
            case 'z':
                dosub(SW);
                hasSentNavAction = true;
                break;
            case '5': // South
            case '2':
            case 's':
            case 'x':
                dosub(SOUTH);
                hasSentNavAction = true;
                break;
            case '3': // South-East
            case 'c':
                dosub(SE);
                hasSentNavAction = true;
                break;
            case 'n': // Normal
                window.location.href = "nq2.phtml?act=travel&mode=1";
                break;
            case 'h': // Hunt
                window.location.href = "nq2.phtml?act=travel&mode=2";
                break;
            case 'k': // Skills
                window.location.href = "nq2.phtml?act=skills&show_char=1";
                break;
            case 'i': // Items
                window.location.href = "nq2.phtml?act=inv";
                break;
            case 't': // Click 'Talk' to begin NPC conversations
                if (hasTalkCommand)
                    window.location.href = $("a[href^='nq2.phtml?act=talk']").attr("href");
                break;
            case 'm': // Click Trade
                if (hasTradeCommand)
                    window.location.href = $("a[href^='nq2.phtml?act=merch']").attr("href");
                break;
        }
    } else if ($("img[src^='//images.neopets.com/nq2/m/']").length > 0 ||
                $("img[src^='//images.neopets.com/nq2/c/']").length > 0) { //Enemy fight / end
        let next_turn = $("img[src='//images.neopets.com/nq2/x/com_next.gif']");
        let end_fight = $("img[src='//images.neopets.com/nq2/x/com_end.gif']");

        if (charCode === SPACEBAR) {
            e.preventDefault();
            let begin_fight = $("img[src='//images.neopets.com/nq2/x/com_begin.gif']"),
                return_to_map = $("img[src='//images.neopets.com/nq2/x/tomap.gif']"),
                next_turn = $("img[src='//images.neopets.com/nq2/x/com_next.gif']");

            if(begin_fight.length > 0)
                window.location.href = "nq2.phtml?start=1"; // Begin fight button
            else if (end_fight.length > 0)
                end_fight.parent().click(); // End fight button
            else if (return_to_map.length > 0)
                window.location.href = "nq2.phtml?finish=1"; // Return to map button
            else if (next_turn.length > 0)
                next_turn.parent().click(); // Next turn button
        }

        let attack = $("img[src='//images.neopets.com/nq2/x/com_atk.gif']"),
            flee = $("img[src='//images.neopets.com/nq2/x/com_flee.gif']"),
            items = $("a[onclick^='setaction(5); setitem(']"),
            skills = $("a[onclick^='setaction(9']"),
            crosshairs = $("img[src='//images.neopets.com/nq2/x/ch_red.gif']");

        // Determine crosshair position
        let crosshair_pos = -1;
        for (let i = 0; i < crosshairs.length; i++)
            if (crosshairs.eq(i).attr("style").indexOf("visible") !== -1) // check for substring in CSS of image
                crosshair_pos = i;

        // Battle actions, still checking variables because one can press keys anytime
        switch(character) {
            case 'a': // Attack or next turn
                if (attack.length > 0)
                    attack.parent().click();
                else if (next_turn.length > 0)
                    next_turn.parent().click();
                else if (end_fight.length > 0)
                    end_fight.parent().click(); // End fight button
                break;
            case 'f': // Flee
                if (flee.length > 0)
                    flee.parent().click();
                break;
            case '1': // Use Item 1
                if (items.length > 0)
                    items.eq(0).click();
                break;
            case '2': // Use Item 2
                if (items.length > 1)
                    items.eq(1).click();
                break;
            case '3': // Use Item 3
                if (items.length > 2)
                    items.eq(2).click();
                break;
            case '4': // Use Item 3
                if (items.length > 3)
                    items.eq(3).click();
                break;
            case '5': // Cast Spell 1
                if (skills.length > 0)
                    skills.eq(0).click();
                break;
            case '6': // Cast Spell 2
                if (skills.length > 1)
                    skills.eq(1).click();
                break;
            case '7': // Cast Spell 3
                if (skills.length > 2)
                    skills.eq(2).click();
                break;
            case '8': // Cast Spell 4
                if (skills.length > 3)
                    skills.eq(3).click();
        }

        // Arrow keys to control crosshairs
        switch(charCode) {
            case 37:
                if(crosshair_pos > 0)  // move red crosshair left
                    crosshairs.eq(--crosshair_pos).parent().click();
                break;
            case 39:
                if(crosshair_pos < 3)  // move red crosshair right
                    crosshairs.eq(++crosshair_pos).parent().click();
        }
    } else if(charCode === SPACEBAR) { // Anywhere else with return to map button and spacebar pressed
        let return_to_map = $("img[src='//images.neopets.com/nq2/x/tomap.gif']");
        if(return_to_map.length > 0) {
            e.preventDefault();
            window.location.href = "nq2.phtml"; // Return to map button
        }
    }
};

// Show experience needed to level up
function printXp() {
    const xpTable = ['0', '1,000', '2,100', '3,300', '4,600', '6,000', '7,500',
        '9,100', '10,800', '12,600', '14,500', '16,500', '18,600', '20,800',
        '23,100', '25,500', '28,000', '30,600', '33,300', '36,100', '39,000',
        '42,000', '45,100', '48,300', '51,600', '55,000', '58,500', '62,100',
        '65,800', '69,600', '73,500', '77,500', '81,600', '85,800', '90,100',
        '94,500', '99,000', '103,600', '108,300', '113,100', '118,000',
        '123,000', '128,100', '133,300', '138,600', '144,000', '149,500',
        '155,100', '160,800', '166,600', '172,500', '178,500', '184,600',
        '190,800', '197,100', '204,400', '210,000', '216,600', '223,300',
        '230,100'];
    const inInventory = window.location.search === '?act=inv';

    const players = $('a[href^="nq2.phtml?act=skills&show_char="]');
    for (let i = 0; i < players.length; i++) {
        const player_skill_link = players[i];
        if (inInventory) {
            const parent_tr = $(player_skill_link).parent().parent();
            const level_cell = $(parent_tr.next()).find("td:contains('Level')");
            // Text should contain "Level: #" where # is level number so script can parse the string
            const level = level_cell.text().split(" ")[1];
            $(level_cell.siblings()[3]).append('/' + xpTable[level]);
        } else {
            const level = $(player_skill_link).parent().prev()[0].innerHTML;
            $($(player_skill_link).parent().siblings()[5]).append('/' + xpTable[level]);
        }
    }
};

// If no target selected, auto select first
function autoTarget() {
    let crosshair_pos = -1, crosshairs = $("img[src='//images.neopets.com/nq2/x/ch_red.gif']");
    for (let i = 0; i < crosshairs.length; i++)
        if (crosshairs.eq(i).attr("style").indexOf("visible") !== -1) //check for substring in CSS of image
            crosshair_pos = i;
    if (crosshairs.length > 1 && crosshair_pos === -1) {
        crosshair_pos = 0;
        crosshairs.eq(crosshair_pos).parent().click();
    }
}

printXp();
autoTarget();
