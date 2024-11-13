// ==UserScript==
// @name         NeoQuest AutoBattle + AutoMove
// @namespace    http://tampermonkey.net/
// @author       chinccw
// @website      https://github.com/chinccw/Neopets_Userscripts
// @version      1.0
// @description  Automatically clicks the specified area tag on page load
// @match        https://www.neopets.com/games/neoquest/neoquest.phtml*
// @grant        none
// ==/UserScript==

let currentHealthToUseHeal = 40; //set the health threshold to use potion

// add the AutoAttack Button
if ( !localStorage.getItem("NQ1AutoAttackStatus") )
    {
        localStorage.setItem("NQ1AutoAttackStatus",'Enabled');
    }

        // Create a new button element
    let AutoAttackButton = document.createElement("button");
    if (localStorage.getItem("NQ1AutoAttackStatus")=='Enabled')
    {
        AutoAttackButton.textContent = "Disable AutoAttack"; // Set the text on the button
        AutoAttackButton.addEventListener("click", function()
        {
            localStorage.setItem("NQ1AutoAttackStatus",'Disabled');
            location.reload();
        });
    }
    else
    {
        AutoAttackButton.textContent = "Enable AutoAttack";
        AutoAttackButton.addEventListener("click", function()
       {
            localStorage.setItem("NQ1AutoAttackStatus",'Enabled');
            location.reload();
        });
    }

// Style the button (optional)
AutoAttackButton.style.position = "fixed";
AutoAttackButton.style.top = "40px";
AutoAttackButton.style.right = "15px";
AutoAttackButton.style.zIndex = "1000"; // Ensure it appears on top

// Append the button to the body of the page
document.body.appendChild(AutoAttackButton);


// add the AutoMove Button
if ( !localStorage.getItem("NQ1AutoMoveStatus") )
    {
        localStorage.setItem("NQ1AutoMoveStatus",'Enabled');
    }

    // Create a new button element
    let AutoMoveButton = document.createElement("button");
    if (localStorage.getItem("NQ1AutoMoveStatus")=='Enabled')
    {
        AutoMoveButton.textContent = "Disable AutoMove"; // Set the text on the button
        AutoMoveButton.addEventListener("click", function()
        {
            localStorage.setItem("NQ1AutoMoveStatus",'Disabled');
            location.reload();
        });
    }
    else
    {
        AutoMoveButton.textContent = "Enable AutoMove";
        AutoMoveButton.addEventListener("click", function()
       {
            localStorage.setItem("NQ1AutoMoveStatus",'Enabled');
            location.reload();
        });
    }

// Style the button (optional)
AutoMoveButton.style.position = "fixed";
AutoMoveButton.style.top = "10px";
AutoMoveButton.style.right = "10px";
AutoMoveButton.style.zIndex = "1000"; // Ensure it appears on top

// Append the button to the body of the page
document.body.appendChild(AutoMoveButton);


