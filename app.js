
var crit = 0;
var fpcrit = 0;
var cardnumber = 0;
var playerdeck = [];
var preplayerdeck = [];

var damage = 0;
var turn = 1;
var maxhp = 200;
var physicaldamage = 0;
var alchemydamage = 0;
var truedamage = 0;
var enemyhand = [];
var playerhand = [];
var destroyed = 0;
var ax="#4527a0"
var ay="#80d8ff"


var enemy = {
    hp: 200,
    moves: 8,
    pastmove: "",
    currentmove: "",
    nextmove: "",
    type: [""],
    discardpile: [],
    name: "Terminator",
    legendary: ["Edwin", "Roderick", "Wilbur", "Triston"],
    legendarycard : ""
};
var player = {
    hp: 200,
    moves: 8,
    pastmove: "",
    currentmove: "",
    nextmove: "",
    type: [""],
    discardpile: [],
    name: "Player",
    legendary: ["Edwin", "Roderick", "Wilbur", "Triston"],
    legendarycard : ""
}


/*
player.name=prompt("Enter your name:");
enemy.name=prompt("Enter enemy name");
enemy.name=(enemy.name==null)? "Terminator":enemy.name;
player.name=(player.name==null)? "":enemy.name;
*/   


for (i = 0; i < 9; i++) {
    document.getElementById("card" + i).style.display = 'none';
    document.getElementById("card" + i).src = 'SC.png';
};


function removecard(deck, card) {
    let i = deck.indexOf(card);
    if (i !== -1) {
        deck.splice(i, 1);
    }
    //removes an element from an array

}

function randomnumber(number) {
    return Math.floor(Math.random() * number);
    //fetches a number random number starting from 0. input nos. of number
}

function backgroundchange() {
    document.getElementById("stadium").style = 'background: url("greenwood.png");';
    document.body.style = 'background: url("bridge.png");';
}



function playerhealth(damage) {
    var elem = document.getElementById("animate");
    var elem2 = document.getElementById("container");
    var pos = maxhp;
    var id = setInterval(frame, 5);

    function frame() {
        if (pos == (maxhp - damage)) {
            clearInterval(id);
        } else {
            pos--;

            elem.style.width = Math.round(pos * 1.92 / (maxhp / 100)) + "px";

        }

    }

    var pos2 = maxhp;
    var id2 = setInterval(frame2, 25);

    function frame2() {
        if (pos2 == (maxhp - damage)) {
            clearInterval(id2);
        } else {
            pos2--;


            elem2.style.width = Math.round(pos2 * 1.92 / (maxhp / 100)) + "px";
        }

    }
}

function enemyhealth(damage) {
    var elem = document.getElementById("animateenemy");
    var elem2 = document.getElementById("containerenemy");
    var pos = maxhp;
    var id = setInterval(frame, 5);

    function frame() {
        if (pos == (maxhp - damage)) {
            clearInterval(id);
        } else {
            pos--;

            elem.style.width = Math.round(pos * 1.92 / (maxhp / 100)) + "px";

        }

    }

    var pos2 = maxhp;
    var id2 = setInterval(frame2, 25);

    function frame2() {
        if (pos2 == (maxhp - damage)) {
            clearInterval(id2);
        } else {
            pos2--;


            elem2.style.width = Math.round(pos2 * 1.92 / (maxhp / 100)) + "px";
        }

    }
};



var playercardsarr = ["Violet", "Violet", "Violet", "Finch", "Finch", "CarterHill", "CarterHill",  "Rhugh", "Rhugh", "Bill", "Bill", "Thralin", "Thralin", "Thralin", "Evelyn", "Evelyn",  "Florent"];
var enemycardsarr = ["Violet", "Violet", "Violet", "Finch", "Finch", "CarterHill", "CarterHill",  "Rhugh", "Rhugh", "Bill", "Bill", "Thralin", "Thralin", "Thralin", "Evelyn", "Evelyn",  "Florent"];


