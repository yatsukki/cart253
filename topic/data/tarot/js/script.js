/**
 * Tarot
 * Pippin Barr
 * 
 * Some experiments with data representing a Tarot deck
 */

"use strict";


//our tarot data

let tarot = undefined //undefined because it's not even loaded yet

//our fortune
let fortune = "Click to show a fortune"

function preload(){
    tarot = loadJSON ('assets/data/tarot_interpretations.json')
    
}

/**
 * create a canvas
*/
function setup() {
    createCanvas (1080, 400);

}


/**
 * display tarot
*/
function draw() {
    background(0);

    const description = tarot.description;
    const gullible = tarot.tarot_interpretations[0].meanings.shadow[0];
    const love = tarot.tarot_interpretations[6].meanings.light[0];
  

    //display the information
    push();
    textSize(16);
    fill("yellow");
    textAlign (CENTER, CENTER);
    text(fortune, width / 2, height /2); //description being the const you just created inside your function draw, it could also appear earlier in the code
    pop();

}


function mousePressed (){
    //choose a random card
    const card = random(tarot.tarot_interpretations);
    //choose a random fortune
    fortune = random(card.fortune_telling)
}