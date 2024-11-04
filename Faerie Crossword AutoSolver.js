// ==UserScript==
// @name         Neopets Faerie Crossword AutoSolver
// @namespace    http://tampermonkey.net/
// @author       chinccw
// @version      1.0
// @description  Auto-play Faerie Crossword For you
// @match        https://www.neopets.com/games/crossword/crossword.phtml*
// @grant        none
// ==/UserScript==

// if doesn't work probably the proxy server issue, or there is some heavy changes to the crossword/jellyneo website making code not work as intended.
// on crossword page, stop the script from refreshing the page and try press f12 to open developer tools and go console tab to see what went wrong :)

(async function() {
    'use strict';

     // Create a button element
    const refreshButton = document.createElement('button');
    refreshButton.innerText = 'Set To 1 And Refresh Page';
    refreshButton.style.position = 'fixed'; // Fixed position on the screen
    refreshButton.style.top = '10px'; // Distance from the top
    refreshButton.style.right = '10px'; // Distance from the right
    refreshButton.style.zIndex = 1000; // Ensure it's on top of other elements

    // Add click event to refresh the page
    refreshButton.addEventListener('click', function() {
        localStorage.setItem('WhichCrosswordQuestionToSolve', 1);
        location.reload(); // Refresh the page
    });

    // Append the button to the body of the document
    document.body.appendChild(refreshButton);


    if ( parseInt( localStorage.getItem('WhichCrosswordQuestionToSolve') ,10) >=16 )
    {
     return;
    }

    function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
    function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

  await delay( getRandomNumber(1500,1800) ); // Delay for 2000 milliseconds (2 seconds)
    if ( !localStorage.getItem('WhichCrosswordQuestionToSolve') ) {
        localStorage.setItem('WhichCrosswordQuestionToSolve', 1);
    }

    
    let JellyNeoDivTagWithAnswer = [];
    console.log("WhichCrosswordQuestionToSolve : " + parseInt( localStorage.getItem('WhichCrosswordQuestionToSolve') ,10) );

    // Function to find the last <td> containing "ACROSS:"
    function findClosestTdTagWithTheString(anystring) {
        const tdElements = document.querySelectorAll('td');
        let lastTd = null;

        for (let td of tdElements) {
            if (td.textContent.includes(anystring)) {
                lastTd = td; // Update lastTd to the current matching <td>
            }
        }

        if (lastTd) {
            console.log("Last <td> containing " + anystring + " found:", lastTd);
            //lastTd.style.backgroundColor = "yellow"; // Highlighting the found <td>
            return lastTd;
        } else {
            console.log("No <td> containing 'ACROSS:' found.");
        }
    }

    // Function to search for <div> tags on the external website
    async function searchAndReturnDivsOnExternalSite(externalUrl) {
        const proxyUrl = 'https://corsproxy.io/?';
        const divContents = [];
        try {
            // Fetch the HTML content from the external site
            const response = await fetch(proxyUrl + externalUrl);
            const text = await response.text();

            // Create a temporary DOM to parse the HTML
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, 'text/html');

            // Select all <div> elements with the specified class
            const divs = doc.querySelectorAll('div.large-6.small-12.columns');

            if (divs.length > 0) {
                divs.forEach((div, index) => {
                    divContents.push(div.outerHTML); // Use outerHTML to save the full <div> element
                    console.log(`Found <div> ${index + 1}:`, div.outerHTML);
                });
            } else {
                console.log('No <div> tags with class "large-6 small-12 columns" found on the external site.');
            }
        } catch (error) {
            console.error('Error fetching the external URL:', error);
        }
        return divContents;
    }

    function FillInTheInputBox(answer) {
        const InputBox = document.querySelector('input[name="x_word"]');
        InputBox.value = answer;
    }

//------------------------------------------------------------------------
    let AnswerForAcross;
    let AnswerForDown;
    let TDtagWithAcross = findClosestTdTagWithTheString("ACROSS:");
    let TDtagWithDown = findClosestTdTagWithTheString("DOWN:");


    const allAtaginsideTDtagWithAcross = TDtagWithAcross.querySelectorAll('a');
    const allAtaginsideTDtagWithDown = TDtagWithDown.querySelectorAll('a');
    console.log(" allAtaginsideTDtagWithAcross.length = " +allAtaginsideTDtagWithAcross.length );
    if ( parseInt(localStorage.getItem('WhichCrosswordQuestionToSolve') ,10 ) <= allAtaginsideTDtagWithAcross.length )
        {
            const firstAtaginsideTDtagWithAcross = allAtaginsideTDtagWithAcross[parseInt( localStorage.getItem('WhichCrosswordQuestionToSolve') ,10) - 1];
            firstAtaginsideTDtagWithAcross.click();
        }
    else
    {
        const firstAtaginsideTDtagWithDown = allAtaginsideTDtagWithDown[parseInt( localStorage.getItem('WhichCrosswordQuestionToSolve') ,10) - 1 - allAtaginsideTDtagWithAcross.length];
        firstAtaginsideTDtagWithDown.click();
    }


    const externalSiteUrl = 'https://www.jellyneo.net/?go=faerie_crossword'; // Replace with the URL of the external site
    JellyNeoDivTagWithAnswer = await searchAndReturnDivsOnExternalSite(externalSiteUrl);

    // Parse the inner HTML strings into DOM elements
    const parsedDivs = JellyNeoDivTagWithAnswer.map(innerHTML => {
        const parser = new DOMParser();
        return parser.parseFromString(innerHTML, 'text/html').body.firstChild; // Create a DOM element from the innerHTML
    });

    console.log("Parsed Divs:", parsedDivs); // Debugging: Log parsed divs
    console.log("parsedDivs[0].children.length = " +parsedDivs[0].children.length);
    // Check if there are enough parsedDivs
    if (parsedDivs.length > 0)
    {
        let AllLiTagInFirstDiv = parsedDivs[0].querySelectorAll('li');
        console.log("AllLiTagInFirstDiv.length = " +AllLiTagInFirstDiv.length);
        if (parseInt( localStorage.getItem('WhichCrosswordQuestionToSolve') ,10) <= AllLiTagInFirstDiv.length )
        {
            AnswerForAcross = AllLiTagInFirstDiv[parseInt( localStorage.getItem('WhichCrosswordQuestionToSolve') ,10) - 1].textContent;
        }
        else if (parsedDivs.length > 1) { // Check if there is a second div to access
            let AllLiTagInSecondDiv = parsedDivs[1].querySelectorAll('li');
            AnswerForDown = AllLiTagInSecondDiv[ parseInt( localStorage.getItem('WhichCrosswordQuestionToSolve') ,10) - 1 - AllLiTagInFirstDiv.length].textContent;
        } else {
            console.error("Not enough parsed divs to find the answers.");
        }
    } else {
        console.error("No parsed divs available.");
    }

    if (AnswerForAcross)
    {
        FillInTheInputBox(AnswerForAcross);
        let firstGoButton = document.querySelector('input[type="submit"][value="Go"]');
        localStorage.setItem('WhichCrosswordQuestionToSolve', parseInt( localStorage.getItem('WhichCrosswordQuestionToSolve') ,10) + 1);
        firstGoButton.click();

    }
    else
    {
        FillInTheInputBox(AnswerForDown);
        let firstGoButton = document.querySelector('input[type="submit"][value="Go"]');
        localStorage.setItem('WhichCrosswordQuestionToSolve', parseInt( localStorage.getItem('WhichCrosswordQuestionToSolve') ,10) + 1);
        firstGoButton.click();
    }





})();