var guide = {
    howtoplay: {
        one: "The main objective of the game is to have higher health points(HP) than the enemy at the completion of both hands.",
        two: "The game has three major classes of characters. Offensive, special and legendary.",
        three: "Offensive: These cards can deal three types of damage, physical, alchemy and true. Only true damage can get past any and all defences of the enemy.",
        four: "Special: They include defensive cards. Alchemy defensive cards can defend against alchemy damage and physical defence against physical cards. Not all special cards are defensive in nature. Some of them can heal you or remove cards from enemy hand entirely.",
        five: "Legendary: There are four legendary cards as of yet. They are free of any usual special card moves such as destruction or theft. Physical and Alchemy damage done by them can however be blocked using the appropriate defensive cards.",
        six: "At the start of the round you draw 7 cards and one legendary card. You can hover over the cards to see it's abilities or read it's lore. The match ends when either of the players runs out of hp or both run out of cards, in which case the person with the highest hp is declared winner.",
        seven: "It pays off to read the abilities of all the cards because some of them can be comboed to do a huge amount of damage or block the same. Particular cards have a very higher damage early game while others are of a late game nature. Ceck the guide by clicking the guide icon on the left panel.",
        eight: "That about sums it up for now. Thank you for reading and have fun!"
    },

    about: {
        game: 'The White Capes is an open source card game based on the <a href="https://www.wattpad.com/story/59603569-the-white-capes">book</a> by the same name.',
        myself: 'I am a college student with a passion for coding and writing. I run a small web development and design agency <a href="https://asteriasoft.tk/">Asteriasoft</a>. Any and all support is appreciated, be it monetary or simple project suggestions.',
        Github: 'Check out my other projects here on <a href="https://github.com/ItachiHyuga">Github</a>',
        Wattpad: 'Some of my writings on <a href="https://www.wattpad.com/user/trueathenian">Wattpad.</a>',
        donate: 'Buy me a cup of coffee'
    },

}




