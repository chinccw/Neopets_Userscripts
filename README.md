# Neopets_Userscripts

--How To Install--

1.install Tampermonkey extension for your browser. <br>
2.click on the script you want to install --> click "raw" --> click "install"<br>
3.done

<a href="https://github.com/chinccw/Neopets_Userscripts/blob/main/Faerie%20Crossword%20AutoSolver.js"> Faerie Crossword AutoSolver/AutoPlayer </a><br>
Automatically solve the crossword for you. it doesn't solve it immediately but you can switch tab and do something else it will still run.<br>
if doesn't work probably the proxy server issue, or there is some heavy changes to the crossword/jellyneo website making code not work as intended. <br>
on crossword page, stop the script from refreshing the page and try press f12 to open developer tools and go console tab to see what went wrong :)<br><br>

<a href="https://github.com/chinccw/Neopets_Userscripts/blob/main/Neopets-Game-Leave-Page-Confirm.js"> Prevent Leaving/Navigate Page Accidentally </a><br>
ermm.. this will open up a small window asking something like " are you sure you want to leave this page?". something like that.

--some clarification--<br>
if you just open a neopets game/page and try to close tab immediately, it probably won't prompt you the confirmation message. <br>
this is because the 'beforeunload' Event need user interaction (like clicking a link or pressing the back button) to work as intended.<br>
just try to click on some link that navigate you to another page, or just start play the game. after that it should prompt a message before you close tab.<br>
