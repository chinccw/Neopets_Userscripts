 ==UserScript==
 @name         Neoquest Hotkey + Skip BeginEnd Battle
 @description  i didn't write these codes. these code are written by someone else long time ago, i just modified a little bit to fix it so it works.
 @author       no idea i can't find the original website where i got this anymore =_=''
 @version      1.1
 @icon         httpsi.imgur.comRnuqLRm.png
 @grant GM_setValue
 @grant GM_getValue
 @grant GM_deleteValue
 @match        httpswww.neopets.comgamesneoquest
 @include	httpswww.neopets.comgamesneoquest
 @include	httpswww.neopets.comquickref.phtml
 @require	httpcode.jquery.comjquery-latest.min.js
 ==UserScript==


 movement hotkey = Q,W,E,    L = Attack,  I = InventoryItem,   P= Upgrade Skill Page
                   A,S,D,    J,N,M = Change Movement mode.
                   Z,X,C,




 set pet name for when it's not active pet!
var petName = yourPetName;

 defaults

var page = document.URL;
var debug = false;
var $ = window.jQuery
 check if trainer's running and add appropriate link

if(GM_getValue(trainerRunning)){
	$(.content bcontains(' + petName + ')first).after(  Trainer a href='#' id='trainerFalse'bOnba);
	$(#trainerFalse).click(
		function(){
			GM_setValue(trainerRunning,false);
			if(debug){GM_log(TRAINER TURNED OFF!);}
			location.href = httpswww.neopets.comgamesneoquestneoquest.phtmlmovetype=1;
		}
	);
}
else{
	$(.content bcontains(' + petName + ')first).after(  Trainer a href='#' id='trainerTrue'bOffba);
	$(#trainerTrue).click(
		function(){
			var trainUntil = prompt(Train until what level,Number(level) + 1);
			GM_setValue(trainUntil,Number(trainUntil));
			GM_log(trainerEnds  + GM_getValue(trainUntil));
			GM_setValue(trainerRunning,true);
			location.href = httpswww.neopets.comgamesneoquestneoquest.phtmlmovetype=2;
			if(debug){
				GM_log(trainerRunning  + GM_getValue(trainerRunning));
				
			}
		}
	);
}

 if battle isn't set, set it. duh.

if(typeof GM_getValue(battle) === 'undefined'){
	GM_setValue(battle,0);
}

 run auto-trainer!

if(GM_getValue(trainerRunning) == true){
	if(GM_getValue(battle) == 0){
		if(GM_getValue(goLeft) == true){
			GM_setValue(goLeft, false);
			if(debug){GM_log(TRAINER LEFT);}
			setTimeout(function(){location.href = httpswww.neopets.comgamesneoquestneoquest.phtmlaction=move&movedir=4;},Math.floor(Math.random()1000+1000));
		}
		else if(GM_getValue(goLeft) == false){
			GM_setValue(goLeft, true);
			if(debug){GM_log(TRAINER RIGHT);}
			setTimeout(function(){location.href = httpswww.neopets.comgamesneoquestneoquest.phtmlaction=move&movedir=5;},Math.floor(Math.random()1000+1000));
		}
		if(debug){
			GM_log(TRAINER  + GM_getValue(trainerRunning));
			GM_log(BATTLE  + GM_getValue(battle));
		}
	}
	else{
		 alert(in a battle, commence destruction!);
		if(Number(GM_getValue(health))  Number(GM_getValue(maxHealth)2)){
			alert(Heal);
			var heal = confirm(Heal Press ok to use healing item!);
			if(heal == true){
				location.href = javascriptsetdata('item', 220004);;
			}
		}
		else if(GM_getValue(level) = GM_getValue(trainUntil)){
			GM_log(leveled up. trainer killed!);
			GM_setValue(trainerRunning,false);
			alert(trainUntil level reached);
		}
		else{
			GM_log(AUTOTRAINER ATTACK);
			setTimeout(function(){location.href = javascriptsetdata('attack', 0);;},Math.floor(Math.random()1000+1000));
		}
	}
}


if(page == httpswww.neopets.comquickref.phtml && GM_getValue(petSwitch) == 1){
	GM_deleteValue(petSwitch);
	location.href = httpswww.neopets.comgamesneoquest;
}

var neoquest = document.body.innerHTML.split('NeoQuest is brought to you by')[1];