var playercards = {



    Violet: {
        name: "Violet Drun",
        type: ["physical", "offensive"],
        number: 3,
        strength: 25,
        lore: "Enrolled to join the White Capes at the first call of Wilbur. She had borne enough, it was time to give back.",
        ability: "Does 25 physical damage. Damage increased by 25 each time it is used.",
        summon: function () {
            
            physicaldamage = 25;
            if (playercards.Violet.number ==3) {
                //return "Violet shot a volley of arrows at "+enemy.name;
            }

            if (playercards.Violet.number == 2) {
                physicaldamage = 50;
                playercards.Violet.strength=50;
                //return "Sir Carter Hill taught Violet all he knew. It paid off."

            }
            if (playercards.Violet.number == 1) {
                physicaldamage = 75;
                playercards.Violet.strength=75;
                //return "Violet rained down arrows with an unforeseen wrath of vengeance.";
            }
            let movetype = enemy.type.indexOf("defensive");
            let movetype2 = enemy.type.indexOf("physical");
            if (movetype > -1 & movetype2 > -1) {
                enemycards[enemy.currentmove].summon();
                //return enemycards[enemy.currentmove].name+" blocked Violet's assault."
            }

            enemy.hp = enemy.hp - physicaldamage;
            ay="#bf360c"


        }

    },

    Finch: {
        name: "Finch Marias",
        type: ["defensive", "physical", "alchemy"],
        number: 2,
        lore: "He never did mind taking a hit for those close to him. He was the best of us all.<br>-Wilbur Glidron",
        ability: "Cancels all physical damage on first turn. Cancels all physical and alchemy damage on the second turn.",
        summon: function () {
            physicaldamage = 0;
            if (playercards.Finch.number == 1) {
                physicaldamage = 0;
                alchemydamage = 0;
            };
            ay="#2d9aff"

        }

    },


    Florent: {
        name: "Sir Florent",
        type: ["defensive", "physical", "alchemy"],
        number: 2,
        lore: "Wronged by his own king, betrayed by his own people. All hope seemed lost for Sir Florent till The White God showed him a path.",
        ability: "Reflects 50% of all physical and alchemy damage on the first turn.",
        summon: function () {

            enemy.hp = enemy.hp - Math.round((alchemydamage + physicaldamage) / 2);
            alchemydamage = 0;
            physicaldamage = 0;

            if (playercards.Florent.number == 1) {};
            ay="#00564f"

        }

    },


    CarterHill: {
        name: "Carter Hill",
        type: ["offensive", "physical"],
        number: 2,
        lore: "A lone man fighting a corrupt system would never leave a dent. Sir Carter Hill tried regardless, even in face of insurmountable odds. When God came on earth he knew joing The White Capes in his name was the only answer.",
        ability: "Does 35 physical damage and 25 physical damage on the next turn.",
        summon: function () {
            physicaldamage = 35;
            let movetype = enemy.type.indexOf("defensive");
            let movetype2 = enemy.type.indexOf("physical");
            if (movetype > -1 & movetype2 > -1) {
                enemycards[enemy.currentmove].summon();
            }

            enemy.hp = enemy.hp - physicaldamage;
            ay="#004bff"
        },
        summonagain: function () {
            physicaldamage = 25;
            let movetype = enemy.type.indexOf("defensive");
            let movetype2 = enemy.type.indexOf("physical");
            if (movetype > -1 & movetype2 > -1) {

                enemycards[enemy.currentmove].summon();
            }

            enemy.hp = enemy.hp - physicaldamage;

        }
    },

    Thralin: {
        name: "Thralin Thralson",
        type: ["alchemy", "offensive"],
        number: 3,
        lore: "Having faced many wrongs at the hands of the Giant of Nimbleville as a child, he resolved to never let others come to such harm. He joined Wilbur and slowly hones his skills, of which he possessed more than he knew of.",
        ability: "Does 25 alchemy damage. Damage increased by 25 each time it is used.",
        summon: function () {
            alchemydamage = 25;


            if (playercards.Thralin.number == 2) {
                alchemydamage = 50;
            }
            if (playercards.Thralin.number == 1) {
                alchemydamage = 75;
            }
            let movetype = enemy.type.indexOf("defensive");
            let movetype2 = enemy.type.indexOf("alchemy");
            if (movetype > -1 & movetype2 > -1) {
                enemycards[enemy.currentmove].summon();
            }

            enemy.hp = enemy.hp - alchemydamage;
            ay="#e64a19"

        }

    },







    Rhugh: {
        name: "Rhugh",
        type: ["alchemy", "physical", "offensive"],
        number: 2,
        lore: "Rhugh and his hundreds had well earned respect in the Empire. The tales of his loyalty were legendary. Watever the crises the King knew there was always Rhugh he could rely on.",
        ability: "Does 35 alchemy damage on the first and 35 physical as well as alchemy damage on the second turn.",
        summon: function () {
            alchemydamage = 35;
            physicaldamage=0;


            if (playercards.Rhugh.number == 1) {
                alchemydamage = 35;
                physicaldamage = 35;

            }

            let movetype = enemy.type.indexOf("defensive");
            let movetype2 = enemy.type.indexOf("alchemy");
            let movetype3 = enemy.type.indexOf("physical");
            if (movetype > -1 & (movetype2 > -1 || movetype3 > -1)) {
                enemycards[enemy.currentmove].summon();
            }

            enemy.hp = enemy.hp - alchemydamage - physicaldamage;
            ay="#880e4f"

        }

    },

    Bill: {
        name: "Priest Bill",
        type: ["defensive", "alchemy"],
        number: 2,
        lore: "He was the first Priest to see the White God in person. One of the founding fathers of the Order of The White Capes",
        ability: "Blocks all alchemy damage done. Reflects 50% of the alchemy damage back when used again.",
        summon: function () {
            alchemydamage = 0;

            if (playercards.Bill.number == 1) {
                enemy.hp = enemy.hp - Math.round(alchemydamage / 2);
                alchemydamage = 0;
            };

            ay="#000d2b"
        }

    },


    Evelyn: {
        name: "Evelyn Griffiron",
        type: ["special", "heal"],
        number: 2,
        lore: "Freedom is the highest form of wealth.",
        ability: "Heals 50 hp. When used the second time, restores 50% of lost hp",
        summon: function () {
            if (playercards.Evelyn.number !== 1) {
                player.hp = player.hp + 50;
                if (player.hp > maxhp) {
                    player.hp = maxhp;
                }


            }
            if (playercards.Evelyn.number == 1) {
                player.hp = player.hp + Math.round((maxhp - player.hp) / 2);


            }

            ay="#01261f"

        }



    },



    Edwin: {
        name: "Edwin",
        type: ["physical", "offensive", "legendary"],
        number: 3,
        lore: "",
        ability: "Deals 50% of current enemy hp as physical damage",
        summon: function () {
            physicaldamage = (50/100)*enemy.hp;


           
            let movetype = enemy.type.indexOf("defensive");
            let movetype2 = enemy.type.indexOf("physical");
            if (movetype > -1 & movetype2 > -1) {
                enemycards[enemy.currentmove].summon();
            }

            enemy.hp = enemy.hp - physicaldamage;
            ay="#e65100"
        }

    },

    
    Wilbur: {
        name: "Wilbur Glidron",
        type: [ "offensive", "legendary", "special"],
        number: 3,
        lore: "",
        ability: "Deals 50 true damage. Rallies allies and calls a random card from the deck",
        summon: function () {
            let ally=playercardsarr[Math.floor(Math.random() * playercardsarr.length)];
            playerhand.push(ally);
            preplayerdeck[9] = ally;
            document.getElementById("card8").style.display = "block";
            document.getElementById("card8").src = ally + ".png";

            enemy.hp = enemy.hp - 50;
            player.moves++;
            ay="#ddd9e0"


            
        }

    },


    Triston: {
        name: "Triston Griffiron",
        type: [ "offensive", "legendary", "alchemy"],
        number: 3,
        lore: "",
        ability: "Deals 50 percent of lost enemy hp.",
        summon: function () {
            alchemydamage = (50/100)*(maxhp- enemy.hp);



           
            let movetype = enemy.type.indexOf("defensive");
            let movetype2 = enemy.type.indexOf("alchemy");
            if (movetype > -1 & movetype2 > -1) {
                enemycards[enemy.currentmove].summon();
            }

            enemy.hp = enemy.hp - alchemydamage;

            ay="#1e7600"

        }

    },


    Roderick: {
        name: "Roderick",
        type: [ "legendary", "alchemy", "special"],
        number: 3,
        lore: "",
        ability: "Destroys enemy legendary",
        summon: function () {
            
            for (i=0;i<enemyhand.length;i++) {
                let movetype = enemycards[enemyhand[i]].type.indexOf("legendary");
                if (movetype>-1){
                    destroyed=enemyhand[i];
                }
                
            }
            
            removecard(enemyhand, destroyed);
         
            enemy.moves--;
            ay="#602896"
        }
    },


    SC: {
        //back of the cards. Only added to show help on hover.
        name: "",
        type: "non legedary",
        ability: "Flip the card to view it. Hover over it for details.",
        lore: "Check the rules from the left panel.",
    },




};

