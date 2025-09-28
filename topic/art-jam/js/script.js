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
beginShape();

vertex(380, 450);
vertex(455, 445);
vertex(522, 450);

endShape();
pop();
//drawing pinch
push ();
fill("#000000ff");
noStroke();
ellipse(450, 495, 110, 40);
pop();
}

//drawing front hair
function drawFrontHair() {
push ();
fill("#000000ff");
ellipse(280, 260, 160, 160);
ellipse(360, 180, 160, 160);
ellipse(450, 160, 160, 160);
ellipse(540, 180, 160, 160);
ellipse(620, 260, 160, 160);

pop();
}

drawBackHair();
function drawBackHair() {
push ();
fill("#000000ff");
ellipse(370, 400, 160, 160);
ellipse(537, 400, 160, 160);
pop();
}

//drawing ears
function drawEars(moveEar) {
push ();
translate(moveEar, 0);
strokeWeight(12);
fill("#b47055ff");
ellipse(300, 380, 100, 100);
fill("#8c5949");
noStroke();
ellipse(300, 380, 50, 50);
pop();
}


/**
 * Drawing myself
*/
function draw() {
    
drawBackHair();
drawEars();
drawEars(300); //drawing duplicate ear 300 pixels to the right
//drawing the base of face
push ();
strokeWeight(12);
fill("#b47055ff");
ellipse(450, 350, 280, 320);
pop();
drawStache();
drawEyes();
drawEyes(120, 340); //drawing duplicate eyes 100 pixels to the right
drawFrontHair();
push ();
}