// Function to generate a random number between min (inclusive) and max (inclusive)
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to find the <a> tag using XPath
function findHealingPotionLinkXPath()
{
   // const containSOG = "//a[contains(text(), 'Spirit of Growth')]";
    const containSOG = "//a[contains(., 'Spirit of Growth')]";
    const containSuperiorHP = "//a[contains(text(), 'Superior Healing Potion')]";
    const containGHP = "//a[contains(text(), 'Greater Healing Potion')]";
    const containSHP = "//a[contains(text(), 'Strong Healing Potion')]";
    const containStandardHP = "//a[contains(text(), 'Standard Healing Potion')]";
    const containWeakHP = "//a[contains(text(), 'Weak Healing Potion')]";


    let link;

    // spirit of Gowth --> Greater Healing Potion --> Strong Healing Potion
    let resultSOG = document.evaluate(containSOG, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    let resultSuperiorHP = document.evaluate(containSuperiorHP, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    let resultGHP = document.evaluate(containGHP, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    let resultSHP = document.evaluate(containSHP, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    let resultStandardHP = document.evaluate(containStandardHP, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    let resultWeakHP = document.evaluate(containWeakHP, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);

    if (resultSOG.singleNodeValue)
    {
        link = resultSOG.singleNodeValue;
        console.log("Found Spirit of Growth link:", link);
    }
    else if (resultSuperiorHP.singleNodeValue)
    {
        link = resultSuperiorHP.singleNodeValue;
    }
    else if (resultGHP.singleNodeValue)
    {
        link = resultGHP.singleNodeValue; 
    }
    else if (resultSHP.singleNodeValue)
    {
        link = resultSHP.singleNodeValue;
    }
     else if (resultStandardHP.singleNodeValue)
    {
        link = resultStandardHP.singleNodeValue;
    }
        else if (resultWeakHP.singleNodeValue)
    {
        link = resultWeakHP.singleNodeValue;
    }


    console.log(link);
    if (link) {
        console.log("Found the link using XPath:", link);
        return link;
    } else {
        console.log("No matching link found using XPath.");
        return null; // Return null if not found
    }
} // end of findHealingPotionLinkXPath()



// this nameless function will get called automatically
(function()
 {
    'use strict';

    // Delay to allow page to fully load, if needed
    setTimeout(function()
    {

        // Check if the Attack button exist using its onclick attribute & click it if it exist & stop the script
        const attackButton = document.querySelector('a[onclick="setdata(\'attack\', 0); return false;"]');


        // Function to get current health based on the specified image source
        function getCurrentHealth()
        {
            let innerTDtagwithArmour;
            const allTDtag = document.querySelectorAll('td');
            // Loop through the <td> elements in reverse order
            for (let i = allTDtag.length - 1; i >= 0; i--)
            {
                const td = allTDtag[i];
                // Check if the <td>'s text includes 'Armour'
                if (td.textContent.trim().includes("Armour"))
                {
                    innerTDtagwithArmour = td
                    console.log("Found closest inner <td> tag containing 'Armour':", td);
                    break;
                }
            }
            if(!innerTDtagwithArmour){return;}

            const firstBtag = innerTDtagwithArmour.querySelector('b');
            console.log("firstBtag is " + firstBtag.textContent);
            const currentHealth = parseInt(firstBtag.textContent, 10);

            if (currentHealth)
            {
                console.log("Current Health:", currentHealth);
                return currentHealth; // You can use this value as needed
            }
            else
            {
                console.log("Can't Find TD tag with specific attributes");
                return;
            }

        }

// Call the function to get the current health
let currentHealth = getCurrentHealth();

        if (currentHealth && currentHealth <= currentHealthToUseHeal)
        {
            // Call the function to find the link
            const link = findHealingPotionLinkXPath();
            if (link)
            {
                link.click();
            }
            else
            {
                console.log("No Available Healing Potion can be found");
             return;
            }
        }
//return;
        if (attackButton && localStorage.getItem("NQ1AutoAttackStatus") == 'Enabled')
           {
               attackButton.click();
               return;
           }


    // Get the last direction from localStorage, default to "left" if none exists
    let lastDirection = localStorage.getItem("walkDirection") || "left";

    // Determine next direction based on last direction
    // if last direction is left, set nextDirection to right, else set it to left.
    let nextDirection = lastDirection === "left" ? "right" : "left";

    // Save the new direction to localStorage
    localStorage.setItem("walkDirection", nextDirection);

  if( localStorage.getItem("NQ1AutoMoveStatus") == 'Enabled' )
  {
        if ( nextDirection == "left" )
        {
            // Select area element by the unique href attribute
            let areaButton = document.querySelector('area[href="neoquest.phtml?action=move&movedir=4"]');
            // Click the area if it exists
            if (areaButton)
            {
                areaButton.click();
            }
            else
            {
                console.log("Area not found.");
            }
        }

        else if ( nextDirection == "right" )
        {
            // Select area element by the unique href attribute
            let areaButton = document.querySelector('area[href="neoquest.phtml?action=move&movedir=5"]');
            // Click the area if it exists
            if (areaButton)
            {
                areaButton.click();
            }
            else
            {
                console.log("Area not found.");
            }
        }
  } //end of ( localStorage.getItem("AutoMoveStatus") == 'Enabled' )
    }, getRandomNumber(300, 500));// Adjust delay if needed



})();