var enemycards = {
    Finch: {
       
        type: ["defensive", "physical", "alchemy"],
       
        summon: function () {
            physicaldamage = 0;
            if (enemycards.Finch.number == 1) {
                physicaldamage = 0;
                alchemydamage = 0;
            };


        }

    },

    Violet: {
        
        type: ["physical", "offensive"],
        summon: function () {
            physicaldamage = 25;


            if (enemycards.Violet.number == 2) {
                physicaldamage = 50;
            }
            if (enemycards.Violet.number == 1) {
                physicaldamage = 75;
            }
            let movetype = player.type.indexOf("defensive");
            let movetype2 = player.type.indexOf("physical");
            if (movetype > -1 & movetype2 > -1) {
                playercards[player.currentmove].summon();
            }

            player.hp = player.hp - physicaldamage;
            ax="#ffeb3b"
        }

    },

    CarterHill: {
       
        type: ["offensive", "physical"],
         summon: function () {
            physicaldamage = 35;
            let movetype = player.type.indexOf("defensive");
            let movetype2 = player.type.indexOf("physical");
            if (movetype > -1 & movetype2 > -1) {
                playercards[player.currentmove].summon();
            }

            player.hp = player.hp - physicaldamage;
            ax="#5889ff"

        },
        summonagain: function () {
            physicaldamage = 25;
            let movetype = player.type.indexOf("defensive");
            let movetype2 = player.type.indexOf("physical");
            if (movetype > -1 & movetype2 > -1) {
                playercards[player.currentmove].summon();
            }

            player.hp = player.hp - physicaldamage;

        }
    },

    Thralin: {
        type: ["alchemy", "offensive"],
        summon: function () {
            alchemydamage = 25;


            if (enemycards.Thralin.number == 2) {
                alchemydamage = 50;
            }
            if (enemycards.Thralin.number == 1) {
                alchemydamage = 75;
            }
            let movetype = player.type.indexOf("defensive");
            let movetype2 = player.type.indexOf("alchemy");
            if (movetype > -1 & movetype2 > -1) {
                playercards[player.currentmove].summon();
            }

            player.hp = player.hp - alchemydamage;
            ax="#ffab91"
        }

    },




    Rhugh: {
       type: ["alchemy", "physical", "offensive"],
            summon: function () {
            alchemydamage = 35;


            if (enemycards.Rhugh.number == 1) {
                alchemydamage = 35;
                physicaldamage = 35;

            }


            let movetype = player.type.indexOf("defensive");
            let movetype2 = player.type.indexOf("alchemy");
            let movetype3 = player.type.indexOf("physical");
            if (movetype > -1 & (movetype2 > -1 || movetype3 > -1)) {
                playercards[player.currentmove].summon();
            }

            player.hp = player.hp - alchemydamage - physicaldamage;

            ax="#851f00"
        }

    },

    Bill: {
        
        type: ["defensive", "alchemy"],
              summon: function () {
            alchemydamage = 0;
            if (enemycards.Bill.number == 1) {
                player.hp = player.hp - Math.round(alchemydamage / 2);
                alchemydamage = 0;
            };
            ax="#a3beff"

        }

    },

    Evelyn: {
        
        type: ["special", "heal"],
              summon: function () {
            if (enemycards.Evelyn.number != 1) {
                enemy.hp = enemy.hp + 50;
                if (enemy.hp > maxhp) {
                    enemy.hp = maxhp;
                }

            };
            if (enemycards.Evelyn.number == 1) {
                enemy.hp = enemy.hp + Math.round((maxhp - enemy.hp) / 2);

            };
            ax="#b2ff59"
        }



    },


    Florent: {
       
        type: ["defensive", "physical", "alchemy"],
            summon: function () {

            player.hp = player.hp - Math.round((alchemydamage + physicaldamage) / 2);
            alchemydamage = 0;
            physicaldamage = 0;

            if (enemycards.Florent.number == 1) {};
                ax="#00d2c1"

        }

    },

    

    Edwin: {
        
        type: ["physical", "offensive", "legendary"],
           summon: function () {
            physicaldamage = (50/100)*player.hp;


           
            let movetype = player.type.indexOf("defensive");
            let movetype2 = player.type.indexOf("physical");
            if (movetype > -1 & movetype2 > -1) {
                playercards[player.currentmove].summon();
            }

            player.hp = player.hp - physicaldamage;
            ax="#ffea00"
        }

    },

    
    Wilbur: {
        
        type: [ "offensive", "legendary", "special"],
           summon: function () {
            let ally=enemycardsarr[Math.floor(Math.random() * enemycardsarr.length)];
            enemyhand.push(ally);
           

            player.hp = player.hp - 50;
            enemy.moves++;
            ax="#3e1a61"
        }

    },


    Triston: {
       
        type: [ "offensive", "legendary", "alchemy"],
           summon: function () {
            alchemydamage = (50/100)*(maxhp- player.hp);



           
            let movetype = player.type.indexOf("defensive");
            let movetype2 = player.type.indexOf("alchemy");
            if (movetype > -1 & movetype2 > -1) {
                playercards[player.currentmove].summon();
            }

            player.hp = player.hp - alchemydamage;

            ax="#2eb200"

        }

    },


    Roderick: {
        
        type: [ "legendary", "alchemy", "special"],
          summon: function () {
            
//            for (i=0;i<playerhand.length;i++) {
//               let movetype = playercards[playerhand[i]].type.indexOf("legendary");
//                if (movetype>-1){
//                   destroyed=playerhand[i];
//                }
                

//           }
            document.getElementById("card8").style.display = 'none';
            removecard(playerhand, player.legendarycard);
           
            player.moves--;
            ax="#3e1a61"
        }
    },







    Placecard: {
        name: "placecard",
        type: [""],
        summon: function () {

        }
    },

    undefined: {
        name: "placecard",
        type: [""],
        summon: function () {

        }

    }


}


