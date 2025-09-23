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
    createCanvas ( 900, 700);
    background (240)
}


/**
 * Drawing myself
*/
function draw() {

push ();
ellipse(450, 350, 250, 320);
noStroke();
fill("#b47055ff")
   pop();
}