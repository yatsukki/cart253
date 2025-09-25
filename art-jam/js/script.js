/**
 * Title of Project
 * Author Name
 * 
 * very accurate recreation of a self portrait through the power of coding
 */

"use strict";

/**
 * creating my canvas  
*/
function setup() {
    createCanvas (900, 700);
    background (240)
}

function drawEyes(offsetX, browX = 340) {
//creating parameter for moving the eyes
push();
translate(offsetX, 0);
    //drawing the eyes
push ();
noStroke();
fill("#ffffffff");
ellipse(390, 370, 87, 87);
pop();
//pupils
push ();
noStroke();
fill("#000000ff");
ellipse(390, 370, 63, );
pop();
//square skin for hiding pupils
push ();
noStroke();
fill("#b47055ff")
square(346, 285, 88)
pop();
//eyebrow
push();
fill("#000000ff");
noStroke();
rect(browX, 325, 100, 30);
pop();
    pop();
   
}

function drawStache() {
push ();
strokeWeight(24);
strokeCap(SQUARE);
line(380, 450, 450, 445);
line(448, 445, 520, 450);
pop();
//drawing pinch
push ();

pop();
}


/**
 * Drawing myself
*/
function draw() {
//drawing the base of face
push ();
strokeWeight(12);
fill("#b47055ff");
ellipse(450, 350, 280, 320);
pop();
drawStache();
drawEyes();
drawEyes(120, 340); //drawing duplicate eyes 100 pixels to the right
push ();
}

