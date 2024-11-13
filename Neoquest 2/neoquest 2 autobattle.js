// ==UserScript==
// @name         neoquest 2 autobattle
// @namespace    http://tampermonkey.net/
// @version      2024-11-13
// @description  https://github.com/chinccw/Neopets_Userscripts
// @author       chinccw
// @match        https://www.neopets.com/games/nq2/nq2.phtml*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=neopets.com
// @grant        none
// ==/UserScript==

// what this script does
// Auto-Use Potion when below a set Current Health
// Auto-Move + Auto Battle (Can be Disabled separately)
// For Battle, it automatically uses GroupHeal(velm), Obliterate(Mipsy Single-Target Spell),Quickshot(Talinia Second Spell) and Normal Attack.
// velm group-heal is extremely unstable, sometimes it heals sometimes it doesn't, i am not sure why either. for now i have comment out the part to check health before heal.


  (function() {
    'use strict';
    let AllFontTag;
    let AttackButton = document.querySelector('img[src="//images.neopets.com/nq2/x/com_atk.gif"]');
    let HealthToHeal = 6 ;
    let MinHPforVelmToHeal = 170;

    if ( !localStorage.getItem("AutoAttackStatus") )
    {
        localStorage.setItem("AutoAttackStatus",'Enabled');
    }

        // Create a new button element
    let AutoAttackButton = document.createElement("button");
    if (localStorage.getItem("AutoAttackStatus")=='Enabled')
    {
        AutoAttackButton.textContent = "Disable AutoAttack"; // Set the text on the button
        AutoAttackButton.addEventListener("click", function()
        {
            localStorage.setItem("AutoAttackStatus",'Disabled');
            location.reload();
        });
    }
    else
    {
        AutoAttackButton.textContent = "Enable AutoAttack";
        AutoAttackButton.addEventListener("click", function()
       {
            localStorage.setItem("AutoAttackStatus",'Enabled');
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


 if ( !localStorage.getItem("AutoMoveStatus") )
    {
        localStorage.setItem("AutoMoveStatus",'Enabled');
    }

    // Create a new button element
    let AutoMoveButton = document.createElement("button");
    if (localStorage.getItem("AutoMoveStatus")=='Enabled')
    {
        AutoMoveButton.textContent = "Disable AutoMove"; // Set the text on the button
        AutoMoveButton.addEventListener("click", function()
        {
            localStorage.setItem("AutoMoveStatus",'Disabled');
            location.reload();
        });
    }
    else
    {
        AutoMoveButton.textContent = "Enable AutoMove";
        AutoMoveButton.addEventListener("click", function()
       {
            localStorage.setItem("AutoMoveStatus",'Enabled');
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

    function UsePotion()
    {
        //later add more potion here
        let ConstitutionPotionButton = document.querySelector('a[onclick="setaction(5); setitem(30043); document.ff.submit(); return false;;"]');
        if (ConstitutionPotionButton)
        {
            ConstitutionPotionButton.click();
            return;
        }

        let StaminaPotionButton = document.querySelector('a[onclick="setaction(5); setitem(30042); document.ff.submit(); return false;;"]');
        if (StaminaPotionButton)
        {
            StaminaPotionButton.click();
            return;
        }

        let VitalityPotionButton = document.querySelector('a[onclick="setaction(5); setitem(30041); document.ff.submit(); return false;;"]');
        if (VitalityPotionButton)
        {
            VitalityPotionButton.click();
            return;
        }

         let PotionOfAbundantHealthButton = document.querySelector('a[onclick="setaction(5); setitem(30033); document.ff.submit(); return false;;"]');
        if (PotionOfAbundantHealthButton)
        {
            PotionOfAbundantHealthButton.click();
            return;
        }

        let PotionOfGreaterHealthButton = document.querySelector('a[onclick="setaction(5); setitem(30032); document.ff.submit(); return false;;"]');
        if (PotionOfGreaterHealthButton)
        {
            PotionOfGreaterHealthButton.click();
            return;
        }

         let PotionOfPotentHealthButton = document.querySelector('a[onclick="setaction(5); setitem(30031); document.ff.submit(); return false;;"]');
        if (PotionOfPotentHealthButton)
        {
            PotionOfPotentHealthButton.click();
            return;
        }

        let PotionOfGrowthButton = document.querySelector('a[onclick="setaction(5); setitem(30023); document.ff.submit(); return false;;"]');
        if (PotionOfGrowthButton)
        {
            PotionOfGrowthButton.click();
            return;
        }

        let PotionOfFortitudeButton = document.querySelector('a[onclick="setaction(5); setitem(30022); document.ff.submit(); return false;;"]');
        if (PotionOfFortitudeButton)
        {
            PotionOfFortitudeButton.click();
            return;
        }

        let PotionOfRegenerationButton = document.querySelector('a[onclick="setaction(5); setitem(30021); document.ff.submit(); return false;;"]');
        if (PotionOfRegenerationButton)
        {
            PotionOfRegenerationButton.click();
            return;
        }

        let HealingBottleButton = document.querySelector('a[onclick="setaction(5); setitem(30014); document.ff.submit(); return false;;"]');
        if (HealingBottleButton)
        {
            HealingBottleButton.click();
            return;
        }

        let HealingPotionButton = document.querySelector('a[onclick="setaction(5); setitem(30013); document.ff.submit(); return false;;"]');
        if (HealingPotionButton)
        {
            HealingPotionButton.click();
            return;
        }

        let HealingFlaskButton = document.querySelector('a[onclick="setaction(5); setitem(30012); document.ff.submit(); return false;;"]');
        if (HealingFlaskButton)
        {
            HealingFlaskButton.click();
            return;
        }

        let HealingVialButton = document.querySelector('a[onclick="setaction(5); setitem(30011); document.ff.submit(); return false;;"]');
        if (HealingVialButton)
        {
            HealingVialButton.click();
            return;
        }
        return;
    } //end of UsePotion() function


    if(AttackButton)
    {
        let RohaneFontTag,MipsyFontTag,TaliniaFontTag,VelmFontTag;
        let RohaneCurrentHP,MipsyCurrentHP,TaliniaCurrentHP,VelmCurrentHP;
        let CurrentTurnCharacter;

        AllFontTag = document.querySelectorAll('font');
        if ( document.body.textContent.includes('Mipsy') && document.body.textContent.includes('Talinia') && document.body.textContent.includes('Velm') ) //4-man party
        {
             RohaneFontTag = AllFontTag.length-5 ; MipsyFontTag = AllFontTag.length-4 ; TaliniaFontTag = AllFontTag.length-3 ; VelmFontTag = AllFontTag.length-2 ;
            RohaneCurrentHP = AllFontTag[RohaneFontTag].textContent.split('/')[0]; MipsyCurrentHP = AllFontTag[MipsyFontTag].textContent.split('/')[0];
            TaliniaCurrentHP = AllFontTag[TaliniaFontTag].textContent.split('/')[0]; VelmCurrentHP = AllFontTag[VelmFontTag].textContent.split('/')[0];
            CurrentTurnCharacter = AllFontTag[AllFontTag.length - 7].textContent;
        }
        else if ( document.body.textContent.includes('Mipsy') && document.body.textContent.includes('Talinia') ) //3-man party
        {
            RohaneFontTag = AllFontTag.length-4 ; MipsyFontTag = AllFontTag.length-3 ; TaliniaFontTag = AllFontTag.length-2 ;
            RohaneCurrentHP = AllFontTag[RohaneFontTag].textContent.split('/')[0]; MipsyCurrentHP = AllFontTag[MipsyFontTag].textContent.split('/')[0];
            TaliniaCurrentHP = AllFontTag[TaliniaFontTag].textContent.split('/')[0];
            CurrentTurnCharacter = AllFontTag[AllFontTag.length - 6].textContent;
        }

        else if (document.body.textContent.includes('Mipsy') ) //2-man party
        {
            RohaneFontTag = AllFontTag.length-3 ; MipsyFontTag = AllFontTag.length-2 ;
            RohaneCurrentHP = AllFontTag[RohaneFontTag].textContent.split('/')[0]; MipsyCurrentHP = AllFontTag[MipsyFontTag].textContent.split('/')[0];
            CurrentTurnCharacter = AllFontTag[AllFontTag.length - 5].textContent;
        }
        else //1-man party
        {
            RohaneFontTag = AllFontTag.length-2 ;
            RohaneCurrentHP = AllFontTag[RohaneFontTag].textContent.split('/')[0];
            CurrentTurnCharacter = AllFontTag[AllFontTag.length - 4].textContent;
        } //end of checking number of party member

        console.log("RohaneCurrentHP = " +RohaneCurrentHP);
        console.log("CurrentTurnCharacter = " + CurrentTurnCharacter);
        console.log("TaliniaCurrentHP = " +TaliniaCurrentHP);
        if (RohaneCurrentHP <= HealthToHeal && CurrentTurnCharacter == 'Rohane' )
        {

            UsePotion(); return;
        }
        else if (CurrentTurnCharacter == 'Mipsy')
        {
            if (MipsyCurrentHP <= HealthToHeal )
            {
                UsePotion(); return;
            }
        }
        else if (CurrentTurnCharacter == 'Talinia')
        {
            if (TaliniaCurrentHP <= HealthToHeal)
                {
                UsePotion(); return;
                }
        }
        else if (CurrentTurnCharacter == 'Velm')
        {
            if (VelmCurrentHP <= HealthToHeal )
            {
                UsePotion(); return;
            }
        }


        if( localStorage.getItem("AutoAttackStatus") == 'Enabled' )
        {
            if (document.querySelector('a[onclick="setaction(9201); document.ff.submit(); return false;"]') )
            {
                let EradicateButton = document.querySelector('a[onclick="setaction(9201); document.ff.submit(); return false;"]');
                setTimeout( function(){EradicateButton.click()} , 500);
                return;
            }
            else if(document.querySelector('a[onclick="setaction(9302); document.ff.submit(); return false;"]') )
            {
                let TwinTargetButton = document.querySelector('a[onclick="setaction(9302); document.ff.submit(); return false;"]');
                setTimeout( function(){TwinTargetButton.click()} , 500);
                return;
            }

            else if (document.querySelector('a[onclick="setaction(9402); document.ff.submit(); return false;"]') ) //velm group heal
          //  { console.log("Test1111");
              //  if( RohaneCurrentHP <= MinHPforVelmToHeal || MipsyCurrentHP <= MinHPforVelmToHeal || TaliniaCurrentHP <= MinHPforVelmToHeal || VelmCurrentHP <= MinHPforVelmToHeal )
                { console.log("Test2222");
                    let GroupHealingButton = document.querySelector('a[onclick="setaction(9402); document.ff.submit(); return false;"]');
                   GroupHealingButton.click();
                 console.log("Test3333");
                    return;
                }
         //   }
            // return;///////// FOR TESTING PURPOSE
            setTimeout( function(){ AttackButton.click()} , 500);
            return;
        }
        else{ return; }
    } //end of (AttackButton)


        // Get the last direction from localStorage, default to "left" if none exists
    let lastDirection = localStorage.getItem("NQ2WalkDirection") || "left";

    // Determine next direction based on last direction
    // if last direction is left, set nextDirection to right, else set it to left.
    let nextDirection = lastDirection === "left" ? "right" : "left";

    // Save the new direction to localStorage
    localStorage.setItem("NQ2WalkDirection", nextDirection);

function MoveLeftRight()
 {
   if( localStorage.getItem("AutoMoveStatus") == 'Enabled' )
    {
        if ( nextDirection == "left" )
        {
            let MoveLeftButton = document.querySelector('area[alt="West"]');
            // Click the area if it exists
            if (MoveLeftButton)
            {
                MoveLeftButton.click();
            }
            else
            {
                console.log("MoveLeftButton not found.");
            }
        }

        else if ( nextDirection == "right" )
        {
            // Select area element by the unique href attribute
            let MoveRightButton = document.querySelector('area[alt="East"]');
            // Click the area if it exists
            if (MoveRightButton)
            {
                MoveRightButton.click();
            }
            else
            {
                console.log("MoveRightButton not found.");
            }
        }
    }
  } //end of function moveleftright()

      setTimeout( MoveLeftRight(), 500);





})();


