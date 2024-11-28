// ==UserScript==
// @name         Chinccw Lunar Temple
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Extracts a number between "angleKreludor=" and "&viewID"
// @author       You
// @match        https://www.neopets.com/shenkuu/lunar/?show=puzzle*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // Get the entire page's HTML as a string
    const pageContent = document.body.innerHTML;

    // Regex to find the desired number
    const match = pageContent.match(/angleKreludor=(\d+)&viewID/);

    if (match) {
        const number = parseInt(match[1], 10);
        let answer;

        // Determine the answer based on the ranges
        if (number >= 0 && number <= 11) answer = 1;
        else if (number >= 12 && number <= 33) answer = 2;
        else if (number >= 34 && number <= 56) answer = 3;
        else if (number >= 57 && number <= 78) answer = 4;
        else if (number >= 79 && number <= 101) answer = 5;
        else if (number >= 102 && number <= 123) answer = 6;
        else if (number >= 124 && number <= 146) answer = 7;
        else if (number >= 147 && number <= 168) answer = 8;
        else if (number >= 169 && number <= 191) answer = 9;
        else if (number >= 192 && number <= 213) answer = 10;
        else if (number >= 214 && number <= 236) answer = 11;
        else if (number >= 237 && number <= 258) answer = 12;
        else if (number >= 259 && number <= 281) answer = 13;
        else if (number >= 282 && number <= 303) answer = 14;
        else if (number >= 304 && number <= 326) answer = 15;
        else if (number >= 327 && number <= 348) answer = 16;
        else if (number >= 349 && number <= 360) answer = 1;

        // Output the results
        console.log("Extracted number:", number);
        console.log("Mapped answer:", answer);
        alert("AngleKreludor " + number + "\nAnswer: " + answer + "https://thedailyneopets.com/articles/solving-lunar-temple-puzzle");
    } else {
        console.log("Number not found.");
    }
})();