//enemy draw cards

enemylegendary = enemy.legendary[Math.floor(Math.random() * enemy.legendary.length)];
removecard(enemy.legendary, enemylegendary);

if (enemylegendary=="Edwin" || enemylegendary=="Roderick")
{
    enemyhand[0]=enemylegendary;
for (i = 1; i < 8; i++) {



    enemyhand[i] = enemycardsarr[Math.floor(Math.random() * enemycardsarr.length)];
    
    removecard(enemycardsarr, enemyhand[i]);

};
}
else if(enemylegendary=="Triston"){
    let Tristoncard=randomnumber(3)+5;
    for (i = 0; i < Tristoncard; i++) {
        enemyhand[i] = enemycardsarr[Math.floor(Math.random() * enemycardsarr.length)];
        removecard(enemycardsarr, enemyhand[i]);
    
    };
    enemyhand[Tristoncard]=enemylegendary;
    for (i = (Tristoncard+1); i < 8; i++) {
        enemyhand[i] = enemycardsarr[Math.floor(Math.random() * enemycardsarr.length)];
        removecard(enemycardsarr, enemyhand[i]);
    
    };

}
else {
    let wilburcard=randomnumber(8);
    for (i = 0; i < wilburcard; i++) {
        enemyhand[i] = enemycardsarr[Math.floor(Math.random() * enemycardsarr.length)];
        removecard(enemycardsarr, enemyhand[i]);
    
    };
    enemyhand[wilburcard]=enemylegendary;
    for (i = (wilburcard+1); i < 8; i++) {
        enemyhand[i] = enemycardsarr[Math.floor(Math.random() * enemycardsarr.length)];
        removecard(enemycardsarr, enemyhand[i]);
    
    };

}