if(neoquest.search('to start a new game in') != -1){
	$('.phpGamesNonPortalView div bcontains(Welcome to NeoQuest)').prepend('a id=petSwitch href=#Change to NQ pet!abrbr');
	$('#petSwitch').click(function(){
		GM_setValue(petSwitch,1);
		location.href = httpswww.neopets.comprocess_changepet.phtmlnew_active_pet= + petName;
	});
}
else{
	var levelSplit = neoquest.split('Level b')[1];
	var level = levelSplit.split('b',1)[0];
	var healthSplit = neoquest.split('Health b')[1];
	var health = healthSplit.split('b',1)[0];
	var maxHealth = healthSplit.split('')[2].replace(' img src=http','');
	GM_setValue(level,Number(level));
	GM_setValue(health,health);
	GM_setValue(maxHealth,maxHealth);

	if(debug){GM_log(LEVEL  + level);}
	if(debug){GM_log(HEALTH  + GM_getValue(health) +  + GM_getValue(maxHealth));}

	function moveDirection(dir){
		if(debug){
			var directions = new Array();
			directions[1] = North West; 
			directions[2] = North;
		directions[3] = North East;
		directions[4] = West;
		directions[5] = East;
		directions[6] = South West;
		directions[7] = South;
		directions[8] = South East;
	
		var directionMoved = directions[dir];
		GM_log(MOVED  + directionMoved);
	}
	location.href = httpswww.neopets.comgamesneoquestneoquest.phtmlaction=move&movedir= + dir;
}

function walkingMode(mode){
	if(debug){
		var walking = new Array();
		walking[1] = Normal;
		walking[2] = Hunting;
		walking[3] = Sneaking;
		var walkingMode = walking[mode];
		GM_log(MODE  + walkingMode);
	}
	location.href = httpswww.neopets.comgamesneoquestneoquest.phtmlmovetype= + mode;
}

function printXP() {
	var xpTable = ['0', '600', '1,400', '2,400', '3,400', '4,500', '5,600','6,800', '8,000', '9,300', '10,600', '12,000', '13,400', '14,900','16,400', '18,000', '19,600', '21,300', '23,100', '25,000', '27,000','29,000', '31,000', '33,000', '35,000', '37,000', '39,000', '41,000','43,000', '45,000', '48,000', '51,000', '54,000', '57,000', '60,000','63,000', '66,000', '69,000', '72,000', '75,000', '79,000','83,000', '87,000', '91,000', '95,000', '99,000', '103,000','107,000', '112,000', '117,000','MAX'];
	var levelSplit = neoquest.split('Level b')[1];
	var level = levelSplit.split('b',1)[0];
	var currentXP = $(.phpGamesNonPortalView beq(5)).text();
	if(debug){GM_log(EXP  + currentXP +  + xpTable[level]);}
	if(level != 50){
		$(.phpGamesNonPortalView beq(5)).append( + xpTable[level]);
	}
	
};

printXP();

 skip last battle page

if (neoquest.search('to see what you found') != -1  neoquest.search('to see what happened') != -1) {
	location.href = 'httpswww.neopets.comgamesneoquestneoquest.phtml';
	GM_setValue(battle,0);
	if(debug){GM_log(BATTLE  + GM_getValue(battle));}
}

 if you can attack, you are in a battle, set battle to 0 so you can use H to heal

if(neoquest.search('Attack') != -1  neoquest.search('Do nothing') != -1){
	GM_setValue(battle,1);
	if(debug){GM_log(BATTLE  + GM_getValue(battle));}
}

 check to skip or not

if(location.href.match(action=skill)  location.href.match(action=items)  location.href.match(action=talk)  location.href.match(action=options)){
	var stayOnPage = 1;
}

if (neoquest.search('Spend Skill Points') != -1 && GM_getValue(trainerRunning) == false) {
	alert(Dont forget to use your skill points!);
	location.href = httpswww.neopets.comgamesneoquestneoquest.phtmlaction=skill;
}

var finishFight = $(input[value='Click here to return to the map']).parent();
var newLevel = $(contains('YOU GAIN A NEW LEVEL!'));

if(stayOnPage == 1){

}
else if(finishFight.length  0 && newLevel.length == 0){
	GM_setValue(battle,0);
	finishFight.submit();
	if(debug){GM_log(BATTLE  + GM_getValue(battle));}
}
else if(newLevel.length  1){
	if(GM_getValue(trainerRunning) == false){alert('New Level');}
	GM_setValue(battle,0);
	finishFight.submit();
	if(debug){GM_log(BATTLE  + GM_getValue(battle));}
}

if (neoquest.search('to begin the fight') != -1) {
	GM_setValue(battle,1);
	if(debug){GM_log(BATTLE  + GM_getValue(battle));}
	location.href = httpswww.neopets.comgamesneoquestneoquest.phtml;
}

if (neoquest.search('Go!') != -1) {
	var go = $(.phpGamesNonPortalView acontains('Go!')).attr(href);
}

if(neoquest.search('to confirm this choice') != -1){
	var skillConfirm = $(.phpGamesNonPortalView acontains('Click here')).attr(href);
	if(debug){GM_log(SKILL  + skillConfirm);}
}

if (neoquest.search('Talk') != -1) {
	var talk = $(.phpGamesNonPortalView acontains('Talk')).attr(href);
	if(debug){GM_log(TALK  + talk);}
}

if ( (neoquest.search('stuns you for') != -1  neoquest.search('You are stunned') != -1) && neoquest.search('Attack') == -1){
	location.href = javascriptsetdata('noop', 0);;
	if(debug){GM_log(STUNNED doing nothing);}
}

 check if wounded and prompt user to use healing item

$(document).keypress(function(e){
	switch(e.which){

		 t, trainer
		case 116
			var trainUntil = prompt(Train until what level,Number(level) + 1);
			GM_setValue(trainUntil,trainUntil);
			GM_setValue(trainerRunning,true);
			location.href = httpswww.neopets.comgamesneoquestneoquest.phtml;
			if(debug){GM_log(trainerRunning  + GM_getValue(trainerRunning));}
			trainer();
		break;
		
		 y, trainer off
		case 121	GM_setValue(trainerRunning,false);
				if(debug){GM_log(TRAINER TURNED OFF!);}
		break;
		
		 q, north west
		case 113	moveDirection(1);
		break;

		 w, north
		case 119	moveDirection(2);
		break;		
		
		 e, north east
		case 101	moveDirection(3);
		break;

		 a, west
		case 97		moveDirection(4);		
		break;

		 d, east
		case 100	moveDirection(5);
		break;

		 z, south west
		case 122	moveDirection(6);
		break;	

		 s, south
		case 115	moveDirection(7);
		break;		

		 c, south east
		case 99		moveDirection(8);
		break;

		 n, normal
		case 110		if(GM_getValue(battle) == 1){location.href = javascriptsetdata('noop', 0);;}else{walkingMode(1);}
		break;

		 h, huntinghealing
		 change item # to match which item you want to heal with
		 220000 is Weak Healing Potion
		 220001 is Standard Healing Potion
		 220002 is Strong Healing Potion
		 220003 is Greater Healing Potion
		 220004 is Superior Healing Potion
		 220005 is Spirit Healing Potion
		case 104 	if(GM_getValue(battle) == 1){location.href = javascriptsetdata('item', 220004);;}else{walkingMode(2);}
		break;

		 j, sneaking
		case 106	walkingMode(3)
		break;

		 l, action
		case 108 if(GM_getValue(battle) == 1){location.href = javascriptsetdata('attack', 0);;}
				else if(go){location.href = go;}
				else if(skillConfirm){location.href = skillConfirm;}
				else if(talk){location.href = talk;}
		break;

		 ;, absorb
		case 59		if(neoquest.search('Cast') != -1){location.href = javascriptsetdata('special', 4003);;}
		break;
		
		 k spirit of growth
		case 107	if(neoquest.search('Spirit') != -1){
					location.href = javascriptsetdata('special', 200019);;
					if(debug){GM_log(Spirit of Growth);}
				}
		break;

		 i, items
		case 105 location.href = httpswww.neopets.comgamesneoquestneoquest.phtmlaction=items;
		break;

		 p, spend skill points
		case 112 location.href = httpswww.neopets.comgamesneoquestneoquest.phtmlaction=skill;
		break;

		 f, flee
		case 102 location.href = javascriptsetdata('flee',0);;
		break;

		 m, return to map (use in items, skills)
		case 109 location.href = httpswww.neopets.comgamesneoquestneoquest.phtml;
		}
	});
}