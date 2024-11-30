// ==UserScript==
// @name         chinccw Grey out Booktastic Books that already read
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Greys out a specific background image on the Neopets shop page
// @author       chinccw
// @match        https://www.neopets.com/objects.phtml?type=shop&obj_type=70
// @match        https://www.neopets.com/moon/books_read.phtml?pet_name=CCWMONKEY
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    //console.log(`Current URL: ${window.location.href}`);
    if (window.location.href == 'https://www.neopets.com/moon/books_read.phtml?pet_name=CCWMONKEY') //CHANGE IT TO YOUR PET NAME
    {

 // Array to store the matched image URLs
    const imageUrls = [];

    // Select all <img> elements on the page
    const images = document.querySelectorAll('img');

    // Loop through each <img> element
    images.forEach(img => {
        const src = img.getAttribute('src'); // Get the `src` attribute

        // Check if the `src` matches the desired pattern and ends with .gif
        if (src && src.startsWith('//images.neopets.com/items/') && src.endsWith('.gif')) {
            imageUrls.push(src); // Add the URL to the array
        }
    });

    // Store the array in localStorage as a JSON string
    localStorage.setItem('neopetsImageUrls', JSON.stringify(imageUrls));

    // Debugging: Log the stored URLs
    console.log('Stored image URLs:', imageUrls);

    } // ---------END---------

        if (window.location.href == 'https://www.neopets.com/objects.phtml?type=shop&obj_type=70')
    {
  // Retrieve stored .gif URLs from localStorage
    const storedUrls = JSON.parse(localStorage.getItem('neopetsImageUrls') || '[]');

    if (storedUrls.length === 0) {
        console.log('No stored .gif URLs found in localStorage.');
        return;
    }

    console.log('Checking for matches with stored .gif URLs:', storedUrls);

    // Select all `div` elements with the class `item-img`
    const items = document.querySelectorAll('div.item-img');

    // Loop through all matching `div` elements
    items.forEach(item => {
        const backgroundImage = item.style.backgroundImage; // Get the `background-image` style

        // Extract the actual URL from the style (e.g., url("//images.neopets.com/items/boo_orangegrundo8.gif"))
        const match = backgroundImage.match(/url\("?(\/\/images\.neopets\.com\/items\/.+?\.gif)"?\)/);

        if (match && storedUrls.includes(match[1])) {
            console.log(`Match found! Greying out background image: ${match[1]}`);
            // Apply grayscale filter to the matching `div`
            //item.style.filter = 'grayscale(100%)';
            item.style.opacity = '0.4'
        }
    });


    }







})();