var cardclick = [0, 0, 0, 0, 0, 0, 0];


//

function card(path) {
    let i = path.getAttribute("id");
    i = i.slice(-1);
    i = parseInt(i);

    if (cardclick[i] == 0) {
        path.src = preplayerdeck[i] + ".png";
        cardclick[i]++;
    } else {
        playerdeck[cardnumber] = preplayerdeck[i];
        removecard(playerhand,playerdeck[cardnumber]);
        cardnumber++;
        path.style.display = 'none';
        document.getElementById("playercard").src = preplayerdeck[i] + ".png";

        fight();
    }
}
//


function fight() {

    player.currentmove = playerdeck[turn - 1];



    enemy.currentmove = enemyhand.shift();  
    enemy.type = enemycards[enemy.currentmove].type;
    enemy.discardpile[turn-1]=enemy.currentmove;


    player.type = playercards[player.currentmove].type;
    


 

    if (turn > 1) {
        player.pastmove = playerdeck[turn - 2]; 
        enemy.pastmove = enemy.discardpile[turn-2]
        if (enemy.pastmove == "CarterHill") {
            enemycards.CarterHill.summonagain();
        };
        if (player.pastmove == "CarterHill") {
            playercards.CarterHill.summonagain();
        };

    }

 
   
    
 

    document.getElementById("enemycard").src = enemy.currentmove + ".png";
    enemycards[enemy.currentmove].summon();
    playercards[player.currentmove].summon();
    //document.getElementById("enemyinfo").innerHTML = "Enemy did " + enemycards[enemy.currentmove].summon();
    //document.getElementById("playerinfo").innerHTML = playercards[player.currentmove].summon();


    enemy.discardpile[turn-1]=enemy.currentmove;
    enemycards[enemy.currentmove].number--;
    playercards[player.currentmove].number--;
    player.moves--;
    enemy.moves--;


    turn++;

    if (enemy.hp<0)
    {
        enemy.hp=0;
    }
    if (player.hp<0)
    {
        player.hp=0;
    }

    document.getElementById("enemyhp").innerHTML = enemy.name+" HP =" + enemy.hp + "/" +maxhp;
    document.getElementById("playerhp").innerHTML = player.name+" HP =" + player.hp + "/"+maxhp;
    document.body.style="background: linear-gradient(289deg, "+ay+", "+ax+");animation: AnimationName 7s ease infinite;background-size: 400% 400%;"
    console.log(ax, ay)
    if (player.moves<=0 & enemy.moves >0)
    {
       let l=enemyhand.length;
       
        for(k=0;k<=l;k++){
        
           enemycards[enemyhand.shift()].summon();
           
       }
       enemy.moves=0
    }

    if (player.moves>0 & enemy.moves <=0)
    {
        document.getElementById("enemyinfo").innerHTML=enemy.name+" is out of cards!";
    }

    
    


    if (enemy.hp == 0 || player.hp == 0 || (enemy.moves<=0 & player.moves<=0)) {
        if (enemy.hp == 0 || player.hp > enemy.hp) {
           
            document.getElementById("message").innerHTML = "YOU WON!";
            win()

        } else if (player.hp <= 0 || player.hp < enemy.hp) {
           
            document.getElementById("message").innerHTML = "YOU LOST!";
            lost()
        } else if (player.hp==enemy.hp){
            document.getElementById("message").innerHTML = "TIE!";
            lost()
        }
        
        for(m=0;m<=8;m++)
        {
        document.getElementById("card"+m).style.display = "none";
        }
        
    }
    //document.getElementById("enemyhp").innerHTML = enemy.name+" HP =" + enemy.hp + "/" +maxhp;
   // document.getElementById("playerhp").innerHTML = player.name+" HP =" + player.hp + "/"+maxhp;
 

}

