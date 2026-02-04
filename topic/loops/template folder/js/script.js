/**
 * Star field
 * Kerven
 * 
 * Draws a star-field with a for loop
 */

"use strict";

const numStars = 100;
/**
 * OH LOOK I DIDN'T DESCRIBE SETUP!!
*/
function setup() {
createCanvas(400, 400);
}


/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
*/

//draw the star-field
function draw() {
background(0);

    randomSeed(4);
    for (let i = 0; i<numStars; i++) {
        drawStar();
    }

}


//draws random star

function drawStar() {
    const x = random(0, width);
    const y = random(0, height);
    const diameter = random(2, 5);

    push();
    fill(255);
    ellipse(x, y, diameter);
    pop();
}