var draw1 = 0;



//preplayerdeck has randomly drawn cards
//playerdeck has cards that are already drawn
//player hand has cards that have not been used yet but are a part of hand. It's the current hand essentially
function draw() {

    if (draw1 == 0) {
        for (i = 0; i < 7; i++) {
            preplayerdeck[i] = playercardsarr[Math.floor(Math.random() * playercardsarr.length)];;
            playerhand[i] = preplayerdeck[i];
            removecard(playercardsarr, preplayerdeck[i]);
            document.getElementById("card" + i).style.display = 'block';
        };
        preplayerdeck[8] = player.legendary[Math.floor(Math.random() * player.legendary.length)];;
        playerhand[8] = preplayerdeck[8];
        player.legendarycard=preplayerdeck[8];
            removecard(player.legendary, preplayerdeck[8]);
        document.getElementById("card8").style.display = 'block';

        document.getElementById("enemycard").src = "SC.png";
        document.getElementById("enemyinfo").innerHTML=enemy.name+" has played his card!";
        document.getElementById("draw").innerHTML= "Reveal All";
        draw1++;
    } else {

        for (i = 0; i < 7; i++) {
            document.getElementById("card" + i).src = preplayerdeck[i] + ".png";
            cardclick[i] = 1;
        };
       
        document.getElementById("card8").src = preplayerdeck[8] + ".png";
    
        document.getElementById("draw").innerHTML = 'Good Luck!';
     
    }
}


function displayinfo(card) {
    document.getElementById("dict").style.background = "url(" + card + ".png)";
    document.getElementById("name").innerHTML = playercards[card].name;
    document.getElementById("Title").innerHTML = " Type : " + playercards[card].type;
    document.getElementById("ability").innerHTML = playercards[card].ability + "</br></br>" + playercards[card].lore;
}

function help() {
    document.getElementById("dict").style = "overflow: auto;";
    document.getElementById("name").innerHTML = "How to Play";
    let a = guide.howtoplay;
    document.getElementById("Title").innerHTML = a.one;
    document.getElementById("ability").innerHTML = a.two + "</br></br>" + a.three + "</br></br>" + a.four + "</br></br>" + a.five + "</br></br>" + a.six + "</br></br>" + a.seven + "</br></br>" + a.eight;
}

function about() {
    document.getElementById("dict").style.display= "none";
    document.getElementById("dict").style = "overflow: auto;";
    document.getElementById("name").innerHTML = "About";
    let a = guide.about;
    document.getElementById("Title").innerHTML = a.game;
    document.getElementById("ability").innerHTML = a.myself + "</br></br>" + a.Github + "</br></br>" + a.Wattpad;
}


function carddict(x) {
    let y = x.getAttribute("src")
    y = y.slice(0, -4);
    
    displayinfo(y);

}







//if no cards removed, enemy.moves shouldn't subtract

